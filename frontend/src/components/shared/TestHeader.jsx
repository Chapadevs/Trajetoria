import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Componente TestHeader - Cabeçalho comum para todos os testes
 */
export const TestHeader = ({
  testNumber,
  title,
  objective,
  currentStep,
  stepTitle,
  savedResults,
  onShowResults,
  icon = 'psychology',
  children
}) => {
  const { t, i18n } = useTranslation()

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : 'en-US')
    } catch {
      return ''
    }
  }

  return (
    <div className="flex flex-wrap justify-between gap-3 p-4 mt-6">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">{icon}</span>
          <span className="text-sm font-semibold uppercase tracking-wide">
            {testNumber}
          </span>
        </div>


        <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight mt-2">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed">
           <strong>{t('testHeader.objectiveLabel')}</strong> {objective}
        </p>
        

        {/* Badge de teste já concluído */}
        {savedResults && (
          <div className="mt-2 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {t('testHeader.completedBadge', { date: formatDate(savedResults.completedAt) })}
            </span>
          </div>
        )}

        {savedResults && onShowResults && (
          <button
            onClick={onShowResults}
            className="mt-2 inline-flex items-center gap-2 self-start rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg"
            type="button"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>{t('testHeader.viewSavedResults')}</span>
          </button>
        )}
        
        {/* Indicador de etapa atual */}
        {stepTitle && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
            <span className="material-symbols-outlined text-primary">arrow_forward</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {t('testHeader.stepLabel', { current: currentStep, title: stepTitle })}
            </span>
          </div>
        )}
        
        {/* Conteúdo adicional (ex: info boxes) */}
        {children}
      </div>
    </div>
  )
}

