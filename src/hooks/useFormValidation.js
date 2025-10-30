import { useState } from 'react'

/**
 * Hook customizado para gerenciar validação de formulários
 * @returns {Object} Estado de erros e funções de validação
 */
export const useFormValidation = () => {
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const setFieldError = (fieldName, errorMessage) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }))
  }

  const clearFieldError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  const clearAllErrors = () => {
    setErrors({})
  }

  const setMultipleErrors = (errorObject) => {
    setErrors(errorObject)
  }

  const hasErrors = () => {
    return Object.keys(errors).length > 0
  }

  const getFieldError = (fieldName) => {
    return errors[fieldName]
  }

  return {
    errors,
    validateEmail,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setMultipleErrors,
    hasErrors,
    getFieldError
  }
}

