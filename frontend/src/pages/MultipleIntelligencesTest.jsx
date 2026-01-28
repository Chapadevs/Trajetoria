import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import FormLayout from '../components/layout/FormLayout/FormLayout'
import { TextInput, FormSection, FullWidthItem } from '../components/forms/inputs/FormFields'
import AssessmentResultsModal from '../components/modals/AssessmentResults/AssessmentResultsModal'
import { LikertScale } from '../components/shared/LikertScale'
import { TestHeader } from '../components/shared/TestHeader'
import { TestNavigation } from '../components/shared/TestNavigation'
import { useFormNavigation } from '../hooks/useFormNavigation'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTestResults } from '../hooks/useTestResults'
import { validateRequired, getErrorMessage } from '../utils/validationUtils'
import { saveDraft } from '../utils/storageUtils'

const MultipleIntelligencesTest = () => {
  const { t } = useTranslation()
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
  } = useFormNavigation(8)
  
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
  
  const [hasStarted, setHasStarted] = useState(false)
  
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
  }, [location.search, location.pathname, setShowResultsModal, navigate])

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

    const startQ = (step - 1) * 5 + 1
    const endQ = startQ + 4
    
    for (let i = startQ; i <= endQ; i++) {
      if (!formData[`q${i}`]) {
        newErrors[`q${i}`] = t('tests.multipleIntelligences.errorSelect')
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
    saveDraft('multiple-intelligences', formData)
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
    
    if (currentStep !== 8) return false
    
    const allPreviousStepsCompleted = [1, 2, 3, 4, 5, 6, 7].every(step => completedSteps.includes(step))
    if (!allPreviousStepsCompleted) {
      return false
    }
    
    if (!validateStep(8)) {
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

    setTimeout(() => navigate('/'), 2000)
  }

  const stepTitles = useMemo(() => t('tests.multipleIntelligences.steps', { returnObjects: true }), [t])
  const subtitles = useMemo(() => t('tests.multipleIntelligences.subtitles', { returnObjects: true }), [t])
  const questions = useMemo(() => {
    const qs = {}
    for (let s = 1; s <= 8; s++) {
      const stepData = t(`tests.multipleIntelligences.questions.step${s}`, { returnObjects: true })
      qs[s] = Array.isArray(stepData) ? stepData.map((item, i) => ({ ...item, q: (s - 1) * 5 + i + 1 })) : []
    }
    return qs
  }, [t])

  // Tela de introdução antes de iniciar o teste
  if (!hasStarted) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <div className="mx-auto w-full max-w-4xl px-4 py-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6152BD] mb-6">
                <span className="material-symbols-outlined text-white text-4xl">lightbulb</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {t('tests.multipleIntelligences.intro.title')}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {t('tests.multipleIntelligences.intro.subtitle')}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border border-primary/20">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('tests.multipleIntelligences.intro.whatIs')}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t('tests.multipleIntelligences.intro.whatIsDesc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(t('tests.multipleIntelligences.intro.types', { returnObjects: true }) || []).map((type, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">{type.icon}</span>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{type.name}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">info</span>
                  {t('tests.multipleIntelligences.intro.infoTitle')}
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.multipleIntelligences.intro.duration')}</strong> {t('tests.multipleIntelligences.intro.durationText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.multipleIntelligences.intro.questionsCount')}</strong> {t('tests.multipleIntelligences.intro.questionsCountText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.multipleIntelligences.intro.objective')}</strong> {t('tests.multipleIntelligences.intro.objectiveText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span>{t('tests.multipleIntelligences.intro.honesty')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {t('tests.multipleIntelligences.intro.backButton')}
              </button>
              <button
                onClick={() => setHasStarted(true)}
                className="px-8 py-3 rounded-lg bg-[#6152BD] text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {t('tests.multipleIntelligences.intro.startButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <FormLayout currentStep={currentStep} totalSteps={8} progress={progress}>
      {/* Header */}
      <TestHeader
        testNumber={t('tests.multipleIntelligences.header.testNumber')}
        title={t('tests.multipleIntelligences.header.title')}
        objective={t('tests.multipleIntelligences.header.objective')}
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
          if (e.key === 'Enter' && currentStep < 8) {
            e.preventDefault()
            return false
          }
        }}
      >
        {/* Etapas 1-8: Questões de Inteligências */}
        {currentStep >= 1 && currentStep <= 8 && questions[currentStep] && (
        <FormSection
          title={stepTitles[currentStep]}
          subtitle={subtitles[currentStep]}
          showHeader={false}
        >
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
          totalSteps={8}
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
        testId="multiple-intelligences"
        testData={savedResults}
      />

    </FormLayout>
  )
}

export default MultipleIntelligencesTest
