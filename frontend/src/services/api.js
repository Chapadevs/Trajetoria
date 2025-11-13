/**
 * Serviço de API para comunicação com o backend
 */

// URL do backend: Cloud Run em produção, localhost em desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://trajetoria-647906054947.us-central1.run.app'
    : 'http://localhost:3001');

/**
 * Solicita ao backend a geração completa do relatório (narrativa + PDF)
 * @param {Object} userData - Dados da anamnese inicial
 * @param {Object} tests - Objeto com todos os testes completados
 * @returns {Promise<{ narrative: string, pdfBase64: string, filename?: string, mimeType?: string }>}
 */
export async function generateCompleteReport(userData, tests) {
  try {
    const response = await fetch(`${API_URL}/api/reports/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userData,
        tests
      })
    });

    const contentType = response.headers.get('Content-Type') || '';

    if (!response.ok) {
      if (contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao gerar relatório');
      }
      throw new Error('Erro ao gerar relatório');
    }

    if (!contentType.includes('application/json')) {
      throw new Error('Resposta inesperada do servidor.');
    }

    const data = await response.json();

    if (!data?.pdfBase64 || !data?.narrative) {
      throw new Error('Dados incompletos recebidos do servidor.');
    }

    return {
      narrative: data.narrative,
      pdfBase64: data.pdfBase64,
      filename: data.filename,
      mimeType: data.mimeType,
    };
  } catch (error) {
    console.error('Erro ao gerar relatório completo:', error);
    throw error;
  }
}

/**
 * Verifica se o backend está online
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend não está disponível:', error);
    return false;
  }
}

