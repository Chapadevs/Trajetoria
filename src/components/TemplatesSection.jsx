import React from 'react'
import FormCard from './FormCard'

const TemplatesSection = () => {
  const formTemplates = [
    {
      icon: 'person_add',
      category: 'Avaliação Inicial',
      title: 'Anamnese Pro',
      description: 'Histórico psiquiátrico abrangente e questionário de triagem inicial para participantes do estudo.',
      badgeColor: 'green',
      formUrl: '/forms/anamnese-inicial',
      testId: 'anamnese-inicial'
    },
    {
      icon: 'feedback',
      category: 'Avaliação Comportamental',
      title: 'Disc Insight',
      description: 'Ferramenta de avaliação de personalidade e padrões comportamentais para pesquisa psiquiátrica.',
      badgeColor: 'yellow',
      formUrl: '/forms/disc-personality',
      testId: 'disc-insight'
    },
    {
      icon: 'psychology',
      category: 'Múltiplas Inteligências',
      title: 'Inteligências de Gardner',
      description: 'Descubra suas inteligências dominantes baseado na teoria de Howard Gardner. 8 tipos de inteligência avaliados.',
      badgeColor: 'green',
      formUrl: '/forms/multiple-intelligences',
      testId: 'multiple-intelligences'
    },
    {
      icon: 'work',
      category: 'Orientação Profissional',
      title: 'RIASEC - Teste de Holland',
      description: 'Identifique seu perfil profissional através do modelo RIASEC. Descubra as carreiras ideais para você.',
      badgeColor: 'yellow',
      formUrl: '/forms/riasec',
      testId: 'riasec'
    },
    {
      icon: 'stars',
      category: 'Personalidade',
      title: 'Arquétipos de Jung',
      description: 'Descubra seus arquétipos dominantes baseado na teoria de Carl Jung. 12 arquétipos universais avaliados.',
      badgeColor: 'green',
      formUrl: '/forms/archetypes',
      testId: 'archetypes'
    }
  ]

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900/50 py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Ferramentas de Avaliação da Pesquisa
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Complete as seguintes avaliações como parte de sua participação em nosso estudo de pesquisa psiquiátrica.
          </p>
        </div>
        
        {/* Form Card Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {formTemplates.map((template, index) => (
            <FormCard key={index} {...template} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TemplatesSection

