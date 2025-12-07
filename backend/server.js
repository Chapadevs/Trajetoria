import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import reportsRouter from './routes/reports.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy para Google Cloud Run
app.set('trust proxy', true);

// CORS - Configuração para aceitar GitHub Pages, localhost e domínio customizado
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://chapadevs.github.io',
  'https://Erik-Mfa.github.io',
  'https://suatrajetoria.com.br',
  'http://suatrajetoria.com.br', // HTTP fallback (deve redirecionar para HTTPS)
  'https://www.suatrajetoria.com.br',
  'http://www.suatrajetoria.com.br', // HTTP fallback
];

app.use(cors({
  origin: function(origin, callback) {
    // Permite requisições sem origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    // Verifica se está na lista de origens permitidas
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Permite qualquer subdomínio .github.io
    if (origin.endsWith('.github.io')) {
      return callback(null, true);
    }
    
    // Permite domínio customizado e seus subdomínios
    if (origin.includes('suatrajetoria.com.br')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Rotas
app.use('/api/reports', reportsRouter);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend rodando!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!', 
    message: err.message 
  });
});

// Para Cloud Run, é necessário escutar em 0.0.0.0 (todas as interfaces)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Acesse http://0.0.0.0:${PORT}/health para verificar o status`);
  console.log(`🔑 OpenAI API Key configurada: ${process.env.OPENAI_API_KEY ? 'Sim' : 'Não'}`);
});

