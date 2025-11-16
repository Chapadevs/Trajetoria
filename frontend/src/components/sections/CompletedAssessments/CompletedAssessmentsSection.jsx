import React, { useState, useEffect, useCallback } from 'react'
import { generateCompleteReport } from '../../../services/api'
import { composeWithConclusion } from '../../../utils/pdfUtils'
import coverImageUrl from '../../../assets/capa relatorio.jpg'
import AssessmentResultsModal from '../../modals/AssessmentResults/AssessmentResultsModal'
import { TestIcon } from '../../../utils/testIcons'

const CompletedAssessmentsSection = () => {
  const [completedTests, setCompletedTests] = useState({})
  const [hasCompletedTests, setHasCompletedTests] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(null)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState(null)
  const [selectedTestData, setSelectedTestData] = useState(null)

  useEffect(() => {
    const tests = JSON.parse(localStorage.getItem('completedTests') || '{}')
    setCompletedTests(tests)
    setHasCompletedTests(Object.keys(tests).length > 0)
  }, [])

  useEffect(() => {
    if (!selectedTestId) return
    setSelectedTestData(completedTests[selectedTestId] || null)
  }, [selectedTestId, completedTests])

  const getTestInfo = (testId) => {
    const testInfoMap = {
      'anamnese-inicial': {
        title: 'Anamnese inicial completa',
        icon: 'person_add',
        route: '/forms/anamnese-inicial'
      },
      'disc-insight': {
        title: 'Análise DISC detalhada',
        icon: 'psychology',
        route: '/forms/disc-personality'
      },
      'inteligen-finder': {
        title: 'Perfil de Inteligências Múltiplas',
        icon: 'work',
        route: '/forms/project-intake'
      },
      'multiple-intelligences': {
        title: 'Perfil de Inteligências Múltiplas',
        icon: 'psychology_alt'
      },
      'riasec': {
        title: 'Código Holland (RIASEC)',
        icon: 'category'
      },
      'archetypes': {
        title: 'Arquétipos de Personalidade',
        icon: 'auto_awesome'
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

  const requiredTests = [
    'anamnese-inicial',
    'disc-insight',
    'multiple-intelligences',
    'riasec',
    'archetypes'
  ]

  const totalCompleted = requiredTests.filter((testId) => completedTests[testId]).length
  const allTestsCompleted = totalCompleted === requiredTests.length
  const missingTests = requiredTests.filter((testId) => !completedTests[testId])

  const downloadPdfFromBase64 = useCallback((base64, filename, mimeType = 'application/pdf') => {
    if (!base64) {
      throw new Error('PDF não disponível para download.')
    }

    const byteCharacters = window.atob(base64)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || `relatorio-completo-${Date.now()}.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, [])

  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true)
      setDownloadError(null)

      const anamneseData = completedTests['anamnese-inicial']?.data || {}
      const tests = {}

      Object.entries(completedTests).forEach(([testId, testData]) => {
        if (testId !== 'anamnese-inicial') {
          tests[testId] = testData
        }
      })

      const userData = {
        nomeCompleto: anamneseData.nomeCompleto || 'Não informado',
        idade: anamneseData.idade || '',
        cidadeEstado: anamneseData.cidadeEstado || '',
        email: anamneseData.email || '',
        nivelEscolaridade: anamneseData.nivelEscolaridade || '',
        areaEstudo: anamneseData.areaEstudo || '',
        situacaoProfissional: anamneseData.situacaoProfissional || '',
        ocupacaoAtual: anamneseData.ocupacaoAtual || '',
        areasInteresse: anamneseData.areasInteresse || [],
        objetivosCarreira: anamneseData.objetivosCarreira || []
      }

      const result = await generateCompleteReport(userData, tests)
      const filename = result.filename || `relatorio-completo-${new Date().getTime()}.pdf`
      const discResults = completedTests['disc-insight']?.results || {}
      const miResults = completedTests['multiple-intelligences']?.results || {}
      const riasecResults = completedTests['riasec']?.results || {}
      const archetypesResults = completedTests['archetypes']?.results || {}
      const narrativeText = result.narrative || ''
      const composedBase64 = await composeWithConclusion(coverImageUrl, result.pdfBase64, userData, discResults, miResults, riasecResults, archetypesResults, narrativeText)
      downloadPdfFromBase64(composedBase64, filename, result.mimeType || 'application/pdf')
    } catch (error) {
      console.error('Erro ao baixar relatório:', error)
      setDownloadError(error.message || 'Não foi possível gerar o PDF. Tente novamente.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleClearResults = (testId) => {
    if (window.confirm('Tem certeza que deseja limpar os resultados deste teste? Esta ação não pode ser desfeita.')) {
      const tests = { ...completedTests }
      delete tests[testId]
      localStorage.setItem('completedTests', JSON.stringify(tests))
      setCompletedTests(tests)
      setHasCompletedTests(Object.keys(tests).length > 0)
      if (selectedTestId === testId) {
        handleCloseResultsModal()
      }
    }
  }

  const handleClearAllResults = () => {
    if (window.confirm('Tem certeza que deseja limpar TODOS os resultados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('completedTests')
      setCompletedTests({})
      setHasCompletedTests(false)
      handleCloseResultsModal()
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
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">S</span>
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
              'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
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
  const reportItems = [
    { id: 'anamnese-inicial', label: 'Anamnese inicial completa' },
    { id: 'disc-insight', label: 'Análise DISC detalhada' },
    { id: 'multiple-intelligences', label: 'Perfil de Inteligências Múltiplas' },
    { id: 'riasec', label: 'Código Holland (RIASEC)' },
    { id: 'archetypes', label: 'Arquétipos de Personalidade' },
    { id: 'recommendations', label: 'Recomendações personalizadas' }
  ]

  return (
    <>
      <section className="w-full bg-gradient-to-br from-[#F5F2FF] via-[#F8F9FF] to-[#F5F2FF] dark:from-[#1E1B2D] dark:via-[#201F36] dark:to-[#1E1B2D] py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <span className="material-symbols-outlined text-4xl text-[#6152BD]">task_alt</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Seu relatório completo está pronto</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Revise todos os insights obtidos até agora e gere um PDF com recomendações personalizadas.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#C8A1FF]/40 bg-white/90 backdrop-blur shadow-xl dark:border-[#413288]/50 dark:bg-slate-900/70">
            <div className="flex flex-col gap-6 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#6152BD]/10 text-[#6152BD]">
                  <span className="material-symbols-outlined text-2xl">fact_check</span>
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#6152BD]">O relatório inclui:</p>
                  <ul className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    {reportItems.map((item) => (
                      <li key={item.id} className="flex items-start gap-3 rounded-xl bg-[#6152BD]/5 px-4 py-3 text-left dark:bg-[#413288]/40">
                        <span className="material-symbols-outlined text-base text-[#6152BD] dark:text-[#C8A1FF]">check_circle</span>
                        <span className="text-slate-700 dark:text-slate-200">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-[#6152BD]/20 bg-[#6152BD]/5 px-6 py-5 text-left dark:border-[#413288]/40 dark:bg-[#413288]/30">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-xl text-emerald-500">info</span>
                    <div>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {allTestsCompleted ? 'Todos os testes completados!' : 'Continue para completar seu relatório.'}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        O relatório será gerado em tempo real com base nos dados salvos no navegador. Nenhuma informação é enviada para servidores externos permanentemente.
                      </p>
                    </div>
                  </div>
                  {!allTestsCompleted && (
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Pendentes: {missingTests.length} {missingTests.length === 1 ? 'teste' : 'testes'}
                    </p>
                  )}
                </div>
              </div>

              {downloadError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
                  {downloadError}
                </div>
              )}

              <button
                type="button"
                disabled={!allTestsCompleted || isDownloading}
                onClick={handleDownloadReport}
                className="group inline-flex items-center justify-center gap-2 self-center rounded-2xl bg-gradient-to-r from-[#6152BD] to-[#9266CC] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all enabled:hover:scale-[1.02] enabled:hover:shadow-xl enabled:hover:from-[#5545AA] enabled:hover:to-[#7E5FE0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-lg">{isDownloading ? 'hourglass_top' : 'download'}</span>
                {isDownloading ? 'Gerando relatório...' : 'Baixar relatório em PDF'}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleClearAllResults}
              className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              Limpar todos os resultados salvos
            </button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {completedTestsArray.map(([testId, testData]) => {
              const testInfo = getTestInfo(testId)
              const isRequired = requiredTests.includes(testId)

              return (
                <div
                  key={testId}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[#6152BD]/10 text-[#6152BD] dark:bg-[#413288]/40 dark:text-[#C8A1FF] overflow-hidden">
                        <TestIcon 
                          testId={testId} 
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{testInfo.title}</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Concluído em {formatDate(testData.completedAt)}
                        </p>
                      </div>
                    </div>
                    {isRequired && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                        Incluído no relatório
                      </span>
                    )}
                  </div>

                  {testId === 'disc-insight' && renderDISCResults(testData.results)}
                  {testId === 'anamnese-inicial' && renderAnamneseHighlights(testData.data)}
                  {testId === 'inteligen-finder' && renderInteligenHighlights(testData.data)}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(event) => handleViewResults(event, testId)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#6152BD]/40 bg-white px-4 py-2 text-sm font-semibold text-[#6152BD] transition hover:bg-[#6152BD]/10 dark:border-[#413288] dark:bg-transparent dark:text-[#C8A1FF] dark:hover:bg-[#413288]/40"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                      Ver resultados
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClearResults(testId)}
                      className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                      title="Limpar resultados"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              )
            })}
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

export default CompletedAssessmentsSection