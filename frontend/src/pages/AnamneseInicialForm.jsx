import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FormLayout from '../components/layout/FormLayout/FormLayout'
import { TextInput, SelectInput, TextArea, FormSection, FullWidthItem } from '../components/forms/inputs/FormFields'
import AssessmentResultsModal from '../components/modals/AssessmentResults/AssessmentResultsModal'
import { RadioGroup } from '../components/shared/RadioGroup'
import { MultiSelectCheckbox } from '../components/shared/MultiSelectCheckbox'
import { TestHeader } from '../components/shared/TestHeader'
import { TestNavigation } from '../components/shared/TestNavigation'
import { useFormNavigation } from '../hooks/useFormNavigation'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTestResults } from '../hooks/useTestResults'
import { validateRequired, getErrorMessage } from '../utils/validationUtils'
import { saveDraft } from '../utils/storageUtils'

const AnamneseInicialForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
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
  } = useTestResults('anamnese-inicial')
  
  const [hasStarted, setHasStarted] = useState(false)
  
  const [formData, setFormData] = useState({
    // Seção 1: Identificação e Contexto Pessoal
    nomeCompleto: '',
    idade: '',
    cidadeEstado: '',
    email: '',
    telefone: '',
    
    // Seção 2: Escolaridade
    nivelEscolaridade: '',
    estudandoAtualmente: '',
    areaEstudo: '',
    
    // Seção 3: Experiências Profissionais
    situacaoProfissional: '',
    tempoTrabalho: '',
    ocupacaoAtual: '',
    satisfacaoTrabalho: '',
    
    // Seção 4: Interesses
    areasInteresse: [],
    ambienteTrabalho: '',
    objetivosCarreira: [],
    
    // Seção 5: Reflexões sobre Trajetória
    pontosFortesHabilidades: '',
    desafiosDificuldades: '',
    motivacaoOrientacao: '',
    expectativasProcesso: ''
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('view') === 'results') {
      setShowResultsModal(true)
      params.delete('view')
      navigate(
        { pathname: location.pathname, search: params.toString() ? `?${params.toString()}` : '' },
        { replace: true }
      )
    }
  }, [location.search, setShowResultsModal, navigate])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch(step) {
      case 1: // Seção 1 - Identificação e Contexto Pessoal
        if (!validateRequired(formData.nomeCompleto)) {
          newErrors.nomeCompleto = getErrorMessage('Nome completo')
        }
        if (!validateRequired(formData.idade)) {
          newErrors.idade = getErrorMessage('Idade')
        }
        if (!validateRequired(formData.cidadeEstado)) {
          newErrors.cidadeEstado = getErrorMessage('Cidade/Estado')
        }
        if (!validateRequired(formData.email)) {
          newErrors.email = getErrorMessage('E-mail')
        } else if (!validateEmail(formData.email)) {
          newErrors.email = getErrorMessage('email', 'email')
        }
        if (!validateRequired(formData.telefone)) {
          newErrors.telefone = getErrorMessage('Telefone')
        }
        break

      case 2: // Seção 2 - Escolaridade
        if (!formData.nivelEscolaridade) {
          newErrors.nivelEscolaridade = 'Por favor, selecione seu nível de escolaridade.'
        }
        if (!formData.estudandoAtualmente) {
          newErrors.estudandoAtualmente = 'Por favor, indique se está estudando atualmente.'
        }
        break

      case 3: // Seção 3 - Experiências Profissionais
        if (!formData.situacaoProfissional) {
          newErrors.situacaoProfissional = 'Por favor, selecione sua situação profissional.'
        }
        break

      case 4: // Seção 4 - Interesses
        if (formData.areasInteresse.length === 0) {
          newErrors.areasInteresse = 'Por favor, selecione pelo menos uma área de interesse.'
        }
        break

      case 5: // Seção 5 - Reflexões (sem campos obrigatórios)
        break

      default:
        break
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
    saveDraft('anamnese-inicial', formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // PROTEÇÃO CRÍTICA: Só permite submit na etapa 5
    if (currentStep !== 5) {
      return false
    }
    
    // Verifica se todas as etapas anteriores foram completadas
    const allPreviousStepsCompleted = [1, 2, 3, 4].every(step => completedSteps.includes(step))
    if (!allPreviousStepsCompleted) {
      return false
    }
    
    // Valida a etapa atual (5)
    if (!validateStep(5)) {
      return false
    }
    
    // Validação final
    const requiredFieldsCheck = {
      nomeCompleto: validateRequired(formData.nomeCompleto),
      idade: validateRequired(formData.idade),
      cidadeEstado: validateRequired(formData.cidadeEstado),
      email: validateRequired(formData.email) && validateEmail(formData.email),
      telefone: validateRequired(formData.telefone),
      nivelEscolaridade: formData.nivelEscolaridade,
      estudandoAtualmente: formData.estudandoAtualmente,
      situacaoProfissional: formData.situacaoProfissional,
      areasInteresse: formData.areasInteresse.length > 0
    }
    
    const missingFields = Object.entries(requiredFieldsCheck)
      .filter(([_, value]) => !value)
    
    if (missingFields.length > 0) {
      return false
    }
    
    console.log('✅ Validação completa! Enviando anamnese...')
    
    // Salva no localStorage
    saveResults(formData)
    
    // Redireciona para a página inicial após 1.5 segundos
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  // Opções para os campos
  const nivelEscolaridadeOptions = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Ensino Técnico',
    'Ensino Superior (Cursando)',
    'Ensino Superior (Completo)',
    'Pós-graduação/Mestrado/Doutorado'
  ]

  const simNaoOptions = ['Sim', 'Não']

  const situacaoProfissionalOptions = [
    'Empregado(a)',
    'Desempregado(a)',
    'Autônomo(a)',
    'Apenas estudante',
    'Em busca do primeiro emprego'
  ]

  const tempoTrabalhoOptions = [
    'Não estou trabalhando',
    'Menos de 1 ano',
    '1 a 3 anos',
    '3 a 5 anos',
    'Mais de 5 anos'
  ]

  const satisfacaoTrabalhoOptions = [
    'Muito satisfeito(a)',
    'Satisfeito(a)',
    'Neutro',
    'Insatisfeito(a)',
    'Não se aplica / Não estou trabalhando'
  ]

  const areasInteresseOptions = [
    'Tecnologia e Inovação',
    'Saúde e Bem-estar',
    'Educação',
    'Comunicação e Marketing',
    'Administração e Gestão',
    'Artes e Design',
    'Engenharia',
    'Ciências Humanas',
    'Ciências Exatas',
    'Empreendedorismo',
    'Meio Ambiente',
    'Direito e Jurídico'
  ]

  const ambienteTrabalhoOptions = [
    'Escritório presencial',
    'Híbrido (presencial e remoto)',
    'Totalmente remoto',
    'Trabalho de campo/externo',
    'Indiferente'
  ]

  const objetivosCarreiraOptions = [
    'Estabilidade financeira',
    'Crescimento profissional',
    'Trabalhar com o que amo',
    'Flexibilidade de horário',
    'Reconhecimento profissional',
    'Fazer diferença na sociedade',
    'Ter meu próprio negócio',
    'Trabalhar remotamente'
  ]

  // Títulos das etapas
  const stepTitles = {
    1: 'Identificação e Contexto Pessoal',
    2: 'Escolaridade',
    3: 'Experiências Profissionais',
    4: 'Interesses',
    5: 'Reflexões sobre Trajetória'
  }

  // Tela de introdução antes de iniciar o formulário
  if (!hasStarted) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <div className="mx-auto w-full max-w-4xl px-4 py-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
                <span className="material-symbols-outlined text-white text-4xl">person</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Anamnese Inicial
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                "Quem é você hoje?"
              </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Por que este formulário é importante?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  A Anamnese Inicial é o primeiro passo da sua jornada de autoconhecimento. Este formulário coleta informações essenciais sobre você, sua formação, experiências e aspirações. Essas informações nos ajudarão a personalizar sua experiência e fornecer insights mais relevantes nos próximos testes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'badge', title: 'Identificação', desc: 'Dados pessoais básicos' },
                  { icon: 'school', title: 'Escolaridade', desc: 'Sua formação acadêmica' },
                  { icon: 'work', title: 'Experiência', desc: 'Seu histórico profissional' },
                  { icon: 'favorite', title: 'Interesses', desc: 'Áreas que despertam seu interesse' },
                  { icon: 'psychology', title: 'Reflexões', desc: 'Seus pontos fortes e desafios' },
                  { icon: 'flag', title: 'Objetivos', desc: 'Suas metas e expectativas' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">info</span>
                  Informações sobre o formulário
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Duração:</strong> Aproximadamente 15-20 minutos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Seções:</strong> 5 seções divididas por tema</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>Privacidade:</strong> Seus dados são confidenciais e seguros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span>Você pode salvar seu progresso e voltar depois</span>
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
                className="px-8 py-3 rounded-lg bg-[#6152BD] text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Começar
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
        testNumber="Teste 1"
        title='Anamnese Inicial: "Quem é você hoje?"'
        objective="Coletar dados básicos e contextuais sobre você, permitindo uma leitura mais personalizada dos demais testes e dos relatórios gerados pela plataforma."
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
          if (e.key === 'Enter' && currentStep < 5) {
            e.preventDefault()
            return false
          }
        }}
      >
        {/* Etapa 1: Identificação e Contexto Pessoal */}
        {currentStep === 1 && (
        <FormSection title="Identificação e Contexto Pessoal">
          <TextInput
            label="Nome Completo"
            id="nomeCompleto"
            placeholder="Digite seu nome completo"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            error={errors.nomeCompleto}
            required
          />
          <TextInput
            label="Idade"
            id="idade"
            type="number"
            placeholder="Digite sua idade"
            value={formData.idade}
            onChange={handleInputChange}
            error={errors.idade}
            required
          />
          <FullWidthItem>
            <TextInput
              label="Cidade/Estado"
              id="cidadeEstado"
              placeholder="Ex: São Paulo/SP"
              value={formData.cidadeEstado}
              onChange={handleInputChange}
              error={errors.cidadeEstado}
              required
            />
          </FullWidthItem>
          <TextInput
            label="E-mail"
            id="email"
            type="email"
            placeholder="voce@exemplo.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
          <TextInput
            label="Telefone"
            id="telefone"
            type="tel"
            placeholder="(11) 98765-4321"
            value={formData.telefone}
            onChange={handleInputChange}
            error={errors.telefone}
            required
          />
        </FormSection>
        )}

        {/* Etapa 2: Escolaridade */}
        {currentStep === 2 && (
        <FormSection title="Qual seu nível de escolaridade?">
          <FullWidthItem>
            <RadioGroup
              label="Nível de Escolaridade"
              id="nivelEscolaridade"
              options={nivelEscolaridadeOptions}
              value={formData.nivelEscolaridade}
              onChange={handleInputChange}
              error={errors.nivelEscolaridade}
              required
            />
          </FullWidthItem>
          <FullWidthItem>
            <RadioGroup
              label="Está estudando atualmente?"
              id="estudandoAtualmente"
              options={simNaoOptions}
              value={formData.estudandoAtualmente}
              onChange={handleInputChange}
              error={errors.estudandoAtualmente}
              required
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label="Qual área de estudo/formação?"
              id="areaEstudo"
              placeholder="Descreva sua área de estudo ou formação..."
              value={formData.areaEstudo}
              onChange={handleInputChange}
              rows={3}
            />
          </FullWidthItem>
        </FormSection>
        )}

        {/* Etapa 3: Experiências no ramo profissional */}
        {currentStep === 3 && (
        <FormSection title="Experiências no ramo profissional">
          <FullWidthItem>
            <RadioGroup
              label="Qual sua situação profissional atual?"
              id="situacaoProfissional"
              options={situacaoProfissionalOptions}
              value={formData.situacaoProfissional}
              onChange={handleInputChange}
              error={errors.situacaoProfissional}
              required
            />
          </FullWidthItem>
          <FullWidthItem>
            <SelectInput
              label="Há quanto tempo trabalha ou já trabalhou?"
              id="tempoTrabalho"
              options={tempoTrabalhoOptions}
              value={formData.tempoTrabalho}
              onChange={handleInputChange}
              placeholder="Selecione uma opção"
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label="Se está trabalhando, qual sua ocupação/cargo atual?"
              id="ocupacaoAtual"
              placeholder="Descreva sua ocupação ou cargo atual..."
              value={formData.ocupacaoAtual}
              onChange={handleInputChange}
              rows={3}
            />
          </FullWidthItem>
          <FullWidthItem>
            <RadioGroup
              label="Como você avalia sua satisfação com o trabalho atual?"
              id="satisfacaoTrabalho"
              options={satisfacaoTrabalhoOptions}
              value={formData.satisfacaoTrabalho}
              onChange={handleInputChange}
            />
          </FullWidthItem>
        </FormSection>
        )}

        {/* Etapa 4: Interesses */}
        {currentStep === 4 && (
        <FormSection title="Quais os seus interesses?">
          <FullWidthItem>
            <MultiSelectCheckbox
              label="Quais áreas profissionais despertam seu interesse?"
              id="areasInteresse"
              options={areasInteresseOptions}
              value={formData.areasInteresse}
              onChange={handleInputChange}
              maxSelections={5}
              error={errors.areasInteresse}
              required
            />
          </FullWidthItem>
          <FullWidthItem>
            <RadioGroup
              label="Qual tipo de ambiente de trabalho prefere?"
              id="ambienteTrabalho"
              options={ambienteTrabalhoOptions}
              value={formData.ambienteTrabalho}
              onChange={handleInputChange}
            />
          </FullWidthItem>
          <FullWidthItem>
            <MultiSelectCheckbox
              label="Quais são seus principais objetivos de carreira?"
              id="objetivosCarreira"
              options={objetivosCarreiraOptions}
              value={formData.objetivosCarreira}
              onChange={handleInputChange}
              maxSelections={3}
            />
          </FullWidthItem>
        </FormSection>
        )}

        {/* Etapa 5: Reflexões sobre sua própria TRAJETÓRIA */}
        {currentStep === 5 && (
        <FormSection title="Reflexões sobre sua própria TRAJETÓRIA">
          <FullWidthItem>
            <TextArea
              label="Quais você considera serem seus principais pontos fortes ou habilidades?"
              id="pontosFortesHabilidades"
              placeholder="Pense em características, talentos ou competências que você domina bem..."
              value={formData.pontosFortesHabilidades}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label="Quais são seus principais desafios ou dificuldades na vida profissional?"
              id="desafiosDificuldades"
              placeholder="Seja honesto sobre o que você sente que precisa desenvolver ou superar..."
              value={formData.desafiosDificuldades}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label="O que te motiva a buscar orientação profissional neste momento?"
              id="motivacaoOrientacao"
              placeholder="Conte um pouco sobre o que te trouxe até aqui..."
              value={formData.motivacaoOrientacao}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label="Quais são suas expectativas em relação a este processo de orientação?"
              id="expectativasProcesso"
              placeholder="O que você espera conquistar ou descobrir..."
              value={formData.expectativasProcesso}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
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

      <AssessmentResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        testId="anamnese-inicial"
        testData={savedResults}
      />

    </FormLayout>
  )
}

export default AnamneseInicialForm
