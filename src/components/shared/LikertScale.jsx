import React from 'react'

/**
 * Componente LikertScale - Escala Likert de 5 pontos para avaliação
 */
export const LikertScale = ({ name, label, value, onChange, error }) => {
  const options = [
    { value: '1', label: 'Discordo totalmente' },
    { value: '2', label: 'Discordo' },
    { value: '3', label: 'Neutro' },
    { value: '4', label: 'Concordo' },
    { value: '5', label: 'Concordo totalmente' }
  ]

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-900 dark:text-white">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
              value === option.value
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
            } ${error ? 'border-red-500' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only"
            />
            <span className="text-xs sm:text-sm text-center text-slate-700 dark:text-slate-300 font-medium">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}

