import { useState, useEffect } from 'react'

/**
 * Hook customizado para gerenciar resultados de testes salvos no localStorage
 * @param {string} testId - ID único do teste
 * @returns {Object} Resultados salvos e funções para gerenciá-los
 */
export const useTestResults = (testId) => {
  const [savedResults, setSavedResults] = useState(null)
  const [showResultsModal, setShowResultsModal] = useState(false)

  // Carrega resultados salvos do localStorage
  useEffect(() => {
    const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    if (completedTests[testId]) {
      setSavedResults(completedTests[testId])
    }
  }, [testId])

  // Salva resultados no localStorage
  const saveResults = (data, results = null) => {
    const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    completedTests[testId] = {
      completed: true,
      completedAt: new Date().toISOString(),
      data: data,
      ...(results && { results })
    }
    localStorage.setItem('completedTests', JSON.stringify(completedTests))
    setSavedResults(completedTests[testId])
  }

  // Limpa resultados salvos
  const clearResults = () => {
    const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    delete completedTests[testId]
    localStorage.setItem('completedTests', JSON.stringify(completedTests))
    setSavedResults(null)
  }

  return {
    savedResults,
    showResultsModal,
    setShowResultsModal,
    saveResults,
    clearResults,
    hasResults: savedResults !== null
  }
}

