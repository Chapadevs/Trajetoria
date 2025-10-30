import React from 'react'

/**
 * Componente para seleção múltipla com checkbox
 */
export const MultiSelectCheckbox = ({ 
  label, 
  id, 
  options, 
  value = [], 
  onChange, 
  maxSelections, 
  error, 
  required = false 
}) => {
  const handleCheckboxChange = (optionValue) => {
    let newValue = [...value]
    if (newValue.includes(optionValue)) {
      newValue = newValue.filter(v => v !== optionValue)
    } else {
      if (!maxSelections || newValue.length < maxSelections) {
        newValue.push(optionValue)
      } else {
        // Se atingir o máximo, não adiciona
        return
      }
    }
    
    // Cria um evento sintético para manter compatibilidade com handleInputChange
    const syntheticEvent = {
      target: {
        id: id,
        value: newValue
      }
    }
    onChange(syntheticEvent)
  }

  return (
    <div className="flex flex-col">
      <label className="text-slate-900 dark:text-white text-base font-medium pb-2">
        {label} {required && <span className="text-red-500">*</span>}
        {maxSelections && (
          <span className="text-slate-500 dark:text-slate-400 text-sm font-normal ml-2">
            (selecione até {maxSelections})
          </span>
        )}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <label 
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              value.includes(option)
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-slate-800'
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 text-primary bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-slate-900 dark:text-white">
              {option}
            </span>
          </label>
        ))}
      </div>
      {maxSelections && value.length > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {value.length} de {maxSelections} selecionado(s)
        </p>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

