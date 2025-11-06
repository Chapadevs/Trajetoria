import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLayout from '../components/FormLayout'
import { TextInput, FormSection, FullWidthItem } from '../components/FormInput'
import ResultsModal from '../components/ResultsModal'
import { QuestionBlock } from '../components/shared/RadioGroup'
import { TestHeader } from '../components/shared/TestHeader'
import { TestNavigation } from '../components/shared/TestNavigation'
import { useFormNavigation } from '../hooks/useFormNavigation'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTestResults } from '../hooks/useTestResults'
import { validateRequired, getErrorMessage } from '../utils/validationUtils'
import { saveDraft } from '../utils/storageUtils'

const DiscPersonalityTest = () => {
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
  } = useFormNavigation(5)
  
  const { 
    errors, 
    validateEmail, 
    clearAllErrors, 
    setMultipleErrors 
  } = useFormValidation()
  
  const { 
    savedResults, 
    showResultsModal, 
    setShowResultsModal, 
    saveResults 
  } = useTestResults('disc-insight')
  
  const [hasStarted, setHasStarted] = useState(false)
  
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '',
    q16: '', q17: '', q18: '', q19: '', q20: '',
    q21: '', q22: '', q23: '', q24: '', q25: ''
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

    // Valida 5 questões por etapa
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
    if (saveDraft('disc-insight', formData)) {
      alert('Rascunho salvo com sucesso!')
    } else {
      alert('Erro ao salvar rascunho.')
    }
  }

  const calculateResults = () => {
    const scores = { D: 0, I: 0, S: 0, C: 0 }
    const questionMapping = [
      ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'],
      ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'],
      ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'],
      ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'],
      ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C'], ['D', 'I', 'S', 'C']
    ]

    for (let i = 1; i <= 25; i++) {
      const answer = parseInt(formData[`q${i}`])
      if (!isNaN(answer)) {
        const type = questionMapping[i - 1][answer]
        scores[type]++
      }
    }

    const total = scores.D + scores.I + scores.S + scores.C
    const percentages = {
      D: Math.round((scores.D / total) * 100),
      I: Math.round((scores.I / total) * 100),
      S: Math.round((scores.S / total) * 100),
      C: Math.round((scores.C / total) * 100)
    }

    return percentages
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (currentStep !== 5) return false
    
    const allPreviousStepsCompleted = [1, 2, 3, 4].every(step => completedSteps.includes(step))
    if (!allPreviousStepsCompleted) {
      alert('⚠️ Por favor, complete todas as etapas anteriores antes de enviar.')
      return false
    }
    
    if (!validateStep(5)) {
      alert('Por favor, revise os campos destacados antes de enviar.')
      return false
    }
    
    const percentages = calculateResults()
    saveResults(formData, percentages)
    
    const dominant = Object.entries(percentages).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    const typeNames = { D: 'Dominância', I: 'Influência', S: 'Estabilidade', C: 'Conformidade' }

    alert(`🎉 Parabéns! Teste 2 - DISC Insight concluído com sucesso!\n\nSeu perfil dominante: ${typeNames[dominant]} (${percentages[dominant]}%)\n\nDistribuição completa:\n• Dominância: ${percentages.D}%\n• Influência: ${percentages.I}%\n• Estabilidade: ${percentages.S}%\n• Conformidade: ${percentages.C}%\n\nVocê será redirecionado para a página inicial.`)
    
    setTimeout(() => navigate('/'), 2000)
  }

  const stepTitles = {
    1: 'Comportamento no Trabalho',
    2: 'Resolução de Problemas e Decisões',
    3: 'Comunicação e Feedback',
    4: 'Gestão e Adaptação',
    5: 'Estilo Pessoal e Preferências'
  }

  // Dados das questões (continuará com as questões originais)
  const questions = {
    1: [
      { q: 1, text: 'Em situações de trabalho, eu tendo a:', options: ['Tomar decisões rapidamente e assumir a liderança', 'Buscar consenso e motivar a equipe', 'Manter a calma e buscar estabilidade', 'Analisar detalhadamente antes de agir'] },
      { q: 2, text: 'Quando enfrento conflitos, eu:', options: ['Confronto diretamente o problema', 'Tento persuadir e encontrar soluções criativas', 'Evito confrontos e busco harmonia', 'Analiso cuidadosamente todos os aspectos'] },
      { q: 3, text: 'Meu estilo de comunicação é:', options: ['Direto e objetivo', 'Entusiástico e expressivo', 'Calmo e paciente', 'Preciso e detalhado'] },
      { q: 4, text: 'Em reuniões, eu costumo:', options: ['Conduzir e tomar decisões', 'Contribuir com ideias e energizar o grupo', 'Ouvir e apoiar as decisões do grupo', 'Fazer perguntas e questionar detalhes'] },
      { q: 5, text: 'Quando trabalho em equipe, eu:', options: ['Assumo responsabilidades e comando', 'Motivo e inspiro os outros', 'Sou confiável e colaborativo', 'Garanto que tudo seja feito corretamente'] }
    ],
    2: [
      { q: 6, text: 'Sob pressão, eu:', options: ['Tomo ação imediata', 'Busco apoio e motivação dos outros', 'Mantenho a compostura', 'Analiso a situação metodicamente'] },
      { q: 7, text: 'Minha abordagem para resolver problemas é:', options: ['Focada em resultados rápidos', 'Criativa e colaborativa', 'Sistemática e cuidadosa', 'Baseada em dados e análise'] },
      { q: 8, text: 'Em novos projetos, eu:', options: ['Me lanço de cabeça', 'Fico empolgado com as possibilidades', 'Prefiro entender tudo antes de começar', 'Planejo meticulosamente cada etapa'] },
      { q: 9, text: 'Quando tomo decisões, eu:', options: ['Confio na minha intuição e experiência', 'Consulto outras pessoas', 'Considero o impacto em todos', 'Analiso todas as opções disponíveis'] },
      { q: 10, text: 'Meu ambiente de trabalho ideal é:', options: ['Dinâmico com desafios constantes', 'Social e estimulante', 'Estável e previsível', 'Organizado e estruturado'] }
    ],
    3: [
      { q: 11, text: 'Quando recebo feedback, eu:', options: ['Aceito e implemento rapidamente', 'Discuto e busco entender o contexto', 'Escuto pacientemente e reflito', 'Analiso criticamente e questiono'] },
      { q: 12, text: 'Em situações de mudança, eu:', options: ['Adapto-me rapidamente', 'Vejo como uma oportunidade empolgante', 'Preciso de tempo para me ajustar', 'Quero entender todos os detalhes primeiro'] },
      { q: 13, text: 'Minha motivação principal no trabalho é:', options: ['Alcançar resultados e vencer desafios', 'Reconhecimento e interação social', 'Segurança e harmonia no ambiente', 'Qualidade e precisão no trabalho'] },
      { q: 14, text: 'Quando lidero uma equipe, eu:', options: ['Estabeleço metas claras e cobraço resultados', 'Inspiro e motivo através do entusiasmo', 'Apoio e desenvolvo cada membro', 'Defino processos e padrões claros'] },
      { q: 15, text: 'Em apresentações, eu:', options: ['Vou direto ao ponto', 'Uso histórias e exemplos envolventes', 'Sou calmo e metódico', 'Apresento dados detalhados e precisos'] }
    ],
    4: [
      { q: 16, text: 'Minha abordagem para prazos é:', options: ['Trabalho intensamente para cumprir', 'Mantenho o otimismo mesmo sob pressão', 'Planejo com antecedência para evitar pressa', 'Organizo tudo meticulosamente desde o início'] },
      { q: 17, text: 'Quando cometo erros, eu:', options: ['Aceito a responsabilidade e sigo em frente', 'Mantenho o otimismo e aprendo com a experiência', 'Reflito cuidadosamente sobre o que aconteceu', 'Analiso detalhadamente para evitar repetição'] },
      { q: 18, text: 'Em networking, eu:', options: ['Foco em contatos que podem trazer resultados', 'Gosto de conhecer pessoas e fazer amizades', 'Prefiro aprofundar relacionamentos existentes', 'Sou seletivo e cauteloso com novos contatos'] },
      { q: 19, text: 'Minha forma de lidar com detalhes é:', options: ['Foco no que é essencial para o resultado', 'Delego ou passo rapidamente pelos detalhes', 'Sou cuidadoso mas não obsessivo', 'Presto atenção meticulosa a cada detalhe'] },
      { q: 20, text: 'Em situações de risco, eu:', options: ['Assumo riscos calculados para grandes ganhos', 'Sou otimista sobre os resultados', 'Prefiro alternativas mais seguras', 'Analiso todos os riscos antes de decidir'] }
    ],
    5: [
      { q: 21, text: 'Meu estilo de aprendizagem é:', options: ['Prático, aprendendo através da experiência', 'Social, aprendendo com e através de outros', 'Gradual, precisando de tempo para absorver', 'Teórico, estudando profundamente o assunto'] },
      { q: 22, text: 'Quando trabalho sozinho, eu:', options: ['Sou mais produtivo e focado', 'Sinto falta da interação social', 'Aprecio a tranquilidade e concentração', 'Posso me aprofundar sem interrupções'] },
      { q: 23, text: 'Em situações de incerteza, eu:', options: ['Tomo decisões com base nas informações disponíveis', 'Mantenho uma atitude positiva', 'Busco estabilidade e informações tranquilizadoras', 'Procuro obter mais dados antes de agir'] },
      { q: 24, text: 'Minha relação com autoridade é:', options: ['Questiono quando necessário', 'Busco construir relacionamentos positivos', 'Respeito e sigo as diretrizes estabelecidas', 'Espero clareza e consistência nas instruções'] },
      { q: 25, text: 'Ao final do dia de trabalho, eu me sinto mais satisfeito quando:', options: ['Alcancei metas importantes', 'Tive interações positivas com colegas', 'Contribuí para a harmonia da equipe', 'Completei tarefas com qualidade e precisão'] }
    ]
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
                <span className="material-symbols-outlined text-white text-4xl">psychology</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Teste DISC
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Descubra Seu Perfil de Personalidade
              </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  O que é o DISC?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O DISC é uma ferramenta de avaliação comportamental que identifica quatro tipos principais de personalidade. Este modelo ajuda você a entender melhor seu estilo de trabalho, comunicação e relacionamento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { letter: 'D', name: 'Dominância', desc: 'Orientado para resultados, direto e decidido', color: 'red', icon: 'trending_up' },
                  { letter: 'I', name: 'Influência', desc: 'Sociável, persuasivo e otimista', color: 'yellow', icon: 'emoji_people' },
                  { letter: 'S', name: 'Estabilidade', desc: 'Estável, paciente e leal', color: 'green', icon: 'shield' },
                  { letter: 'C', name: 'Conformidade', desc: 'Preciso, analítico e sistemático', color: 'blue', icon: 'checklist' }
                ].map((type, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-black text-xl">{type.letter}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{type.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{type.desc}</p>
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
                    <span><strong>Duração:</strong> Aproximadamente 10-15 minutos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Questões:</strong> 25 perguntas sobre comportamento e estilo de trabalho</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Objetivo:</strong> Identificar seu perfil comportamental dominante</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span>Responda com sinceridade baseado em como você realmente age</span>
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
    <FormLayout currentStep={currentStep} totalSteps={5} progress={progress}>
      {/* Header */}
      <TestHeader
        testNumber="Teste 2"
        title="Descubra seu perfil de personalidade DISC"
        objective="Entenda melhor seu estilo de trabalho e relacionamento através desta avaliação comportamental."
        currentStep={currentStep}
        stepTitle={stepTitles[currentStep]}
        savedResults={savedResults}
        onShowResults={() => setShowResultsModal(true)}
      >
      </TestHeader>

      {/* Form */}
      <form 
        className="flex flex-col gap-8 mt-8" 
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && currentStep < 5) {
            e.preventDefault()
            return false
          }
        }}
      >
        {/* Etapas 1-5: Questões */}
        {currentStep >= 1 && currentStep <= 5 && questions[currentStep] && (
        <FormSection title={stepTitles[currentStep]}>
          {questions[currentStep].map((item) => (
            <FullWidthItem key={item.q}>
              <QuestionBlock
                number={item.q}
                question={item.text}
                options={item.options}
                name={`q${item.q}`}
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
          totalSteps={5}
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
        testId="disc-insight"
        testData={savedResults}
      />
    </FormLayout>
  )
}

export default DiscPersonalityTest
