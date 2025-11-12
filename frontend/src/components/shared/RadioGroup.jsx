import React from 'react'

/**
 * Componente RadioGroup - grupo de opções de rádio customizadas
 */
export const RadioGroup = ({ label, id, options, value, onChange, error, required = false }) => {
  const handleRadioChange = (optionValue) => {
    const syntheticEvent = {
      target: {
        id: id,
        value: optionValue
      }
    }
    onChange(syntheticEvent)
  }

  return (
    <div className="flex flex-col">
      <label className="text-slate-900 dark:text-white text-base font-medium pb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <label 
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              value === option
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-slate-800'
            }`}
          >
            <input
              type="radio"
              name={id}
              checked={value === option}
              onChange={() => handleRadioChange(option)}
              className="w-4 h-4 text-primary bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-slate-900 dark:text-white">
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

/**
 * Componente RadioOption - opção individual de rádio para questões de teste
 */
export const RadioOption = ({ name, value, label, checked, onChange, error }) => (
  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
    checked
      ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-md'
      : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-slate-800'
  } ${error ? 'border-red-500' : ''}`}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="mt-1 size-4 text-primary border-slate-300 focus:ring-primary focus:ring-2"
    />
    <div className="flex-1">
      <span className="text-sm font-medium text-slate-900 dark:text-white block">
        {label}
      </span>
    </div>
  </label>
)

/**
 * Componente QuestionBlock - bloco de questão com múltiplas opções
 */
export const QuestionBlock = ({ number, question, options, name, value, onChange, error }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-start gap-3">
      <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
        {number}
      </span>
      <h4 className="text-base font-semibold text-slate-900 dark:text-white mt-1">
        {question}
      </h4>
    </div>
    <div className="flex flex-col gap-3 ml-11">
      {options.map((option, index) => (
        <RadioOption
          key={index}
          name={name}
          value={index.toString()}
          label={option}
          checked={value === index.toString()}
          onChange={onChange}
          error={error}
        />
      ))}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  </div>
)

