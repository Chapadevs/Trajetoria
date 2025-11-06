import React, { useState, useEffect, useRef } from 'react'
import FormCard from './FormCard'

const TemplatesSection = () => {
  const [completedTests, setCompletedTests] = useState({})
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    // Carrega os testes concluídos do localStorage
    const tests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    setCompletedTests(tests)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const formTemplates = [
    {
      icon: 'person_add',
      category: 'Avaliação Inicial',
      title: 'Anamnese Pro',
      description: 'Histórico psiquiátrico abrangente e questionário de triagem inicial para participantes do estudo.',
      badgeColor: 'green',
      formUrl: '/forms/anamnese-inicial',
      testId: 'anamnese-inicial'
    },
    {
      icon: 'feedback',
      category: 'Avaliação Comportamental',
      title: 'Disc Insight',
      description: 'Ferramenta de avaliação de personalidade e padrões comportamentais para pesquisa psiquiátrica.',
      badgeColor: 'yellow',
      formUrl: '/forms/disc-personality',
      testId: 'disc-insight'
    },
    {
      icon: 'psychology',
      category: 'Múltiplas Inteligências',
      title: 'Inteligências de Gardner',
      description: 'Descubra suas inteligências dominantes baseado na teoria de Howard Gardner. 8 tipos de inteligência avaliados.',
      badgeColor: 'green',
      formUrl: '/forms/multiple-intelligences',
      testId: 'multiple-intelligences'
    },
    {
      icon: 'work',
      category: 'Orientação Profissional',
      title: 'RIASEC - Teste de Holland',
      description: 'Identifique seu perfil profissional através do modelo RIASEC. Descubra as carreiras ideais para você.',
      badgeColor: 'yellow',
      formUrl: '/forms/riasec',
      testId: 'riasec'
    },
    {
      icon: 'stars',
      category: 'Personalidade',
      title: 'Arquétipos de Jung',
      description: 'Descubra seus arquétipos dominantes baseado na teoria de Carl Jung. 12 arquétipos universais avaliados.',
      badgeColor: 'green',
      formUrl: '/forms/archetypes',
      testId: 'archetypes'
    }
  ]

  const isTestCompleted = (testId) => {
    return !!completedTests[testId]
  }

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900/50 py-20 lg:py-24">
      <div className="container mx-auto max-w-[95%] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Sua Trajetória de Avaliação
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Complete as seguintes avaliações em sequência como parte de sua participação em nosso estudo.
          </p>
        </div>
        
        {/* Horizontal Journey Path */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-slate-800 text-primary hover:bg-primary hover:text-white rounded-full p-3 shadow-2xl transition-all hover:scale-110 border-2 border-primary"
              aria-label="Scroll Left"
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-slate-800 text-primary hover:bg-primary hover:text-white rounded-full p-3 shadow-2xl transition-all hover:scale-110 border-2 border-primary"
              aria-label="Scroll Right"
            >
              <span className="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex items-center gap-0 min-w-max px-4">
            {formTemplates.map((template, index) => (
              <React.Fragment key={index}>
                {/* Card Container */}
                <div className="relative flex flex-col items-center" style={{ width: '320px' }}>
                  {/* Step Number Badge */}
                  <div className={`mb-4 flex items-center justify-center size-10 rounded-full border-4 ${
                    isTestCompleted(template.testId)
                      ? 'bg-green-500 border-green-300 dark:border-green-700'
                      : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                  } z-10 transition-all duration-300 shadow-md`}>
                    {isTestCompleted(template.testId) ? (
                      <span className="material-symbols-outlined text-white text-lg">check</span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-300 font-bold text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Card */}
                  <div className="w-full relative">
                    <FormCard {...template} />
                    
                    {/* Connection Dots on Card Border */}
                    {index > 0 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 z-20"></div>
                    )}
                    {index < formTemplates.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 z-20"></div>
                    )}
                  </div>

                  {/* Completion Status */}
                  {isTestCompleted(template.testId) && (
                    <div className="mt-3 flex items-center gap-1.5 text-green-600 dark:text-green-400">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span className="text-xs font-semibold">Concluído</span>
                    </div>
                  )}
                </div>

                {/* Connection Line Between Cards */}
                {index < formTemplates.length - 1 && (
                  <div className="flex items-center justify-center relative" style={{ width: '60px', height: '400px' }}>
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 flex items-center">
                      {/* Background Line */}
                      <div className="flex-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full relative overflow-hidden">
                        {/* Progress Line with Animation */}
                        {isTestCompleted(template.testId) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Arrow Head */}
                      <div className={`ml-0.5 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] transition-colors ${
                        isTestCompleted(template.testId)
                          ? 'border-l-green-400'
                          : 'border-l-slate-300 dark:border-l-slate-600'
                      }`}></div>
                    </div>
                    
                    {/* Animated Dots along the path */}
                    {isTestCompleted(template.testId) && (
                      <>
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <div className="absolute top-1/2 left-2/4 -translate-y-1/2 w-2 h-2 rounded-full bg-green-300 animate-pulse delay-75"></div>
                        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 animate-pulse delay-150"></div>
                      </>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 rounded-full px-6 py-3 shadow-lg">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              <div className="text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400">Progresso da Jornada</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {Object.keys(completedTests).length} de {formTemplates.length} avaliações concluídas
                </p>
              </div>
              <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${(Object.keys(completedTests).length / formTemplates.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Use as setas para navegar entre os testes
          </p>
        </div>
      </div>
    </section>
  )
}

export default TemplatesSection

