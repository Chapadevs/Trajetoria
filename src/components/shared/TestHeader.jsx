import React from 'react'

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
  return (
    <div className="flex flex-wrap justify-between gap-3 p-4 mt-6">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-sm font-semibold uppercase tracking-wide">
              {testNumber}
            </span>
          </div>
          
          {/* Botão Ver Resultados Salvos */}
          {savedResults && (
            <button
              onClick={onShowResults}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              type="button"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>Ver Resultados Salvos</span>
            </button>
          )}
        </div>
        
        <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed">
          🎯 <strong>Objetivo:</strong> {objective}
        </p>
        
        {/* Badge de teste já concluído */}
        {savedResults && (
          <div className="mt-2 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Você já completou este teste em {new Date(savedResults.completedAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}
        
        {/* Indicador de etapa atual */}
        {stepTitle && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
            <span className="material-symbols-outlined text-primary">arrow_forward</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Etapa {currentStep}: {stepTitle}
            </span>
          </div>
        )}
        
        {/* Conteúdo adicional (ex: info boxes) */}
        {children}
      </div>
    </div>
  )
}

