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

const RiasecTest = () => {
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
  } = useTestResults('riasec')
  
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
      const endQ = Math.min(startQ + 4, 25)
      
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
    if (saveDraft('riasec', formData)) {
      alert('Rascunho salvo com sucesso!')
    } else {
      alert('Erro ao salvar rascunho.')
    }
  }

  const calculateResults = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
    const mapping = ['R', 'I', 'A', 'S', 'E', 'C']
    
    for (let i = 1; i <= 25; i++) {
      const answer = parseInt(formData[`q${i}`])
      if (!isNaN(answer) && answer >= 0 && answer <= 5) {
        scores[mapping[answer]]++
      }
    }

    const percentages = {}
    Object.keys(scores).forEach(key => {
      percentages[key] = Math.round((scores[key] / 25) * 100)
    })

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
    
    const results = calculateResults()
    saveResults(formData, results)
    
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1])
    const top = sorted[0]
    
    const profileNames = {
      R: 'Realista',
      I: 'Investigativo',
      A: 'Artístico',
      S: 'Social',
      E: 'Empreendedor',
      C: 'Convencional'
    }

    alert(`🎉 Parabéns! Teste RIASEC concluído com sucesso!\n\nSeu perfil dominante: ${profileNames[top[0]]} (${top[1]}%)\n\nDistribuição completa:\n• Realista: ${results.R}%\n• Investigativo: ${results.I}%\n• Artístico: ${results.A}%\n• Social: ${results.S}%\n• Empreendedor: ${results.E}%\n• Convencional: ${results.C}%\n\nVocê será redirecionado para a página inicial.`)
    
    setTimeout(() => navigate('/'), 2000)
  }

  const stepTitles = {
    1: 'Suas Informações',
    2: 'Preferências e Interesses (1-5)',
    3: 'Habilidades e Motivações (6-10)',
    4: 'Valores e Reconhecimento (11-15)',
    5: 'Ambiente e Características (16-20)',
    6: 'Decisões e Realização (21-25)'
  }

  const questions = {
    2: [
      { q: 1, text: 'Qual atividade você mais gostaria de realizar?', options: ['Consertar equipamentos ou máquinas', 'Conduzir experimentos científicos', 'Criar uma obra de arte ou design', 'Ajudar pessoas com seus problemas', 'Liderar uma equipe em um projeto', 'Organizar documentos e arquivos'] },
      { q: 2, text: 'Em qual ambiente você se sente mais confortável?', options: ['Oficina ou área externa', 'Laboratório ou biblioteca', 'Estúdio ou espaço criativo', 'Ambiente com interação social', 'Sala de reuniões ou escritório executivo', 'Escritório organizado e estruturado'] },
      { q: 3, text: 'Qual habilidade você considera mais importante?', options: ['Habilidade manual e técnica', 'Pensamento analítico e lógico', 'Criatividade e imaginação', 'Empatia e comunicação', 'Persuasão e negociação', 'Atenção aos detalhes e precisão'] },
      { q: 4, text: 'O que mais te motiva em um trabalho?', options: ['Trabalhar com objetos concretos e ferramentas', 'Resolver problemas complexos', 'Expressar ideias de forma original', 'Fazer diferença na vida das pessoas', 'Alcançar metas e resultados financeiros', 'Manter sistemas organizados e eficientes'] },
      { q: 5, text: 'Qual tipo de desafio você prefere?', options: ['Construir ou reparar algo físico', 'Investigar e descobrir novos conhecimentos', 'Criar algo único e inovador', 'Apoiar e desenvolver outras pessoas', 'Competir e vencer no mercado', 'Implementar processos e padrões'] }
    ],
    3: [
      { q: 6, text: 'Como você prefere aprender coisas novas?', options: ['Fazendo e praticando', 'Estudando teoria e pesquisando', 'Experimentando e improvisando', 'Conversando e trocando experiências', 'Aplicando em situações reais de negócio', 'Seguindo manuais e procedimentos'] },
      { q: 7, text: 'Qual seria seu projeto ideal de fim de semana?', options: ['Fazer reformas ou trabalhos manuais', 'Ler livros sobre ciência ou filosofia', 'Pintar, escrever ou fazer música', 'Fazer voluntariado ou ajudar amigos', 'Planejar um novo negócio ou investimento', 'Organizar a casa ou fazer planejamento financeiro'] },
      { q: 8, text: 'O que você valoriza mais em um colega de trabalho?', options: ['Ser prático e eficiente', 'Ser inteligente e racional', 'Ser original e inspirador', 'Ser gentil e compreensivo', 'Ser ambicioso e determinado', 'Ser organizado e confiável'] },
      { q: 9, text: 'Qual atividade escolar você mais gostava?', options: ['Educação física ou trabalhos práticos', 'Matemática ou ciências', 'Artes ou literatura', 'Trabalhos em grupo ou apresentações', 'Projetos de empreendedorismo ou liderança', 'Contabilidade ou organização de eventos'] },
      { q: 10, text: 'Como você lida com problemas?', options: ['Tento consertar ou resolver na prática', 'Analiso profundamente para entender a causa', 'Busco soluções criativas e diferentes', 'Peço ajuda e discuto com outras pessoas', 'Tomo decisões rápidas e sigo em frente', 'Sigo procedimentos estabelecidos'] }
    ],
    4: [
      { q: 11, text: 'Qual tipo de reconhecimento você mais valoriza?', options: ['Ver o resultado concreto do meu trabalho', 'Ser reconhecido pela minha expertise', 'Ter minha criatividade admirada', 'Receber gratidão das pessoas que ajudei', 'Alcançar posições de liderança e status', 'Ser elogiado pela qualidade e precisão'] },
      { q: 12, text: 'Qual ferramenta ou recurso você prefere usar?', options: ['Ferramentas manuais e equipamentos', 'Softwares de análise e pesquisa', 'Materiais artísticos ou programas de design', 'Redes sociais e ferramentas de comunicação', 'Planilhas financeiras e CRM', 'Sistemas de gestão e organização'] },
      { q: 13, text: 'O que você faz quando tem tempo livre?', options: ['Atividades físicas ou hobbies manuais', 'Estudar ou aprender algo novo', 'Atividades artísticas ou culturais', 'Passar tempo com amigos e família', 'Networking ou desenvolvendo projetos', 'Organizar coisas ou fazer planejamentos'] },
      { q: 14, text: 'Qual característica melhor te descreve?', options: ['Prático e direto', 'Curioso e questionador', 'Imaginativo e expressivo', 'Empático e prestativo', 'Ambicioso e persuasivo', 'Metódico e cuidadoso'] },
      { q: 15, text: 'Qual seria seu ambiente de trabalho ideal?', options: ['Ao ar livre ou em campo', 'Ambiente silencioso para concentração', 'Espaço inspirador e flexível', 'Local com muita interação humana', 'Escritório dinâmico e competitivo', 'Ambiente estruturado e previsível'] }
    ],
    5: [
      { q: 16, text: 'O que você acha mais interessante?', options: ['Como as coisas funcionam mecanicamente', 'Teorias e conceitos abstratos', 'Expressão artística e estética', 'Relacionamentos e psicologia humana', 'Estratégias de negócios e mercado', 'Sistemas, regras e processos'] },
      { q: 17, text: 'Como você prefere trabalhar?', options: ['De forma independente e autônoma', 'Com tempo para pesquisa e reflexão', 'Com liberdade criativa', 'Em colaboração com outras pessoas', 'Com metas claras e recompensas', 'Seguindo procedimentos estabelecidos'] },
      { q: 18, text: 'Qual tipo de livro ou filme você prefere?', options: ['Aventura e ação', 'Ficção científica ou documentários', 'Drama artístico ou obras autorais', 'Histórias sobre relacionamentos e pessoas', 'Biografias de empreendedores de sucesso', 'Suspense ou histórias de investigação'] },
      { q: 19, text: 'O que te deixa mais satisfeito?', options: ['Completar uma tarefa física ou prática', 'Resolver um problema complexo', 'Criar algo belo ou original', 'Ver alguém melhorar por minha ajuda', 'Fechar um bom negócio ou venda', 'Finalizar um projeto sem erros'] },
      { q: 20, text: 'Qual habilidade você gostaria de desenvolver?', options: ['Habilidades técnicas e manuais', 'Conhecimento científico avançado', 'Técnicas artísticas ou criativas', 'Inteligência emocional e social', 'Habilidades de vendas e negociação', 'Gestão de projetos e organização'] }
    ],
    6: [
      { q: 21, text: 'Como você toma decisões importantes?', options: ['Baseado em experiência prática', 'Após extensa pesquisa e análise', 'Seguindo minha intuição e criatividade', 'Considerando o impacto nas pessoas', 'Focando em resultados e lucros', 'Seguindo dados e procedimentos'] },
      { q: 22, text: 'O que você valoriza em uma carreira?', options: ['Trabalho manual e tangível', 'Desafios intelectuais constantes', 'Liberdade de expressão criativa', 'Oportunidade de ajudar os outros', 'Crescimento financeiro e poder', 'Estabilidade e clareza de funções'] },
      { q: 23, text: 'Qual seria seu emprego dos sonhos?', options: ['Trabalhar com as mãos criando ou consertando', 'Pesquisador ou cientista', 'Artista ou designer profissional', 'Profissional que trabalha diretamente com pessoas', 'Empreendedor ou executivo de alto nível', 'Gerente de operações ou analista'] },
      { q: 24, text: 'Como você lida com mudanças?', options: ['Me adapto fazendo o que precisa ser feito', 'Analiso e entendo antes de agir', 'Vejo como oportunidade criativa', 'Busco apoio e converso com outros', 'Vejo como chance de crescimento', 'Prefiro estabilidade, mas me adapto quando necessário'] },
      { q: 25, text: 'O que te faz sentir realizado profissionalmente?', options: ['Ver algo funcionar que construí ou consertei', 'Descobrir algo novo ou resolver mistérios', 'Ter minhas criações apreciadas', 'Saber que fiz diferença na vida de alguém', 'Alcançar sucesso e reconhecimento', 'Manter tudo funcionando perfeitamente'] }
    ]
  }

  return (
    <FormLayout currentStep={currentStep} totalSteps={6} progress={progress}>
      {/* Header */}
      <TestHeader
        testNumber="Teste RIASEC"
        title="Descubra Seu Perfil Profissional RIASEC"
        objective="Identificar o tipo de ambiente profissional que mais combina com você através do modelo de John Holland."
        currentStep={currentStep}
        stepTitle={stepTitles[currentStep]}
        savedResults={savedResults}
        onShowResults={() => setShowResultsModal(true)}
        icon="work"
      >
        {currentStep === 1 && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20 mt-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              O que é o Modelo RIASEC?
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              O modelo RIASEC, criado por John Holland, ajuda a identificar o tipo de ambiente profissional que mais combina com cada pessoa. Ele se baseia em seis perfis — Realista, Investigativo, Artístico, Social, Empreendedor e Convencional — e mostra como nossos interesses, valores e habilidades se conectam com diferentes áreas de trabalho.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: 'construction', name: 'Realista', desc: 'Prático e manual', color: 'blue' },
                { icon: 'science', name: 'Investigativo', desc: 'Analítico e curioso', color: 'purple' },
                { icon: 'palette', name: 'Artístico', desc: 'Criativo e expressivo', color: 'pink' },
                { icon: 'groups', name: 'Social', desc: 'Empático e colaborativo', color: 'green' },
                { icon: 'trending_up', name: 'Empreendedor', desc: 'Persuasivo e líder', color: 'orange' },
                { icon: 'checklist', name: 'Convencional', desc: 'Organizado e metódico', color: 'indigo' }
              ].map((type, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`material-symbols-outlined text-${type.color}-500 text-lg`}>{type.icon}</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{type.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{type.desc}</p>
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
        testId="riasec"
        testData={savedResults}
      />
    </FormLayout>
  )
}

export default RiasecTest
