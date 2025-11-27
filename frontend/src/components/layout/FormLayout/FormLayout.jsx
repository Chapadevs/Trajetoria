import React from 'react'
import { Link } from 'react-router-dom'
import trajetoriaIcon from '../../../assets/icone-trajetoria.svg'

const FormLayout = ({ children, currentStep = 1, totalSteps = 3, progress = 33 }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 px-4 sm:px-10 py-2">
        <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          <img src={trajetoriaIcon} alt="Trajetória" className="h-12 w-12 flex-shrink-0" />
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-none flex items-center">Trajetória</h2>
        </Link>
        <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
          Voltar ao site
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="flex flex-col gap-3 p-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Etapa {currentStep} de {totalSteps}
            </p>
            <div className="rounded bg-slate-200 dark:bg-slate-800">
              <div 
                className="h-2 rounded bg-primary transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </main>
    </div>
  )
}

export default FormLayout



