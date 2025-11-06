import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#9266CC]/30 bg-[#6152BD]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Trajetória" className="w-52 pt-3" />
        </div>
        
        <nav className="flex items-center gap-8">
          <a 
            className="text-sm font-medium text-white/90 hover:text-[#C8A1FF] transition-colors" 
            href="#"
          >
            Sobre o Estudo
          </a>
          <a 
            className="text-sm font-medium text-white/90 hover:text-[#C8A1FF] transition-colors" 
            href="#"
          >
            Participação
          </a>
          <a 
            className="text-sm font-medium text-white/90 hover:text-[#C8A1FF] transition-colors" 
            href="#"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header

