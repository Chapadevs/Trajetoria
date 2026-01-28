import React from 'react'
import { useTranslation } from 'react-i18next'

class AssessmentResultsErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('AssessmentResultsModal render error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallbackRender === 'function') {
        return this.props.fallbackRender(this.state.error)
      }
      return this.props.fallback || null
    }
    return this.props.children
  }
}

const AssessmentResultsModal = ({ isOpen, onClose, testId, testData }) => {
  const { t, i18n } = useTranslation()

  const [expandedSections, setExpandedSections] = React.useState({})

  if (!isOpen) return null

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const locale = i18n.language === 'pt' ? 'pt-BR' : 'en-US'
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderDISCResults = (results) => {
    if (!results) return null
    
    const isPt = i18n.language === 'pt'
    
    const overviewContent = {
      intro: t('tests.resultsModal.disc.intro'),
      question: t('tests.resultsModal.disc.whatIs'),
      description: t('tests.resultsModal.disc.description'),
      dimensions: isPt ? [
        { key: 'D', title: 'Dominância', description: 'Orientado para resultados, direto e decidido.' },
        { key: 'I', title: 'Influência', description: 'Sociável, persuasivo e otimista.' },
        { key: 'S', title: 'Estabilidade', description: 'Calmo, paciente e leal.' },
        { key: 'C', title: 'Conformidade', description: 'Preciso, analítico e sistemático.' }
      ] : [
        { key: 'D', title: 'Dominance', description: 'Results-oriented, direct and decisive.' },
        { key: 'I', title: 'Influence', description: 'Sociable, persuasive and optimistic.' },
        { key: 'S', title: 'Steadiness', description: 'Stable, patient and loyal.' },
        { key: 'C', title: 'Conscientiousness', description: 'Accurate, analytical and systematic.' }
      ]
    }
    
    const types = [
      {
        key: 'D',
        name: isPt ? 'Dominância' : 'Dominance',
        description: isPt ? 'Pessoas objetivas, assertivas e orientadas a resultados.' : 'Objective, assertive and results-oriented people.',
        details: {
          paragraphs: isPt ? [
            'Pessoas com alta Dominância são objetivas, assertivas e orientadas a resultados.',
            'Têm facilidade para tomar decisões rápidas, enfrentar desafios e liderar sob pressão.',
            'São movidas por metas, poder e superação.'
          ] : [
            'People with high Dominance are objective, assertive and results-oriented.',
            'They have ease making quick decisions, facing challenges and leading under pressure.',
            'They are driven by goals, power and overcoming.'
          ],
          characteristics: isPt ? ['Liderança natural', 'Foco em resultados', 'Coragem', 'Competitividade'] : ['Natural leadership', 'Results focus', 'Courage', 'Competitiveness'],
          challenges: isPt ? ['Impaciência', 'Tendência ao autoritarismo', 'Dificuldade em ouvir'] : ['Impatience', 'Tendency to authoritarianism', 'Difficulty listening'],
          areas: isPt ? ['Administração', 'Empreendedorismo', 'Engenharia', 'Gestão de Projetos', 'Vendas Estratégicas', 'Direito', 'Consultoria Empresarial', 'Marketing de Performance', 'Logística', 'Tecnologia da Informação'] : ['Administration', 'Entrepreneurship', 'Engineering', 'Project Management', 'Strategic Sales', 'Law', 'Business Consulting', 'Performance Marketing', 'Logistics', 'Information Technology']
        },
        styles: {
          dominantCard: 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800',
          dominantBadge: 'bg-red-500',
          labelBadge: 'bg-red-500/20',
          labelText: 'text-red-600 dark:text-red-400',
          bar: 'bg-red-500'
        }
      },
      {
        key: 'I',
        name: isPt ? 'Influência' : 'Influence',
        description: isPt ? 'Pessoas comunicativas, entusiasmadas e sociáveis.' : 'Communicative, enthusiastic and sociable people.',
        details: {
          paragraphs: isPt ? [
            'Pessoas com alta Influência são comunicativas, entusiasmadas e sociáveis.',
            'Têm talento para motivar, inspirar e engajar outras pessoas, transmitindo energia positiva.',
            'Valorizam o reconhecimento, o contato humano e ambientes colaborativos.'
          ] : [
            'People with high Influence are communicative, enthusiastic and sociable.',
            'They have talent for motivating, inspiring and engaging other people, transmitting positive energy.',
            'They value recognition, human contact and collaborative environments.'
          ],
          characteristics: isPt ? ['Otimismo', 'Carisma', 'Persuasão', 'Empatia'] : ['Optimism', 'Charisma', 'Persuasion', 'Empathy'],
          challenges: isPt ? ['Dispersão', 'Dificuldade com rotinas', 'Desafio em cumprir prazos rígidos'] : ['Distraction', 'Difficulty with routines', 'Challenge meeting strict deadlines'],
          areas: isPt ? ['Comunicação Social', 'Jornalismo', 'Publicidade e Propaganda', 'Recursos Humanos', 'Vendas', 'Relações Públicas', 'Docência', 'Coaching', 'Produção Cultural', 'Gestão de Pessoas'] : ['Social Communication', 'Journalism', 'Advertising', 'Human Resources', 'Sales', 'Public Relations', 'Teaching', 'Coaching', 'Cultural Production', 'People Management']
        },
        styles: {
          dominantCard: 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800',
          dominantBadge: 'bg-yellow-500',
          labelBadge: 'bg-yellow-500/20',
          labelText: 'text-yellow-600 dark:text-yellow-400',
          bar: 'bg-yellow-500'
        }
      },
      {
        key: 'S',
        name: isPt ? 'Estabilidade' : 'Steadiness',
        description: isPt ? 'Pessoas calmas, pacientes e leais.' : 'Calm, patient and loyal people.',
        details: {
          paragraphs: isPt ? [
            'Pessoas com alta Estabilidade são calmas, pacientes e leais.',
            'Gostam de ambientes seguros e previsíveis, destacando-se em tarefas que exigem constância e empatia.',
            'Valorizam o trabalho em equipe e relações de confiança duradouras.'
          ] : [
            'People with high Steadiness are calm, patient and loyal.',
            'They like safe and predictable environments, excelling in tasks that require constancy and empathy.',
            'They value teamwork and lasting trust relationships.'
          ],
          characteristics: isPt ? ['Tranquilidade', 'Empatia', 'Escuta ativa', 'Apoio aos outros'] : ['Tranquility', 'Empathy', 'Active listening', 'Support for others'],
          challenges: isPt ? ['Resistência a mudanças', 'Dificuldade em dizer "não"'] : ['Resistance to change', 'Difficulty saying "no"'],
          areas: isPt ? ['Enfermagem', 'Psicologia', 'Serviço Social', 'Educação Infantil', 'Recursos Humanos', 'Terapias Integrativas', 'Administração', 'Pedagogia', 'Gestão de Pessoas', 'Atendimento ao Cliente'] : ['Nursing', 'Psychology', 'Social Work', 'Early Childhood Education', 'Human Resources', 'Integrative Therapies', 'Administration', 'Pedagogy', 'People Management', 'Customer Service']
        },
        styles: {
          dominantCard: 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800',
          dominantBadge: 'bg-green-500',
          labelBadge: 'bg-green-500/20',
          labelText: 'text-green-600 dark:text-green-400',
          bar: 'bg-green-500'
        }
      },
      {
        key: 'C',
        name: isPt ? 'Conformidade' : 'Conscientiousness',
        description: isPt ? 'Pessoas analíticas, detalhistas e disciplinadas.' : 'Analytical, detail-oriented and disciplined people.',
        details: {
          paragraphs: isPt ? [
            'Pessoas com alta Conformidade são analíticas, detalhistas e disciplinadas.',
            'Valorizam regras, qualidade e precisão, buscando sempre fazer o certo da forma correta.',
            'São movidas por segurança, lógica e padrões bem definidos.'
          ] : [
            'People with high Conscientiousness are analytical, detail-oriented and disciplined.',
            'They value rules, quality and precision, always seeking to do things the right way.',
            'They are driven by security, logic and well-defined standards.'
          ],
          characteristics: isPt ? ['Organização', 'Pensamento crítico', 'Responsabilidade', 'Perfeccionismo'] : ['Organization', 'Critical thinking', 'Responsibility', 'Perfectionism'],
          challenges: isPt ? ['Rigidez', 'Excesso de autocrítica', 'Medo de errar'] : ['Rigidity', 'Excessive self-criticism', 'Fear of making mistakes'],
          areas: isPt ? ['Contabilidade', 'Engenharia', 'Auditoria', 'Direito', 'Análise de Dados', 'Pesquisa Científica', 'Arquitetura', 'Tecnologia da Informação', 'Planejamento Financeiro', 'Qualidade e Processos'] : ['Accounting', 'Engineering', 'Auditing', 'Law', 'Data Analysis', 'Scientific Research', 'Architecture', 'Information Technology', 'Financial Planning', 'Quality and Processes']
        },
        styles: {
          dominantCard: 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800',
          dominantBadge: 'bg-blue-500',
          labelBadge: 'bg-blue-500/20',
          labelText: 'text-blue-600 dark:text-blue-400',
          bar: 'bg-blue-500'
        }
      }
    ]

    // Encontra o tipo dominante
    const dominant = Object.entries(results).reduce((a, b) => a[1] > b[1] ? a : b)
    const dominantType = types.find(t => t.key === dominant[0])
    
    if (!dominantType) return null

    return (
      <div className="space-y-6">
        {/* Perfil Dominante */}
        <div className={`p-6 rounded-xl ${dominantType.styles.dominantCard}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-full ${dominantType.styles.dominantBadge} flex items-center justify-center`}>
              <span className="text-white font-black text-2xl">{dominantType.key}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('tests.resultsModal.disc.yourProfile')}: {dominantType.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{dominant[1]}% {t('tests.resultsModal.disc.dominance')}</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {dominantType.description}
          </p>
        </div>

        {/* Informações sobre o modelo */}
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <button
            type="button"
            onClick={() => toggleSection('disc-overview')}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('tests.resultsModal.disc.understandModel')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {t('tests.resultsModal.disc.clickToView')}
              </p>
            </div>
            <span
              className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${
                expandedSections['disc-overview'] ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {expandedSections['disc-overview'] && (
            <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p className="font-medium text-slate-900 dark:text-white">{overviewContent.intro}</p>
              <div>
                <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {overviewContent.question}
                </h5>
                <p className="mt-1 leading-relaxed">
                  {overviewContent.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {overviewContent.dimensions.map(dimension => (
                  <div
                    key={dimension.key}
                    className="rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {dimension.key} – {dimension.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {dimension.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Distribuição Completa */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            {t('tests.resultsModal.disc.fullDistribution')}
          </h4>
          <div className="space-y-3">
            {types.map(type => (
              <div
                key={type.key}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(type.key)}
                  className="w-full flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${type.styles.labelBadge} flex items-center justify-center`}>
                      <span className={`${type.styles.labelText} font-bold`}>
                        {type.key}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                      {type.name}
                    </span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {type.description}
                    </span>
                  </div>
                  </div>
                  <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {results[type.key]}%
                  </span>
                    <span
                      className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${
                        expandedSections[type.key] ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                  </span>
                </div>
                </button>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                  <div
                    className={`${type.styles.bar} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${results[type.key]}%` }}
                  />
                </div>

                {expandedSections[type.key] && (
                  <div className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                    {type.details.paragraphs.map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">
                        {t('tests.resultsModal.disc.characteristics')}
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {type.details.characteristics.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
              </div>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">
                        {t('tests.resultsModal.disc.challenges')}
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {type.details.challenges.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">
                        {t('tests.resultsModal.disc.suggestedAreas')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {type.details.areas.map(area => (
                          <span
                            key={area}
                            className="px-3 py-1 rounded-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderAnamneseResults = (data) => {
    if (!data) return null
    
    return (
      <div className="space-y-6">
        {/* Informações Pessoais */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">person</span>
            {t('tests.resultsModal.anamnese.personalInfo')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400">{t('tests.resultsModal.anamnese.name')}:</span>
              <p className="font-semibold text-slate-900 dark:text-white">{data.nomeCompleto}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">{t('tests.resultsModal.anamnese.age')}:</span>
              <p className="font-semibold text-slate-900 dark:text-white">{data.idade} {i18n.language === 'pt' ? 'anos' : 'years'}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">{t('tests.resultsModal.anamnese.location')}:</span>
              <p className="font-semibold text-slate-900 dark:text-white">{data.cidadeEstado}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">{t('tests.resultsModal.anamnese.email')}:</span>
              <p className="font-semibold text-slate-900 dark:text-white text-xs">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Escolaridade */}
        {data.nivelEscolaridade && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">school</span>
              {t('tests.resultsModal.anamnese.education')}
            </h4>
            <p className="text-sm text-slate-900 dark:text-white">{data.nivelEscolaridade}</p>
            {data.areaEstudo && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('tests.resultsModal.anamnese.area')}: {data.areaEstudo}
              </p>
            )}
          </div>
        )}

        {/* Situação Profissional */}
        {data.situacaoProfissional && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">work</span>
              {t('tests.resultsModal.anamnese.professionalSituation')}
            </h4>
            <p className="text-sm text-slate-900 dark:text-white">{data.situacaoProfissional}</p>
            {data.ocupacaoAtual && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('tests.resultsModal.anamnese.occupation')}: {data.ocupacaoAtual}
              </p>
            )}
          </div>
        )}

        {/* Áreas de Interesse */}
        {data.areasInteresse && data.areasInteresse.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">interests</span>
              {t('tests.resultsModal.anamnese.areasOfInterest')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.areasInteresse.map((area, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Objetivos de Carreira */}
        {data.objetivosCarreira && data.objetivosCarreira.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">flag</span>
              {t('tests.resultsModal.anamnese.careerGoals')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.objetivosCarreira.map((objetivo, idx) => (
                <span key={idx} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                  {objetivo}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderInteligenResults = (data) => {
    if (!data) return null
    
    return (
      <div className="space-y-6">
        {/* Informações do Projeto */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">folder</span>
            Projeto
          </h4>
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{data.projectName}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{data.projectType}</p>
          </div>
        </div>

        {/* Prioridade e Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.priority && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Prioridade</h4>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                data.priority === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                data.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                data.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              }`}>
                {data.priority === 'critical' ? '🔴 Crítico' :
                 data.priority === 'high' ? '🟠 Alto' :
                 data.priority === 'medium' ? '🟡 Médio' : '🟢 Baixo'}
              </span>
            </div>
          )}
          {data.estimatedDuration && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Duração Estimada</h4>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{data.estimatedDuration}</p>
            </div>
          )}
        </div>

        {/* Objetivo de Negócio */}
        {data.businessObjective && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">target</span>
              Objetivo de Negócio
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">{data.businessObjective}</p>
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2 text-sm">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Detalhes</h4>
          <div className="space-y-2">
            {data.estimatedBudget && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">payments</span>
                <span className="text-slate-600 dark:text-slate-400">Orçamento: </span>
                <span className="font-semibold text-slate-900 dark:text-white">{data.estimatedBudget}</span>
              </div>
            )}
            {data.requestedStartDate && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">calendar_today</span>
                <span className="text-slate-600 dark:text-slate-400">Início: </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {new Date(data.requestedStartDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderMultipleIntelligencesResults = (results) => {
    if (!results) return null
    
    const overview = {
      title: i18n.language === 'pt' 
        ? 'Teoria das Inteligências Múltiplas — Howard Gardner'
        : 'Theory of Multiple Intelligences — Howard Gardner',
      paragraphs: i18n.language === 'pt' 
        ? [
            'O psicólogo norte-americano Howard Gardner propôs que a inteligência não é algo único e mensurável como nos testes tradicionais de QI. Em vez disso, ela se manifesta como um conjunto de habilidades cognitivas, emocionais e criativas que cada pessoa possui em diferentes intensidades.',
            'Essa teoria reconhece que todas as pessoas são inteligentes — mas de maneiras distintas. Entender suas inteligências predominantes ajuda a tomar decisões de carreira, desenvolver competências estratégicas e escolher formas mais eficazes de aprender e atuar no mundo.'
          ]
        : [
            'American psychologist Howard Gardner proposed that intelligence is not a single, measurable thing like traditional IQ tests suggest. Instead, it manifests as a set of cognitive, emotional, and creative abilities that each person possesses in different intensities.',
            'This theory recognizes that all people are intelligent—but in different ways. Understanding your predominant intelligences helps make career decisions, develop strategic competencies, and choose more effective ways to learn and act in the world.'
          ]
    }
    
    const intelligences = [
      { 
        key: 'logica', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.logica.name'),
        icon: 'calculate', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.logica.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.logica.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.logica.professions', { returnObjects: true })
      },
      { 
        key: 'linguistica', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.linguistica.name'),
        icon: 'book', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.linguistica.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.linguistica.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.linguistica.professions', { returnObjects: true })
      },
      { 
        key: 'espacial', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.espacial.name'),
        icon: 'palette', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.espacial.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.espacial.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.espacial.professions', { returnObjects: true })
      },
      { 
        key: 'musical', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.musical.name'),
        icon: 'music_note', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.musical.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.musical.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.musical.professions', { returnObjects: true })
      },
      { 
        key: 'corporal', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.corporal.name'),
        icon: 'directions_run', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.corporal.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.corporal.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.corporal.professions', { returnObjects: true })
      },
      { 
        key: 'interpessoal', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.interpessoal.name'),
        icon: 'groups', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.interpessoal.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.interpessoal.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.interpessoal.professions', { returnObjects: true })
      },
      { 
        key: 'intrapessoal', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.intrapessoal.name'),
        icon: 'self_improvement', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.intrapessoal.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.intrapessoal.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.intrapessoal.professions', { returnObjects: true })
      },
      { 
        key: 'naturalista', 
        name: t('tests.resultsModal.multipleIntelligences.intelligences.naturalista.name'),
        icon: 'nature', 
        description: t('tests.resultsModal.multipleIntelligences.intelligences.naturalista.description'),
        details: t('tests.resultsModal.multipleIntelligences.intelligences.naturalista.details', { returnObjects: true }),
        professions: t('tests.resultsModal.multipleIntelligences.intelligences.naturalista.professions', { returnObjects: true })
      }
    ]

    const sorted = Object.entries(results).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    const top3 = sorted.slice(0, 3).map(([key]) => key)
    const remaining = intelligences
      .filter(intelligence => !top3.includes(intelligence.key))
      .sort((a, b) => (results[b.key] ?? 0) - (results[a.key] ?? 0))

    const renderIntelligenceCard = (intelligence, rank) => {
      const percentage = results[intelligence.key] ?? 0
      const sectionKey = `mi-${intelligence.key}`

    return (
        <div
          key={intelligence.key}
          className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-4"
        >
          <button
            type="button"
            onClick={() => toggleSection(sectionKey)}
            className="w-full flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-lg">
                  {intelligence.icon}
                </span>
                  </div>
              <div>
                <div className="flex items-center gap-2">
                  {typeof rank === 'number' && (
                    <span className="text-xs font-bold text-primary">#{rank + 1}</span>
                  )}
                  <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {intelligence.name}
                  </h5>
                  </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {intelligence.description}
                </p>
                  </div>
                </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-black text-primary">
                {percentage}%
              </span>
              <span
                className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${
                  expandedSections[sectionKey] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
              </div>
          </button>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
        </div>

          {expandedSections[sectionKey] && (
            <div className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {intelligence.details.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

        <div>
                <p className="font-semibold text-slate-900 dark:text-white mb-2">
                  {t('tests.resultsModal.multipleIntelligences.professions')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {intelligence.professions.map(profession => (
                    <span
                      key={profession}
                      className="px-3 py-1 rounded-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200"
                    >
                      {profession}
                    </span>
                  ))}
                  </div>
                </div>
                </div>
          )}
              </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <button
            type="button"
            onClick={() => toggleSection('mi-overview')}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {overview.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {t('tests.resultsModal.multipleIntelligences.clickToUnderstand')}
              </p>
            </div>
            <span
              className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${
                expandedSections['mi-overview'] ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {expandedSections['mi-overview'] && (
            <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {overview.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
            ))}
          </div>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            {t('tests.resultsModal.multipleIntelligences.yourTop3')}
          </h4>
          {top3.map((key, idx) => {
            const intelligence = intelligences.find(intel => intel.key === key)
            if (!intelligence) return null
            return renderIntelligenceCard(intelligence, idx)
          })}
        </div>

        {remaining.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t('tests.resultsModal.multipleIntelligences.otherIntelligences')}
            </h4>
            <div className="space-y-3">
              {remaining.map(intelligence => renderIntelligenceCard(intelligence))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderRiasecResults = (results) => {
    if (!results) return null
    
    const overview = {
      title: t('tests.resultsModal.riasec.title'),
      paragraphs: i18n.language === 'pt'
        ? [
            'O modelo RIASEC, criado por John Holland, ajuda a identificar o tipo de ambiente profissional que mais combina com cada pessoa. Ele se baseia em seis perfis — Realista, Investigativo, Artístico, Social, Empreendedor e Convencional — e mostra como nossos interesses, valores e habilidades se conectam com diferentes áreas de trabalho.',
            'Compreender seu tipo RIASEC é essencial para fazer escolhas mais conscientes, encontrar carreiras alinhadas ao seu perfil pessoal e aumentar a satisfação e o desempenho no futuro profissional.'
          ]
        : [
            'The RIASEC model, created by John Holland, helps identify the type of professional environment that best fits each person. It is based on six profiles—Realistic, Investigative, Artistic, Social, Enterprising, and Conventional—and shows how our interests, values, and skills connect with different areas of work.',
            'Understanding your RIASEC type is essential for making more conscious choices, finding careers aligned with your personal profile, and increasing satisfaction and performance in your professional future.'
          ]
    }
    
    const profiles = [
      { 
        key: 'R', 
        name: t('tests.resultsModal.riasec.profiles.R.name'),
        icon: 'construction', 
        description: t('tests.resultsModal.riasec.profiles.R.description'),
        details: {
          paragraphs: t('tests.resultsModal.riasec.profiles.R.paragraphs', { returnObjects: true }),
          characteristics: t('tests.resultsModal.riasec.profiles.R.characteristics', { returnObjects: true }),
          challenges: t('tests.resultsModal.riasec.profiles.R.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.riasec.profiles.R.areas', { returnObjects: true })
        }
      },
      { 
        key: 'I', 
        name: t('tests.resultsModal.riasec.profiles.I.name'),
        icon: 'science', 
        description: t('tests.resultsModal.riasec.profiles.I.description'),
        details: {
          paragraphs: t('tests.resultsModal.riasec.profiles.I.paragraphs', { returnObjects: true }),
          characteristics: t('tests.resultsModal.riasec.profiles.I.characteristics', { returnObjects: true }),
          challenges: t('tests.resultsModal.riasec.profiles.I.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.riasec.profiles.I.areas', { returnObjects: true })
        }
      },
      { 
        key: 'A', 
        name: t('tests.resultsModal.riasec.profiles.A.name'),
        icon: 'palette', 
        description: t('tests.resultsModal.riasec.profiles.A.description'),
        details: {
          paragraphs: t('tests.resultsModal.riasec.profiles.A.paragraphs', { returnObjects: true }),
          characteristics: t('tests.resultsModal.riasec.profiles.A.characteristics', { returnObjects: true }),
          challenges: t('tests.resultsModal.riasec.profiles.A.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.riasec.profiles.A.areas', { returnObjects: true })
        }
      },
      { 
        key: 'S', 
        name: t('tests.resultsModal.riasec.profiles.S.name'),
        icon: 'groups', 
        description: t('tests.resultsModal.riasec.profiles.S.description'),
        details: {
          paragraphs: t('tests.resultsModal.riasec.profiles.S.paragraphs', { returnObjects: true }),
          characteristics: t('tests.resultsModal.riasec.profiles.S.characteristics', { returnObjects: true }),
          challenges: t('tests.resultsModal.riasec.profiles.S.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.riasec.profiles.S.areas', { returnObjects: true })
        }
      },
      { 
        key: 'E', 
        name: t('tests.resultsModal.riasec.profiles.E.name'),
        icon: 'trending_up', 
        description: t('tests.resultsModal.riasec.profiles.E.description'),
        details: {
          paragraphs: t('tests.resultsModal.riasec.profiles.E.paragraphs', { returnObjects: true }),
          characteristics: t('tests.resultsModal.riasec.profiles.E.characteristics', { returnObjects: true }),
          challenges: t('tests.resultsModal.riasec.profiles.E.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.riasec.profiles.E.areas', { returnObjects: true })
        }
      },
      { 
        key: 'C', 
        name: t('tests.resultsModal.riasec.profiles.C.name'),
        icon: 'checklist', 
        description: t('tests.resultsModal.riasec.profiles.C.description'),
        details: {
          paragraphs: t('tests.resultsModal.riasec.profiles.C.paragraphs', { returnObjects: true }),
          characteristics: t('tests.resultsModal.riasec.profiles.C.characteristics', { returnObjects: true }),
          challenges: t('tests.resultsModal.riasec.profiles.C.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.riasec.profiles.C.areas', { returnObjects: true })
        }
      }
    ]

    const sortedProfiles = profiles
      .map(profile => ({
        ...profile,
        score: results[profile.key] ?? 0
      }))
      .sort((a, b) => b.score - a.score)

    const dominantProfile = sortedProfiles[0]
    const remainingProfiles = sortedProfiles.slice(1)

    const renderProfileCard = (profile, rank = null, highlight = false) => {
      const percentage = profile.score ?? 0
      const sectionKey = `riasec-${profile.key}`

    return (
        <div
          key={profile.key}
          className={`rounded-xl border p-4 ${
            highlight
              ? 'bg-primary/15 dark:bg-primary/25 border-primary/40'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleSection(sectionKey)}
            className="w-full flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full ${highlight ? 'bg-white/30 dark:bg-white/10' : 'bg-primary/15'} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-primary text-xl">
                  {profile.icon}
                </span>
            </div>
              <div>
                <div className="flex items-center gap-2">
                  {typeof rank === 'number' && (
                    <span className={`text-xs font-bold ${highlight ? 'text-white' : 'text-primary'}`}>
                      #{rank + 1}
                    </span>
                  )}
                  <h5 className={`text-base font-semibold ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {profile.name}
                  </h5>
            </div>
                <p className={`text-xs mt-1 ${highlight ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>
                  {profile.description}
          </p>
          </div>
        </div>
            <div className="flex items-center gap-1">
              <span className={`text-lg font-black ${highlight ? 'text-white' : 'text-primary'}`}>
                {percentage}%
              </span>
              <span
                className={`material-symbols-outlined ${highlight ? 'text-white/80' : 'text-slate-500'} transition-transform duration-200 ${
                  expandedSections[sectionKey] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </div>
          </button>

          <div className={`w-full rounded-full h-2 mt-3 ${highlight ? 'bg-white/30' : 'bg-slate-200 dark:bg-slate-700'}`}>
            <div
              className={`${highlight ? 'bg-white' : 'bg-primary'} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {expandedSections[sectionKey] && (
            <div className={`mt-3 space-y-3 text-sm ${highlight ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}`}>
              {profile.details.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

        <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t('tests.resultsModal.riasec.characteristics')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {profile.details.characteristics.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                    </div>

                    <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t('tests.resultsModal.riasec.challenges')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {profile.details.challenges.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t('tests.resultsModal.riasec.recommendedAreas')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.details.areas.map(area => (
                    <span
                      key={area}
                      className={`px-3 py-1 rounded-full border text-xs font-medium ${
                        highlight
                          ? 'bg-white/20 border-white/40 text-white'
                          : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {area}
                      </span>
                  ))}
                    </div>
                  </div>
                </div>
          )}
                </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <button
            type="button"
            onClick={() => toggleSection('riasec-overview')}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {overview.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {t('tests.resultsModal.riasec.clickToUnderstand')}
              </p>
              </div>
            <span
              className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${
                expandedSections['riasec-overview'] ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {expandedSections['riasec-overview'] && (
            <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {overview.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
            ))}
          </div>
          )}
        </div>

        {dominantProfile && renderProfileCard(dominantProfile, 0)}

        {remainingProfiles.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t('tests.resultsModal.riasec.otherProfiles')}
            </h4>
            <div className="space-y-3">
              {remainingProfiles.map((profile, idx) => renderProfileCard(profile, idx + 1))}
            </div>
          </div>
        )}

        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">code</span>
            {t('tests.resultsModal.riasec.yourHollandCode')}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs text-slate-600 dark:text-slate-400">{t('tests.resultsModal.riasec.dominantSequence')}:</p>
            {sortedProfiles.slice(0, 3).map(profile => (
              <span key={profile.key} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                {profile.key} - {profile.name}
                </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            {t('tests.resultsModal.riasec.hollandCodeDesc')}
          </p>
        </div>
      </div>
    )
  }

  const renderArchetypesResults = (results) => {
    if (!results) return null

    const overview = {
      title: t('tests.resultsModal.archetypes.title'),
      paragraphs: i18n.language === 'pt'
        ? [
            'Os arquétipos são padrões universais de comportamento, emoção e pensamento que habitam o inconsciente coletivo, conceito desenvolvido por Carl Gustav Jung.',
            'Eles representam modelos simbólicos de identidade, influenciando nossas escolhas, relações e caminhos profissionais. Conhecer seus arquétipos predominantes ajuda a alinhar projetos, carreiras e relacionamentos à sua essência.'
          ]
        : [
            'Archetypes are universal patterns of behavior, emotion, and thought that inhabit the collective unconscious, a concept developed by Carl Gustav Jung.',
            'They represent symbolic models of identity, influencing our choices, relationships, and professional paths. Knowing your predominant archetypes helps align projects, careers, and relationships with your essence.'
          ]
    }

    const archetypes = [
      {
        key: 'inocente',
        name: t('tests.resultsModal.archetypes.archetypes.inocente.name'),
        icon: 'sentiment_satisfied',
        short: t('tests.resultsModal.archetypes.archetypes.inocente.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.inocente.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.inocente.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.inocente.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.inocente.areas', { returnObjects: true })
        }
      },
      {
        key: 'sabio',
        name: t('tests.resultsModal.archetypes.archetypes.sabio.name'),
        icon: 'auto_stories',
        short: t('tests.resultsModal.archetypes.archetypes.sabio.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.sabio.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.sabio.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.sabio.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.sabio.areas', { returnObjects: true })
        }
      },
      {
        key: 'explorador',
        name: t('tests.resultsModal.archetypes.archetypes.explorador.name'),
        icon: 'explore',
        short: t('tests.resultsModal.archetypes.archetypes.explorador.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.explorador.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.explorador.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.explorador.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.explorador.areas', { returnObjects: true })
        }
      },
      {
        key: 'foraDaLei',
        name: t('tests.resultsModal.archetypes.archetypes.foraDaLei.name'),
        icon: 'emergency',
        short: t('tests.resultsModal.archetypes.archetypes.foraDaLei.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.foraDaLei.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.foraDaLei.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.foraDaLei.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.foraDaLei.areas', { returnObjects: true })
        }
      },
      {
        key: 'mago',
        name: t('tests.resultsModal.archetypes.archetypes.mago.name'),
        icon: 'auto_fix_high',
        short: t('tests.resultsModal.archetypes.archetypes.mago.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.mago.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.mago.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.mago.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.mago.areas', { returnObjects: true })
        }
      },
      {
        key: 'heroi',
        name: t('tests.resultsModal.archetypes.archetypes.heroi.name'),
        icon: 'shield',
        short: t('tests.resultsModal.archetypes.archetypes.heroi.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.heroi.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.heroi.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.heroi.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.heroi.areas', { returnObjects: true })
        }
      },
      {
        key: 'amante',
        name: t('tests.resultsModal.archetypes.archetypes.amante.name'),
        icon: 'favorite',
        short: t('tests.resultsModal.archetypes.archetypes.amante.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.amante.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.amante.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.amante.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.amante.areas', { returnObjects: true })
        }
      },
      {
        key: 'bobo',
        name: t('tests.resultsModal.archetypes.archetypes.bobo.name'),
        icon: 'theater_comedy',
        short: t('tests.resultsModal.archetypes.archetypes.bobo.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.bobo.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.bobo.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.bobo.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.bobo.areas', { returnObjects: true })
        }
      },
      {
        key: 'caraComum',
        name: t('tests.resultsModal.archetypes.archetypes.caraComum.name'),
        icon: 'group',
        short: t('tests.resultsModal.archetypes.archetypes.caraComum.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.caraComum.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.caraComum.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.caraComum.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.caraComum.areas', { returnObjects: true })
        }
      },
      {
        key: 'cuidador',
        name: t('tests.resultsModal.archetypes.archetypes.cuidador.name'),
        icon: 'healing',
        short: t('tests.resultsModal.archetypes.archetypes.cuidador.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.cuidador.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.cuidador.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.cuidador.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.cuidador.areas', { returnObjects: true })
        }
      },
      {
        key: 'governante',
        name: t('tests.resultsModal.archetypes.archetypes.governante.name'),
        icon: 'workspace_premium',
        short: t('tests.resultsModal.archetypes.archetypes.governante.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.governante.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.governante.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.governante.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.governante.areas', { returnObjects: true })
        }
      },
      {
        key: 'criador',
        name: t('tests.resultsModal.archetypes.archetypes.criador.name'),
        icon: 'brush',
        short: t('tests.resultsModal.archetypes.archetypes.criador.short'),
        details: {
          paragraphs: t('tests.resultsModal.archetypes.archetypes.criador.paragraphs', { returnObjects: true }),
          strengths: t('tests.resultsModal.archetypes.archetypes.criador.strengths', { returnObjects: true }),
          challenges: t('tests.resultsModal.archetypes.archetypes.criador.challenges', { returnObjects: true }),
          areas: t('tests.resultsModal.archetypes.archetypes.criador.areas', { returnObjects: true })
        }
      }
    ]

    const sortedArchetypes = archetypes
      .map(arch => ({
        ...arch,
        score: results[arch.key] ?? 0
      }))
      .sort((a, b) => b.score - a.score)

    const top3 = sortedArchetypes.slice(0, 3)
    const remaining = sortedArchetypes.slice(3)

    const renderArchetypeCard = (arch, rank = null, highlight = false) => {
      const percentage = arch.score ?? 0
      const sectionKey = `archetype-${arch.key}`

    return (
              <div
                key={arch.key}
          className={`rounded-xl border p-4 ${
            highlight
              ? 'bg-primary/15 dark:bg-primary/25 border-primary/40'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleSection(sectionKey)}
            className="w-full flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full ${highlight ? 'bg-white/30 dark:bg-white/10' : 'bg-primary/15'} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-primary text-xl">
                  {arch.icon}
                </span>
                  </div>
              <div>
                    <div className="flex items-center gap-2">
                  {typeof rank === 'number' && (
                    <span className={`text-xs font-bold ${highlight ? 'text-white' : 'text-primary'}`}>
                      #{rank + 1}
                    </span>
                  )}
                  <h5 className={`text-base font-semibold ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {arch.name}
                  </h5>
                    </div>
                <p className={`text-xs mt-1 ${highlight ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>
                  {arch.short}
                    </p>
                  </div>
                  </div>
            <div className="flex items-center gap-1">
              <span className={`text-lg font-black ${highlight ? 'text-white' : 'text-primary'}`}>
                {percentage}%
              </span>
              <span
                className={`material-symbols-outlined ${highlight ? 'text-white/80' : 'text-slate-500'} transition-transform duration-200 ${
                  expandedSections[sectionKey] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
                </div>
          </button>

          <div className={`w-full rounded-full h-2 mt-3 ${highlight ? 'bg-white/30' : 'bg-slate-200 dark:bg-slate-700'}`}>
            <div
              className={`${highlight ? 'bg-white' : 'bg-primary'} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
              </div>

          {expandedSections[sectionKey] && (
            <div className={`mt-3 space-y-3 text-sm ${highlight ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}`}>
              {arch.details.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t('tests.resultsModal.archetypes.strengths')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {arch.details.strengths.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
        </div>

        <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t('tests.resultsModal.archetypes.attentionPoints')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {arch.details.challenges.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                  </div>

              <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t('tests.resultsModal.archetypes.suggestedAreas')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {arch.details.areas.map(area => (
                    <span
                      key={area}
                      className={`px-3 py-1 rounded-full border text-xs font-medium ${
                        highlight
                          ? 'bg-white/20 border-white/40 text-white'
                          : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {area}
                  </span>
                  ))}
                </div>
                </div>
              </div>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <button
            type="button"
            onClick={() => toggleSection('archetypes-overview')}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {overview.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {t('tests.resultsModal.archetypes.clickToUnderstand')}
              </p>
            </div>
            <span
              className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${
                expandedSections['archetypes-overview'] ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {expandedSections['archetypes-overview'] && (
            <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {overview.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
            ))}
          </div>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t('tests.resultsModal.archetypes.yourTop3')}
          </h4>
          {top3.map((arch, idx) => renderArchetypeCard(arch, idx, false))}
        </div>

        {remaining.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t('tests.resultsModal.archetypes.otherArchetypes')}
            </h4>
            <div className="space-y-3">
              {remaining.map(arch => renderArchetypeCard(arch))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const getTestTitle = () => {
    const titles = {
      'anamnese-inicial': t('tests.resultsModal.titles.anamnese'),
      'disc-insight': t('tests.resultsModal.titles.disc'),
      'inteligen-finder': 'Inteligen Finder - Project Summary',
      'multiple-intelligences': t('tests.resultsModal.titles.multipleIntelligences'),
      'riasec': t('tests.resultsModal.titles.riasec'),
      'archetypes': t('tests.resultsModal.titles.archetypes')
    }
    return titles[testId] || (i18n.language === 'pt' ? 'Resultados' : 'Results')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-[#6152BD] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{getTestTitle()}</h2>
              {testData?.completedAt && (
                <p className="text-sm text-white/80 mt-1">
                  {t('tests.resultsModal.completedOn')} {formatDate(testData.completedAt)}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 pb-12">
          <AssessmentResultsErrorBoundary
            fallbackRender={(error) => (
              <div className="space-y-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  {i18n.language === 'pt' ? 'Erro ao exibir os resultados.' : 'Error displaying results.'}
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 break-words">
                  {String(error?.message || 'Unknown error')}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-[#6152BD] text-white font-semibold"
                >
                  {t('tests.resultsModal.close')}
                </button>
              </div>
            )}
          >
            <div className="space-y-6">
              {testId === 'disc-insight' && renderDISCResults(testData?.results)}
              {testId === 'anamnese-inicial' && renderAnamneseResults(testData?.data)}
              {testId === 'inteligen-finder' && renderInteligenResults(testData?.data)}
              {testId === 'multiple-intelligences' && renderMultipleIntelligencesResults(testData?.results)}
              {testId === 'riasec' && renderRiasecResults(testData?.results)}
              {testId === 'archetypes' && renderArchetypesResults(testData?.results)}
            </div>
          </AssessmentResultsErrorBoundary>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('tests.resultsModal.footerNote')}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('tests.resultsModal.close')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssessmentResultsModal