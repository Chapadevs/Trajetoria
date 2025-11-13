import React from 'react'
import heroVideo from '../../../assets/1106.mp4'

const HeroIntroSection = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      {/* Background Video with Blur */}
      <video 
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{
          filter: 'blur(3px)',
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-black leading-tight tracking-tighter text-white dark:text-white md:text-5xl lg:text-6xl md:mb-6 sm:mb-10">
            Descubra o seu caminho<br></br> Construa a sua trajetória.
          </h1>
          <h2 className="mx-auto max-w-3xl text-lg font-normal text-gray-300 dark:text-slate-300">
          A Trajetória conecta autoconhecimento, tecnologia e design para ajudar jovens a encontrarem propósito, direção e confiança em meio às mudanças do mundo contemporâneo.
          Por meio de testes de personalidade, trilhas de aprendizado e relatórios personalizados, você compreende suas forças, valores e habilidades — passo a passo.
          </h2>
        </div>
        
      </div>
    </section>
  )
}

export default HeroIntroSection