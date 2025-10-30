/**
 * Utilitários para gerenciar localStorage
 */

const COMPLETED_TESTS_KEY = 'completedTests'

/**
 * Obtém todos os testes completados
 * @returns {Object} Objeto com todos os testes completados
 */
export const getCompletedTests = () => {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_TESTS_KEY) || '{}')
  } catch (error) {
    console.error('Erro ao ler testes completados:', error)
    return {}
  }
}

/**
 * Obtém resultados de um teste específico
 * @param {string} testId - ID do teste
 * @returns {Object|null} Dados do teste ou null se não encontrado
 */
export const getTestResults = (testId) => {
  const tests = getCompletedTests()
  return tests[testId] || null
}

/**
 * Salva resultados de um teste
 * @param {string} testId - ID do teste
 * @param {Object} data - Dados do formulário
 * @param {Object} results - Resultados calculados (opcional)
 * @returns {boolean} True se salvou com sucesso
 */
export const saveTestResults = (testId, data, results = null) => {
  try {
    const tests = getCompletedTests()
    tests[testId] = {
      completed: true,
      completedAt: new Date().toISOString(),
      data: data,
      ...(results && { results })
    }
    localStorage.setItem(COMPLETED_TESTS_KEY, JSON.stringify(tests))
    return true
  } catch (error) {
    console.error('Erro ao salvar resultados:', error)
    return false
  }
}

/**
 * Remove resultados de um teste
 * @param {string} testId - ID do teste
 * @returns {boolean} True se removeu com sucesso
 */
export const clearTestResults = (testId) => {
  try {
    const tests = getCompletedTests()
    delete tests[testId]
    localStorage.setItem(COMPLETED_TESTS_KEY, JSON.stringify(tests))
    return true
  } catch (error) {
    console.error('Erro ao limpar resultados:', error)
    return false
  }
}

/**
 * Verifica se um teste foi completado
 * @param {string} testId - ID do teste
 * @returns {boolean} True se o teste foi completado
 */
export const isTestCompleted = (testId) => {
  const result = getTestResults(testId)
  return result !== null && result.completed === true
}

/**
 * Obtém data de conclusão de um teste
 * @param {string} testId - ID do teste
 * @returns {Date|null} Data de conclusão ou null
 */
export const getTestCompletionDate = (testId) => {
  const result = getTestResults(testId)
  if (result && result.completedAt) {
    return new Date(result.completedAt)
  }
  return null
}

/**
 * Salva rascunho de um formulário
 * @param {string} testId - ID do teste
 * @param {Object} draftData - Dados do rascunho
 * @returns {boolean} True se salvou com sucesso
 */
export const saveDraft = (testId, draftData) => {
  try {
    const draftKey = `draft_${testId}`
    const draft = {
      savedAt: new Date().toISOString(),
      data: draftData
    }
    localStorage.setItem(draftKey, JSON.stringify(draft))
    return true
  } catch (error) {
    console.error('Erro ao salvar rascunho:', error)
    return false
  }
}

/**
 * Obtém rascunho de um formulário
 * @param {string} testId - ID do teste
 * @returns {Object|null} Dados do rascunho ou null
 */
export const getDraft = (testId) => {
  try {
    const draftKey = `draft_${testId}`
    const draft = localStorage.getItem(draftKey)
    return draft ? JSON.parse(draft) : null
  } catch (error) {
    console.error('Erro ao ler rascunho:', error)
    return null
  }
}

/**
 * Remove rascunho de um formulário
 * @param {string} testId - ID do teste
 * @returns {boolean} True se removeu com sucesso
 */
export const clearDraft = (testId) => {
  try {
    const draftKey = `draft_${testId}`
    localStorage.removeItem(draftKey)
    return true
  } catch (error) {
    console.error('Erro ao limpar rascunho:', error)
    return false
  }
}

