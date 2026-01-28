import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      app: {
        name: 'Trajetória',
      },
      nav: {
        aboutProject: 'About the Project',
        backToSite: 'Back to site',
        themeToggleLight: 'Switch to light theme',
        themeToggleDark: 'Switch to dark theme',
      },
      footer: {
        copyright: '© 2025 Trajetória. All rights reserved.',
      },
      hero: {
        titleLine1: 'Discover your path',
        titleLine2: 'Build your journey.',
        description:
          'Trajetória connects self-knowledge, technology and design to help young people find purpose, direction and confidence in the midst of contemporary changes.',
        description2:
          'Through personality tests, learning paths and personalized reports, you understand your strengths, values and skills — step by step.',
      },
      about: {
        badge: 'About Trajetória',
        titleLine1: 'Discover your path.',
        titleLine2: 'Build your journey.',
        intro: 'More than a platform, a space for discovery.',
        p1: 'Trajetória connects self-knowledge, technology and design to help young people find purpose, direction and confidence in the midst of contemporary changes. Through personality tests, learning paths and personalized reports, you understand your strengths, values and skills — step by step.',
        p2: 'Understand who you are and where you want to go. The site is composed of tools based on recognized methodologies that help map your potential and align your choices with your purpose.',
        p3: 'Each journey is unique. Yours starts here. Receive a visual, complete report about your personality, learning style and areas of professional affinity. Turn information into direction.',
        callout:
          'We believe in the power of self-knowledge as the seed of the future. Each young person carries a unique energy within — the éther, their vital force. Trajetória exists to nourish this energy and guide it towards their purpose in life and career.',
        lastLine: 'The next step is yours.',
        sectionTitle: 'About the Project',
        sectionIntroTitle: 'About the Trajetória Project',
        sectionP1:
          'The Trajetória project was born from the need to rethink how young people build their personal and professional paths in a world in constant transformation. In a scenario marked by anxiety, social pressure and the speed of technological changes, many students reach the end of basic education without clarity about their talents, skills or future possibilities.',
        sectionP2:
          'School, still based on a traditional model inherited from the Industrial Revolution, maintains a structure that values repetition and technical performance, but does little to stimulate self-knowledge, creativity and critical thinking. In this context, career guidance becomes limited, treating career choices as isolated decisions, and not as part of a process of human and emotional discovery.',
        sectionP3:
          'Trajetória emerges as a response to this challenge: a digital platform developed in the Visual Design course at Universidade Positivo, which integrates psychology, strategic design and technology to promote self-knowledge and professional reflection. Through visual, interactive and accessible experiences, the tool invites young people to understand that human beings are made up of multiple intelligences, skills and powers — and that no journey is linear.',
        sectionP4:
          'The platform uses recognized tests, such as Gardner’s Multiple Intelligences, DISC, RIASEC and Jungian Archetypes, to help users map their strengths, understand their behaviors and visualize possible paths for personal and professional growth.',
        sectionP5:
          'More than indicating professions, the project seeks to reconnect the individual with their purpose, awakening a sense of belonging and autonomy in the face of future uncertainties. Thus, Trajetória consolidates itself as a contemporary compass that guides, inspires and leads young people towards a more conscious, balanced and meaningful life — where learning, working and living once again walk side by side.',
      },
      journey: {
        title: 'YOUR ASSESSMENT JOURNEY',
        subtitle:
          'Complete the following assessments in sequence as part of your participation in our study.',
        progressLabel: 'Journey Progress',
        progressText: '{{completed}} of {{total}} assessments completed',
        progressComplete: '✓ Complete!',
        testCategories: {
          initial: 'Initial Assessment',
          behavioral: 'Behavioral Assessment',
          multipleIntelligences: 'Multiple Intelligences',
          career: 'Career Orientation',
          personality: 'Personality',
        },
        tests: {
          anamneseTitle: 'Anamnesis',
          anamneseDescription:
            'Comprehensive psychiatric history and initial screening questionnaire for study participants.',
          discTitle: 'Disc Insight',
          discDescription:
            'Personality assessment tool focused on behavioral patterns.',
          gardnerTitle: "Gardner's Intelligences",
          gardnerDescription:
            'Discover your dominant intelligences based on Howard Gardner’s theory. 8 types of intelligence assessed.',
          riasecTitle: 'RIASEC - Holland Test',
          riasecDescription:
            'Identify your professional profile through the RIASEC model. Discover ideal careers for you.',
          archetypesTitle: 'Jungian Archetypes',
          archetypesDescription:
            'Discover your dominant archetypes based on Carl Jung’s theory. 12 universal archetypes assessed.',
          completedLabel: 'Completed',
          scrollLeft: 'Scroll left',
          scrollRight: 'Scroll right',
        },
      },
      formLayout: {
        brandName: 'Trajetória',
        backToSite: 'Back to site',
        stepLabel: 'Step {{current}} of {{total}}',
      },
      testHeader: {
        objectiveLabel: 'Objective:',
        completedBadge:
          'You have already completed this test on {{date}}',
        viewSavedResults: 'View saved results',
        stepLabel: 'Step {{current}}: {{title}}',
      },
      testNavigation: {
        saveDraft: 'Save draft',
        nextStep: 'Next step',
        submitTest: 'Submit test',
        back: 'Back',
        progressLabel: '{{completed}} of {{total}} steps completed',
        honestyHint: 'Answer honestly. There are no right or wrong answers.',
      },
      validation: {
        required: '{{fieldName}} is required.',
        email: 'Please enter a valid email address.',
        phone: 'Please enter a valid phone number.',
        age: 'Please enter a valid age.',
        select: 'Please select an option for {{fieldName}}.',
      },
      assessmentCard: {
        nextTest: 'Next test',
        viewResults: 'View results',
        start: 'Start',
        retakeTitle: 'Retake test',
      },
      fileUpload: {
        clickOrDrop: 'Click to upload or drag and drop',
        imagesLabel: 'Images (MAX. {{maxSize}})',
        filesLabel: 'Files (MAX. {{maxSize}})',
      },
      tests: {
        anamnese: {
          intro: {
            title: 'Initial Anamnesis',
            subtitle: '“Who are you today?”',
            whyTitle: 'Why is this form important?',
            whyText:
              'The Initial Anamnesis is the first step of your self-knowledge journey. This form collects essential information about you, your education, experiences and aspirations. This information helps us personalize your experience and provide more relevant insights in the next tests.',
            tiles: [
              { title: 'Identification', desc: 'Basic personal data' },
              { title: 'Education', desc: 'Your academic background' },
              { title: 'Experience', desc: 'Your professional history' },
              { title: 'Interests', desc: 'Areas that spark your interest' },
              { title: 'Reflections', desc: 'Your strengths and challenges' },
              { title: 'Goals', desc: 'Your goals and expectations' },
            ],
            infoTitle: 'Information about the form',
            duration: 'Duration:',
            durationText: 'Approximately 15–20 minutes',
            sections: 'Sections:',
            sectionsText: '5 sections divided by theme',
            privacy: 'Privacy:',
            privacyText: 'Your data is confidential and secure',
            saveText: 'You can save your progress and return later',
            backButton: 'Back',
            startButton: 'Start',
          },
          header: {
            testNumber: 'Test 1',
            title: 'Initial Anamnesis: “Who are you today?”',
            objective:
              'Collect basic and contextual data about you, allowing a more personalized understanding of the other tests and the reports generated by the platform.',
          },
          steps: {
            1: 'Identification and Personal Context',
            2: 'Education',
            3: 'Professional Experiences',
            4: 'Interests',
            5: 'Reflections on your own TRAJECTÓRIA',
          },
          fields: {
            nomeCompleto: {
              label: 'Full Name',
              placeholder: 'Enter your full name',
            },
            idade: {
              label: 'Age',
              placeholder: 'Enter your age',
            },
            cidadeEstado: {
              label: 'City/State',
              placeholder: 'E.g.: São Paulo/SP',
            },
            email: {
              label: 'Email',
              placeholder: 'you@example.com',
            },
            telefone: {
              label: 'Phone number',
              placeholder: '(11) 98765-4321',
            },
            nivelEscolaridade: {
              sectionTitle: 'What is your education level?',
              label: 'Education Level',
              options: [
                'Elementary School',
                'High School',
                'Technical Education',
                'Higher Education (In progress)',
                'Higher Education (Completed)',
                'Postgraduate/Master’s/Doctorate',
              ],
            },
            estudandoAtualmente: {
              label: 'Are you currently studying?',
              options: ['Yes', 'No'],
            },
            areaEstudo: {
              label: 'What is your area of study/education?',
              placeholder: 'Describe your area of study or education...',
            },
            situacaoProfissional: {
              sectionTitle: 'Professional experience',
              label: 'What is your current professional situation?',
              options: [
                'Employed',
                'Unemployed',
                'Self-employed',
                'Only studying',
                'Looking for the first job',
              ],
            },
            tempoTrabalho: {
              label: 'How long have you been working or have worked?',
              placeholder: 'Select an option',
              options: [
                "I'm not working",
                'Less than 1 year',
                '1 to 3 years',
                '3 to 5 years',
                'More than 5 years',
              ],
            },
            ocupacaoAtual: {
              label: 'If you are working, what is your current occupation/position?',
              placeholder: 'Describe your current occupation or job role...',
            },
            satisfacaoTrabalho: {
              label: 'How do you evaluate your satisfaction with your current job?',
              options: [
                'Very satisfied',
                'Satisfied',
                'Neutral',
                'Dissatisfied',
                "Not applicable / I'm not working",
              ],
            },
            areasInteresse: {
              sectionTitle: 'What are your interests?',
              label: 'Which professional areas interest you?',
              options: [
                'Technology and Innovation',
                'Health and Well-being',
                'Education',
                'Communication and Marketing',
                'Administration and Management',
                'Arts and Design',
                'Engineering',
                'Humanities',
                'Exact Sciences',
                'Entrepreneurship',
                'Environment',
                'Law and Legal',
              ],
            },
            ambienteTrabalho: {
              label: 'What type of work environment do you prefer?',
              options: [
                'On-site office',
                'Hybrid (on-site and remote)',
                'Fully remote',
                'Field/external work',
                'No preference',
              ],
            },
            objetivosCarreira: {
              label: 'What are your main career goals?',
              options: [
                'Financial stability',
                'Professional growth',
                'Working with what I love',
                'Schedule flexibility',
                'Professional recognition',
                'Making a difference in society',
                'Owning my own business',
                'Working remotely',
              ],
            },
            pontosFortesHabilidades: {
              label: 'What do you consider to be your main strengths or skills?',
              placeholder:
                'Think about characteristics, talents or competencies that you master well...',
            },
            desafiosDificuldades: {
              label: 'What are your main challenges or difficulties in professional life?',
              placeholder:
                'Be honest about what you feel you need to develop or overcome...',
            },
            motivacaoOrientacao: {
              label: 'What motivates you to seek career guidance at this moment?',
              placeholder: 'Tell us a bit about what brought you here...',
            },
            expectativasProcesso: {
              label: 'What are your expectations regarding this guidance process?',
              placeholder: 'What do you hope to achieve or discover...',
            },
          },
          errors: {
            nivelEscolaridade: 'Please select your education level.',
            estudandoAtualmente: 'Please indicate whether you are currently studying.',
            situacaoProfissional: 'Please select your professional situation.',
            areasInteresse: 'Please select at least one area of interest.',
          },
        },
      },
    },
  },
  pt: {
    translation: {
      app: {
        name: 'Trajetória',
      },
      nav: {
        aboutProject: 'Sobre o Projeto',
        backToSite: 'Voltar ao site',
        themeToggleLight: 'Alternar para tema claro',
        themeToggleDark: 'Alternar para tema escuro',
      },
      footer: {
        copyright: '© 2025 Trajetória. Todos os direitos reservados.',
      },
      hero: {
        titleLine1: 'Descubra o seu caminho',
        titleLine2: 'Construa a sua trajetória.',
        description:
          'A Trajetória conecta autoconhecimento, tecnologia e design para ajudar jovens a encontrarem propósito, direção e confiança em meio às mudanças do mundo contemporâneo.',
        description2:
          'Por meio de testes de personalidade, trilhas de aprendizado e relatórios personalizados, você compreende suas forças, valores e habilidades — passo a passo.',
      },
      about: {
        badge: 'Sobre a Trajetória',
        titleLine1: 'Descubra o seu caminho.',
        titleLine2: 'Construa a sua trajetória.',
        intro: 'Mais do que uma plataforma, um espaço de descoberta.',
        p1: 'A Trajetória conecta autoconhecimento, tecnologia e design para ajudar jovens a encontrarem propósito, direção e confiança em meio às mudanças do mundo contemporâneo. Por meio de testes de personalidade, trilhas de aprendizado e relatórios personalizados, você compreende suas forças, valores e habilidades — passo a passo.',
        p2: 'Entenda quem você é e onde quer chegar. O site é composto por ferramentas baseadas em metodologias reconhecidas que ajudam a mapear seus potenciais e alinhar suas escolhas com seu propósito.',
        p3: 'Cada jornada é única. A sua começa aqui. Receba um relatório visual e completo sobre sua personalidade, estilo de aprendizado e áreas de afinidade profissional. Transforme informações em direção.',
        callout:
          'Acreditamos no poder do autoconhecimento como semente do futuro. Cada jovem carrega dentro de si uma energia única — o éther, sua força vital. A Trajetória existe para nutrir essa energia e guiá-la rumo ao seu propósito de vida e carreira.',
        lastLine: 'O próximo passo é seu.',
        sectionTitle: 'Sobre o Projeto',
        sectionIntroTitle: 'Sobre o Projeto Trajetória',
        sectionP1:
          'O projeto Trajetória nasce da necessidade de repensar o modo como jovens constroem seus caminhos pessoais e profissionais em um mundo em constante transformação. Em um cenário marcado pela ansiedade, pela pressão social e pela velocidade das mudanças tecnológicas, muitos estudantes chegam ao fim da educação básica sem clareza sobre seus talentos, habilidades ou possibilidades de futuro.',
        sectionP2:
          'A escola, ainda pautada em um modelo tradicional herdado da Revolução Industrial, mantém uma estrutura que valoriza a repetição e o desempenho técnico, mas pouco estimula o autoconhecimento, a criatividade e o pensamento crítico. Nesse contexto, a orientação profissional se torna limitada, tratando escolhas de carreira como decisões isoladas, e não como parte de um processo de descoberta humana e emocional.',
        sectionP3:
          'A Trajetória surge como uma resposta a esse desafio: uma plataforma digital desenvolvida no curso de Design Visual da Universidade Positivo, que integra psicologia, design estratégico e tecnologia para promover o autoconhecimento e a reflexão profissional. Por meio de experiências visuais, interativas e acessíveis, a ferramenta convida o jovem a compreender que o ser humano é formado por múltiplas inteligências, habilidades e potências — e que nenhuma trajetória é linear.',
        sectionP4:
          'A plataforma utiliza testes reconhecidos, como Múltiplas Inteligências de Gardner, DISC, RIASEC e Arquétipos de Jung, para ajudar o usuário a mapear seus forças, compreender seus comportamentos e visualizar caminhos possíveis de crescimento pessoal e profissional.',
        sectionP5:
          'Mais do que indicar profissões, o projeto busca reconectar o indivíduo com seu propósito, despertando o sentimento de pertencimento e autonomia diante das incertezas do futuro. Assim, a Trajetória se consolida como uma bússola contemporânea, que orienta, inspira e guia o jovem em direção a uma vida mais consciente, equilibrada e significativa — onde aprender, trabalhar e viver voltam a caminhar lado a lado.',
      },
      journey: {
        title: 'SUA TRAJETÓRIA DE AVALIAÇÃO',
        subtitle:
          'Complete as seguintes avaliações em sequência como parte de sua participação em nosso estudo.',
        progressLabel: 'Progresso da Jornada',
        progressText: '{{completed}} de {{total}} avaliações concluídas',
        progressComplete: '✓ Completo!',
        testCategories: {
          initial: 'Avaliação Inicial',
          behavioral: 'Avaliação Comportamental',
          multipleIntelligences: 'Múltiplas Inteligências',
          career: 'Orientação Profissional',
          personality: 'Personalidade',
        },
        tests: {
          anamneseTitle: 'Anamnese',
          anamneseDescription:
            'Histórico psiquiátrico abrangente e questionário de triagem inicial para participantes do estudo.',
          discTitle: 'Disc Insight',
          discDescription:
            'Ferramenta de avaliação de personalidade e padrões comportamentais',
          gardnerTitle: 'Inteligências de Gardner',
          gardnerDescription:
            'Descubra suas inteligências dominantes baseado na teoria de Howard Gardner. 8 tipos de inteligência avaliados.',
          riasecTitle: 'RIASEC - Teste de Holland',
          riasecDescription:
            'Identifique seu perfil profissional através do modelo RIASEC. Descubra as carreiras ideais para você.',
          archetypesTitle: 'Arquétipos de Jung',
          archetypesDescription:
            'Descubra seus arquétipos dominantes baseado na teoria de Carl Jung. 12 arquétipos universais avaliados.',
          completedLabel: 'Concluído',
          scrollLeft: 'Scroll Left',
          scrollRight: 'Scroll Right',
        },
      },
      formLayout: {
        brandName: 'Trajetória',
        backToSite: 'Voltar ao site',
        stepLabel: 'Etapa {{current}} de {{total}}',
      },
      testHeader: {
        objectiveLabel: 'Objetivo:',
        completedBadge:
          'Você já completou este teste em {{date}}',
        viewSavedResults: 'Ver resultados salvos',
        stepLabel: 'Etapa {{current}}: {{title}}',
      },
      testNavigation: {
        saveDraft: 'Salvar rascunho',
        nextStep: 'Próxima etapa',
        submitTest: 'Enviar teste',
        back: 'Voltar',
        progressLabel: '{{completed}} de {{total}} etapas concluídas',
        honestyHint: 'Responda com sinceridade. Não há respostas certas ou erradas.',
      },
      validation: {
        required: '{{fieldName}} é obrigatório.',
        email: 'Por favor, insira um endereço de e-mail válido.',
        phone: 'Por favor, insira um telefone válido.',
        age: 'Por favor, insira uma idade válida.',
        select: 'Por favor, selecione uma opção para {{fieldName}}.',
      },
      assessmentCard: {
        nextTest: 'Próximo teste',
        viewResults: 'Ver resultados',
        start: 'Iniciar',
        retakeTitle: 'Refazer teste',
      },
      fileUpload: {
        clickOrDrop: 'Clique para fazer upload ou arraste e solte',
        imagesLabel: 'Imagens (MÁX. {{maxSize}})',
        filesLabel: 'Arquivos (MÁX. {{maxSize}})',
      },
      tests: {
        anamnese: {
          intro: {
            title: 'Anamnese Inicial',
            subtitle: '"Quem é você hoje?"',
            whyTitle: 'Por que este formulário é importante?',
            whyText:
              'A Anamnese Inicial é o primeiro passo da sua jornada de autoconhecimento. Este formulário coleta informações essenciais sobre você, sua formação, experiências e aspirações. Essas informações nos ajudarão a personalizar sua experiência e fornecer insights mais relevantes nos próximos testes.',
            tiles: [
              { title: 'Identificação', desc: 'Dados pessoais básicos' },
              { title: 'Escolaridade', desc: 'Sua formação acadêmica' },
              { title: 'Experiência', desc: 'Seu histórico profissional' },
              { title: 'Interesses', desc: 'Áreas que despertam seu interesse' },
              { title: 'Reflexões', desc: 'Seus pontos fortes e desafios' },
              { title: 'Objetivos', desc: 'Suas metas e expectativas' },
            ],
            infoTitle: 'Informações sobre o formulário',
            duration: 'Duração:',
            durationText: 'Aproximadamente 15–20 minutos',
            sections: 'Seções:',
            sectionsText: '5 seções divididas por tema',
            privacy: 'Privacidade:',
            privacyText: 'Seus dados são confidenciais e seguros',
            saveText: 'Você pode salvar seu progresso e voltar depois',
            backButton: 'Voltar',
            startButton: 'Começar',
          },
          header: {
            testNumber: 'Teste 1',
            title: 'Anamnese Inicial: "Quem é você hoje?"',
            objective:
              'Coletar dados básicos e contextuais sobre você, permitindo uma leitura mais personalizada dos demais testes e dos relatórios gerados pela plataforma.',
          },
          steps: {
            1: 'Identificação e Contexto Pessoal',
            2: 'Escolaridade',
            3: 'Experiências Profissionais',
            4: 'Interesses',
            5: 'Reflexões sobre Trajetória',
          },
          fields: {
            nomeCompleto: {
              label: 'Nome Completo',
              placeholder: 'Digite seu nome completo',
            },
            idade: {
              label: 'Idade',
              placeholder: 'Digite sua idade',
            },
            cidadeEstado: {
              label: 'Cidade/Estado',
              placeholder: 'Ex: São Paulo/SP',
            },
            email: {
              label: 'E-mail',
              placeholder: 'voce@exemplo.com',
            },
            telefone: {
              label: 'Telefone',
              placeholder: '(11) 98765-4321',
            },
            nivelEscolaridade: {
              sectionTitle: 'Qual seu nível de escolaridade?',
              label: 'Nível de Escolaridade',
              options: [
                'Ensino Fundamental',
                'Ensino Médio',
                'Ensino Técnico',
                'Ensino Superior (Cursando)',
                'Ensino Superior (Completo)',
                'Pós-graduação/Mestrado/Doutorado',
              ],
            },
            estudandoAtualmente: {
              label: 'Está estudando atualmente?',
              options: ['Sim', 'Não'],
            },
            areaEstudo: {
              label: 'Qual área de estudo/formação?',
              placeholder: 'Descreva sua área de estudo ou formação...',
            },
            situacaoProfissional: {
              sectionTitle: 'Experiências no ramo profissional',
              label: 'Qual sua situação profissional atual?',
              options: [
                'Empregado(a)',
                'Desempregado(a)',
                'Autônomo(a)',
                'Apenas estudante',
                'Em busca do primeiro emprego',
              ],
            },
            tempoTrabalho: {
              label: 'Há quanto tempo trabalha ou já trabalhou?',
              placeholder: 'Selecione uma opção',
              options: [
                'Não estou trabalhando',
                'Menos de 1 ano',
                '1 a 3 anos',
                '3 a 5 anos',
                'Mais de 5 anos',
              ],
            },
            ocupacaoAtual: {
              label: 'Se está trabalhando, qual sua ocupação/cargo atual?',
              placeholder: 'Descreva sua ocupação ou cargo atual...',
            },
            satisfacaoTrabalho: {
              label: 'Como você avalia sua satisfação com o trabalho atual?',
              options: [
                'Muito satisfeito(a)',
                'Satisfeito(a)',
                'Neutro',
                'Insatisfeito(a)',
                'Não se aplica / Não estou trabalhando',
              ],
            },
            areasInteresse: {
              sectionTitle: 'Quais os seus interesses?',
              label: 'Quais áreas profissionais despertam seu interesse?',
              options: [
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
                'Direito e Jurídico',
              ],
            },
            ambienteTrabalho: {
              label: 'Qual tipo de ambiente de trabalho prefere?',
              options: [
                'Escritório presencial',
                'Híbrido (presencial e remoto)',
                'Totalmente remoto',
                'Trabalho de campo/externo',
                'Indiferente',
              ],
            },
            objetivosCarreira: {
              label: 'Quais são seus principais objetivos de carreira?',
              options: [
                'Estabilidade financeira',
                'Crescimento profissional',
                'Trabalhar com o que amo',
                'Flexibilidade de horário',
                'Reconhecimento profissional',
                'Fazer diferença na sociedade',
                'Ter meu próprio negócio',
                'Trabalhar remotamente',
              ],
            },
            pontosFortesHabilidades: {
              label: 'Quais você considera serem seus principais pontos fortes ou habilidades?',
              placeholder:
                'Pense em características, talentos ou competências que você domina bem...',
            },
            desafiosDificuldades: {
              label: 'Quais são seus principais desafios ou dificuldades na vida profissional?',
              placeholder:
                'Seja honesto sobre o que você sente que precisa desenvolver ou superar...',
            },
            motivacaoOrientacao: {
              label: 'O que te motiva a buscar orientação profissional neste momento?',
              placeholder: 'Conte um pouco sobre o que te trouxe até aqui...',
            },
            expectativasProcesso: {
              label: 'Quais são suas expectativas em relação a este processo de orientação?',
              placeholder: 'O que você espera conquistar ou descobrir...',
            },
          },
          errors: {
            nivelEscolaridade: 'Por favor, selecione seu nível de escolaridade.',
            estudandoAtualmente: 'Por favor, indique se está estudando atualmente.',
            situacaoProfissional: 'Por favor, selecione sua situação profissional.',
            areasInteresse: 'Por favor, selecione pelo menos uma área de interesse.',
          },
        },
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n

