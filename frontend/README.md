# FormDesign Co. - Beautiful Data Collection

A modern, responsive web application built with React, Vite, and Tailwind CSS for collecting user information through beautiful forms.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom theme
- **Routing**: React Router DOM
- **Icons**: Material Symbols
- **Fonts**: Manrope (Google Fonts)

## Features

- ✨ Modern and clean UI design
- 🌓 Dark mode support
- 📱 Fully responsive layout
- 🎨 Custom color scheme with primary brand color
- 🚀 Fast development with Vite HMR
- 📋 Pre-built form templates

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── HeroSection.jsx
│   │   ├── TemplatesSection.jsx
│   │   ├── FormCard.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── LandingPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Available Form Templates

1. **Client Onboarding Survey** - Gather information from new clients
2. **User Feedback Survey** - Collect valuable product feedback
3. **New Project Intake** - Standardize project proposals

## Backend Integration

This project now includes a backend for PDF report generation!

### Running the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Full Stack Setup

To run both frontend and backend:

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```

### Generating PDF Reports

Once you complete tests on the platform, you can download a complete PDF report with all your results. The report includes:
- Anamnese Inicial
- DISC Insight Profile
- Multiple Intelligences Analysis
- RIASEC Career Orientation
- Personality Archetypes
- Personalized Recommendations

## Environment Variables

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3001
```

## Next Steps

- Integrate MongoDB for data storage
- Add authentication and user management
- Implement email delivery for reports
- Add more test types

## License

All rights reserved © 2024 FormDesign Co.

