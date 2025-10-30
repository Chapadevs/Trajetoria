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
  } = useFormNavigation(6)
  
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
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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

    if (step === 1) {
      // Informações pessoais
      if (!validateRequired(formData.fullName)) {
        newErrors.fullName = getErrorMessage('Nome completo')
      }
      if (!validateRequired(formData.email)) {
        newErrors.email = getErrorMessage('E-mail')
      } else if (!validateEmail(formData.email)) {
        newErrors.email = getErrorMessage('email', 'email')
      }
    } else {
      // Valida 5 questões por etapa
      const startQ = (step - 2) * 5 + 1
      const endQ = startQ + 4
      
      for (let i = startQ; i <= endQ; i++) {
        if (!formData[`q${i}`]) {
          newErrors[`q${i}`] = 'Por favor, selecione uma opção.'
        }
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
    
    if (currentStep !== 6) return false
    
    const allPreviousStepsCompleted = [1, 2, 3, 4, 5].every(step => completedSteps.includes(step))
    if (!allPreviousStepsCompleted) {
      alert('⚠️ Por favor, complete todas as etapas anteriores antes de enviar.')
      return false
    }
    
    if (!validateStep(6)) {
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
    1: 'Suas Informações',
    2: 'Comportamento no Trabalho',
    3: 'Resolução de Problemas e Decisões',
    4: 'Comunicação e Feedback',
    5: 'Gestão e Adaptação',
    6: 'Estilo Pessoal e Preferências'
  }

  // Dados das questões (continuará com as questões originais)
  const questions = {
    2: [
      { q: 1, text: 'Em situações de trabalho, eu tendo a:', options: ['Tomar decisões rapidamente e assumir a liderança', 'Buscar consenso e motivar a equipe', 'Manter a calma e buscar estabilidade', 'Analisar detalhadamente antes de agir'] },
      { q: 2, text: 'Quando enfrento conflitos, eu:', options: ['Confronto diretamente o problema', 'Tento persuadir e encontrar soluções criativas', 'Evito confrontos e busco harmonia', 'Analiso cuidadosamente todos os aspectos'] },
      { q: 3, text: 'Meu estilo de comunicação é:', options: ['Direto e objetivo', 'Entusiástico e expressivo', 'Calmo e paciente', 'Preciso e detalhado'] },
      { q: 4, text: 'Em reuniões, eu costumo:', options: ['Conduzir e tomar decisões', 'Contribuir com ideias e energizar o grupo', 'Ouvir e apoiar as decisões do grupo', 'Fazer perguntas e questionar detalhes'] },
      { q: 5, text: 'Quando trabalho em equipe, eu:', options: ['Assumo responsabilidades e comando', 'Motivo e inspiro os outros', 'Sou confiável e colaborativo', 'Garanto que tudo seja feito corretamente'] }
    ],
    3: [
      { q: 6, text: 'Sob pressão, eu:', options: ['Tomo ação imediata', 'Busco apoio e motivação dos outros', 'Mantenho a compostura', 'Analiso a situação metodicamente'] },
      { q: 7, text: 'Minha abordagem para resolver problemas é:', options: ['Focada em resultados rápidos', 'Criativa e colaborativa', 'Sistemática e cuidadosa', 'Baseada em dados e análise'] },
      { q: 8, text: 'Em novos projetos, eu:', options: ['Me lanço de cabeça', 'Fico empolgado com as possibilidades', 'Prefiro entender tudo antes de começar', 'Planejo meticulosamente cada etapa'] },
      { q: 9, text: 'Quando tomo decisões, eu:', options: ['Confio na minha intuição e experiência', 'Consulto outras pessoas', 'Considero o impacto em todos', 'Analiso todas as opções disponíveis'] },
      { q: 10, text: 'Meu ambiente de trabalho ideal é:', options: ['Dinâmico com desafios constantes', 'Social e estimulante', 'Estável e previsível', 'Organizado e estruturado'] }
    ],
    4: [
      { q: 11, text: 'Quando recebo feedback, eu:', options: ['Aceito e implemento rapidamente', 'Discuto e busco entender o contexto', 'Escuto pacientemente e reflito', 'Analiso criticamente e questiono'] },
      { q: 12, text: 'Em situações de mudança, eu:', options: ['Adapto-me rapidamente', 'Vejo como uma oportunidade empolgante', 'Preciso de tempo para me ajustar', 'Quero entender todos os detalhes primeiro'] },
      { q: 13, text: 'Minha motivação principal no trabalho é:', options: ['Alcançar resultados e vencer desafios', 'Reconhecimento e interação social', 'Segurança e harmonia no ambiente', 'Qualidade e precisão no trabalho'] },
      { q: 14, text: 'Quando lidero uma equipe, eu:', options: ['Estabeleço metas claras e cobraço resultados', 'Inspiro e motivo através do entusiasmo', 'Apoio e desenvolvo cada membro', 'Defino processos e padrões claros'] },
      { q: 15, text: 'Em apresentações, eu:', options: ['Vou direto ao ponto', 'Uso histórias e exemplos envolventes', 'Sou calmo e metódico', 'Apresento dados detalhados e precisos'] }
    ],
    5: [
      { q: 16, text: 'Minha abordagem para prazos é:', options: ['Trabalho intensamente para cumprir', 'Mantenho o otimismo mesmo sob pressão', 'Planejo com antecedência para evitar pressa', 'Organizo tudo meticulosamente desde o início'] },
      { q: 17, text: 'Quando cometo erros, eu:', options: ['Aceito a responsabilidade e sigo em frente', 'Mantenho o otimismo e aprendo com a experiência', 'Reflito cuidadosamente sobre o que aconteceu', 'Analiso detalhadamente para evitar repetição'] },
      { q: 18, text: 'Em networking, eu:', options: ['Foco em contatos que podem trazer resultados', 'Gosto de conhecer pessoas e fazer amizades', 'Prefiro aprofundar relacionamentos existentes', 'Sou seletivo e cauteloso com novos contatos'] },
      { q: 19, text: 'Minha forma de lidar com detalhes é:', options: ['Foco no que é essencial para o resultado', 'Delego ou passo rapidamente pelos detalhes', 'Sou cuidadoso mas não obsessivo', 'Presto atenção meticulosa a cada detalhe'] },
      { q: 20, text: 'Em situações de risco, eu:', options: ['Assumo riscos calculados para grandes ganhos', 'Sou otimista sobre os resultados', 'Prefiro alternativas mais seguras', 'Analiso todos os riscos antes de decidir'] }
    ],
    6: [
      { q: 21, text: 'Meu estilo de aprendizagem é:', options: ['Prático, aprendendo através da experiência', 'Social, aprendendo com e através de outros', 'Gradual, precisando de tempo para absorver', 'Teórico, estudando profundamente o assunto'] },
      { q: 22, text: 'Quando trabalho sozinho, eu:', options: ['Sou mais produtivo e focado', 'Sinto falta da interação social', 'Aprecio a tranquilidade e concentração', 'Posso me aprofundar sem interrupções'] },
      { q: 23, text: 'Em situações de incerteza, eu:', options: ['Tomo decisões com base nas informações disponíveis', 'Mantenho uma atitude positiva', 'Busco estabilidade e informações tranquilizadoras', 'Procuro obter mais dados antes de agir'] },
      { q: 24, text: 'Minha relação com autoridade é:', options: ['Questiono quando necessário', 'Busco construir relacionamentos positivos', 'Respeito e sigo as diretrizes estabelecidas', 'Espero clareza e consistência nas instruções'] },
      { q: 25, text: 'Ao final do dia de trabalho, eu me sinto mais satisfeito quando:', options: ['Alcancei metas importantes', 'Tive interações positivas com colegas', 'Contribuí para a harmonia da equipe', 'Completei tarefas com qualidade e precisão'] }
    ]
  }

  return (
    <FormLayout currentStep={currentStep} totalSteps={6} progress={progress}>
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
        {currentStep === 1 && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20 mt-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              O que é o DISC?
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              O DISC é uma ferramenta de avaliação comportamental que identifica quatro tipos principais de personalidade:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { letter: 'D', name: 'Dominância', desc: 'Orientado para resultados, direto e decidido', color: 'red' },
                { letter: 'I', name: 'Influência', desc: 'Sociável, persuasivo e otimista', color: 'yellow' },
                { letter: 'S', name: 'Estabilidade', desc: 'Estável, paciente e leal', color: 'green' },
                { letter: 'C', name: 'Conformidade', desc: 'Preciso, analítico e sistemático', color: 'blue' }
              ].map((type, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`size-10 rounded-lg bg-${type.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-${type.color}-600 dark:text-${type.color}-400 font-black text-lg`}>{type.letter}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{type.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </TestHeader>

      {/* Form */}
      <form 
        className="flex flex-col gap-8 mt-8" 
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && currentStep < 6) {
            e.preventDefault()
            return false
          }
        }}
      >
        {/* Etapa 1: Informações Pessoais */}
        {currentStep === 1 && (
        <FormSection title="Suas Informações">
          <TextInput
            label="Nome Completo"
            id="fullName"
            name="fullName"
            placeholder="Digite seu nome completo"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            required
          />
          <TextInput
            label="E-mail"
            id="email"
            name="email"
            type="email"
            placeholder="voce@empresa.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
        </FormSection>
        )}

        {/* Etapas 2-6: Questões */}
        {currentStep >= 2 && currentStep <= 6 && questions[currentStep] && (
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
          totalSteps={6}
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
