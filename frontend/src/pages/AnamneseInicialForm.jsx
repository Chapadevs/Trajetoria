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
import { useTranslation } from 'react-i18next'

const AnamneseInicialForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  
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
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (hasStarted) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hasStarted])
  
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
          newErrors.nomeCompleto = getErrorMessage(t('tests.anamnese.fields.nomeCompleto.label'))
        }
        if (!validateRequired(formData.idade)) {
          newErrors.idade = getErrorMessage(t('tests.anamnese.fields.idade.label'))
        }
        if (!validateRequired(formData.cidadeEstado)) {
          newErrors.cidadeEstado = getErrorMessage(t('tests.anamnese.fields.cidadeEstado.label'))
        }
        if (!validateRequired(formData.email)) {
          newErrors.email = getErrorMessage(t('tests.anamnese.fields.email.label'))
        } else if (!validateEmail(formData.email)) {
          newErrors.email = getErrorMessage('email', 'email')
        }
        if (!validateRequired(formData.telefone)) {
          newErrors.telefone = getErrorMessage(t('tests.anamnese.fields.telefone.label'))
        }
        break

      case 2: // Seção 2 - Escolaridade
        if (!formData.nivelEscolaridade) {
          newErrors.nivelEscolaridade = t('tests.anamnese.errors.nivelEscolaridade')
        }
        if (!formData.estudandoAtualmente) {
          newErrors.estudandoAtualmente = t('tests.anamnese.errors.estudandoAtualmente')
        }
        break

      case 3: // Seção 3 - Experiências Profissionais
        if (!formData.situacaoProfissional) {
          newErrors.situacaoProfissional = t('tests.anamnese.errors.situacaoProfissional')
        }
        break

      case 4: // Seção 4 - Interesses
        if (formData.areasInteresse.length === 0) {
          newErrors.areasInteresse = t('tests.anamnese.errors.areasInteresse')
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
  const nivelEscolaridadeOptions = t('tests.anamnese.fields.nivelEscolaridade.options', { returnObjects: true })
  const simNaoOptions = t('tests.anamnese.fields.estudandoAtualmente.options', { returnObjects: true })
  const situacaoProfissionalOptions = t('tests.anamnese.fields.situacaoProfissional.options', { returnObjects: true })
  const tempoTrabalhoOptions = t('tests.anamnese.fields.tempoTrabalho.options', { returnObjects: true })
  const satisfacaoTrabalhoOptions = t('tests.anamnese.fields.satisfacaoTrabalho.options', { returnObjects: true })
  const areasInteresseOptions = t('tests.anamnese.fields.areasInteresse.options', { returnObjects: true })
  const ambienteTrabalhoOptions = t('tests.anamnese.fields.ambienteTrabalho.options', { returnObjects: true })
  const objetivosCarreiraOptions = t('tests.anamnese.fields.objetivosCarreira.options', { returnObjects: true })

  // Títulos das etapas
  const stepTitles = {
    1: t('tests.anamnese.steps.1'),
    2: t('tests.anamnese.steps.2'),
    3: t('tests.anamnese.steps.3'),
    4: t('tests.anamnese.steps.4'),
    5: t('tests.anamnese.steps.5'),
  }

  // Tela de introdução antes de iniciar o formulário
  if (!hasStarted) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <div className="mx-auto w-full max-w-4xl px-4 py-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6152BD] mb-6">
                <span className="material-symbols-outlined text-white text-4xl">person</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {t('tests.anamnese.intro.title')}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {t('tests.anamnese.intro.subtitle')}
              </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 mb-8">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border border-primary/20">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('tests.anamnese.intro.whyTitle')}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t('tests.anamnese.intro.whyText')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'badge', ...t('tests.anamnese.intro.tiles.0', { returnObjects: true }) },
                  { icon: 'school', ...t('tests.anamnese.intro.tiles.1', { returnObjects: true }) },
                  { icon: 'work', ...t('tests.anamnese.intro.tiles.2', { returnObjects: true }) },
                  { icon: 'favorite', ...t('tests.anamnese.intro.tiles.3', { returnObjects: true }) },
                  { icon: 'psychology', ...t('tests.anamnese.intro.tiles.4', { returnObjects: true }) },
                  { icon: 'flag', ...t('tests.anamnese.intro.tiles.5', { returnObjects: true }) },
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
                  {t('tests.anamnese.intro.infoTitle')}
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.anamnese.intro.duration')}</strong> {t('tests.anamnese.intro.durationText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.anamnese.intro.sections')}</strong> {t('tests.anamnese.intro.sectionsText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.anamnese.intro.privacy')}</strong> {t('tests.anamnese.intro.privacyText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span>{t('tests.anamnese.intro.saveText')}</span>
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
                {t('tests.anamnese.intro.backButton')}
              </button>
              <button
                onClick={() => setHasStarted(true)}
                className="px-8 py-3 rounded-lg bg-[#6152BD] text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {t('tests.anamnese.intro.startButton')}
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
        testNumber={t('tests.anamnese.header.testNumber')}
        title={t('tests.anamnese.header.title')}
        objective={t('tests.anamnese.header.objective')}
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
        <FormSection title={t('tests.anamnese.steps.1')}>
          <TextInput
            label={t('tests.anamnese.fields.nomeCompleto.label')}
            id="nomeCompleto"
            placeholder={t('tests.anamnese.fields.nomeCompleto.placeholder')}
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            error={errors.nomeCompleto}
            required
          />
          <TextInput
            label={t('tests.anamnese.fields.idade.label')}
            id="idade"
            type="number"
            placeholder={t('tests.anamnese.fields.idade.placeholder')}
            value={formData.idade}
            onChange={handleInputChange}
            error={errors.idade}
            required
          />
          <FullWidthItem>
            <TextInput
              label={t('tests.anamnese.fields.cidadeEstado.label')}
              id="cidadeEstado"
              placeholder={t('tests.anamnese.fields.cidadeEstado.placeholder')}
              value={formData.cidadeEstado}
              onChange={handleInputChange}
              error={errors.cidadeEstado}
              required
            />
          </FullWidthItem>
          <TextInput
            label={t('tests.anamnese.fields.email.label')}
            id="email"
            type="email"
            placeholder={t('tests.anamnese.fields.email.placeholder')}
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
          <TextInput
            label={t('tests.anamnese.fields.telefone.label')}
            id="telefone"
            type="tel"
            placeholder={t('tests.anamnese.fields.telefone.placeholder')}
            value={formData.telefone}
            onChange={handleInputChange}
            error={errors.telefone}
            required
          />
        </FormSection>
        )}

        {/* Etapa 2: Escolaridade */}
        {currentStep === 2 && (
        <FormSection title={t('tests.anamnese.fields.nivelEscolaridade.sectionTitle')}>
          <FullWidthItem>
            <RadioGroup
              label={t('tests.anamnese.fields.nivelEscolaridade.label')}
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
              label={t('tests.anamnese.fields.estudandoAtualmente.label')}
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
              label={t('tests.anamnese.fields.areaEstudo.label')}
              id="areaEstudo"
              placeholder={t('tests.anamnese.fields.areaEstudo.placeholder')}
              value={formData.areaEstudo}
              onChange={handleInputChange}
              rows={3}
            />
          </FullWidthItem>
        </FormSection>
        )}

        {/* Etapa 3: Experiências no ramo profissional */}
        {currentStep === 3 && (
        <FormSection title={t('tests.anamnese.fields.situacaoProfissional.sectionTitle')}>
          <FullWidthItem>
            <RadioGroup
              label={t('tests.anamnese.fields.situacaoProfissional.label')}
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
              label={t('tests.anamnese.fields.tempoTrabalho.label')}
              id="tempoTrabalho"
              options={tempoTrabalhoOptions}
              value={formData.tempoTrabalho}
              onChange={handleInputChange}
              placeholder={t('tests.anamnese.fields.tempoTrabalho.placeholder')}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label={t('tests.anamnese.fields.ocupacaoAtual.label')}
              id="ocupacaoAtual"
              placeholder={t('tests.anamnese.fields.ocupacaoAtual.placeholder')}
              value={formData.ocupacaoAtual}
              onChange={handleInputChange}
              rows={3}
            />
          </FullWidthItem>
          <FullWidthItem>
            <RadioGroup
              label={t('tests.anamnese.fields.satisfacaoTrabalho.label')}
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
        <FormSection title={t('tests.anamnese.fields.areasInteresse.sectionTitle')}>
          <FullWidthItem>
            <MultiSelectCheckbox
              label={t('tests.anamnese.fields.areasInteresse.label')}
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
              label={t('tests.anamnese.fields.ambienteTrabalho.label')}
              id="ambienteTrabalho"
              options={ambienteTrabalhoOptions}
              value={formData.ambienteTrabalho}
              onChange={handleInputChange}
            />
          </FullWidthItem>
          <FullWidthItem>
            <MultiSelectCheckbox
              label={t('tests.anamnese.fields.objetivosCarreira.label')}
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
        <FormSection title={t('tests.anamnese.steps.5')}>
          <FullWidthItem>
            <TextArea
              label={t('tests.anamnese.fields.pontosFortesHabilidades.label')}
              id="pontosFortesHabilidades"
              placeholder={t('tests.anamnese.fields.pontosFortesHabilidades.placeholder')}
              value={formData.pontosFortesHabilidades}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label={t('tests.anamnese.fields.desafiosDificuldades.label')}
              id="desafiosDificuldades"
              placeholder={t('tests.anamnese.fields.desafiosDificuldades.placeholder')}
              value={formData.desafiosDificuldades}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label={t('tests.anamnese.fields.motivacaoOrientacao.label')}
              id="motivacaoOrientacao"
              placeholder={t('tests.anamnese.fields.motivacaoOrientacao.placeholder')}
              value={formData.motivacaoOrientacao}
              onChange={handleInputChange}
              rows={5}
            />
          </FullWidthItem>
          <FullWidthItem>
            <TextArea
              label={t('tests.anamnese.fields.expectativasProcesso.label')}
              id="expectativasProcesso"
              placeholder={t('tests.anamnese.fields.expectativasProcesso.placeholder')}
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
