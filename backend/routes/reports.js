import express from 'express';
import { generateCompletePDF } from '../services/pdfGenerator.js';
import { generateReportNarrative, generateLifeRoadmap, generateCompleteReportNarrative } from '../services/openaiService.js';

const router = express.Router();

/**
 * POST /api/reports/generate
 * Gera um relatório PDF completo com todos os testes
 * 
 * Body: {
 *   userData: { ... },  // Dados da anamnese
 *   tests: {
 *     'disc-insight': { results, completedAt },
 *     'multiple-intelligences': { results, completedAt },
 *     'riasec': { results, completedAt },
 *     'archetypes': { results, completedAt }
 *   }
 * }
 */
router.post('/generate', async (req, res) => {
  try {
    const { userData, tests, lang } = req.body;
    const reportLang = lang === 'pt' ? 'pt' : 'en';

    if (!userData || !tests) {
      return res.status(400).json({
        error: reportLang === 'en' ? 'Invalid data' : 'Dados inválidos',
        message: reportLang === 'en' ? 'userData and tests are required' : 'É necessário enviar userData e tests',
      });
    }

    const roadmap = await generateLifeRoadmap(userData, tests, reportLang);
    const completeNarrative = await generateCompleteReportNarrative(userData, tests, reportLang);
    const pdfBuffer = await generateCompletePDF(userData, tests, roadmap, completeNarrative, reportLang);
    const narrative = await generateReportNarrative(userData, tests, reportLang);

    res.json({
      narrative,
      roadmap,
      pdfBase64: pdfBuffer.toString('base64'),
      filename: `relatorio-completo-${Date.now()}.pdf`,
      mimeType: 'application/pdf',
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    const reportLang = req.body?.lang === 'pt' ? 'pt' : 'en';
    res.status(500).json({
      error: reportLang === 'en' ? 'Error generating report' : 'Erro ao gerar relatório',
      message: error.message,
    });
  }
});

/**
 * GET /api/reports/test
 * Rota de teste para verificar se o servidor está funcionando
 */
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Rota de relatórios funcionando!',
    endpoints: {
      generate: 'POST /api/reports/generate'
    }
  });
});

export default router;

