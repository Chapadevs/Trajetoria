import React, { useState, useEffect, useRef, useCallback } from 'react'
import AssessmentCard from '../../forms/AssessmentCard'
import AssessmentResultsModal from '../../modals/AssessmentResults/AssessmentResultsModal'
import trajetoriaIcon from '../../../assets/icone-trajetoria.svg'

const AssessmentJourneySection = () => {
  const [completedTests, setCompletedTests] = useState({})
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState(null)
  const [selectedTestData, setSelectedTestData] = useState(null)

  useEffect(() => {
    // Carrega os testes concluídos do localStorage
    const updateTests = () => {
      const tests = JSON.parse(localStorage.getItem('completedTests') || '{}')
      setCompletedTests(tests)
    }
    
    updateTests()
    
    // Adiciona listener para mudanças no storage
    window.addEventListener('storage', updateTests)
    
    // Atualiza a cada 1 segundo (para detectar mudanças na mesma aba)
    const interval = setInterval(updateTests, 1000)
    
    return () => {
      window.removeEventListener('storage', updateTests)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!selectedTestId) return
    setSelectedTestData(completedTests[selectedTestId] || null)
  }, [selectedTestId, completedTests])

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

  const handleViewResults = useCallback((event, testId) => {
    event?.preventDefault()
    event?.stopPropagation()
    const testData = completedTests[testId]
    if (!testData) return
    setSelectedTestId(testId)
    setSelectedTestData(testData)
    setShowResultsModal(true)
  }, [completedTests])

  const handleCloseResultsModal = () => {
    setShowResultsModal(false)
    setSelectedTestId(null)
    setSelectedTestData(null)
  }

  const formTemplates = [
    {
      icon: 'person_add',
      category: 'Avaliação Inicial',
      title: 'Anamnese',
      description: 'Histórico psiquiátrico abrangente e questionário de triagem inicial para participantes do estudo.',
      badgeColor: 'green',
      formUrl: '/forms/anamnese-inicial',
      testId: 'anamnese-inicial'
    },
    {
      icon: 'feedback',
      category: 'Avaliação Comportamental',
      title: 'Disc Insight',
      description: 'Ferramenta de avaliação de personalidade e padrões comportamentais',
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

  const requiredTests = [
    'anamnese-inicial',
    'disc-insight',
    'multiple-intelligences',
    'riasec',
    'archetypes'
  ]

  const completedCount = requiredTests.filter(testId => completedTests[testId]).length
  const allTestsCompleted = completedCount === requiredTests.length

  // Próximo teste a ser preenchido (primeiro não concluído na ordem)
  const nextTestId = formTemplates.find(template => !isTestCompleted(template.testId))?.testId || null

  return (
    <>
      <section id="testes" className="w-full bg-slate-50 dark:bg-slate-900/50 py-20 lg:py-24">
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
              className="absolute left-0 top-[45%] -translate-y-1/2 z-30 flex size-12 items-center justify-center rounded-full border border-[#9266CC]/60 bg-white text-[#6152BD] shadow-lg transition-colors hover:bg-[#6152BD]/10 dark:bg-slate-900 dark:text-[#C8A1FF] dark:border-[#413288]"
              aria-label="Scroll Left"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-[45%] -translate-y-1/2 z-30 flex size-12 items-center justify-center rounded-full border border-[#9266CC]/60 bg-white text-[#6152BD] shadow-lg transition-colors hover:bg-[#6152BD]/10 dark:bg-slate-900 dark:text-[#C8A1FF] dark:border-[#413288]"
              aria-label="Scroll Right"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
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
                  <div className={`mb-4 flex items-center justify-center size-10 rounded-full ${
                    isTestCompleted(template.testId)
                      ? 'bg-purple-500'
                      : nextTestId === template.testId
                        ? 'bg-slate-200 dark:bg-slate-700 border-2 border-[#C8A1FF]'
                        : 'bg-slate-200 dark:bg-slate-700'
                  } z-10 transition-all duration-300 shadow-md`}>
                    {isTestCompleted(template.testId) ? (
                      <span className="material-symbols-outlined text-white text-lg">check</span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-300 font-bold text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Card */}
                  <div className="w-full relative">
                    <AssessmentCard
                      {...template}
                      isNext={nextTestId === template.testId}
                      onViewResults={(event) => handleViewResults(event, template.testId)}
                    />
                  </div>

                  {/* Completion Status */}
                  {isTestCompleted(template.testId) && (
                    <div className="mt-3 flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span className="text-xs font-semibold">Concluído</span>
                    </div>
                  )}
                </div>

                {/* Connection Line Between Cards */}
                {index < formTemplates.length - 1 && (
                  <div className="flex items-center justify-center relative" style={{ width: '60px', height: '400px' }}>
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center">
                      <div
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          isTestCompleted(template.testId)
                            ? 'bg-[#9266CC]'
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      ></div>
                      <div
                        className={`w-0 h-0 border-t-[7px] border-b-[7px] border-t-transparent border-b-transparent transition-colors ${
                          isTestCompleted(template.testId)
                            ? 'border-l-[12px] border-l-[#9266CC]'
                            : 'border-l-[12px] border-l-slate-300 dark:border-l-slate-600'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            </div>
          </div>

          {/* Progress Button */}
          <div className="mt-10 flex flex-col items-center justify-center px-4 gap-3">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Progresso da Jornada</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {completedCount} de {requiredTests.length} avaliações concluídas
                {allTestsCompleted && <span className="ml-2 text-[#6152BD] dark:text-[#C8A1FF]">✓ Completo!</span>}
              </p>
            </div>
            <button
              onClick={() => {
                const reportSection = document.getElementById('report-download-section')
                if (reportSection) {
                  reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className={`flex w-full max-w-md items-center gap-4 rounded-full border px-8 py-4 shadow-[0_20px_60px_-25px_rgba(65,50,136,0.55)] backdrop-blur transition-all hover:shadow-[0_25px_70px_-20px_rgba(65,50,136,0.65)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                allTestsCompleted
                  ? 'border-[#9266CC]/60 bg-gradient-to-r from-[#413288]/10 via-[#6152BD]/10 to-[#9266CC]/10 dark:border-[#9266CC]/40 dark:bg-slate-800/80 dark:shadow-[0_20px_60px_-25px_rgba(146,102,204,0.55)]'
                  : 'border-slate-100/60 bg-white/90 dark:border-slate-700/40 dark:bg-slate-800/80'
              }`}
              >
              <div className="flex h-3 flex-1 items-center rounded-full bg-[#E5E1FF] dark:bg-slate-700/70 p-[2px]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    allTestsCompleted
                      ? 'bg-gradient-to-r from-[#413288] via-[#6152BD] to-[#C8A1FF]'
                      : 'bg-gradient-to-r from-[#413288] via-[#6152BD] to-[#C8A1FF]'
                  }`}
                  style={{ width: `${(completedCount / requiredTests.length) * 100}%` }}
                ></div>
              </div>
              <img
                src={trajetoriaIcon}
                alt="Trajetória"
                className={`h-10 w-10 transition-all ${
                  allTestsCompleted ? '' : 'grayscale opacity-50'
                }`}
              />
            </button>
          </div>
        </div>

      </div>
      </section>
      <AssessmentResultsModal
        isOpen={showResultsModal}
        onClose={handleCloseResultsModal}
        testId={selectedTestId}
        testData={selectedTestData}
      />
    </>
  )
}

export default AssessmentJourneySection