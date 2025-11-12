import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AssessmentCard = ({ icon, category, title, description, badge, badgeColor, formUrl, testId, onViewResults }) => {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Verifica se o teste foi concluído
    const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    if (testId && completedTests[testId]?.completed) {
      setIsCompleted(true)
    }
  }, [testId])

  const handleViewResultsClick = (event) => {
    event?.preventDefault()
    event?.stopPropagation()
    if (onViewResults) {
      onViewResults(event)
    }
  }

  return (
    <div
      className={`group flex min-h-[320px] max-w-[350px] flex-col overflow-hidden rounded-3xl border-2 transition-all shadow-[0_12px_30px_-15px_rgba(118,87,255,0.45)]
        ${isCompleted
          ? 'border-[#C8A1FF] bg-gradient-to-br from-white via-white to-[#f6f0ff] dark:from-[#201a3f] dark:via-[#1a1435] dark:to-[#211744]'
          : 'border-slate-200 bg-white dark:bg-slate-900/40 dark:border-slate-700'
        }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex size-12 items-center justify-center rounded-2xl shadow-sm ${
                isCompleted ? 'bg-[#6152BD] text-white' : 'bg-primary/10 text-primary'
              }`}
            >
              <span className="material-symbols-outlined">
                {isCompleted ? 'check' : icon}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#6152BD] dark:text-[#C8A1FF] uppercase tracking-wide">
                {category}
              </p>
              <h3 className="mt-1 text-lg font-black leading-tight text-slate-900 dark:text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>

      <div
        className={`mt-auto flex items-center justify-between gap-3 px-6 py-4 border-t ${
          isCompleted
            ? 'border-[#C8A1FF]/50 bg-[#F8F4FF] dark:bg-[#1d1538]'
            : 'border-slate-200 bg-slate-50 dark:bg-slate-800/40 dark:border-slate-700/60'
        }`}
      >
        {isCompleted ? (
          <button
            type="button"
            onClick={handleViewResultsClick}
            className="flex items-center gap-2 text-sm font-semibold text-[#6152BD] dark:text-[#C8A1FF] hover:text-[#413288] dark:hover:text-white transition-colors"
          >
            <span className="truncate">Ver Resultados</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        ) : (
          <Link
            to={formUrl || '#'}
            className="flex items-center gap-2 text-sm font-semibold text-[#6152BD] dark:text-[#C8A1FF] hover:text-[#413288] dark:hover:text-white transition-colors"
          >
            <span className="truncate">Iniciar Teste</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </Link>
        )}

        {isCompleted && (
          <Link
            to={formUrl || '#'}
            className="flex size-10 items-center justify-center rounded-full border border-[#9266CC]/40 text-[#6152BD] dark:text-[#C8A1FF] hover:bg-[#9266CC]/10 dark:hover:bg-[#6152BD]/30 transition-colors"
            title="Refazer teste"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default AssessmentCard