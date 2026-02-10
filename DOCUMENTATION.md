# Trajetória — Project Documentation

This document describes what the project does, how it is structured, and how to run and deploy it.

---

## 1. Project overview

**Trajetória** is an AI-powered self-discovery and career-orientation platform. It combines:

- **Evidence-based psychological assessments**: initial anamnesis (intake), DISC, Multiple Intelligences, RIASEC, and Archetypes.
- **OpenAI-powered analysis**: personalized narratives, life roadmap, and recommendations.
- **Professional PDF reports**: server-generated PDF plus optional client-side composition (cover, summary, conclusion).

Data stays in the user’s browser (localStorage); the backend is used only for report generation (OpenAI + PDF), not for storing user data.

---

## 2. Architecture (high level)

```
┌─────────────────────────────────────────────────────────────────┐
│  Frontend (React + Vite)                                          │
│  - Landing, forms, tests, report download                        │
│  - Data: localStorage (completed tests + anamnese)                │
│  - Calls backend only to generate report                         │
└────────────────────────────┬────────────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Backend (Node.js + Express)                                      │
│  - POST /api/reports/generate → OpenAI + PDFKit → JSON response  │
│  - GET /health                                                   │
│  - No database; stateless                                         │
└────────────────────────────┬────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  OpenAI API (gpt-4o-mini)                                        │
│  - Report narrative, “complete” report text, life roadmap (JSON)  │
└─────────────────────────────────────────────────────────────────┘
```

- **Production**: Frontend on GitHub Pages (optional custom domain via CNAME). Backend on Google Cloud Run. GitHub Actions build and deploy both.

---

## 3. User flow

1. **Landing** (`/`)  
   Hero, assessment journey (cards for each test), and report-download section.

2. **Initial anamnesis** (`/forms/anamnese-inicial`)  
   Personal and career context: name, age, location, email, education, work situation, interests, goals. Saved in `localStorage` under `completedTests['anamnese-inicial']`.

3. **Four assessments** (order flexible):  
   - DISC personality (`/forms/disc-personality`) → `disc-insight`  
   - Multiple Intelligences (`/forms/multiple-intelligences`) → `multiple-intelligences`  
   - RIASEC career orientation (`/forms/riasec`) → `riasec`  
   - Archetypes (`/forms/archetypes`) → `archetypes`  

   Each test’s results are stored in `localStorage` under `completedTests[testId]` (with `results`, `data`, `completedAt`).

4. **Report generation** (Report Download section on landing)  
   - Enabled only when anamnesis + all four tests are completed.  
   - Reads `completedTests` from `localStorage`, builds `userData` from `anamnese-inicial` and `tests` from the other four.  
   - Calls `POST /api/reports/generate` with `userData`, `tests`, and `lang` (e.g. `en` / `pt`).  
   - Backend uses OpenAI to generate narrative, “complete” report text, and life roadmap; then builds a PDF with PDFKit and returns JSON: `narrative`, `roadmap`, `pdfBase64`, `filename`, `mimeType`.  
   - Frontend can optionally compose a final PDF (cover + backend PDF + conclusion) via `pdfUtils` and trigger download.

5. **Sobre** (`/sobre`)  
   Static “about” page.

---

## 4. Tech stack

| Layer      | Technologies |
|-----------|--------------|
| Frontend  | React 18, Vite, React Router, Tailwind CSS, i18next (EN/PT), react-markdown, pdf-lib |
| Backend   | Node.js (ESM), Express, body-parser, cors, dotenv |
| AI        | OpenAI API (gpt-4o-mini) via `openai` package |
| PDF       | Backend: PDFKit; Frontend: pdf-lib for composition |
| Deploy    | Backend: Docker → Google Cloud Run; Frontend: GitHub Pages (Vite build) |
| CI/CD     | GitHub Actions (deploy on push to `main` for `backend/` or `frontend/`) |

---

## 5. Project structure

```
Trajetoria/
├── backend/
│   ├── server.js              # Express app, CORS, /health, mount reports router
│   ├── routes/
│   │   └── reports.js          # POST /api/reports/generate, GET /api/reports/test
│   ├── services/
│   │   ├── openaiService.js    # OpenAI client, prompts, generateReportNarrative, generateCompleteReportNarrative, generateLifeRoadmap
│   │   └── pdfGenerator.js    # generateCompletePDF (uses roadmap + complete narrative + userData/tests)
│   ├── utils/
│   │   └── pdfStyles.js       # PDF styling helpers
│   ├── Dockerfile
│   ├── .env / .env.development # OPENAI_API_KEY, NODE_ENV, PORT
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Routes
│   │   ├── main.jsx, index.css
│   │   ├── i18n.js             # i18next config (EN/PT)
│   │   ├── pages/              # LandingPage, AnamneseInicialForm, DiscPersonalityTest, MultipleIntelligencesTest, RiasecTest, ArchetypesTest, SobrePage
│   │   ├── components/        # layout (Header, Footer), sections (Hero, AssessmentJourney, ReportDownload), forms, modals, shared (LikertScale, etc.)
│   │   ├── services/
│   │   │   └── api.js          # generateCompleteReport(), checkBackendHealth(); uses VITE_API_URL
│   │   ├── hooks/              # useFormNavigation, useFormValidation, useTestResults, useTheme
│   │   └── utils/              # storageUtils (localStorage), pdfUtils (compose PDFs), validationUtils, testIcons
│   ├── .env, .env.development, .env.production  # VITE_API_URL, optional VITE_BASE_PATH
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── .github/workflows/
│   ├── deploy-backend.yml      # Build backend Docker image, push to Artifact Registry, deploy to Cloud Run
│   └── deploy-frontend.yml    # Build frontend with VITE_API_URL from vars, deploy to GitHub Pages
├── CNAME                       # Custom domain for Pages (e.g. suatrajetoria.com.br)
├── README.md
└── DOCUMENTATION.md            # This file
```

---

## 6. Backend in detail

- **Entry**: `server.js` loads `dotenv`, listens on `PORT` (default 3001), binds to `0.0.0.0` for Cloud Run.
- **CORS**: Allows origins for localhost (5173, 3000), GitHub Pages, and suatrajetoria.com.br (and variants).
- **Routes**:
  - `GET /health` → `{ status: 'OK', message: 'Backend rodando!' }`
  - `POST /api/reports/generate` → expects `userData`, `tests`, optional `lang` ('en' | 'pt'). Calls:
    1. `generateLifeRoadmap(userData, tests, lang)` → OpenAI returns JSON (vision, phases, habits, support, finalMessage).
    2. `generateCompleteReportNarrative(userData, tests, lang)` → OpenAI returns long narrative for PDF body.
    3. `generateCompletePDF(...)` → PDFKit generates PDF buffer.
    4. `generateReportNarrative(userData, tests, lang)` → OpenAI returns shorter narrative (e.g. for UI).
  - Response: JSON with `narrative`, `roadmap`, `pdfBase64`, `filename`, `mimeType`.

- **OpenAI**: All in `openaiService.js`. Uses `OPENAI_API_KEY`. Prompts are in EN/PT; outputs narrative text and structured roadmap JSON. Prompt logging can be written under `backend/logs/`.

---

## 7. Frontend in detail

- **Routing**: React Router; base path can be set via `VITE_BASE_PATH` (e.g. `/` for custom domain or `/Trajetoria/` for GitHub Pages repo path).
- **Data**: All assessment and anamnesis data in `localStorage`:
  - `completedTests`: `{ [testId]: { completed, completedAt, data, results? } }`.
  - Drafts: `draft_<testId>`.
- **Report flow**: `ReportDownloadSection` reads `completedTests`, builds `userData` from `anamnese-inicial` and `tests` from the other four keys, calls `generateCompleteReport(userData, tests, lang)`, then optionally composes PDF with `composeWithConclusion(...)` and triggers download.
- **API base URL**: `import.meta.env.VITE_API_URL` or fallback to Cloud Run URL in code.

---

## 8. Environment variables

### Backend

| Variable         | Required | Description |
|------------------|----------|-------------|
| `OPENAI_API_KEY` | Yes      | OpenAI API key for report generation. |
| `NODE_ENV`       | No       | e.g. `development` / `production`. |
| `PORT`           | No       | Server port (default `3001`). Cloud Run often uses `8080`. |

For **local** run you only need `OPENAI_API_KEY` (and optionally `NODE_ENV`, `PORT`). GCP keys are for **deployment** (GitHub Actions → Cloud Run), not for local execution.

### Frontend

| Variable         | Required | Description |
|------------------|----------|-------------|
| `VITE_API_URL`   | For local | Backend URL. **Local dev**: set to `http://localhost:3001` (e.g. in `.env` or `.env.development`). |
| `VITE_BASE_PATH` | No       | Base path for router and Vite (e.g. `'/'` for custom domain). |

- **Local**: Use `.env` or `.env.development` with `VITE_API_URL=http://localhost:3001`.
- **Production build**: Set in CI (e.g. GitHub Actions `vars.BACKEND_URL`) or in `.env.production` so the built app points to your Cloud Run backend.

---

## 9. Running locally

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev   # or npm start
   ```
   Server runs at `http://localhost:3001`. Ensure `OPENAI_API_KEY` is set in `backend/.env`.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs at `http://localhost:5173`. Ensure `VITE_API_URL=http://localhost:3001` in `frontend/.env` (or `.env.development`) so the app calls your local backend.

3. **Full flow**: Open the app → complete anamnesis and all four tests → use “Report” section to generate and download the PDF.

---

## 10. Deployment

- **Backend** (`.github/workflows/deploy-backend.yml`): On push to `main` affecting `backend/`, builds Docker image, pushes to Google Artifact Registry, deploys to Cloud Run. Uses secrets: `GCP_PROJECT_ID`, `GCP_SA_KEY`; Cloud Run secret `OPENAI_API_KEY`.
- **Frontend** (`.github/workflows/deploy-frontend.yml`): On push to `main` affecting `frontend/`, runs `npm run build` with `VITE_API_URL` from `vars.BACKEND_URL` (or fallback), uploads `frontend/dist` to GitHub Pages. Optional custom domain via root `CNAME`.

---

## 11. Design and brand

The project uses a consistent palette (see `.cursor/rules/brand-design.mdc`): primary purple tones (e.g. `#413288`, `#6152BD`, `#9266CC`, `#C8A1FF`) for buttons, links, and accents across the frontend.

---

## 12. Summary

| What                | Where / How |
|---------------------|-------------|
| User data           | Browser only (`localStorage`); no user DB on server. |
| Report generation   | Backend: OpenAI (narrative + roadmap) + PDFKit → JSON with base64 PDF. |
| Frontend PDF        | Optional composition (cover + backend PDF + conclusion) via pdf-lib. |
| Local run           | Backend: `OPENAI_API_KEY` in `.env`; Frontend: `VITE_API_URL=http://localhost:3001`. |
| Production backend  | Cloud Run; URL set in GitHub vars or frontend env. |
| Production frontend | GitHub Pages; optional CNAME for custom domain. |

For more detail on endpoints and request/response shapes, see `backend/README.md` and `frontend/README.md`.
