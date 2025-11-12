import React from 'react'

const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="text-primary size-5">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path 
                clipRule="evenodd" 
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" 
                fill="currentColor" 
                fillRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © 2025 Trajetória. Todos os direitos reservados.
          </p>
        </div>
        
      </div>
    </footer>
  )
}

export default SiteFooter