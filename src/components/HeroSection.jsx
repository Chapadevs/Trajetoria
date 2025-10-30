import React from 'react'
import heroBg from '../assets/hero-bg.jpg'

const HeroSection = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-white/70 dark:bg-slate-900/70" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Avançando a Pesquisa em Saúde Mental
          </h1>
          <h2 className="mx-auto max-w-3xl text-lg font-normal text-slate-600 dark:text-slate-300">
            Participe do nosso estudo de pesquisa psiquiátrica e contribua para uma melhor compreensão da saúde mental. Sua participação ajuda a avançar o conhecimento científico e melhorar as abordagens de tratamento.
          </h2>
        </div>
        
      </div>
    </section>
  )
}

export default HeroSection

