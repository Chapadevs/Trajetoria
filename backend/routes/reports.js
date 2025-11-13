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
    const { userData, tests } = req.body;

    if (!userData || !tests) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        message: 'É necessário enviar userData e tests' 
      });
    }

    const roadmap = await generateLifeRoadmap(userData, tests);
    const completeNarrative = await generateCompleteReportNarrative(userData, tests);
    const pdfBuffer = await generateCompletePDF(userData, tests, roadmap, completeNarrative);
    const narrative = await generateReportNarrative(userData, tests);

    // Retorna narrativa e PDF (Base64) para o frontend decidir como usar
    res.json({
      narrative,
      roadmap,
      pdfBase64: pdfBuffer.toString('base64'),
      filename: `relatorio-completo-${Date.now()}.pdf`,
      mimeType: 'application/pdf',
    });

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ 
      error: 'Erro ao gerar relatório', 
      message: error.message 
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

