import React from 'react'
import { useTranslation } from 'react-i18next'
import heroImage from '../../../assets/hero-bg.png'

const HeroIntroSection = () => {
  const { t } = useTranslation()

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Blur */}
      <img 
        src={heroImage}
        alt="Trajetória - hero background"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{
          filter: 'blur(3px)',
        }}
      />
      
      {/* Overlay para melhorar legibilidade do texto */}
      <div className="absolute inset-0 z-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-black leading-tight tracking-tighter text-white dark:text-white md:text-5xl lg:text-6xl md:mb-6 sm:mb-10">
            {t('hero.titleLine1')}
            <br />
            {t('hero.titleLine2')}
          </h1>
          <h2 className="mx-auto max-w-3xl text-lg font-normal text-gray-300 dark:text-slate-300">
            {t('hero.description')}
            <br />
            {t('hero.description2')}
          </h2>
        </div>
      </div>
    </section>
  )
}

export default HeroIntroSection