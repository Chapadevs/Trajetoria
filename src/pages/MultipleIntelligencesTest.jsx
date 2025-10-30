import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLayout from '../components/FormLayout'
import { TextInput, FormSection, FullWidthItem } from '../components/FormInput'
import ResultsModal from '../components/ResultsModal'
import { LikertScale } from '../components/shared/LikertScale'
import { TestHeader } from '../components/shared/TestHeader'
import { TestNavigation } from '../components/shared/TestNavigation'
import { useFormNavigation } from '../hooks/useFormNavigation'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTestResults } from '../hooks/useTestResults'
import { validateRequired, getErrorMessage } from '../utils/validationUtils'
import { saveDraft } from '../utils/storageUtils'

const MultipleIntelligencesTest = () => {
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
  } = useFormNavigation(9)
  
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
  } = useTestResults('multiple-intelligences')
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '',
    q16: '', q17: '', q18: '', q19: '', q20: '',
    q21: '', q22: '', q23: '', q24: '', q25: '',
    q26: '', q27: '', q28: '', q29: '', q30: '',
    q31: '', q32: '', q33: '', q34: '', q35: '',
    q36: '', q37: '', q38: '', q39: '', q40: ''
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
      if (!validateRequired(formData.fullName)) {
        newErrors.fullName = getErrorMessage('Nome completo')
      }
      if (!validateRequired(formData.email)) {
        newErrors.email = getErrorMessage('E-mail')
      } else if (!validateEmail(formData.email)) {
        newErrors.email = getErrorMessage('email', 'email')
      }
    } else {
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
    if (saveDraft('multiple-intelligences', formData)) {
      alert('Rascunho salvo com sucesso!')
    } else {
      alert('Erro ao salvar rascunho.')
    }
  }

  const calculateResults = () => {
    const scores = {
      espacial: 0,
      logica: 0,
      linguistica: 0,
      musical: 0,
      corporal: 0,
      interpessoal: 0,
      intrapessoal: 0,
      naturalista: 0
    }

    // Espacial (q1-q5), Lógica (q6-q10), Linguística (q11-q15), Musical (q16-q20)
    // Corporal (q21-q25), Interpessoal (q26-q30), Intrapessoal (q31-q35), Naturalista (q36-q40)
    for (let i = 1; i <= 5; i++) scores.espacial += parseInt(formData[`q${i}`]) || 0
    for (let i = 6; i <= 10; i++) scores.logica += parseInt(formData[`q${i}`]) || 0
    for (let i = 11; i <= 15; i++) scores.linguistica += parseInt(formData[`q${i}`]) || 0
    for (let i = 16; i <= 20; i++) scores.musical += parseInt(formData[`q${i}`]) || 0
    for (let i = 21; i <= 25; i++) scores.corporal += parseInt(formData[`q${i}`]) || 0
    for (let i = 26; i <= 30; i++) scores.interpessoal += parseInt(formData[`q${i}`]) || 0
    for (let i = 31; i <= 35; i++) scores.intrapessoal += parseInt(formData[`q${i}`]) || 0
    for (let i = 36; i <= 40; i++) scores.naturalista += parseInt(formData[`q${i}`]) || 0

    const percentages = {}
    Object.keys(scores).forEach(key => {
      percentages[key] = Math.round((scores[key] / 25) * 100)
    })

    return percentages
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (currentStep !== 9) return false
    
    const allPreviousStepsCompleted = [1, 2, 3, 4, 5, 6, 7, 8].every(step => completedSteps.includes(step))
    if (!allPreviousStepsCompleted) {
      alert('⚠️ Por favor, complete todas as etapas anteriores antes de enviar.')
      return false
    }
    
    if (!validateStep(9)) {
      alert('Por favor, revise os campos destacados antes de enviar.')
      return false
    }
    
    const results = calculateResults()
    saveResults(formData, results)
    
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1])
    const top3 = sorted.slice(0, 3)
    
    const intelligenceNames = {
      espacial: 'Espacial',
      logica: 'Lógico-Matemática',
      linguistica: 'Linguística',
      musical: 'Musical',
      corporal: 'Corporal-Cinestésica',
      interpessoal: 'Interpessoal',
      intrapessoal: 'Intrapessoal',
      naturalista: 'Naturalista'
    }

    alert(`🎉 Parabéns! Teste de Múltiplas Inteligências concluído com sucesso!\n\nSuas 3 inteligências mais fortes:\n1. ${intelligenceNames[top3[0][0]]}: ${top3[0][1]}%\n2. ${intelligenceNames[top3[1][0]]}: ${top3[1][1]}%\n3. ${intelligenceNames[top3[2][0]]}: ${top3[2][1]}%\n\nVocê será redirecionado para a página inicial.`)
    
    setTimeout(() => navigate('/'), 2000)
  }

  const stepTitles = {
    1: 'Suas Informações',
    2: 'Inteligência Espacial',
    3: 'Inteligência Lógico-Matemática',
    4: 'Inteligência Linguística',
    5: 'Inteligência Musical',
    6: 'Inteligência Corporal-Cinestésica',
    7: 'Inteligência Interpessoal',
    8: 'Inteligência Intrapessoal',
    9: 'Inteligência Naturalista'
  }

  const questions = {
    2: [
      { q: 1, label: 'Tenho facilidade para ler mapas e me orientar em lugares novos' },
      { q: 2, label: 'Gosto de desenhar, pintar ou criar imagens mentais vívidas' },
      { q: 3, label: 'Consigo visualizar objetos de diferentes ângulos na minha mente' },
      { q: 4, label: 'Aprecio arte visual, arquitetura e design' },
      { q: 5, label: 'Tenho facilidade para montar quebra-cabeças e jogos espaciais' }
    ],
    3: [
      { q: 6, label: 'Gosto de resolver problemas matemáticos e quebra-cabeças lógicos' },
      { q: 7, label: 'Tenho facilidade para identificar padrões e relações entre conceitos' },
      { q: 8, label: 'Prefiro explicações lógicas e baseadas em evidências' },
      { q: 9, label: 'Gosto de experimentar e testar hipóteses' },
      { q: 10, label: 'Sinto-me confortável trabalhando com números e estatísticas' }
    ],
    4: [
      { q: 11, label: 'Tenho facilidade para expressar minhas ideias por escrito' },
      { q: 12, label: 'Gosto de ler livros, artigos e outros textos' },
      { q: 13, label: 'Aprendo bem através de palestras e discussões verbais' },
      { q: 14, label: 'Tenho um vocabulário amplo e gosto de aprender palavras novas' },
      { q: 15, label: 'Consigo contar histórias de forma envolvente' }
    ],
    5: [
      { q: 16, label: 'Consigo identificar facilmente diferentes instrumentos em uma música' },
      { q: 17, label: 'Tenho facilidade para lembrar melodias e ritmos' },
      { q: 18, label: 'Gosto de cantar, tocar instrumentos ou compor músicas' },
      { q: 19, label: 'A música influencia bastante meu humor e concentração' },
      { q: 20, label: 'Consigo perceber quando uma nota está desafinada' }
    ],
    6: [
      { q: 21, label: 'Aprendo melhor quando posso praticar fisicamente' },
      { q: 22, label: 'Tenho boa coordenação motora e habilidades físicas' },
      { q: 23, label: 'Gosto de atividades que envolvem movimento e uso do corpo' },
      { q: 24, label: 'Tenho facilidade para imitar gestos e movimentos' },
      { q: 25, label: 'Prefiro trabalhar com as mãos em projetos práticos' }
    ],
    7: [
      { q: 26, label: 'Tenho facilidade para entender os sentimentos dos outros' },
      { q: 27, label: 'Gosto de trabalhar em equipe e colaborar com outras pessoas' },
      { q: 28, label: 'Sou bom em resolver conflitos entre pessoas' },
      { q: 29, label: 'As pessoas costumam me procurar para pedir conselhos' },
      { q: 30, label: 'Tenho facilidade para me comunicar e criar conexões com diferentes tipos de pessoas' }
    ],
    8: [
      { q: 31, label: 'Tenho uma boa compreensão das minhas próprias emoções' },
      { q: 32, label: 'Gosto de refletir sobre meus valores e objetivos de vida' },
      { q: 33, label: 'Prefiro trabalhar sozinho em alguns projetos' },
      { q: 34, label: 'Tenho consciência dos meus pontos fortes e áreas de melhoria' },
      { q: 35, label: 'Costumo fazer autorreflexão regularmente' }
    ],
    9: [
      { q: 36, label: 'Gosto de estar em contato com a natureza' },
      { q: 37, label: 'Tenho facilidade para identificar plantas, animais e outros elementos naturais' },
      { q: 38, label: 'Me preocupo com questões ambientais e sustentabilidade' },
      { q: 39, label: 'Gosto de observar padrões e mudanças na natureza' },
      { q: 40, label: 'Sinto-me revigorado quando passo tempo ao ar livre' }
    ]
  }

  const subtitles = {
    2: 'Capacidade de visualizar e manipular objetos no espaço',
    3: 'Habilidade para raciocínio lógico e resolução de problemas',
    4: 'Sensibilidade para a linguagem escrita e falada',
    5: 'Capacidade de perceber, criar e reproduzir música',
    6: 'Habilidade para usar o corpo de forma habilidosa',
    7: 'Capacidade de compreender e interagir com outras pessoas',
    8: 'Conhecimento de si mesmo e capacidade de autorreflexão',
    9: 'Sensibilidade para o mundo natural'
  }

  return (
    <FormLayout currentStep={currentStep} totalSteps={9} progress={progress}>
      {/* Header */}
      <TestHeader
        testNumber="Múltiplas Inteligências"
        title="Descubra Suas Múltiplas Inteligências"
        objective="Baseado na teoria de Howard Gardner, este teste identifica seus pontos fortes e como você pode aplicá-los em sua vida profissional."
        currentStep={currentStep}
        stepTitle={stepTitles[currentStep]}
        savedResults={savedResults}
        onShowResults={() => setShowResultsModal(true)}
      >
        {currentStep === 1 && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20 mt-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              O que são Múltiplas Inteligências?
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              A teoria das Múltiplas Inteligências, desenvolvida por Howard Gardner, propõe que a inteligência não é uma capacidade única, mas sim um conjunto de habilidades distintas que todos possuímos em diferentes níveis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { icon: 'timer', text: '10-15 minutos' },
                { icon: 'quiz', text: '40 Questões' },
                { icon: 'psychology', text: '8 Inteligências' },
                { icon: 'insights', text: 'Análise Detalhada' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
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
          if (e.key === 'Enter' && currentStep < 9) {
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

        {/* Etapas 2-9: Questões de Inteligências */}
        {currentStep >= 2 && currentStep <= 9 && questions[currentStep] && (
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
          totalSteps={9}
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
        testId="multiple-intelligences"
        testData={savedResults}
      />
    </FormLayout>
  )
}

export default MultipleIntelligencesTest
