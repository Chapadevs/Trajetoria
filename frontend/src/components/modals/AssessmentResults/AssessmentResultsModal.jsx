import React from 'react'

const AssessmentResultsModal = ({ isOpen, onClose, testId, testData }) => {
  if (!isOpen) return null

  const [expandedSections, setExpandedSections] = React.useState({})

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderDISCResults = (results) => {
    if (!results) return null
    
    const overviewContent = {
      intro: 'Descubra seu perfil de personalidade e entenda melhor seu estilo de trabalho e relacionamento.',
      question: 'O que é o DISC?',
      description: 'O DISC é uma ferramenta de avaliação comportamental que identifica quatro estilos principais e ajuda você a compreender como prefere agir, comunicar e tomar decisões em diferentes contextos.',
      dimensions: [
        { key: 'D', title: 'Dominância', description: 'Orientado para resultados, direto e decidido.' },
        { key: 'I', title: 'Influência', description: 'Sociável, persuasivo e otimista.' },
        { key: 'S', title: 'Estabilidade', description: 'Calmo, paciente e leal.' },
        { key: 'C', title: 'Conformidade', description: 'Preciso, analítico e sistemático.' }
      ]
    }
    
    const types = [
      {
        key: 'D',
        name: 'Dominância',
        description: 'Pessoas objetivas, assertivas e orientadas a resultados.',
        details: {
          paragraphs: [
            'Pessoas com alta Dominância são objetivas, assertivas e orientadas a resultados.',
            'Têm facilidade para tomar decisões rápidas, enfrentar desafios e liderar sob pressão.',
            'São movidas por metas, poder e superação.'
          ],
          characteristics: ['Liderança natural', 'Foco em resultados', 'Coragem', 'Competitividade'],
          challenges: ['Impaciência', 'Tendência ao autoritarismo', 'Dificuldade em ouvir'],
          areas: ['Administração', 'Empreendedorismo', 'Engenharia', 'Gestão de Projetos', 'Vendas Estratégicas', 'Direito', 'Consultoria Empresarial', 'Marketing de Performance', 'Logística', 'Tecnologia da Informação']
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
        name: 'Influência',
        description: 'Pessoas comunicativas, entusiasmadas e sociáveis.',
        details: {
          paragraphs: [
            'Pessoas com alta Influência são comunicativas, entusiasmadas e sociáveis.',
            'Têm talento para motivar, inspirar e engajar outras pessoas, transmitindo energia positiva.',
            'Valorizam o reconhecimento, o contato humano e ambientes colaborativos.'
          ],
          characteristics: ['Otimismo', 'Carisma', 'Persuasão', 'Empatia'],
          challenges: ['Dispersão', 'Dificuldade com rotinas', 'Desafio em cumprir prazos rígidos'],
          areas: ['Comunicação Social', 'Jornalismo', 'Publicidade e Propaganda', 'Recursos Humanos', 'Vendas', 'Relações Públicas', 'Docência', 'Coaching', 'Produção Cultural', 'Gestão de Pessoas']
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
        name: 'Estabilidade',
        description: 'Pessoas calmas, pacientes e leais.',
        details: {
          paragraphs: [
            'Pessoas com alta Estabilidade são calmas, pacientes e leais.',
            'Gostam de ambientes seguros e previsíveis, destacando-se em tarefas que exigem constância e empatia.',
            'Valorizam o trabalho em equipe e relações de confiança duradouras.'
          ],
          characteristics: ['Tranquilidade', 'Empatia', 'Escuta ativa', 'Apoio aos outros'],
          challenges: ['Resistência a mudanças', 'Dificuldade em dizer "não"'],
          areas: ['Enfermagem', 'Psicologia', 'Serviço Social', 'Educação Infantil', 'Recursos Humanos', 'Terapias Integrativas', 'Administração', 'Pedagogia', 'Gestão de Pessoas', 'Atendimento ao Cliente']
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
        name: 'Conformidade',
        description: 'Pessoas analíticas, detalhistas e disciplinadas.',
        details: {
          paragraphs: [
            'Pessoas com alta Conformidade são analíticas, detalhistas e disciplinadas.',
            'Valorizam regras, qualidade e precisão, buscando sempre fazer o certo da forma correta.',
            'São movidas por segurança, lógica e padrões bem definidos.'
          ],
          characteristics: ['Organização', 'Pensamento crítico', 'Responsabilidade', 'Perfeccionismo'],
          challenges: ['Rigidez', 'Excesso de autocrítica', 'Medo de errar'],
          areas: ['Contabilidade', 'Engenharia', 'Auditoria', 'Direito', 'Análise de Dados', 'Pesquisa Científica', 'Arquitetura', 'Tecnologia da Informação', 'Planejamento Financeiro', 'Qualidade e Processos']
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
                Seu Perfil: {dominantType.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{dominant[1]}% dominância</p>
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
                Entenda o Modelo DISC
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Clique para visualizar uma explicação completa sobre o teste e seus pilares.
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
            Distribuição Completa
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
                        Características em destaque
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {type.details.characteristics.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
              </div>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">
                        Desafios comuns
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {type.details.challenges.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">
                        Áreas e profissões sugeridas
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
            Informações Pessoais
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Nome:</span>
              <p className="font-semibold text-slate-900 dark:text-white">{data.nomeCompleto}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Idade:</span>
              <p className="font-semibold text-slate-900 dark:text-white">{data.idade} anos</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Localização:</span>
              <p className="font-semibold text-slate-900 dark:text-white">{data.cidadeEstado}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">E-mail:</span>
              <p className="font-semibold text-slate-900 dark:text-white text-xs">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Escolaridade */}
        {data.nivelEscolaridade && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">school</span>
              Escolaridade
            </h4>
            <p className="text-sm text-slate-900 dark:text-white">{data.nivelEscolaridade}</p>
            {data.areaEstudo && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Área: {data.areaEstudo}
              </p>
            )}
          </div>
        )}

        {/* Situação Profissional */}
        {data.situacaoProfissional && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">work</span>
              Situação Profissional
            </h4>
            <p className="text-sm text-slate-900 dark:text-white">{data.situacaoProfissional}</p>
            {data.ocupacaoAtual && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ocupação: {data.ocupacaoAtual}
              </p>
            )}
          </div>
        )}

        {/* Áreas de Interesse */}
        {data.areasInteresse && data.areasInteresse.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">interests</span>
              Áreas de Interesse
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
              Objetivos de Carreira
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
      title: 'Teoria das Inteligências Múltiplas — Howard Gardner',
      paragraphs: [
        'O psicólogo norte-americano Howard Gardner propôs que a inteligência não é algo único e mensurável como nos testes tradicionais de QI. Em vez disso, ela se manifesta como um conjunto de habilidades cognitivas, emocionais e criativas que cada pessoa possui em diferentes intensidades.',
        'Essa teoria reconhece que todas as pessoas são inteligentes — mas de maneiras distintas. Entender suas inteligências predominantes ajuda a tomar decisões de carreira, desenvolver competências estratégicas e escolher formas mais eficazes de aprender e atuar no mundo.'
      ]
    }
    
    const intelligences = [
      { 
        key: 'logica', 
        name: 'Lógico-Matemática', 
        icon: 'calculate', 
        description: 'Capacidade de raciocínio lógico, análise de padrões e resolução de problemas.',
        details: [
          'Pessoas com essa inteligência gostam de organizar, calcular e entender como as coisas funcionam.',
          'Têm afinidade com números, experimentos e ambientes que estimulam a análise estruturada.'
        ],
        professions: ['Engenheiro(a)', 'Cientista de Dados', 'Analista Financeiro', 'Estatístico(a)', 'Programador(a)', 'Físico(a)', 'Contador(a)', 'Economista', 'Arquiteto(a)', 'Pesquisador(a)']
      },
      { 
        key: 'linguistica', 
        name: 'Linguística', 
        icon: 'book', 
        description: 'Relacionada à habilidade com a linguagem — falar, escrever, ler e se comunicar com clareza.',
        details: [
          'Pessoas com alta inteligência linguística se destacam ao contar histórias, argumentar e ensinar.',
          'Demonstram facilidade em aprender idiomas, construir discursos e adaptar mensagens a diferentes públicos.'
        ],
        professions: ['Jornalista', 'Escritor(a)', 'Professor(a)', 'Advogado(a)', 'Publicitário(a)', 'Revisor(a)', 'Roteirista', 'Radialista', 'Copywriter', 'Tradutor(a)']
      },
      { 
        key: 'espacial', 
        name: 'Espacial', 
        icon: 'palette', 
        description: 'Capacidade de visualizar formas, cores e espaços em três dimensões, com alto senso estético.',
        details: [
          'Pessoas com essa inteligência percebem detalhes visuais e conseguem imaginar objetos sob diferentes perspectivas.',
          'Têm facilidade para planejar ambientes, interpretar mapas, criar imagens e trabalhar com design.'
        ],
        professions: ['Designer Gráfico', 'Arquiteto(a)', 'Urbanista', 'Fotógrafo(a)', 'Ilustrador(a)', 'Designer de Interiores', 'Engenheiro(a) Civil', 'Piloto(a)', 'Videomaker', 'Artista Visual']
      },
      { 
        key: 'musical', 
        name: 'Musical', 
        icon: 'music_note', 
        description: 'Sensibilidade a sons, ritmos e melodias, com foco em harmonia, composição e emoção sonora.',
        details: [
          'Pessoas com inteligência musical identificam padrões auditivos, reconhecem notas e entendem como a música influencia emoções.',
          'Têm facilidade para aprender instrumentos, cantar, compor e explorar diferentes estilos musicais.'
        ],
        professions: ['Músico(a)', 'Produtor(a) musical', 'Compositor(a)', 'Técnico(a) de som', 'Maestro(a)', 'Professor(a) de música', 'DJ', 'Cantor(a)', 'Crítico(a) musical', 'Terapeuta musical']
      },
      { 
        key: 'corporal', 
        name: 'Corporal-Cinestésica', 
        icon: 'directions_run', 
        description: 'Uso criativo e preciso do corpo, com aprendizagem baseada na prática e no movimento.',
        details: [
          'Pessoas com essa inteligência aprendem fazendo, manipulando objetos e explorando o ambiente físico.',
          'Demonstram coordenação, destreza e controle corporal em atividades esportivas, artísticas ou técnicas.'
        ],
        professions: ['Atleta', 'Dançarino(a)', 'Fisioterapeuta', 'Personal Trainer', 'Cirurgião(ã)', 'Ator/Atriz', 'Coreógrafo(a)', 'Professor(a) de Educação Física', 'Massoterapeuta', 'Artesão(ã)']
      },
      { 
        key: 'interpessoal', 
        name: 'Interpessoal', 
        icon: 'groups', 
        description: 'Habilidade de compreender e se conectar com outras pessoas com empatia e colaboração.',
        details: [
          'Pessoas com alta inteligência interpessoal entendem sentimentos alheios e facilitam o trabalho em equipe.',
          'São referência em comunicação, mediação de conflitos e liderança baseada em relacionamentos.'
        ],
        professions: ['Psicólogo(a)', 'Professor(a)', 'Líder Comunitário', 'Gestor(a) de RH', 'Assistente Social', 'Coach', 'Mediador(a)', 'Vendedor(a)', 'Enfermeiro(a)', 'Relações Públicas']
      },
      { 
        key: 'intrapessoal', 
        name: 'Intrapessoal', 
        icon: 'self_improvement', 
        description: 'Voltada ao autoconhecimento — compreender emoções, valores e motivações pessoais.',
        details: [
          'Pessoas introspectivas e reflexivas usam essa inteligência para definir metas coerentes com seus princípios.',
          'Têm clareza sobre pontos fortes, limitações e buscam constantemente crescimento pessoal.'
        ],
        professions: ['Psicoterapeuta', 'Filósofo(a)', 'Escritor(a)', 'Artista', 'Pesquisador(a)', 'Consultor(a) de carreira', 'Professor(a)', 'Coach de vida', 'Instrutor(a) de mindfulness', 'Empreendedor(a)']
      },
      { 
        key: 'naturalista', 
        name: 'Naturalista', 
        icon: 'nature', 
        description: 'Relacionada à compreensão da natureza, dos ecossistemas e da sustentabilidade.',
        details: [
          'Pessoas com inteligência naturalista observam padrões no meio ambiente e se conectam com temas ecológicos.',
          'Demonstram interesse por biologia, cuidado com seres vivos e conservação dos recursos naturais.'
        ],
        professions: ['Biólogo(a)', 'Veterinário(a)', 'Agrônomo(a)', 'Ecólogo(a)', 'Geógrafo(a)', 'Engenheiro(a) Ambiental', 'Oceanógrafo(a)', 'Paisagista', 'Educador(a) Ambiental', 'Botânico(a)']
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
                  Profissões em que pode se destacar
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
                Clique para entender o modelo e como aplicá-lo à sua trajetória.
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
            🏆 Suas 3 Inteligências Dominantes
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
              📊 Outras Inteligências no Seu Perfil
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
      title: 'Teste RIASEC — Tipos de Personalidade Profissional',
      paragraphs: [
        'O modelo RIASEC, criado por John Holland, ajuda a identificar o tipo de ambiente profissional que mais combina com cada pessoa. Ele se baseia em seis perfis — Realista, Investigativo, Artístico, Social, Empreendedor e Convencional — e mostra como nossos interesses, valores e habilidades se conectam com diferentes áreas de trabalho.',
        'Compreender seu tipo RIASEC é essencial para fazer escolhas mais conscientes, encontrar carreiras alinhadas ao seu perfil pessoal e aumentar a satisfação e o desempenho no futuro profissional.'
      ]
    }
    
    const profiles = [
      { 
        key: 'R', 
        name: 'Realista', 
        icon: 'construction', 
        description: 'Pessoas práticas, objetivas e com habilidades manuais.',
        details: {
          paragraphs: [
            'Pessoas práticas, objetivas e com habilidades manuais. Gostam de trabalhar com ferramentas, máquinas, animais ou atividades físicas.',
            'Preferem tarefas concretas e ambientes estruturados, onde possam fazer acontecer de forma tangível.'
          ],
          characteristics: ['Eficiência', 'Persistência', 'Foco em resultados', 'Ação direta'],
          challenges: ['Dificuldade em lidar com abstrações ou ambientes muito teóricos'],
          areas: ['Engenharia Mecânica', 'Eletrônica', 'Arquitetura', 'Design de Produto', 'Agronomia', 'Enfermagem', 'Técnico em Manutenção', 'Construção Civil', 'Logística', 'Gastronomia']
        }
      },
      { 
        key: 'I', 
        name: 'Investigativo', 
        icon: 'science', 
        description: 'Pessoas analíticas, curiosas e racionais.',
        details: {
          paragraphs: [
            'Pessoas analíticas, curiosas e racionais, com interesse em compreender fenômenos complexos.',
            'Gostam de pesquisar, analisar e resolver problemas por meio da observação e da lógica, valorizando o conhecimento e o pensamento crítico.'
          ],
          characteristics: ['Curiosidade intelectual', 'Autonomia', 'Precisão', 'Reflexão'],
          challenges: ['Tendência ao isolamento', 'Dificuldade em tarefas muito práticas'],
          areas: ['Medicina', 'Biologia', 'Psicologia', 'Engenharia de Dados', 'Pesquisa Científica', 'Estatística', 'Análise de Sistemas', 'Química', 'Ciências Atuariais', 'Tecnologia da Informação']
        }
      },
      { 
        key: 'A', 
        name: 'Artístico', 
        icon: 'palette', 
        description: 'Pessoas criativas, expressivas e intuitivas.',
        details: {
          paragraphs: [
            'Pessoas criativas, expressivas e intuitivas, que valorizam a originalidade e a estética.',
            'Buscam ambientes livres e flexíveis para experimentar, inovar e expressar ideias por meio da arte, escrita, design, música ou comunicação.'
          ],
          characteristics: ['Sensibilidade', 'Imaginação', 'Liberdade', 'Expressão pessoal'],
          challenges: ['Dificuldade com regras rígidas', 'Resistência a rotinas excessivas'],
          areas: ['Design Gráfico', 'Arquitetura', 'Publicidade', 'Moda', 'Fotografia', 'Cinema', 'Artes Visuais', 'Jornalismo', 'Produção Cultural', 'Música']
        }
      },
      { 
        key: 'S', 
        name: 'Social', 
        icon: 'groups', 
        description: 'Pessoas empáticas, comunicativas e colaborativas.',
        details: {
          paragraphs: [
            'Pessoas empáticas, comunicativas e colaborativas, que se sentem realizadas ao ajudar, ensinar ou orientar os outros.',
            'Têm alta inteligência emocional e se destacam em papéis de apoio, ensino e cuidado humano.'
          ],
          characteristics: ['Paciência', 'Sensibilidade', 'Escuta ativa', 'Senso de comunidade'],
          challenges: ['Dificuldade em lidar com conflitos intensos', 'Desafios em decisões estritamente racionais'],
          areas: ['Psicologia', 'Pedagogia', 'Serviço Social', 'Fisioterapia', 'Medicina', 'Enfermagem', 'Recursos Humanos', 'Coaching', 'Educação Física', 'Orientação Profissional']
        }
      },
      { 
        key: 'E', 
        name: 'Empreendedor', 
        icon: 'trending_up', 
        description: 'Pessoas inovadoras, ambiciosas e comunicativas.',
        details: {
          paragraphs: [
            'Pessoas inovadoras, ambiciosas e comunicativas, que gostam de liderar, influenciar e criar impacto.',
            'Sentem-se motivadas por desafios, poder de decisão e reconhecimento, valorizando ambientes dinâmicos e resultados rápidos.'
          ],
          characteristics: ['Liderança', 'Persuasão', 'Iniciativa', 'Visão estratégica'],
          challenges: ['Impaciência', 'Aversão a detalhes operacionais'],
          areas: ['Administração', 'Marketing', 'Vendas', 'Direito', 'Relações Públicas', 'Gestão de Negócios', 'Empreendedorismo', 'Consultoria', 'Economia', 'Comunicação Empresarial']
        }
      },
      { 
        key: 'C', 
        name: 'Convencional', 
        icon: 'checklist', 
        description: 'Pessoas organizadas, metódicas e responsáveis.',
        details: {
          paragraphs: [
            'Pessoas organizadas, metódicas e responsáveis, que gostam de trabalhar com dados, sistemas e processos bem definidos.',
            'Valorizam regras, estabilidade e precisão, sendo excelentes em planejamento, controle e garantia de qualidade.'
          ],
          characteristics: ['Disciplina', 'Confiabilidade', 'Atenção aos detalhes', 'Foco em qualidade'],
          challenges: ['Resistência à mudança', 'Dificuldade em contextos muito improvisados'],
          areas: ['Contabilidade', 'Administração', 'Finanças', 'Secretariado Executivo', 'Arquivologia', 'Análise de Dados', 'Direito Tributário', 'Banco e Seguros', 'Planejamento', 'Controladoria']
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
                  Características em destaque
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {profile.details.characteristics.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                    </div>

                    <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  Desafios comuns
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {profile.details.challenges.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  Áreas e profissões recomendadas
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
                Clique para entender como este modelo orienta escolhas de carreira.
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
              📊 Outros Perfis no Seu Código Holland
            </h4>
            <div className="space-y-3">
              {remainingProfiles.map((profile, idx) => renderProfileCard(profile, idx + 1))}
            </div>
          </div>
        )}

        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">code</span>
            Seu Código Holland
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs text-slate-600 dark:text-slate-400">Sequência dominante:</p>
            {sortedProfiles.slice(0, 3).map(profile => (
              <span key={profile.key} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                {profile.key} - {profile.name}
                </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            O código Holland combina seus três perfis mais altos, revelando uma bússola profissional para orientar decisões de carreira.
          </p>
        </div>
      </div>
    )
  }

  const renderArchetypesResults = (results) => {
    if (!results) return null

    const overview = {
      title: 'Teste de Arquétipos — Os Perfis Universais da Jornada Pessoal e Profissional',
      paragraphs: [
        'Os arquétipos são padrões universais de comportamento, emoção e pensamento que habitam o inconsciente coletivo, conceito desenvolvido por Carl Gustav Jung.',
        'Eles representam modelos simbólicos de identidade, influenciando nossas escolhas, relações e caminhos profissionais. Conhecer seus arquétipos predominantes ajuda a alinhar projetos, carreiras e relacionamentos à sua essência.'
      ]
    }

    const archetypes = [
      {
        key: 'inocente',
        name: 'O Inocente',
        icon: 'sentiment_satisfied',
        short: 'Busca felicidade, otimismo e simplicidade.',
        details: {
          paragraphs: [
            'O Inocente acredita no bem e busca viver com autenticidade, simplicidade e fé na bondade das pessoas.',
            'Prefere ambientes leves, acolhedores e positivos, onde possa nutrir esperança e inspirar otimismo.'
          ],
          strengths: ['Otimismo contagiante', 'Confiança nas pessoas', 'Busca por harmonia', 'Visão positiva da vida'],
          challenges: ['Ingenuidade em ambientes competitivos', 'Dificuldade em lidar com conflitos', 'Tendência a evitar realidades difíceis'],
          areas: ['Educação Infantil', 'Hospitalidade', 'Pastoral ou Atividade Religiosa', 'Serviços Comunitários', 'Experiências de Bem-Estar', 'Marketing de Experiências', 'Design de Serviços Humanizados']
        }
      },
      {
        key: 'sabio',
        name: 'O Sábio',
        icon: 'auto_stories',
        short: 'Busca verdade, conhecimento e compreensão profunda.',
        details: {
          paragraphs: [
            'O Sábio é movido pela curiosidade intelectual, pelo desejo de entender como o mundo funciona e compartilhar sabedoria.',
            'Valoriza análises profundas, aprendizado contínuo e decisões embasadas em evidências e reflexão.'
          ],
          strengths: ['Pensamento crítico', 'Liderança intelectual', 'Tomada de decisão orientada por dados', 'Aprendizado contínuo'],
          challenges: ['Excesso de análise', 'Perfeccionismo intelectual', 'Dificuldade em agir sem todas as informações'],
          areas: ['Pesquisa Acadêmica', 'Docência', 'Consultoria Estratégica', 'Jornalismo Investigativo', 'Ciência de Dados', 'Psicologia', 'Mentoria e Educação Corporativa']
        }
      },
      {
        key: 'explorador',
        name: 'O Explorador',
        icon: 'explore',
        short: 'Busca liberdade, aventura e descoberta.',
        details: {
          paragraphs: [
            'O Explorador valoriza autonomia, autenticidade e novas experiências. Tem forte desejo de expandir fronteiras e conhecer possibilidades.',
            'Prefere carreiras e projetos com liberdade criativa, movimento constante e espaço para inovar.'
          ],
          strengths: ['Curiosidade prática', 'Coragem para arriscar', 'Autenticidade', 'Capacidade de se reinventar'],
          challenges: ['Inquietação com rotinas', 'Dificuldade em manter projetos longos', 'Busca constante por novidade'],
          areas: ['Turismo e Hospitalidade', 'Fotografia de Viagem', 'Empreendedorismo Criativo', 'Pesquisas de Mercado', 'Marketing de Lifestyle', 'Idiomas e Relações Internacionais', 'Startups e Negócios Digitais']
        }
      },
      {
        key: 'foraDaLei',
        name: 'O Fora da Lei',
        icon: 'emergency',
        short: 'Desafia o status quo e busca mudança radical.',
        details: {
          paragraphs: [
            'O Fora da Lei tem espírito disruptivo, confronta padrões e acredita na transformação social ou estrutural.',
            'Enxerga oportunidades onde existem regras limitantes e atua para criar novas alternativas.'
          ],
          strengths: ['Coragem para questionar', 'Visão inovadora', 'Capacidade de mobilizar mudanças', 'Espírito empreendedor'],
          challenges: ['Conflitos com autoridade', 'Impulsividade em decisões', 'Dificuldade com rotinas formais'],
          areas: ['Inovação Social', 'Movimentos Sociais', 'Empreendedorismo Disruptivo', 'Design de Serviços', 'Publicidade Crítica', 'Tecnologia', 'Consultoria de Transformação Cultural']
        }
      },
      {
        key: 'mago',
        name: 'O Mago',
        icon: 'auto_fix_high',
        short: 'Transforma ideias em experiências significativas.',
        details: {
          paragraphs: [
            'O Mago acredita no poder da visão e da imaginação para materializar mudanças profundas.',
            'Traz uma abordagem estratégica e inspiradora, conectando pessoas a experiências transformadoras.'
          ],
          strengths: ['Visão estratégica', 'Capacidade de inspirar', 'Criação de experiências marcantes', 'Intuição aguçada'],
          challenges: ['Expectativas elevadas', 'Risco de se sobrecarregar', 'Desejo de controle excessivo'],
          areas: ['Experiência do Cliente', 'Produção de Eventos', 'Storytelling Corporativo', 'Viagens Transformadoras', 'Educação Experiencial', 'Coaching e Mentoria', 'Design Thinking']
        }
      },
      {
        key: 'heroi',
        name: 'O Herói',
        icon: 'shield',
        short: 'Supera desafios e busca impactar o mundo.',
        details: {
          paragraphs: [
            'O Herói se motiva por desafios, busca provar seu valor e gerar impacto positivo na sociedade.',
            'Possui energia para liderar projetos difíceis, persistir em metas exigentes e inspirar coragem.'
          ],
          strengths: ['Resiliência sob pressão', 'Capacidade de mobilizar equipes', 'Orientação a resultados', 'Competitividade saudável'],
          challenges: ['Excesso de autoexigência', 'Dificuldade em delegar', 'Tendência a ignorar limites pessoais'],
          areas: ['Gestão Executiva', 'Carreiras Militares', 'Esportes de Alto Desempenho', 'Emergências e Resgates', 'Política Pública', 'Empreendedorismo', 'Consultoria de Performance']
        }
      },
      {
        key: 'amante',
        name: 'O Amante',
        icon: 'favorite',
        short: 'Valoriza intimidade, beleza e conexões profundas.',
        details: {
          paragraphs: [
            'O Amante vive intensamente emoções e relações, buscando criar experiências memoráveis e significativas.',
            'Dedica-se a projetos que envolvem estética, sensibilidade humana e proximidade com pessoas.'
          ],
          strengths: ['Sensibilidade estética', 'Empatia profunda', 'Capacidade de criar vínculos', 'Dedicação apaixonada'],
          challenges: ['Dificuldade em estabelecer limites pessoais', 'Sensibilidade elevada a críticas', 'Necessidade de aprovação'],
          areas: ['Design e Moda', 'Marketing Sensorial', 'Eventos Sociais', 'Consultoria de Imagem', 'Gastronomia', 'Terapias Integrativas', 'Atuação Artística']
        }
      },
      {
        key: 'bobo',
        name: 'O Bobo da Corte',
        icon: 'theater_comedy',
        short: 'Traz alegria, espontaneidade e leveza.',
        details: {
          paragraphs: [
            'O Bobo da Corte vive o presente com humor, improviso e criatividade, contribuindo para aliviar tensões.',
            'Transforma ambientes rígidos em espaços mais humanos e acessíveis, cultivando alegria e leveza.'
          ],
          strengths: ['Espontaneidade', 'Carisma', 'Capacidade de quebrar tensões', 'Criatividade social'],
          challenges: ['Pode ser subestimado', 'Dificuldade em contextos muito formais', 'Propensão a evitar conversas difíceis'],
          areas: ['Comédia', 'Produção de Conteúdo', 'Mídias Sociais', 'Trabalho com Crianças', 'Animação de Eventos', 'Terapia do Riso', 'Experiências de Entretenimento']
        }
      },
      {
        key: 'caraComum',
        name: 'O Cara Comum',
        icon: 'group',
        short: 'Busca pertencimento e igualdade.',
        details: {
          paragraphs: [
            'O Cara Comum valoriza autenticidade, proximidade e a sensação de fazer parte de uma comunidade.',
            'Prefere ambientes colaborativos, democráticos e com cultura de respeito mútuo.'
          ],
          strengths: ['Cooperação', 'Construção de confiança', 'Humildade', 'Sensibilidade a injustiças'],
          challenges: ['Evita protagonismo', 'Pode se subestimar', 'Dificuldade em contextos competitivos'],
          areas: ['Recursos Humanos', 'Serviços Comunitários', 'Atendimento ao Cliente', 'Comunicação Interna', 'Projetos Sociais', 'Educação', 'Hospitalidade']
        }
      },
      {
        key: 'cuidador',
        name: 'O Cuidador',
        icon: 'healing',
        short: 'Cuida, nutre e protege com compaixão.',
        details: {
          paragraphs: [
            'O Cuidador sente-se realizado ao apoiar o bem-estar dos outros e oferecer suporte genuíno.',
            'Possui alta empatia e senso de responsabilidade, buscando alívio e segurança para quem acompanha.'
          ],
          strengths: ['Empatia genuína', 'Resiliência emocional', 'Entrega dedicada', 'Escuta acolhedora'],
          challenges: ['Risco de esgotamento', 'Dificuldade em estabelecer limites', 'Propensão a se sobrecarregar'],
          areas: ['Psicologia', 'Enfermagem', 'Serviço Social', 'Fisioterapia', 'Pedagogia', 'Terapia Ocupacional', 'Coaching de Vida', 'Gestão de Pessoas Humanizada']
        }
      },
      {
        key: 'governante',
        name: 'O Governante',
        icon: 'workspace_premium',
        short: 'Cria ordem, estruturas e direção.',
        details: {
          paragraphs: [
            'O Governante lidera com senso de responsabilidade, buscando estabilidade e resultados consistentes.',
            'Gosta de definir metas claras, estruturar equipes e estabelecer padrões para entregar excelência.'
          ],
          strengths: ['Organização', 'Tomada de decisão', 'Autoridade natural', 'Planejamento estratégico'],
          challenges: ['Controle excessivo', 'Dificuldade em delegar', 'Risco de centralizar poder'],
          areas: ['Direção Executiva', 'Gestão Pública', 'Coordenação Educacional', 'Planejamento Estratégico', 'Consultoria Empresarial', 'Governança Corporativa']
        }
      },
      {
        key: 'criador',
        name: 'O Criador',
        icon: 'brush',
        short: 'Busca inovação e expressão com propósito.',
        details: {
          paragraphs: [
            'O Criador transforma ideias em algo concreto e original, unindo estética, significado e impacto.',
            'Encontra realização em processos autorais, onde pode deixar sua marca e construir narrativas memoráveis.'
          ],
          strengths: ['Visão criativa', 'Dedicação a projetos autorais', 'Capacidade de materializar ideias', 'Sensibilidade estética apurada'],
          challenges: ['Autocrítica intensa', 'Perfeccionismo', 'Dificuldade em concluir projetos extensos'],
          areas: ['Design', 'Arquitetura', 'Publicidade', 'Produção Audiovisual', 'Artes Visuais', 'UX/UI', 'Branding', 'Empreendimentos Criativos']
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
                  Potenciais destaques
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {arch.details.strengths.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
        </div>

        <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  Pontos de atenção
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {arch.details.challenges.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                  </div>

              <div>
                <p className={`font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  Áreas e papéis sugeridos
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
                Clique para entender como os arquétipos podem orientar suas escolhas pessoais e profissionais.
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
            ⭐ Seus 3 Arquétipos Dominantes
          </h4>
          {top3.map((arch, idx) => renderArchetypeCard(arch, idx, false))}
        </div>

        {remaining.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              📊 Outros Arquétipos Presentes em Você
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
      'anamnese-inicial': 'Anamnese - Seus Resultados',
      'disc-insight': 'DISC Insight - Seu Perfil',
      'inteligen-finder': 'Inteligen Finder - Resumo do Projeto',
      'multiple-intelligences': 'Múltiplas Inteligências - Seu Perfil',
      'riasec': 'RIASEC - Seu Perfil Profissional',
      'archetypes': 'Arquétipos de Jung - Seus Resultados'
    }
    return titles[testId] || 'Resultados'
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
                  Concluído em {formatDate(testData.completedAt)}
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
          <div className="space-y-6">
            {testId === 'disc-insight' && renderDISCResults(testData?.results)}
            {testId === 'anamnese-inicial' && renderAnamneseResults(testData?.data)}
            {testId === 'inteligen-finder' && renderInteligenResults(testData?.data)}
            {testId === 'multiple-intelligences' && renderMultipleIntelligencesResults(testData?.results)}
            {testId === 'riasec' && renderRiasecResults(testData?.results)}
            {testId === 'archetypes' && renderArchetypesResults(testData?.results)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Seus dados estão salvos localmente no navegador
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssessmentResultsModal