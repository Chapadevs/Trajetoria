import React from 'react'

const ResultsModal = ({ isOpen, onClose, testId, testData }) => {
  if (!isOpen) return null

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
    
    const types = [
      { key: 'D', name: 'Dominância', color: 'red', description: 'Orientado para resultados, direto e decidido' },
      { key: 'I', name: 'Influência', color: 'yellow', description: 'Sociável, persuasivo e otimista' },
      { key: 'S', name: 'Estabilidade', color: 'green', description: 'Estável, paciente e leal' },
      { key: 'C', name: 'Conformidade', color: 'blue', description: 'Preciso, analítico e sistemático' }
    ]

    // Encontra o tipo dominante
    const dominant = Object.entries(results).reduce((a, b) => a[1] > b[1] ? a : b)
    const dominantType = types.find(t => t.key === dominant[0])

    return (
      <div className="space-y-6">
        {/* Perfil Dominante */}
        <div className={`p-6 rounded-xl bg-${dominantType.color}-50 dark:bg-${dominantType.color}-900/20 border-2 border-${dominantType.color}-200 dark:border-${dominantType.color}-800`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-full bg-${dominantType.color}-500 flex items-center justify-center`}>
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

        {/* Distribuição Completa */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Distribuição Completa
          </h4>
          <div className="space-y-3">
            {types.map(type => (
              <div key={type.key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full bg-${type.color}-500/20 flex items-center justify-center`}>
                      <span className={`text-${type.color}-600 dark:text-${type.color}-400 font-bold text-xs`}>
                        {type.key}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {type.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {results[type.key]}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`bg-${type.color}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${results[type.key]}%` }}
                  />
                </div>
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
    
    const intelligences = [
      { key: 'espacial', name: 'Espacial', color: 'purple', icon: 'palette', description: 'Visualização e manipulação espacial' },
      { key: 'logica', name: 'Lógico-Matemática', color: 'blue', icon: 'calculate', description: 'Raciocínio lógico e matemático' },
      { key: 'linguistica', name: 'Linguística', color: 'green', icon: 'book', description: 'Linguagem escrita e falada' },
      { key: 'musical', name: 'Musical', color: 'pink', icon: 'music_note', description: 'Percepção e criação musical' },
      { key: 'corporal', name: 'Corporal-Cinestésica', color: 'orange', icon: 'directions_run', description: 'Habilidades físicas e motoras' },
      { key: 'interpessoal', name: 'Interpessoal', color: 'cyan', icon: 'groups', description: 'Interação com outras pessoas' },
      { key: 'intrapessoal', name: 'Intrapessoal', color: 'indigo', icon: 'self_improvement', description: 'Autoconhecimento e reflexão' },
      { key: 'naturalista', name: 'Naturalista', color: 'emerald', icon: 'nature', description: 'Conexão com a natureza' }
    ]

    // Encontra as 3 inteligências dominantes
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1])
    const top3 = sorted.slice(0, 3).map(([key]) => key)

    return (
      <div className="space-y-6">
        {/* Top 3 Inteligências */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            🏆 Suas 3 Inteligências Dominantes
          </h4>
          {intelligences
            .filter(int => top3.includes(int.key))
            .sort((a, b) => results[b.key] - results[a.key])
            .map((intelligence, idx) => (
              <div key={intelligence.key} className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border-2 border-primary/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-black text-primary">#{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">{intelligence.icon}</span>
                      {intelligence.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{intelligence.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-primary">{results[intelligence.key]}%</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Todas as Inteligências */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            📊 Perfil Completo
          </h4>
          <div className="space-y-3">
            {intelligences.map(intelligence => (
              <div key={intelligence.key} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">{intelligence.icon}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {intelligence.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {results[intelligence.key]}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${results[intelligence.key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            Insights Profissionais
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Suas inteligências dominantes indicam que você pode se destacar em áreas que requerem {intelligences.find(i => i.key === top3[0])?.description.toLowerCase()}, {intelligences.find(i => i.key === top3[1])?.description.toLowerCase()} e {intelligences.find(i => i.key === top3[2])?.description.toLowerCase()}.
          </p>
        </div>
      </div>
    )
  }

  const renderRiasecResults = (results) => {
    if (!results) return null
    
    const profiles = [
      { 
        key: 'R', 
        name: 'Realista', 
        color: 'blue', 
        icon: 'construction', 
        description: 'Você prefere atividades práticas e trabalho manual. Gosta de trabalhar com objetos, máquinas e ferramentas.',
        careers: 'Engenharia, mecânica, agricultura, construção, veterinária'
      },
      { 
        key: 'I', 
        name: 'Investigativo', 
        color: 'purple', 
        icon: 'science', 
        description: 'Você é analítico e gosta de resolver problemas complexos. Prefere atividades que envolvem pesquisa e pensamento crítico.',
        careers: 'Ciências, medicina, pesquisa, análise de dados, tecnologia'
      },
      { 
        key: 'A', 
        name: 'Artístico', 
        color: 'pink', 
        icon: 'palette', 
        description: 'Você é criativo e valoriza a expressão pessoal. Gosta de trabalhar em ambientes não estruturados e inovadores.',
        careers: 'Design, artes, música, literatura, arquitetura, publicidade'
      },
      { 
        key: 'S', 
        name: 'Social', 
        color: 'green', 
        icon: 'groups', 
        description: 'Você gosta de trabalhar com pessoas e ajudar os outros. Valoriza relacionamentos e comunicação.',
        careers: 'Educação, psicologia, serviço social, recursos humanos, enfermagem'
      },
      { 
        key: 'E', 
        name: 'Empreendedor', 
        color: 'orange', 
        icon: 'trending_up', 
        description: 'Você é persuasivo e gosta de liderar. Valoriza poder, status e conquistas.',
        careers: 'Administração, vendas, marketing, direito, empreendedorismo, política'
      },
      { 
        key: 'C', 
        name: 'Convencional', 
        color: 'indigo', 
        icon: 'checklist', 
        description: 'Você é organizado e valoriza precisão e eficiência. Gosta de trabalhar com dados e procedimentos claros.',
        careers: 'Contabilidade, administração, finanças, secretariado, análise de sistemas'
      }
    ]

    // Ordena por pontuação
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1])
    const dominantKey = sorted[0][0]
    const dominantProfile = profiles.find(p => p.key === dominantKey)

    return (
      <div className="space-y-6">
        {/* Perfil Dominante */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 border-2 border-primary/40">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">{dominantProfile.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {dominantProfile.name}
              </h3>
              <p className="text-lg font-bold text-primary">{results[dominantKey]}%</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            {dominantProfile.description}
          </p>
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">💼 Carreiras Ideais:</p>
            <p className="text-sm text-slate-900 dark:text-white">{dominantProfile.careers}</p>
          </div>
        </div>

        {/* Todos os Perfis */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            📊 Seu Perfil Completo RIASEC
          </h4>
          <div className="space-y-3">
            {profiles.map(profile => (
              <div key={profile.key} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg">{profile.icon}</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white block">
                        {profile.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {profile.description.split('.')[0]}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-primary">
                    {results[profile.key]}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${results[profile.key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Código Holland */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">code</span>
            Seu Código Holland
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs text-slate-600 dark:text-slate-400">Top 3 perfis:</p>
            {sorted.slice(0, 3).map(([key]) => {
              const profile = profiles.find(p => p.key === key)
              return (
                <span key={key} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                  {key} - {profile.name}
                </span>
              )
            })}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            O código Holland é a combinação dos seus três perfis mais altos, representando sua personalidade profissional única.
          </p>
        </div>
      </div>
    )
  }

  const getTestTitle = () => {
    const titles = {
      'anamnese-inicial': 'Anamnese Pro - Seus Resultados',
      'disc-insight': 'DISC Insight - Seu Perfil',
      'inteligen-finder': 'Inteligen Finder - Resumo do Projeto',
      'multiple-intelligences': 'Múltiplas Inteligências - Seu Perfil',
      'riasec': 'RIASEC - Seu Perfil Profissional'
    }
    return titles[testId] || 'Resultados'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary to-secondary p-6 text-white">
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {testId === 'disc-insight' && renderDISCResults(testData?.results)}
          {testId === 'anamnese-inicial' && renderAnamneseResults(testData?.data)}
          {testId === 'inteligen-finder' && renderInteligenResults(testData?.data)}
          {testId === 'multiple-intelligences' && renderMultipleIntelligencesResults(testData?.results)}
          {testId === 'riasec' && renderRiasecResults(testData?.results)}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
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

export default ResultsModal

