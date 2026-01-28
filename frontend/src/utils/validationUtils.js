/**
 * Utilitários para validação de formulários
 */

/**
 * Valida endereço de e-mail
 * @param {string} email - E-mail a ser validado
 * @returns {boolean} True se o e-mail é válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida se um campo está vazio
 * @param {string} value - Valor do campo
 * @returns {boolean} True se o campo não está vazio
 */
export const validateRequired = (value) => {
  return value && value.toString().trim() !== ''
}

/**
 * Valida se um array tem ao menos um item
 * @param {Array} array - Array a ser validado
 * @returns {boolean} True se o array tem itens
 */
export const validateArrayNotEmpty = (array) => {
  return Array.isArray(array) && array.length > 0
}

/**
 * Valida telefone brasileiro
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} True se o telefone é válido
 */
export const validatePhone = (phone) => {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '')
  // Valida se tem 10 ou 11 dígitos (com DDD)
  return cleaned.length >= 10 && cleaned.length <= 11
}

/**
 * Valida idade
 * @param {number|string} age - Idade a ser validada
 * @param {number} min - Idade mínima (padrão: 14)
 * @param {number} max - Idade máxima (padrão: 120)
 * @returns {boolean} True se a idade é válida
 */
export const validateAge = (age, min = 14, max = 120) => {
  const numAge = parseInt(age)
  return !isNaN(numAge) && numAge >= min && numAge <= max
}

/**
* Cria mensagem de erro padrão (usando i18n)
* @param {string} fieldName - Nome do campo
* @param {string} type - Tipo de erro
* @returns {string} Mensagem de erro
*/
import i18n from '../i18n'

export const getErrorMessage = (fieldName, type = 'required') => {
  return i18n.t(`validation.${type}`, { fieldName })
}

