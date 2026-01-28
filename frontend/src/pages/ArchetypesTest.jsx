import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import FormLayout from '../components/layout/FormLayout/FormLayout'
import { FormSection, FullWidthItem } from '../components/forms/inputs/FormFields'
import AssessmentResultsModal from '../components/modals/AssessmentResults/AssessmentResultsModal'
import { LikertScale } from '../components/shared/LikertScale'
import { TestHeader } from '../components/shared/TestHeader'
import { TestNavigation } from '../components/shared/TestNavigation'
import { useFormNavigation } from '../hooks/useFormNavigation'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTestResults } from '../hooks/useTestResults'
import { saveDraft } from '../utils/storageUtils'

const ArchetypesTest = () => {
  const { t } = useTranslation()
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
  const location = useLocation()
  
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
    q36: '', q37: '', q38: '', q39: '', q40: '',
    q41: '', q42: '', q43: '', q44: '', q45: '',
    q46: '', q47: '', q48: '', q49: '', q50: '',
    q51: '', q52: '', q53: '', q54: '', q55: '',
    q56: '', q57: '', q58: '', q59: '', q60: ''
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
        newErrors[`q${i}`] = t('tests.archetypes.errorSelect')
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
    saveDraft('archetypes', formData)
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
      return false
    }
    
    if (!validateStep(12)) {
      return false
    }
    
    const results = calculateResults()
    saveResults(formData, results)
    
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1])
    const top3 = sorted.slice(0, 3)
    
    setTimeout(() => navigate('/'), 2000)
  }

  const stepTitles = useMemo(() => t('tests.archetypes.steps', { returnObjects: true }), [t])
  const subtitles = useMemo(() => t('tests.archetypes.subtitles', { returnObjects: true }), [t])
  const questions = useMemo(() => {
    const qs = {}
    for (let s = 1; s <= 12; s++) {
      const stepData = t(`tests.archetypes.questions.step${s}`, { returnObjects: true })
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
                <span className="material-symbols-outlined text-white text-4xl">stars</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {t('tests.archetypes.intro.title')}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {t('tests.archetypes.intro.subtitle')}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border border-primary/20">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('tests.archetypes.intro.whatIs')}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t('tests.archetypes.intro.whatIsDesc')}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(t('tests.archetypes.intro.types', { returnObjects: true }) || []).map((type, idx) => (
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
                  {t('tests.archetypes.intro.infoTitle')}
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.archetypes.intro.duration')}</strong> {t('tests.archetypes.intro.durationText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.archetypes.intro.questionsCount')}</strong> {t('tests.archetypes.intro.questionsCountText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span><strong>{t('tests.archetypes.intro.objective')}</strong> {t('tests.archetypes.intro.objectiveText')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                    <span>{t('tests.archetypes.intro.honesty')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {t('tests.archetypes.intro.backButton')}
              </button>
              <button
                onClick={() => setHasStarted(true)}
                className="px-8 py-3 rounded-lg bg-[#6152BD] text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {t('tests.archetypes.intro.startButton')}
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
        testNumber={t('tests.archetypes.header.testNumber')}
        title={t('tests.archetypes.header.title')}
        objective={t('tests.archetypes.header.objective')}
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

      <AssessmentResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        testId="archetypes"
        testData={savedResults}
      />

    </FormLayout>
  )
}

export default ArchetypesTest

