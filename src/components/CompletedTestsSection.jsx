import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CompletedTestsSection = () => {
  const navigate = useNavigate()
  const [completedTests, setCompletedTests] = useState({})
  const [hasCompletedTests, setHasCompletedTests] = useState(false)
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    // Carrega os testes concluídos do localStorage
    const tests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    setCompletedTests(tests)
    setHasCompletedTests(Object.keys(tests).length > 0)
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
      // Check after a small delay to ensure content is rendered
      setTimeout(handleScroll, 100)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [completedTests])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const getTestInfo = (testId) => {
    const testInfoMap = {
      'anamnese-inicial': {
        title: 'Anamnese Pro',
        icon: 'person_add',
        color: 'green',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        iconBg: 'bg-green-500',
        route: '/forms/anamnese-inicial'
      },
      'disc-insight': {
        title: 'Disc Insight',
        icon: 'psychology',
        color: 'yellow',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        iconBg: 'bg-yellow-500',
        route: '/forms/disc-personality'
      },
      'inteligen-finder': {
        title: 'Inteligen Finder',
        icon: 'work',
        color: 'blue',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        iconBg: 'bg-blue-500',
        route: '/forms/project-intake'
      }
    }
    return testInfoMap[testId] || testInfoMap['anamnese-inicial']
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewResults = (testId) => {
    const testInfo = getTestInfo(testId)
    navigate(testInfo.route)
  }

  const handleClearResults = (testId) => {
    if (window.confirm('Tem certeza que deseja limpar os resultados deste teste? Esta ação não pode ser desfeita.')) {
      const tests = { ...completedTests }
      delete tests[testId]
      localStorage.setItem('completedTests', JSON.stringify(tests))
      setCompletedTests(tests)
      setHasCompletedTests(Object.keys(tests).length > 0)
    }
  }

  const handleClearAllResults = () => {
    if (window.confirm('Tem certeza que deseja limpar TODOS os resultados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('completedTests')
      setCompletedTests({})
      setHasCompletedTests(false)
    }
  }

  const renderDISCResults = (results) => {
    if (!results) return null
    
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-700/50 rounded-lg p-2">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">D</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Dominância</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{results.D}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-700/50 rounded-lg p-2">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">I</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Influência</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{results.I}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-700/50 rounded-lg p-2">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm">S</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Estabilidade</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{results.S}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-700/50 rounded-lg p-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">C</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Conformidade</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{results.C}%</p>
          </div>
        </div>
      </div>
    )
  }

  const renderAnamneseHighlights = (data) => {
    if (!data) return null
    
    return (
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-primary text-base">person</span>
          <span className="text-slate-700 dark:text-slate-300">{data.nomeCompleto}</span>
        </div>
        {data.areasInteresse && data.areasInteresse.length > 0 && (
          <div className="flex items-start gap-2 text-sm">
            <span className="material-symbols-outlined text-primary text-base">interests</span>
            <div className="flex flex-wrap gap-1">
              {data.areasInteresse.slice(0, 3).map((area, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                  {area}
                </span>
              ))}
              {data.areasInteresse.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                  +{data.areasInteresse.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderInteligenHighlights = (data) => {
    if (!data) return null
    
    return (
      <div className="mt-3 space-y-2">
        {data.projectName && (
          <div className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-primary text-base">folder</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">{data.projectName}</span>
          </div>
        )}
        {data.projectType && (
          <div className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-primary text-base">category</span>
            <span className="text-slate-600 dark:text-slate-400">{data.projectType}</span>
          </div>
        )}
        {data.priority && (
          <div className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-primary text-base">flag</span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              data.priority === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
              data.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              data.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {data.priority === 'critical' ? 'Crítico' :
               data.priority === 'high' ? 'Alto' :
               data.priority === 'medium' ? 'Médio' : 'Baixo'}
            </span>
          </div>
        )}
      </div>
    )
  }

  if (!hasCompletedTests) {
    return null
  }

  const completedTestsArray = Object.entries(completedTests)

  return (
    <section className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 py-16 lg:py-20">
      <div className="container mx-auto max-w-[95%] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-green-500">verified</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Seus Resultados
              </h2>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Avaliações concluídas e resultados salvos
            </p>
          </div>
          <button
            onClick={handleClearAllResults}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-base">delete</span>
            <span>Limpar Tudo</span>
          </button>
        </div>

        {/* Horizontal Completed Tests Timeline */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-full p-3 shadow-2xl transition-all hover:scale-110"
              aria-label="Scroll Left"
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-full p-3 shadow-2xl transition-all hover:scale-110"
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
            {completedTestsArray.map(([testId, testData], index) => {
              const testInfo = getTestInfo(testId)
              
              return (
                <React.Fragment key={testId}>
                  {/* Test Card Container */}
                  <div className="relative flex flex-col items-center" style={{ width: '340px' }}>
                    {/* Completion Badge */}
                    <div className="mb-4 flex items-center justify-center size-12 rounded-full border-4 bg-green-500 border-green-300 dark:border-green-700 z-10 shadow-lg">
                      <span className="material-symbols-outlined text-white text-xl">check_circle</span>
                    </div>

                    {/* Card */}
                    <div className="w-full relative">
                      <div
                        className={`group relative overflow-hidden rounded-xl border-2 ${testInfo.borderColor} ${testInfo.bgColor} backdrop-blur-sm transition-all hover:shadow-xl hover:scale-[1.02]`}
                      >
                        <div className="p-6">
                          {/* Icon & Title */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`flex size-12 items-center justify-center rounded-lg ${testInfo.iconBg} text-white flex-shrink-0 shadow-md`}>
                              <span className="material-symbols-outlined">{testInfo.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                                {testInfo.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
                                {formatDate(testData.completedAt)}
                              </p>
                            </div>
                          </div>

                          {/* Results Preview */}
                          {testId === 'disc-insight' && renderDISCResults(testData.results)}
                          {testId === 'anamnese-inicial' && renderAnamneseHighlights(testData.data)}
                          {testId === 'inteligen-finder' && renderInteligenHighlights(testData.data)}

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button
                              onClick={() => handleViewResults(testId)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                            >
                              <span className="material-symbols-outlined text-base">visibility</span>
                              <span>Ver Detalhes</span>
                            </button>
                            <button
                              onClick={() => handleClearResults(testId)}
                              className="flex items-center justify-center p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Limpar resultados"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection Dots on Card Border */}
                      {index > 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 border-2 border-green-300 dark:border-green-700 z-20 shadow-md"></div>
                      )}
                      {index < completedTestsArray.length - 1 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-green-500 border-2 border-green-300 dark:border-green-700 z-20 shadow-md"></div>
                      )}
                    </div>

                    {/* Completion Date Label */}
                    <div className="mt-3 flex items-center gap-1.5 text-green-600 dark:text-green-400">
                      <span className="material-symbols-outlined text-sm animate-pulse">verified</span>
                      <span className="text-xs font-semibold">Completado com Sucesso</span>
                    </div>
                  </div>

                  {/* Connection Line Between Cards */}
                  {index < completedTestsArray.length - 1 && (
                    <div className="flex items-center justify-center relative" style={{ width: '70px', height: '450px' }}>
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 flex items-center">
                        {/* Animated Progress Line */}
                        <div className="flex-1 h-1.5 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-full shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
                        </div>
                        
                        {/* Arrow Head */}
                        <div className="ml-0.5 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-green-400 drop-shadow-md"></div>
                      </div>
                      
                      {/* Flowing Dots along the path */}
                      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md animate-pulse"></div>
                      <div className="absolute top-1/2 left-2/4 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md animate-pulse" style={{ animationDelay: '0.15s' }}></div>
                      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
            </div>
          </div>

          {/* Achievement Summary */}
          <div className="mt-10 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl px-8 py-6 shadow-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500 text-4xl">emoji_events</span>
                <div className="text-left">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Conquista Desbloqueada</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {completedTestsArray.length} {completedTestsArray.length === 1 ? 'Teste Concluído' : 'Testes Concluídos'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Continue sua jornada de autoconhecimento acima</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Use as setas para navegar entre os resultados
          </p>
        </div>
      </div>
    </section>
  )
}

export default CompletedTestsSection

