import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLayout from '../components/FormLayout'
import { FormSection, FullWidthItem } from '../components/FormInput'
import ResultsModal from '../components/ResultsModal'
import { LikertScale } from '../components/shared/LikertScale'
import { TestHeader } from '../components/shared/TestHeader'
import { TestNavigation } from '../components/shared/TestNavigation'
import { useFormNavigation } from '../hooks/useFormNavigation'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTestResults } from '../hooks/useTestResults'
import { saveDraft } from '../utils/storageUtils'

const ArchetypesTest = () => {
  const navigate = useNavigate()
  
  // Hooks customizados
  const { 
    currentStep, 
    completedSteps, 
    progress, 
    goToNextStep, 
    goToPreviousStep,
    isLastStep,
    isFirstStep 
  } = useFormNavigation(12)
  
  const { 
    errors, 
    clearAllErrors, 
    setMultipleErrors 
  } = useFormValidation()
  
  const { 
    savedResults, 
    showResultsModal, 
    setShowResultsModal, 
    saveResults 
  } = useTestResults('archetypes')
  
  const [hasStarted, setHasStarted] = useState(false)
  
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '',
    q16: '', q17: '', q18: '', q19: '', q20: '',
    q21: '', q22: '', q23: '', q24: '', q25: '',
    q26: '', q27: '', q28: '', q29: '', q30: '',
    q31: '', q32: '', q33: '', q34: '', q35: '',
    q36: '', q37: '', q38: '', q39: '', q40: '',
    q41: '', q42: '', q43: '', q44: '', q45: '',
    q46: '', q47: '', q48: '', q49: '', q50: '',
    q51: '', q52: '', q53: '', q54: '', q55: '',
    q56: '', q57: '', q58: '', q59: '', q60: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    const startQ = (step - 1) * 5 + 1
    const endQ = startQ + 4
    
    for (let i = startQ; i <= endQ; i++) {
      if (!formData[`q${i}`]) {
        newErrors[`q${i}`] = 'Por favor, selecione uma opção.'
      }
    }

    setMultipleErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (validateStep(currentStep)) {
      goToNextStep()
    }
    
    return false
  }

  const handlePreviousStep = () => {
    clearAllErrors()
    goToPreviousStep()
  }

  const handleSaveDraft = () => {
    if (saveDraft('archetypes', formData)) {
      alert('Rascunho salvo com sucesso!')
    } else {
      alert('Erro ao salvar rascunho.')
    }
  }

  const calculateResults = () => {
    const scores = {
      inocente: 0,
      sabio: 0,
      explorador: 0,
      foraDaLei: 0,
      mago: 0,
      heroi: 0,
      amante: 0,
      bobo: 0,
      caraComum: 0,
      cuidador: 0,
      governante: 0,
      criador: 0
    }

    // Inocente (q1-q5), Sábio (q6-q10), Explorador (q11-q15), Fora da Lei (q16-q20)
    // Mago (q21-q25), Herói (q26-q30), Amante (q31-q35), Bobo (q36-q40)
    // Cara Comum (q41-q45), Cuidador (q46-q50), Governante (q51-q55), Criador (q56-q60)
    for (let i = 1; i <= 5; i++) scores.inocente += parseInt(formData[`q${i}`]) || 0
    for (let i = 6; i <= 10; i++) scores.sabio += parseInt(formData[`q${i}`]) || 0
    for (let i = 11; i <= 15; i++) scores.explorador += parseInt(formData[`q${i}`]) || 0
    for (let i = 16; i <= 20; i++) scores.foraDaLei += parseInt(formData[`q${i}`]) || 0
    for (let i = 21; i <= 25; i++) scores.mago += parseInt(formData[`q${i}`]) || 0
    for (let i = 26; i <= 30; i++) scores.heroi += parseInt(formData[`q${i}`]) || 0
    for (let i = 31; i <= 35; i++) scores.amante += parseInt(formData[`q${i}`]) || 0
    for (let i = 36; i <= 40; i++) scores.bobo += parseInt(formData[`q${i}`]) || 0
    for (let i = 41; i <= 45; i++) scores.caraComum += parseInt(formData[`q${i}`]) || 0
    for (let i = 46; i <= 50; i++) scores.cuidador += parseInt(formData[`q${i}`]) || 0
    for (let i = 51; i <= 55; i++) scores.governante += parseInt(formData[`q${i}`]) || 0
    for (let i = 56; i <= 60; i++) scores.criador += parseInt(formData[`q${i}`]) || 0

    const percentages = {}
    Object.keys(scores).forEach(key => {
      percentages[key] = Math.round((scores[key] / 25) * 100)
    })

    return percentages
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (currentStep !== 12) return false
    
    const allPreviousStepsCompleted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].every(step => completedSteps.includes(step))
    if (!allPreviousStepsCompleted) {
      alert('⚠️ Por favor, complete todas as etapas anteriores antes de enviar.')
      return false
    }
    
    if (!validateStep(12)) {
      alert('Por favor, revise os campos destacados antes de enviar.')
      return false
    }
    
    const results = calculateResults()
    saveResults(formData, results)
    
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1])
    const top3 = sorted.slice(0, 3)
    
    const archetypeNames = {
      inocente: 'O Inocente',
      sabio: 'O Sábio',
      explorador: 'O Explorador',
      foraDaLei: 'O Fora da Lei',
      mago: 'O Mago',
      heroi: 'O Herói',
      amante: 'O Amante',
      bobo: 'O Bobo da Corte',
      caraComum: 'O Cara Comum',
      cuidador: 'O Cuidador',
      governante: 'O Governante',
      criador: 'O Criador'
    }

    alert(`🎉 Parabéns! Teste de Arquétipos concluído com sucesso!\n\nSeus 3 arquétipos mais fortes:\n1. ${archetypeNames[top3[0][0]]}: ${top3[0][1]}%\n2. ${archetypeNames[top3[1][0]]}: ${top3[1][1]}%\n3. ${archetypeNames[top3[2][0]]}: ${top3[2][1]}%\n\nVocê será redirecionado para a página inicial.`)
    
    setTimeout(() => navigate('/'), 2000)
  }

  const stepTitles = {
    1: 'O Inocente',
    2: 'O Sábio',
    3: 'O Explorador',
    4: 'O Fora da Lei',
    5: 'O Mago',
    6: 'O Herói',
    7: 'O Amante',
    8: 'O Bobo da Corte',
    9: 'O Cara Comum',
    10: 'O Cuidador',
    11: 'O Governante',
    12: 'O Criador'
  }

  const questions = {
    1: [
      { q: 1, label: 'Acredito que as pessoas são naturalmente boas' },
      { q: 2, label: 'Prefiro ver o lado positivo das situações' },
      { q: 3, label: 'Valorizo a simplicidade e a honestidade acima de tudo' },
      { q: 4, label: 'Confio nas pessoas facilmente' },
      { q: 5, label: 'Busco a felicidade nas pequenas coisas do dia a dia' }
    ],
    2: [
      { q: 6, label: 'Adoro aprender coisas novas e buscar conhecimento' },
      { q: 7, label: 'Prefiro analisar e refletir antes de tomar decisões' },
      { q: 8, label: 'Valorizo a sabedoria e a experiência' },
      { q: 9, label: 'Gosto de compartilhar o que sei com os outros' },
      { q: 10, label: 'Busco sempre entender o porquê das coisas' }
    ],
    3: [
      { q: 11, label: 'Adoro viajar e conhecer novos lugares' },
      { q: 12, label: 'Sinto-me sufocado quando tenho muitas restrições' },
      { q: 13, label: 'Gosto de sair da minha zona de conforto' },
      { q: 14, label: 'Prefiro experiências novas a rotinas estabelecidas' },
      { q: 15, label: 'Valorizo minha independência e autonomia' }
    ],
    4: [
      { q: 16, label: 'Questiono regras que não fazem sentido' },
      { q: 17, label: 'Não tenho medo de ir contra a maioria' },
      { q: 18, label: 'Acredito que às vezes é preciso quebrar as regras' },
      { q: 19, label: 'Gosto de desafiar o que é considerado "normal"' },
      { q: 20, label: 'Prefiro criar meu próprio caminho' }
    ],
    5: [
      { q: 21, label: 'Acredito que posso transformar minhas ideias em realidade' },
      { q: 22, label: 'Gosto de criar experiências únicas para as pessoas' },
      { q: 23, label: 'Vejo possibilidades onde outros veem limitações' },
      { q: 24, label: 'Tenho facilidade em visualizar e manifestar meus sonhos' },
      { q: 25, label: 'Busco sempre inovar e criar algo especial' }
    ],
    6: [
      { q: 26, label: 'Gosto de superar desafios difíceis' },
      { q: 27, label: 'Sinto-me motivado a fazer a diferença' },
      { q: 28, label: 'Não desisto facilmente dos meus objetivos' },
      { q: 29, label: 'Valorizo coragem e determinação' },
      { q: 30, label: 'Quero deixar um legado positivo' }
    ],
    7: [
      { q: 31, label: 'Valorizo profundamente minhas relações pessoais' },
      { q: 32, label: 'Busco beleza e prazer na vida' },
      { q: 33, label: 'Sou apaixonado pelo que faço' },
      { q: 34, label: 'Gosto de criar momentos especiais com quem amo' },
      { q: 35, label: 'Sinto as emoções de forma muito intensa' }
    ],
    8: [
      { q: 36, label: 'Adoro fazer as pessoas rirem' },
      { q: 37, label: 'Prefiro não levar a vida tão a sério' },
      { q: 38, label: 'Gosto de diversão e espontaneidade' },
      { q: 39, label: 'Vivo o momento presente intensamente' },
      { q: 40, label: 'Uso o humor para lidar com situações difíceis' }
    ],
    9: [
      { q: 41, label: 'Valorizo a simplicidade e autenticidade' },
      { q: 42, label: 'Prefiro estar com pessoas comuns e genuínas' },
      { q: 43, label: 'Acredito que todos merecem respeito igual' },
      { q: 44, label: 'Gosto de fazer parte de um grupo ou comunidade' },
      { q: 45, label: 'Não gosto de privilégios ou elitismo' }
    ],
    10: [
      { q: 46, label: 'Sinto-me realizado ao ajudar os outros' },
      { q: 47, label: 'Coloco as necessidades dos outros antes das minhas' },
      { q: 48, label: 'Sou muito empático e compassivo' },
      { q: 49, label: 'Gosto de cuidar e proteger quem amo' },
      { q: 50, label: 'Sinto-me responsável pelo bem-estar dos outros' }
    ],
    11: [
      { q: 51, label: 'Gosto de estar no controle das situações' },
      { q: 52, label: 'Tenho facilidade em liderar e organizar' },
      { q: 53, label: 'Valorizo poder e influência' },
      { q: 54, label: 'Gosto de estabelecer regras e estruturas' },
      { q: 55, label: 'Sinto-me responsável por criar ordem' }
    ],
    12: [
      { q: 56, label: 'Adoro criar coisas novas e originais' },
      { q: 57, label: 'Expresso-me através da minha criatividade' },
      { q: 58, label: 'Valorizo a inovação e a originalidade' },
      { q: 59, label: 'Gosto de dar vida às minhas ideias' },
      { q: 60, label: 'Busco deixar minha marca pessoal em tudo que faço' }
    ]
  }

  const subtitles = {
    1: 'Busca felicidade, otimismo e simplicidade. Acredita no bem e na pureza.',
    2: 'Busca verdade, conhecimento e compreensão profunda do mundo.',
    3: 'Busca liberdade, aventura e descoberta de novos horizontes.',
    4: 'Desafia o status quo, quebra regras e busca revolução e mudança radical.',
    5: 'Transforma sonhos em realidade, cria experiências mágicas e momentos especiais.',
    6: 'Busca superar desafios, provar seu valor e fazer a diferença no mundo.',
    7: 'Busca intimidade, paixão e conexões profundas com pessoas e experiências.',
    8: 'Traz alegria, diversão e leveza. Vive o momento e faz os outros rirem.',
    9: 'Busca pertencimento, conexão autêntica e igualdade entre todos.',
    10: 'Cuida, nutre e protege os outros. Busca ajudar e servir com compaixão.',
    11: 'Busca controle, ordem e liderança. Cria estruturas e toma decisões importantes.',
    12: 'Busca inovação, expressão e criar algo com valor duradouro.'
  }

  // Tela de introdução antes de iniciar o teste
  if (!hasStarted) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <div className="mx-auto w-full max-w-4xl px-4 py-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
                <span className="material-symbols-outlined text-white text-4xl">stars</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Arquétipos de Jung
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Descubra Seu Arquétipo Dominante
              </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  O que são os Arquétipos?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Os Arquétipos de Jung são padrões universais de comportamento e personalidade que refletem motivações, medos e desejos profundos. Este teste identifica quais dos 12 arquétipos principais mais se alinham com sua personalidade, ajudando você a entender melhor suas motivações e como você interage com o mundo.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { icon: 'sentiment_satisfied', name: 'Inocente', desc: 'Otimista', color: 'yellow' },
                  { icon: 'auto_stories', name: 'Sábio', desc: 'Conhecedor', color: 'indigo' },
                  { icon: 'explore', name: 'Explorador', desc: 'Aventureiro', color: 'blue' },
                  { icon: 'emergency', name: 'Fora da Lei', desc: 'Rebelde', color: 'red' },
                  { icon: 'auto_fix_high', name: 'Mago', desc: 'Transformador', color: 'purple' },
                  { icon: 'shield', name: 'Herói', desc: 'Corajoso', color: 'orange' },
                  { icon: 'favorite', name: 'Amante', desc: 'Apaixonado', color: 'pink' },
                  { icon: 'theater_comedy', name: 'Bobo', desc: 'Alegre', color: 'lime' },
                  { icon: 'group', name: 'Cara Comum', desc: 'Genuíno', color: 'gray' },
                  { icon: 'healing', name: 'Cuidador', desc: 'Protetor', color: 'green' },
                  { icon: 'workspace_premium', name: 'Governante', desc: 'Líder', color: 'amber' },
                  { icon: 'brush', name: 'Criador', desc: 'Inovador', color: 'cyan' }
                ].map((type, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-primary text-2xl">{type.icon}</span>
                      <div>
                        <h3 className="font-bold text-xs text-slate-900 dark:text-white">{type.name}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">info</span>
                  Informações sobre o teste
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Duração:</strong> Aproximadamente 20-25 minutos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Questões:</strong> 60 afirmações divididas em 12 arquétipos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Objetivo:</strong> Identificar seus arquétipos dominantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span>Avalie cada afirmação de acordo com o quanto ela se aplica a você</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={() => setHasStarted(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Iniciar Teste
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <FormLayout currentStep={currentStep} totalSteps={12} progress={progress}>
      {/* Header */}
      <TestHeader
        testNumber="Arquétipos"
        title="Descubra Seus Arquétipos de Jung"
        objective="Baseado na teoria dos arquétipos de Carl Jung, este teste identifica os padrões de personalidade que mais se alinham com você."
        currentStep={currentStep}
        stepTitle={stepTitles[currentStep]}
        savedResults={savedResults}
        onShowResults={() => setShowResultsModal(true)}
      />

      {/* Form */}
      <form 
        className="flex flex-col gap-8 mt-8" 
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && currentStep < 12) {
            e.preventDefault()
            return false
          }
        }}
      >
        {/* Etapas 1-12: Questões de Arquétipos */}
        {currentStep >= 1 && currentStep <= 12 && questions[currentStep] && (
        <FormSection title={stepTitles[currentStep]} subtitle={subtitles[currentStep]}>
          {questions[currentStep].map((item) => (
            <FullWidthItem key={item.q}>
              <LikertScale
                name={`q${item.q}`}
                label={item.label}
                value={formData[`q${item.q}`]}
                onChange={handleInputChange}
                error={errors[`q${item.q}`]}
              />
            </FullWidthItem>
          ))}
        </FormSection>
        )}

        {/* Form Navigation */}
        <TestNavigation
          currentStep={currentStep}
          totalSteps={12}
          completedSteps={completedSteps}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
          stepTitles={stepTitles}
        />
      </form>

      {/* Modal de Resultados */}
      <ResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        testId="archetypes"
        testData={savedResults}
      />
    </FormLayout>
  )
}

export default ArchetypesTest

