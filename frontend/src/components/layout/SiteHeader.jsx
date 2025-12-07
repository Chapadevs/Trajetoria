import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useTheme } from '../../hooks/useTheme'

const SiteHeader = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#9266CC]/30 bg-[#6152BD]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#6152BD]"
        >
          <img src={logo} alt="Trajetória" className="w-40 sm:w-52 pt-3" />
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] sm:tracking-[0.3em] text-white transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#6152BD] ${
                isActive ? 'text-white' : 'text-white/90'
              }`
            }
          >
            Sobre o Projeto
          </NavLink>
          
          {/* Botão de Toggle de Tema */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#6152BD]"
            aria-label={isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
            title={isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
          >
            <span className="material-symbols-outlined text-white text-xl">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader