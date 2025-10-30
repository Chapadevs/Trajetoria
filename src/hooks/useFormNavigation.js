import { useState } from 'react'

/**
 * Hook customizado para gerenciar navegação entre steps de formulários multi-etapas
 * @param {number} totalSteps - Número total de etapas do formulário
 * @returns {Object} Estado e funções de navegação
 */
export const useFormNavigation = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      // Marca a etapa atual como concluída
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return false
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return false
  }

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return false
  }

  const markStepAsCompleted = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }
  }

  const progress = (currentStep / totalSteps) * 100

  return {
    currentStep,
    completedSteps,
    progress,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    markStepAsCompleted,
    isLastStep: currentStep === totalSteps,
    isFirstStep: currentStep === 1
  }
}

