import React, { useState, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { generateCompleteReport, checkBackendHealth } from '../../../services/api'
import { prependCoverAndSummary, composeWithCoverSummaryAnamnese, composeWithCoverSummaryAnamneseDisc, composeWithCoverSummaryAnamneseDiscMI, composeWithCoverSummaryAnamneseDiscMIRiasec, composeWithCoverSummaryAnamneseDiscMIRiasecArchetypes, composeWithHighlights, composeWithMoreHighlights, composeWithActionPlan, composeWithConclusion } from '../../../utils/pdfUtils'
import coverImageUrl from '../../../assets/capa relatorio.jpg'

const markdownComponents = {
  h2: ({ node, ...props }) => (
    <h2 className="text-xl font-bold text-primary-dark dark:text-primary-light mt-6 mb-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-lg font-semibold text-primary dark:text-primary-light mt-4 mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4 pl-2" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4 pl-2" {...props} />
  ),
  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
  strong: ({ node, ...props }) => <strong className="text-slate-900 dark:text-white font-semibold" {...props} />,
  a: ({ node, ...props }) => (
    <a className="text-primary underline font-semibold hover:text-primary-light" target="_blank" rel="noreferrer" {...props} />
  ),
}

const ReportDownloadSection = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [completedCount, setCompletedCount] = useState(0)
  const [backendOnline, setBackendOnline] = useState(true)
  const [reportData, setReportData] = useState(null)

  // Lista de todos os testes necessários
  const requiredTests = [
    'anamnese-inicial',
    'disc-insight',
    'multiple-intelligences',
    'riasec',
    'archetypes'
  ]

  const totalTests = requiredTests.length
  const allTestsCompleted = completedCount === totalTests

  useEffect(() => {
    // Atualiza o estado sempre que a página carrega
    const updateTests = () => {
      const tests = JSON.parse(localStorage.getItem('completedTests') || '{}')
      // Conta quantos dos testes necessários foram completados
      const completed = requiredTests.filter(testId => tests[testId]).length
      setCompletedCount(completed)
    }
    
    updateTests()
    
    // Verifica se o backend está online
    checkBackendHealth().then(setBackendOnline)
    
    // Adiciona listener para mudanças no storage
    window.addEventListener('storage', updateTests)
    
    // Atualiza a cada 1 segundo (para detectar mudanças)
    const interval = setInterval(updateTests, 1000)
    
    return () => {
      window.removeEventListener('storage', updateTests)
      clearInterval(interval)
    }
  }, [])

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

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Busca os dados do localStorage
      const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
      
      // Separa os dados da anamnese
      const anamneseData = completedTests['anamnese-inicial']?.data || {}
      
      // Prepara os testes (sem incluir anamnese)
      const tests = {}
      Object.entries(completedTests).forEach(([testId, testData]) => {
        if (testId !== 'anamnese-inicial') {
          tests[testId] = testData
        }
      })

      // Se não houver dados da anamnese, cria um objeto vazio com dados mínimos
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

      // Compose PDF with cover + summary + anamnese + disc + MI + riasec + archetypes + highlights
      const discResults = completedTests['disc-insight']?.results || {}
      const miResults = completedTests['multiple-intelligences']?.results || {}
      const riasecResults = completedTests['riasec']?.results || {}
      const archetypesResults = completedTests['archetypes']?.results || {}
      const narrativeText = result.narrative || ''
      const composedBase64 = await composeWithConclusion(coverImageUrl, result.pdfBase64, userData, discResults, miResults, riasecResults, archetypesResults, narrativeText)
      downloadPdfFromBase64(composedBase64, filename, result.mimeType || 'application/pdf')

      setReportData({
        ...result,
        filename,
        generatedAt: new Date().toISOString(),
      })
      
    } catch (err) {
      console.error('Erro ao baixar relatório:', err)
      setError(err.message || 'Erro ao gerar o relatório. Tente novamente.')
      setReportData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="report-download-section" className="w-full bg-gradient-to-br from-[#9266CC]/5 to-[#6152BD]/5 dark:from-[#9266CC]/10 dark:to-[#6152BD]/10 py-12 lg:py-16">
      <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        


        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 ${allTestsCompleted ? 'border-[#9266CC]/30' : 'border-slate-300 dark:border-slate-600'} overflow-hidden relative ${!allTestsCompleted ? 'opacity-75' : ''}`}>
          {/* Lock Overlay */}
          {!allTestsCompleted && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
              <div className="text-center p-8">
                <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-500 mb-4">lock</span>
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Complete todas as {totalTests} etapas para desbloquear
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Progresso: {completedCount}/{totalTests} testes completados
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className={`bg-gradient-to-r from-[#413288] via-[#6152BD] to-[#9266CC] p-6 lg:p-8 text-white ${!allTestsCompleted ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="material-symbols-outlined text-4xl lg:text-5xl">{allTestsCompleted ? 'description' : 'lock'}</span>
              <h2 className="text-2xl lg:text-3xl font-bold">Relatório Completo</h2>
            </div>
            <p className="text-center text-white/90 text-sm lg:text-base">
              {allTestsCompleted ? 'Baixe um PDF profissional com todos os seus resultados' : 'Complete todas as etapas para desbloquear o relatório'}
            </p>
          </div>

          {/* Content */}
          <div className={`p-8 ${!allTestsCompleted ? 'pointer-events-none' : ''}`}>
            {/* Backend Status Warning */}
            {!backendOnline && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">warning</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                      Backend Offline
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      O servidor de geração de relatórios está offline. Por favor, certifique-se de que o backend está rodando na porta 3001.
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
                      Execute: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded">cd backend && npm install && npm run dev</code>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Features List */}
            <div className="mb-12 text-center">
              <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                📋 O relatório {allTestsCompleted ? 'inclui' : 'incluirá'}:
              </h3>
              <div className="mx-auto grid w-full max-w-2xl grid-cols-1 justify-items-center gap-3 text-center md:grid-cols-2 md:gap-x-4">
                <div className="flex w-full max-w-xs items-center justify-end gap-2 text-sm md:max-w-none">
                  <span className="text-slate-700 dark:text-slate-300">Anamnese Inicial completa</span>
                  <span className="material-symbols-outlined text-[#6152BD] text-lg">check_circle</span>
                </div>
                <div className="flex w-full max-w-xs items-center justify-start gap-2 text-sm md:max-w-none">
                  <span className="material-symbols-outlined text-[#6152BD] text-lg mt-0.5">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Análise DISC detalhada</span>
                </div>
                <div className="flex w-full max-w-xs items-center justify-end gap-2 text-sm md:max-w-none">
                  <span className="text-slate-700 dark:text-slate-300">Perfil de Inteligências Múltiplas</span>
                  <span className="material-symbols-outlined text-[#6152BD] text-lg">check_circle</span>
                </div>
                <div className="flex w-full max-w-xs items-center justify-start gap-2 text-sm md:max-w-none">
                  <span className="material-symbols-outlined text-[#6152BD] text-lg mt-0.5">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Código Holland (RIASEC)</span>
                </div>
                <div className="flex w-full max-w-xs items-center justify-end gap-2 text-sm md:max-w-none">
                  <span className="text-slate-700 dark:text-slate-300">Arquétipos de Personalidade</span>
                  <span className="material-symbols-outlined text-[#6152BD] text-lg">check_circle</span>
                </div>
                <div className="flex w-full max-w-xs items-center justify-start gap-2 text-sm md:max-w-none">
                  <span className="material-symbols-outlined text-[#6152BD] text-lg mt-0.5">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Recomendações personalizadas</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Download Button */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <button
                onClick={handleGenerateReport}
                disabled={isLoading || !backendOnline || !allTestsCompleted}
                className={`
                  inline-flex items-center justify-center gap-3 px-12 py-3 rounded-xl text-base sm:text-lg font-semibold tracking-wide
                  transition-all duration-300 shadow-lg
                  ${isLoading || !backendOnline || !allTestsCompleted
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#413288] via-[#6152BD] to-[#9266CC] text-white hover:shadow-2xl hover:shadow-[#9266CC]/40'
                  }
                `}
              >
                <span className={`material-symbols-outlined text-3xl ${isLoading ? 'animate-spin' : ''}`}>
                  {isLoading ? 'hourglass_empty' : allTestsCompleted ? 'download' : 'lock'}
                </span>
                <span>
                  {isLoading ? 'Gerando seu PDF...' : 
                   !allTestsCompleted ? `Complete Todos os ${totalTests} Testes (${completedCount}/${totalTests})` : 
                   'Baixar Relatório Completo'}
                </span>
              </button>

              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#6152BD] border-t-transparent"></div>
                  <span>Isso pode levar alguns segundos...</span>
                </div>
              )}
            </div>

            {reportData?.narrative && (
              <div className="mt-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light">
                    Narrativa personalizada gerada pela IA
                  </h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    {reportData.generatedAt && (
                      <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50 px-3 py-1 rounded-full">
                        Gerado em {new Date(reportData.generatedAt).toLocaleString('pt-BR')}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        // reconstruct userData from localStorage to ensure consistency
                        const completedTests = JSON.parse(localStorage.getItem('completedTests') || '{}')
                        const anamneseData = completedTests['anamnese-inicial']?.data || {}
                        const userDataInline = {
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
                        const completedTests2 = JSON.parse(localStorage.getItem('completedTests') || '{}')
                        const discInline = completedTests2['disc-insight']?.results || {}
                        const miInline = completedTests2['multiple-intelligences']?.results || {}
                        const riasecInline = completedTests2['riasec']?.results || {}
                        const archInline = completedTests2['archetypes']?.results || {}
                        const narrativeText = reportData.narrative || ''
                        const composedBase64 = await composeWithConclusion(coverImageUrl, reportData.pdfBase64, userDataInline, discInline, miInline, riasecInline, archInline, narrativeText)
                        downloadPdfFromBase64(composedBase64, reportData.filename, reportData.mimeType || 'application/pdf')
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#413288] via-[#6152BD] to-[#9266CC] rounded-full shadow hover:shadow-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-base">download</span>
                      Baixar PDF novamente
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 overflow-y-auto max-h-[480px] shadow-inner">
                  <ReactMarkdown components={markdownComponents}>
                    {reportData.narrative}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Info & Progress */}
            <div className="mt-6 space-y-3">
              {/* Progress Details */}
              {!allTestsCompleted && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-lg">warning</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Testes Restantes: {totalTests - completedCount}
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">
                        Para gerar o relatório completo, você precisa completar TODOS os {totalTests} testes disponíveis.
                        Progresso atual: {completedCount} de {totalTests} completos ({Math.round((completedCount / totalTests) * 100)}%)
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReportDownloadSection