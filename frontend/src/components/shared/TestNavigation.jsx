import React from 'react'

/**
 * Componente TestNavigation - Navegação comum para todos os testes
 */
export const TestNavigation = ({
  currentStep,
  totalSteps,
  completedSteps,
  onPrevious,
  onNext,
  onSaveDraft,
  onSubmit,
  isLastStep,
  isFirstStep,
  stepTitles = {}
}) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 mt-8 border-t border-slate-200 dark:border-slate-800">
      {/* Progress Info */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {completedSteps.length} de {totalSteps} etapas concluídas
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Responda com sinceridade. Não há respostas certas ou erradas.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {/* Salvar Rascunho */}
          {onSaveDraft && (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-300 dark:border-slate-700"
              type="button"
              onClick={onSaveDraft}
            >
              <span className="material-symbols-outlined text-base">save</span>
            </button>
          )}

          {/* Próximo ou Enviar */}
          {!isLastStep ? (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 transition-all"
              type="button"
              onClick={onNext}
            >
              <span className="truncate">Próxima Etapa</span>
              <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
            </button>
          ) : (
            <button
              className={`flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 text-white text-sm font-bold transition-all ${
                completedSteps.length === totalSteps - 1
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500/30'
                  : 'bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/30'
              }`}
              type="submit"
            >
              <span className="material-symbols-outlined mr-2 text-base">send</span>
              <span className="truncate">Enviar Teste</span>
            </button>
          )}
        </div>

        {/* Voltar */}
        {!isFirstStep && (
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            type="button"
            onClick={onPrevious}
          >
            <span className="material-symbols-outlined mr-2 text-base">arrow_back</span>
            <span className="truncate">Voltar</span>
          </button>
        )}
      </div>

    </div>
  )
}

