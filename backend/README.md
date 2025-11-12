# Backend - Trajetória

Backend para geração de relatórios PDF da plataforma Trajetória.

## Instalação

```bash
cd backend
npm install
```

## Execução

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

O servidor irá rodar na porta `3001` por padrão.

## Endpoints

### Health Check
```
GET /health
```

Verifica se o servidor está funcionando.

### Gerar Relatório PDF
```
POST /api/reports/generate
```

Gera um relatório PDF completo com todos os testes.

**Body:**
```json
{
  "userData": {
    "nomeCompleto": "João Silva",
    "idade": 25,
    "cidadeEstado": "São Paulo, SP",
    "email": "joao@email.com",
    "nivelEscolaridade": "Ensino Superior Completo",
    "areaEstudo": "Tecnologia",
    "situacaoProfissional": "Empregado",
    "ocupacaoAtual": "Desenvolvedor",
    "areasInteresse": ["Tecnologia", "Inovação"],
    "objetivosCarreira": ["Crescimento profissional"]
  },
  "tests": {
    "disc-insight": {
      "results": {
        "D": 30,
        "I": 25,
        "S": 20,
        "C": 25
      },
      "completedAt": "2024-01-01T10:00:00.000Z"
    },
    "multiple-intelligences": {
      "results": {
        "espacial": 80,
        "logica": 75,
        "linguistica": 70,
        "musical": 60,
        "corporal": 65,
        "interpessoal": 85,
        "intrapessoal": 90,
        "naturalista": 55
      },
      "completedAt": "2024-01-02T10:00:00.000Z"
    },
    "riasec": {
      "results": {
        "R": 70,
        "I": 80,
        "A": 75,
        "S": 85,
        "E": 65,
        "C": 60
      },
      "completedAt": "2024-01-03T10:00:00.000Z"
    }
  }
}
```

**Response:**
- Content-Type: `application/pdf`
- Retorna o arquivo PDF diretamente para download

## Tecnologias

- **Express**: Framework web
- **PDFKit**: Geração de PDFs
- **CORS**: Permitir requisições do frontend
- **Body Parser**: Parse de JSON

## Estrutura

```
backend/
├── routes/
│   └── reports.js          # Rotas de relatórios
├── services/
│   └── pdfGenerator.js     # Lógica de geração de PDF
├── utils/
│   └── pdfStyles.js        # Estilos e helpers do PDF
├── server.js               # Servidor principal
├── package.json
└── README.md
```

