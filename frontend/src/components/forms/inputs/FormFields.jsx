import React from 'react'

// Text Input Component
export const TextInput = ({ 
  label, 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  ...props 
}) => {
  return (
    <div className="flex flex-col">
      <label 
        className="text-slate-900 dark:text-white text-base font-medium pb-2" 
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 ${
          error 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-slate-300 dark:border-slate-700'
        } bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

// Select Input Component
export const SelectInput = ({ 
  label, 
  id, 
  options = [], 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = "Select an option",
  ...props 
}) => {
  return (
    <div className="flex flex-col">
      <label 
        className="text-slate-900 dark:text-white text-base font-medium pb-2" 
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 ${
          error 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-slate-300 dark:border-slate-700'
        } bg-white dark:bg-slate-800 h-12 px-4 text-base font-normal`}
        id={id}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

// Textarea Component
export const TextArea = ({ 
  label, 
  id, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  rows = 5,
  ...props 
}) => {
  return (
    <div className="flex flex-col">
      <label 
        className="text-slate-900 dark:text-white text-base font-medium pb-2" 
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        className={`form-textarea w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 ${
          error 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-slate-300 dark:border-slate-700'
        } bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

// File Upload Component
export const FileUpload = ({ 
  label, 
  id, 
  onChange, 
  error, 
  accept = "image/*,.pdf",
  maxSize = "10MB",
  ...props 
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-slate-900 dark:text-white text-base font-medium pb-2">
          {label}
        </label>
      )}
      <div className="flex items-center justify-center w-full">
        <label 
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
            error 
              ? 'border-red-500 dark:border-red-500' 
              : 'border-slate-300 dark:border-slate-700'
          }`}
          htmlFor={id}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <span className="material-symbols-outlined text-slate-400 text-4xl mb-3">
              cloud_upload
            </span>
            <p className="mb-2 text-sm text-center text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {accept.includes('image') ? 'Imagens' : 'Arquivos'} (MÁX. {maxSize})
            </p>
          </div>
          <input 
            className="hidden" 
            id={id} 
            type="file" 
            onChange={onChange}
            accept={accept}
            {...props}
          />
        </label>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

// Form Section Component
export const FormSection = ({
  title,
  subtitle,
  children,
  showHeader = true
}) => {
  return (
    <section className="flex flex-col gap-10">
      {showHeader && (title || subtitle) && (
        <div className="flex flex-col gap-2 px-4 pt-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          {title && (
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 px-4">
        {children}
      </div>
    </section>
  )
}

// Full Width Form Section Item (for items that should span both columns)
export const FullWidthItem = ({ children }) => {
  return <div className="sm:col-span-2">{children}</div>
}



