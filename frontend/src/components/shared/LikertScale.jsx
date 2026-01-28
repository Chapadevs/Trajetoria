import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * LikertScale - 5-point Likert scale for assessments
 */
export const LikertScale = ({ name, label, value, onChange, error }) => {
  const { t } = useTranslation()
  const options = [
    { value: '1', label: t('likertScale.option1') },
    { value: '2', label: t('likertScale.option2') },
    { value: '3', label: t('likertScale.option3') },
    { value: '4', label: t('likertScale.option4') },
    { value: '5', label: t('likertScale.option5') },
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

