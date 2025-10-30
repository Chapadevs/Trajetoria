import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ResultsModal from './ResultsModal'

const FormCard = ({ icon, category, title, description, badge, badgeColor, formUrl, testId }) => {
  const [isCompleted, setIsCompleted] = useState(false)
  const [testData, setTestData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Verifica se o teste foi concluído
    const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    if (testId && completedTests[testId]?.completed) {
      setIsCompleted(true)
      setTestData(completedTests[testId])
    }
  }, [testId])

  const getBadgeClasses = (color) => {
    const colorMap = {
      green: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
    }
    return colorMap[color] || colorMap.green
  }

  const getCategoryColor = (category) => {
    return category === 'Client-Facing' ? 'text-primary' : 'text-blue-500'
  }

  return (
    <div className={`group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800/50 shadow-sm transition-all hover:shadow-lg dark:shadow-slate-950 ${
      isCompleted ? 'ring-2 ring-green-500' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex size-12 items-center justify-center rounded-lg ${
            isCompleted ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'
          }`}>
            <span className="material-symbols-outlined">
              {isCompleted ? 'check_circle' : icon}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-medium ${getCategoryColor(category)}`}>
                {category}
              </p>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                  <span className="material-symbols-outlined text-xs">check</span>
                  Concluído
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
      
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800 p-4">
        {isCompleted ? (
          <>
            {/* Botão Ver Resultados */}
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-10 px-4 text-sm font-bold bg-green-500 text-white hover:bg-green-600 transition-all shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span className="truncate">Ver Resultados</span>
            </button>
            
            {/* Botão Refazer */}
            <Link 
              to={formUrl || '#'} 
              className="flex items-center justify-center rounded-lg h-10 px-4 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Refazer teste"
            >
              <span className="material-symbols-outlined">refresh</span>
            </Link>
          </>
        ) : (
          <Link 
            to={formUrl || '#'} 
            className="flex-1 flex items-center justify-center rounded-lg h-10 px-4 text-sm font-bold text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
          >
            <span className="truncate">Ver Formulário</span>
            <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
          </Link>
        )}
      </div>

      {/* Modal de Resultados */}
      {isCompleted && (
        <ResultsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          testId={testId}
          testData={testData}
        />
      )}
    </div>
  )
}

export default FormCard

