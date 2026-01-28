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
        selectOption: 'Please select an option.',
      },
      likertScale: {
        option1: 'Strongly disagree',
        option2: 'Disagree',
        option3: 'Neutral',
        option4: 'Agree',
        option5: 'Strongly agree',
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
      reportDownload: {
        hint: 'Complete all tests above to generate your personalized report',
        unlockSteps: 'Complete all {{total}} steps to unlock',
        progress: 'Progress: {{completed}}/{{total}} tests completed',
        title: 'Complete Report',
        subtitleReady: 'Download a professional PDF with all your results',
        subtitleLocked: 'Complete all steps to unlock the report',
        backendOffline: 'Backend Offline',
        backendOfflineDesc: 'The report generation server is offline. Please make sure the backend is running on port 3001.',
        backendOfflineCmd: 'Run:',
        reportIncludes: 'The report {{verb}}:',
        reportIncludesPresent: 'includes',
        reportIncludesFuture: 'will include',
        featureAnamnese: 'Complete Initial Anamnesis',
        featureDisc: 'Detailed DISC analysis',
        featureMI: 'Multiple Intelligences profile',
        featureRiasec: 'Holland Code (RIASEC)',
        featureArchetypes: 'Personality Archetypes',
        featureRecommendations: 'Personalized recommendations',
        generatingPdf: 'Generating your PDF...',
        completeAllTests: 'Complete All {{total}} Tests ({{completed}}/{{total}})',
        downloadReport: 'Download Complete Report',
        mayTakeSeconds: 'This may take a few seconds...',
        narrativeTitle: 'AI-generated personalized narrative',
        generatedAt: 'Generated on {{date}}',
        downloadAgain: 'Download PDF again',
        testsRemaining: 'Tests Remaining: {{count}}',
        testsRemainingDesc: 'To generate the complete report, you need to complete ALL {{total}} available tests. Current progress: {{completed}} of {{total}} complete ({{percent}}%)',
        errorGeneric: 'Error generating the report. Please try again.',
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
        disc: {
          intro: {
            title: 'DISC Test',
            subtitle: 'Discover Your Personality Profile',
            whatIs: 'What is DISC?',
            whatIsDesc: 'DISC is a behavioral assessment tool that identifies four main personality types. This model helps you better understand your work style, communication and relationships.',
            types: [
              { letter: 'D', name: 'Dominance', desc: 'Results-oriented, direct and decisive' },
              { letter: 'I', name: 'Influence', desc: 'Sociable, persuasive and optimistic' },
              { letter: 'S', name: 'Steadiness', desc: 'Stable, patient and loyal' },
              { letter: 'C', name: 'Conscientiousness', desc: 'Accurate, analytical and systematic' },
            ],
            infoTitle: 'Test information',
            duration: 'Duration:',
            durationText: 'Approximately 10–15 minutes',
            questionsCount: 'Questions:',
            questionsCountText: '25 questions about behavior and work style',
            objective: 'Objective:',
            objectiveText: 'Identify your dominant behavioral profile',
            honesty: 'Answer honestly based on how you really behave',
            backButton: 'Back',
            startButton: 'Start Test',
          },
          header: {
            testNumber: 'Test 2',
            title: 'Discover your DISC personality profile',
            objective: 'Better understand your work style and relationships through this behavioral assessment.',
          },
          steps: { 1: 'Behavior at Work', 2: 'Problem Solving and Decisions', 3: 'Communication and Feedback', 4: 'Management and Adaptation', 5: 'Personal Style and Preferences' },
          questions: {
            step1: [
              { text: 'In work situations, I tend to:', options: ['Make decisions quickly and take the lead', 'Seek consensus and motivate the team', 'Stay calm and seek stability', 'Analyze in detail before acting'] },
              { text: 'When I face conflict, I:', options: ['Confront the problem directly', 'Try to persuade and find creative solutions', 'Avoid confrontation and seek harmony', 'Analyze all aspects carefully'] },
              { text: 'My communication style is:', options: ['Direct and to the point', 'Enthusiastic and expressive', 'Calm and patient', 'Precise and detailed'] },
              { text: 'In meetings, I usually:', options: ['Lead and make decisions', 'Contribute ideas and energize the group', 'Listen and support the group’s decisions', 'Ask questions and challenge details'] },
              { text: 'When I work in a team, I:', options: ['Take responsibility and lead', 'Motivate and inspire others', 'Am reliable and collaborative', 'Ensure everything is done correctly'] },
            ],
            step2: [
              { text: 'Under pressure, I:', options: ['Take immediate action', 'Seek support and motivation from others', 'Keep my composure', 'Analyze the situation methodically'] },
              { text: 'My approach to solving problems is:', options: ['Focused on quick results', 'Creative and collaborative', 'Systematic and careful', 'Data- and analysis-based'] },
              { text: 'In new projects, I:', options: ['Dive in head first', 'Get excited about the possibilities', 'Prefer to understand everything before starting', 'Plan each step meticulously'] },
              { text: 'When I make decisions, I:', options: ['Trust my intuition and experience', 'Consult other people', 'Consider the impact on everyone', 'Analyze all available options'] },
              { text: 'My ideal work environment is:', options: ['Dynamic with constant challenges', 'Social and stimulating', 'Stable and predictable', 'Organized and structured'] },
            ],
            step3: [
              { text: 'When I receive feedback, I:', options: ['Accept and implement quickly', 'Discuss and seek to understand the context', 'Listen patiently and reflect', 'Analyze critically and question'] },
              { text: 'In situations of change, I:', options: ['Adapt quickly', 'See it as an exciting opportunity', 'Need time to adjust', 'Want to understand all details first'] },
              { text: 'My main motivation at work is:', options: ['Achieving results and overcoming challenges', 'Recognition and social interaction', 'Security and harmony in the environment', 'Quality and precision in work'] },
              { text: 'When I lead a team, I:', options: ['Set clear goals and demand results', 'Inspire and motivate through enthusiasm', 'Support and develop each member', 'Define clear processes and standards'] },
              { text: 'In presentations, I:', options: ['Get straight to the point', 'Use engaging stories and examples', 'Am calm and methodical', 'Present detailed and accurate data'] },
            ],
            step4: [
              { text: 'My approach to deadlines is:', options: ['Work intensely to meet them', 'Stay optimistic even under pressure', 'Plan ahead to avoid rush', 'Organize everything meticulously from the start'] },
              { text: 'When I make mistakes, I:', options: ['Accept responsibility and move on', 'Stay optimistic and learn from the experience', 'Reflect carefully on what happened', 'Analyze in detail to avoid repetition'] },
              { text: 'In networking, I:', options: ['Focus on contacts that can bring results', 'Enjoy meeting people and making friends', 'Prefer to deepen existing relationships', 'Am selective and cautious with new contacts'] },
              { text: 'My way of dealing with details is:', options: ['Focus on what is essential for the result', 'Delegate or skim through details', 'Am careful but not obsessive', 'Pay meticulous attention to every detail'] },
              { text: 'In risk situations, I:', options: ['Take calculated risks for big gains', 'Am optimistic about the outcomes', 'Prefer safer alternatives', 'Analyze all risks before deciding'] },
            ],
            step5: [
              { text: 'My learning style is:', options: ['Practical, learning by doing', 'Social, learning with and through others', 'Gradual, needing time to absorb', 'Theoretical, studying the subject in depth'] },
              { text: 'When I work alone, I:', options: ['Am more productive and focused', 'Miss social interaction', 'Appreciate the peace and concentration', 'Can go deep without interruptions'] },
              { text: 'In situations of uncertainty, I:', options: ['Make decisions based on available information', 'Keep a positive attitude', 'Seek stability and reassuring information', 'Seek more data before acting'] },
              { text: 'My relationship with authority is:', options: ['I question when necessary', 'Seek to build positive relationships', 'Respect and follow established guidelines', 'Expect clarity and consistency in instructions'] },
              { text: 'At the end of the workday, I feel most satisfied when:', options: ['I achieved important goals', 'I had positive interactions with colleagues', 'I contributed to team harmony', 'I completed tasks with quality and precision'] },
            ],
          },
          errorSelect: 'Please select an option.',
        },
        multipleIntelligences: {
          intro: {
            title: 'Multiple Intelligences',
            subtitle: 'Discover Your Strengths',
            whatIs: 'What are Multiple Intelligences?',
            whatIsDesc: 'The theory of Multiple Intelligences, developed by Howard Gardner, proposes that intelligence is not a single ability but a set of 8 distinct skills we all have at different levels. This test helps you identify your strongest intelligences.',
            types: [
              { icon: '3d_rotation', name: 'Spatial', desc: 'Visualize and manipulate objects' },
              { icon: 'calculate', name: 'Logical-Mathematical', desc: 'Reasoning and problem solving' },
              { icon: 'menu_book', name: 'Linguistic', desc: 'Written and spoken language' },
              { icon: 'music_note', name: 'Musical', desc: 'Perceive and create music' },
              { icon: 'directions_run', name: 'Bodily-Kinesthetic', desc: 'Use the body skillfully' },
              { icon: 'groups', name: 'Interpersonal', desc: 'Understand other people' },
              { icon: 'self_improvement', name: 'Intrapersonal', desc: 'Self-knowledge' },
              { icon: 'park', name: 'Naturalist', desc: 'Sensitivity to the natural world' },
            ],
            infoTitle: 'Test information',
            duration: 'Duration:',
            durationText: 'Approximately 15–20 minutes',
            questionsCount: 'Questions:',
            questionsCountText: '40 statements in 8 categories',
            objective: 'Objective:',
            objectiveText: 'Identify your most developed intelligences',
            honesty: 'Rate each statement on a scale of 1 to 5',
            backButton: 'Back',
            startButton: 'Start Test',
          },
          header: {
            testNumber: 'Multiple Intelligences',
            title: 'Discover Your Multiple Intelligences',
            objective: 'Based on Howard Gardner’s theory, this test identifies your strengths and how you can apply them in your professional life.',
          },
          steps: { 1: 'Spatial Intelligence', 2: 'Logical-Mathematical Intelligence', 3: 'Linguistic Intelligence', 4: 'Musical Intelligence', 5: 'Bodily-Kinesthetic Intelligence', 6: 'Interpersonal Intelligence', 7: 'Intrapersonal Intelligence', 8: 'Naturalist Intelligence' },
          subtitles: { 1: 'Ability to visualize and manipulate objects in space', 2: 'Ability for logical reasoning and problem solving', 3: 'Sensitivity to written and spoken language', 4: 'Ability to perceive, create and reproduce music', 5: 'Ability to use the body skillfully', 6: 'Ability to understand and interact with others', 7: 'Self-knowledge and capacity for self-reflection', 8: 'Sensitivity to the natural world' },
          questions: {
            step1: [{ label: 'I find it easy to read maps and find my way in new places' }, { label: 'I enjoy drawing, painting or creating vivid mental images' }, { label: 'I can visualize objects from different angles in my mind' }, { label: 'I appreciate visual art, architecture and design' }, { label: 'I find it easy to assemble puzzles and spatial games' }],
            step2: [{ label: 'I enjoy solving math problems and logic puzzles' }, { label: 'I find it easy to identify patterns and relationships between concepts' }, { label: 'I prefer logical explanations based on evidence' }, { label: 'I enjoy experimenting and testing hypotheses' }, { label: 'I feel comfortable working with numbers and statistics' }],
            step3: [{ label: 'I find it easy to express my ideas in writing' }, { label: 'I enjoy reading books, articles and other texts' }, { label: 'I learn well through lectures and verbal discussions' }, { label: 'I have a wide vocabulary and enjoy learning new words' }, { label: 'I can tell stories in an engaging way' }],
            step4: [{ label: 'I can easily identify different instruments in a piece of music' }, { label: 'I find it easy to remember melodies and rhythms' }, { label: 'I enjoy singing, playing instruments or composing music' }, { label: 'Music greatly influences my mood and concentration' }, { label: 'I can tell when a note is out of tune' }],
            step5: [{ label: 'I learn best when I can practice physically' }, { label: 'I have good motor coordination and physical skills' }, { label: 'I enjoy activities that involve movement and using my body' }, { label: 'I find it easy to imitate gestures and movements' }, { label: 'I prefer working with my hands on practical projects' }],
            step6: [{ label: 'I find it easy to understand other people’s feelings' }, { label: 'I enjoy working in teams and collaborating with others' }, { label: 'I am good at resolving conflicts between people' }, { label: 'People often come to me for advice' }, { label: 'I find it easy to communicate and connect with different types of people' }],
            step7: [{ label: 'I have a good understanding of my own emotions' }, { label: 'I enjoy reflecting on my values and life goals' }, { label: 'I prefer to work alone on some projects' }, { label: 'I am aware of my strengths and areas for improvement' }, { label: 'I regularly engage in self-reflection' }],
            step8: [{ label: 'I enjoy being in contact with nature' }, { label: 'I find it easy to identify plants, animals and other natural elements' }, { label: 'I care about environmental and sustainability issues' }, { label: 'I enjoy observing patterns and changes in nature' }, { label: 'I feel revitalized when I spend time outdoors' }],
          },
          errorSelect: 'Please select an option.',
        },
        riasec: {
          intro: {
            title: 'RIASEC Test',
            subtitle: 'Discover Your Professional Profile',
            whatIs: 'What is the RIASEC Model?',
            whatIsDesc: 'The RIASEC model, created by John Holland, helps identify the type of work environment that best fits each person. It is based on six profiles — Realistic, Investigative, Artistic, Social, Enterprising and Conventional — and shows how our interests, values and skills connect with different areas of work.',
            types: [
              { icon: 'construction', name: 'Realistic', desc: 'Practical and hands-on' },
              { icon: 'science', name: 'Investigative', desc: 'Analytical and curious' },
              { icon: 'palette', name: 'Artistic', desc: 'Creative and expressive' },
              { icon: 'groups', name: 'Social', desc: 'Empathetic and collaborative' },
              { icon: 'trending_up', name: 'Enterprising', desc: 'Persuasive and leader' },
              { icon: 'checklist', name: 'Conventional', desc: 'Organized and methodical' },
            ],
            infoTitle: 'Test information',
            duration: 'Duration:',
            durationText: 'Approximately 10–15 minutes',
            questionsCount: 'Questions:',
            questionsCountText: '25 questions in 5 steps',
            objective: 'Objective:',
            objectiveText: 'Identify your dominant professional profile',
            honesty: 'You can save your progress at any time',
            backButton: 'Back',
            startButton: 'Start Test',
          },
          header: {
            testNumber: 'RIASEC Test',
            title: 'Discover Your RIASEC Professional Profile',
            objective: 'Identify the type of work environment that best fits you through John Holland’s model.',
          },
          steps: { 1: 'Preferences and Interests (1–5)', 2: 'Skills and Motivations (6–10)', 3: 'Values and Recognition (11–15)', 4: 'Environment and Characteristics (16–20)', 5: 'Decisions and Achievement (21–25)' },
          questions: {
            step1: [
              { text: 'Which activity would you most like to do?', options: ['Repair equipment or machines', 'Conduct scientific experiments', 'Create a work of art or design', 'Help people with their problems', 'Lead a team on a project', 'Organize documents and files'] },
              { text: 'In which environment do you feel most comfortable?', options: ['Workshop or outdoor area', 'Laboratory or library', 'Studio or creative space', 'Environment with social interaction', 'Meeting room or executive office', 'Organized and structured office'] },
              { text: 'Which skill do you consider most important?', options: ['Manual and technical skill', 'Analytical and logical thinking', 'Creativity and imagination', 'Empathy and communication', 'Persuasion and negotiation', 'Attention to detail and precision'] },
              { text: 'What motivates you most in a job?', options: ['Working with concrete objects and tools', 'Solving complex problems', 'Expressing ideas in an original way', 'Making a difference in people’s lives', 'Achieving goals and financial results', 'Keeping systems organized and efficient'] },
              { text: 'What type of challenge do you prefer?', options: ['Building or repairing something physical', 'Investigating and discovering new knowledge', 'Creating something unique and innovative', 'Supporting and developing other people', 'Competing and winning in the market', 'Implementing processes and standards'] },
            ],
            step2: [
              { text: 'How do you prefer to learn new things?', options: ['By doing and practicing', 'By studying theory and researching', 'By experimenting and improvising', 'By talking and exchanging experiences', 'By applying in real business situations', 'By following manuals and procedures'] },
              { text: 'What would be your ideal weekend project?', options: ['Doing repairs or manual work', 'Reading books on science or philosophy', 'Painting, writing or making music', 'Volunteering or helping friends', 'Planning a new business or investment', 'Organizing the house or financial planning'] },
              { text: 'What do you value most in a coworker?', options: ['Being practical and efficient', 'Being intelligent and rational', 'Being original and inspiring', 'Being kind and understanding', 'Being ambitious and determined', 'Being organized and reliable'] },
              { text: 'Which school activity did you enjoy most?', options: ['Physical education or practical work', 'Math or science', 'Arts or literature', 'Group work or presentations', 'Entrepreneurship or leadership projects', 'Accounting or event organization'] },
              { text: 'How do you deal with problems?', options: ['I try to fix or solve them in practice', 'I analyze deeply to understand the cause', 'I seek creative and different solutions', 'I ask for help and discuss with others', 'I make quick decisions and move on', 'I follow established procedures'] },
            ],
            step3: [
              { text: 'What type of recognition do you value most?', options: ['Seeing the concrete result of my work', 'Being recognized for my expertise', 'Having my creativity admired', 'Receiving gratitude from people I helped', 'Reaching leadership positions and status', 'Being praised for quality and precision'] },
              { text: 'Which tool or resource do you prefer to use?', options: ['Hand tools and equipment', 'Analysis and research software', 'Art supplies or design programs', 'Social networks and communication tools', 'Financial spreadsheets and CRM', 'Management and organization systems'] },
              { text: 'What do you do when you have free time?', options: ['Physical activities or manual hobbies', 'Studying or learning something new', 'Artistic or cultural activities', 'Spending time with friends and family', 'Networking or developing projects', 'Organizing things or planning'] },
              { text: 'Which characteristic best describes you?', options: ['Practical and direct', 'Curious and questioning', 'Imaginative and expressive', 'Empathetic and helpful', 'Ambitious and persuasive', 'Methodical and careful'] },
              { text: 'What would be your ideal work environment?', options: ['Outdoors or in the field', 'Quiet environment for concentration', 'Inspiring and flexible space', 'Place with lots of human interaction', 'Dynamic and competitive office', 'Structured and predictable environment'] },
            ],
            step4: [
              { text: 'What do you find most interesting?', options: ['How things work mechanically', 'Abstract theories and concepts', 'Artistic expression and aesthetics', 'Relationships and human psychology', 'Business and market strategies', 'Systems, rules and processes'] },
              { text: 'How do you prefer to work?', options: ['Independently and autonomously', 'With time for research and reflection', 'With creative freedom', 'In collaboration with other people', 'With clear goals and rewards', 'Following established procedures'] },
              { text: 'What type of book or movie do you prefer?', options: ['Adventure and action', 'Science fiction or documentaries', 'Artistic drama or auteur works', 'Stories about relationships and people', 'Biographies of successful entrepreneurs', 'Thriller or investigation stories'] },
              { text: 'What satisfies you most?', options: ['Completing a physical or practical task', 'Solving a complex problem', 'Creating something beautiful or original', 'Seeing someone improve with my help', 'Closing a good deal or sale', 'Finishing a project with no errors'] },
              { text: 'Which skill would you like to develop?', options: ['Technical and manual skills', 'Advanced scientific knowledge', 'Artistic or creative techniques', 'Emotional and social intelligence', 'Sales and negotiation skills', 'Project and organization management'] },
            ],
            step5: [
              { text: 'How do you make important decisions?', options: ['Based on practical experience', 'After extensive research and analysis', 'Following my intuition and creativity', 'Considering the impact on people', 'Focusing on results and profits', 'Following data and procedures'] },
              { text: 'What do you value in a career?', options: ['Manual and tangible work', 'Constant intellectual challenges', 'Freedom of creative expression', 'Opportunity to help others', 'Financial growth and power', 'Stability and clarity of roles'] },
              { text: 'What would be your dream job?', options: ['Working with my hands creating or repairing', 'Researcher or scientist', 'Artist or professional designer', 'Professional working directly with people', 'Entrepreneur or top-level executive', 'Operations manager or analyst'] },
              { text: 'How do you deal with change?', options: ['I adapt by doing what needs to be done', 'I analyze and understand before acting', 'I see it as a creative opportunity', 'I seek support and talk to others', 'I see it as a chance for growth', 'I prefer stability but adapt when necessary'] },
              { text: 'What makes you feel professionally fulfilled?', options: ['Seeing something work that I built or fixed', 'Discovering something new or solving mysteries', 'Having my creations appreciated', 'Knowing I made a difference in someone’s life', 'Achieving success and recognition', 'Keeping everything running perfectly'] },
            ],
          },
          errorSelect: 'Please select an option.',
        },
        archetypes: {
          intro: {
            title: 'Jungian Archetypes',
            subtitle: 'Discover Your Dominant Archetype',
            whatIs: 'What are Archetypes?',
            whatIsDesc: 'Jungian Archetypes are universal patterns of behavior and personality that reflect deep motivations, fears and desires. This test identifies which of the 12 main archetypes best align with your personality, helping you better understand your motivations and how you interact with the world.',
            types: [
              { icon: 'sentiment_satisfied', name: 'Innocent', desc: 'Optimistic' },
              { icon: 'auto_stories', name: 'Sage', desc: 'Knowledgeable' },
              { icon: 'explore', name: 'Explorer', desc: 'Adventurer' },
              { icon: 'emergency', name: 'Outlaw', desc: 'Rebel' },
              { icon: 'auto_fix_high', name: 'Magician', desc: 'Transformer' },
              { icon: 'shield', name: 'Hero', desc: 'Courageous' },
              { icon: 'favorite', name: 'Lover', desc: 'Passionate' },
              { icon: 'theater_comedy', name: 'Jester', desc: 'Joyful' },
              { icon: 'group', name: 'Everyman', desc: 'Genuine' },
              { icon: 'healing', name: 'Caregiver', desc: 'Protector' },
              { icon: 'workspace_premium', name: 'Ruler', desc: 'Leader' },
              { icon: 'brush', name: 'Creator', desc: 'Innovator' },
            ],
            infoTitle: 'Test information',
            duration: 'Duration:',
            durationText: 'Approximately 20–25 minutes',
            questionsCount: 'Questions:',
            questionsCountText: '60 statements in 12 archetypes',
            objective: 'Objective:',
            objectiveText: 'Identify your dominant archetypes',
            honesty: 'Rate each statement according to how much it applies to you',
            backButton: 'Back',
            startButton: 'Start Test',
          },
          header: {
            testNumber: 'Archetypes',
            title: 'Discover Your Jungian Archetypes',
            objective: 'Based on Carl Jung’s theory of archetypes, this test identifies the personality patterns that best align with you.',
          },
          steps: { 1: 'The Innocent', 2: 'The Sage', 3: 'The Explorer', 4: 'The Outlaw', 5: 'The Magician', 6: 'The Hero', 7: 'The Lover', 8: 'The Jester', 9: 'The Everyman', 10: 'The Caregiver', 11: 'The Ruler', 12: 'The Creator' },
          subtitles: { 1: 'Seeks happiness, optimism and simplicity. Believes in good and purity.', 2: 'Seeks truth, knowledge and deep understanding of the world.', 3: 'Seeks freedom, adventure and discovery of new horizons.', 4: 'Challenges the status quo, breaks rules and seeks revolution and radical change.', 5: 'Transforms dreams into reality, creates magical experiences and special moments.', 6: 'Seeks to overcome challenges, prove worth and make a difference in the world.', 7: 'Seeks intimacy, passion and deep connections with people and experiences.', 8: 'Brings joy, fun and lightness. Lives in the moment and makes others laugh.', 9: 'Seeks belonging, authentic connection and equality for all.', 10: 'Cares for, nurtures and protects others. Seeks to help and serve with compassion.', 11: 'Seeks control, order and leadership. Creates structures and makes important decisions.', 12: 'Seeks innovation, expression and creating something of lasting value.' },
          questions: {
            step1: [{ label: 'I believe people are naturally good' }, { label: 'I prefer to see the positive side of situations' }, { label: 'I value simplicity and honesty above all' }, { label: 'I trust people easily' }, { label: 'I seek happiness in the small things of everyday life' }],
            step2: [{ label: 'I love learning new things and seeking knowledge' }, { label: 'I prefer to analyze and reflect before making decisions' }, { label: 'I value wisdom and experience' }, { label: 'I enjoy sharing what I know with others' }, { label: 'I always seek to understand why things are the way they are' }],
            step3: [{ label: 'I love traveling and discovering new places' }, { label: 'I feel suffocated when I have too many restrictions' }, { label: 'I enjoy leaving my comfort zone' }, { label: 'I prefer new experiences to established routines' }, { label: 'I value my independence and autonomy' }],
            step4: [{ label: 'I question rules that don’t make sense' }, { label: 'I am not afraid to go against the majority' }, { label: 'I believe that sometimes rules need to be broken' }, { label: 'I enjoy challenging what is considered "normal"' }, { label: 'I prefer to create my own path' }],
            step5: [{ label: 'I believe I can turn my ideas into reality' }, { label: 'I enjoy creating unique experiences for people' }, { label: 'I see possibilities where others see limitations' }, { label: 'I find it easy to visualize and manifest my dreams' }, { label: 'I always seek to innovate and create something special' }],
            step6: [{ label: 'I enjoy overcoming difficult challenges' }, { label: 'I feel motivated to make a difference' }, { label: 'I don’t give up easily on my goals' }, { label: 'I value courage and determination' }, { label: 'I want to leave a positive legacy' }],
            step7: [{ label: 'I deeply value my personal relationships' }, { label: 'I seek beauty and pleasure in life' }, { label: 'I am passionate about what I do' }, { label: 'I enjoy creating special moments with those I love' }, { label: 'I feel emotions very intensely' }],
            step8: [{ label: 'I love making people laugh' }, { label: 'I prefer not to take life too seriously' }, { label: 'I enjoy fun and spontaneity' }, { label: 'I live in the present moment intensely' }, { label: 'I use humor to deal with difficult situations' }],
            step9: [{ label: 'I value simplicity and authenticity' }, { label: 'I prefer to be with ordinary, genuine people' }, { label: 'I believe everyone deserves equal respect' }, { label: 'I enjoy being part of a group or community' }, { label: 'I don’t like privilege or elitism' }],
            step10: [{ label: 'I feel fulfilled when I help others' }, { label: 'I put others’ needs before my own' }, { label: 'I am very empathetic and compassionate' }, { label: 'I enjoy caring for and protecting those I love' }, { label: 'I feel responsible for the well-being of others' }],
            step11: [{ label: 'I like to be in control of situations' }, { label: 'I find it easy to lead and organize' }, { label: 'I value power and influence' }, { label: 'I enjoy establishing rules and structures' }, { label: 'I feel responsible for creating order' }],
            step12: [{ label: 'I love creating new and original things' }, { label: 'I express myself through my creativity' }, { label: 'I value innovation and originality' }, { label: 'I enjoy bringing my ideas to life' }, { label: 'I seek to leave my personal mark on everything I do' }],
          },
          errorSelect: 'Please select an option.',
        },
        resultsModal: {
          titles: {
            anamnese: 'Anamnesis - Your Results',
            disc: 'DISC Insight - Your Profile',
            multipleIntelligences: 'Multiple Intelligences - Your Profile',
            riasec: 'RIASEC - Your Professional Profile',
            archetypes: 'Jungian Archetypes - Your Results',
          },
          completedOn: 'Completed on',
          close: 'Close',
          footerNote: 'Your data is saved locally in the browser',
          disc: {
            yourProfile: 'Your Profile',
            dominance: 'dominance',
            understandModel: 'Understand the DISC Model',
            clickToView: 'Click to view a complete explanation about the test and its pillars.',
            fullDistribution: 'Full Distribution',
            intro: 'Discover your personality profile and better understand your work style and relationships.',
            whatIs: 'What is DISC?',
            description: 'DISC is a behavioral assessment tool that identifies four main styles and helps you understand how you prefer to act, communicate and make decisions in different contexts.',
            characteristics: 'Highlighted characteristics',
            challenges: 'Common challenges',
            suggestedAreas: 'Suggested areas and professions',
            types: {
            D: {
              name: 'Dominance',
              description: 'Objective, assertive and results-oriented people.',
              paragraphs: [
                'People with high Dominance are objective, assertive and results-oriented.',
                'They have ease making quick decisions, facing challenges and leading under pressure.',
                'They are driven by goals, power and overcoming.'
              ],
              characteristics: ['Natural leadership', 'Results focus', 'Courage', 'Competitiveness'],
              challenges: ['Impatience', 'Tendency to authoritarianism', 'Difficulty listening'],
              areas: ['Administration', 'Entrepreneurship', 'Engineering', 'Project Management', 'Strategic Sales', 'Law', 'Business Consulting', 'Performance Marketing', 'Logistics', 'Information Technology']
            },
            I: {
              name: 'Influence',
              description: 'Communicative, enthusiastic and sociable people.',
              paragraphs: [
                'People with high Influence are communicative, enthusiastic and sociable.',
                'They have talent for motivating, inspiring and engaging other people, transmitting positive energy.',
                'They value recognition, human contact and collaborative environments.'
              ],
              characteristics: ['Optimism', 'Charisma', 'Persuasion', 'Empathy'],
              challenges: ['Distraction', 'Difficulty with routines', 'Challenge meeting strict deadlines'],
              areas: ['Social Communication', 'Journalism', 'Advertising', 'Human Resources', 'Sales', 'Public Relations', 'Teaching', 'Coaching', 'Cultural Production', 'People Management']
            },
            S: {
              name: 'Steadiness',
              description: 'Calm, patient and loyal people.',
              paragraphs: [
                'People with high Steadiness are calm, patient and loyal.',
                'They like safe and predictable environments, excelling in tasks that require constancy and empathy.',
                'They value teamwork and lasting trust relationships.'
              ],
              characteristics: ['Tranquility', 'Empathy', 'Active listening', 'Support for others'],
              challenges: ['Resistance to change', 'Difficulty saying "no"'],
              areas: ['Nursing', 'Psychology', 'Social Work', 'Early Childhood Education', 'Human Resources', 'Integrative Therapies', 'Administration', 'Pedagogy', 'People Management', 'Customer Service']
            },
            C: {
              name: 'Conscientiousness',
              description: 'Analytical, detail-oriented and disciplined people.',
              paragraphs: [
                'People with high Conscientiousness are analytical, detail-oriented and disciplined.',
                'They value rules, quality and precision, always seeking to do things the right way.',
                'They are driven by security, logic and well-defined standards.'
              ],
              characteristics: ['Organization', 'Critical thinking', 'Responsibility', 'Perfectionism'],
              challenges: ['Rigidity', 'Excessive self-criticism', 'Fear of making mistakes'],
              areas: ['Accounting', 'Engineering', 'Auditing', 'Law', 'Data Analysis', 'Scientific Research', 'Architecture', 'Information Technology', 'Financial Planning', 'Quality and Processes']
            }
          }
          },
          anamnese: {
            personalInfo: 'Personal Information',
            name: 'Name',
            age: 'Age',
            location: 'Location',
            email: 'Email',
            education: 'Education',
            area: 'Area',
            professionalSituation: 'Professional Situation',
            occupation: 'Occupation',
            areasOfInterest: 'Areas of Interest',
            careerGoals: 'Career Goals',
          },
          multipleIntelligences: {
            theoryTitle: 'Theory of Multiple Intelligences — Howard Gardner',
            clickToUnderstand: 'Click to understand the model and how to apply it to your journey.',
            yourTop3: '🏆 Your 3 Dominant Intelligences',
            otherIntelligences: '📊 Other Intelligences in Your Profile',
            professions: 'Professions where you can excel',
            intelligences: {
              logica: {
                name: 'Logical-Mathematical',
                description: 'Ability for logical reasoning, pattern analysis and problem solving.',
                details: [
                  'People with this intelligence like to organize, calculate and understand how things work.',
                  'They have an affinity for numbers, experiments and environments that stimulate structured analysis.'
                ],
                professions: ['Engineer', 'Data Scientist', 'Financial Analyst', 'Statistician', 'Programmer', 'Physicist', 'Accountant', 'Economist', 'Architect', 'Researcher']
              },
              linguistica: {
                name: 'Linguistic',
                description: 'Related to language skills — speaking, writing, reading and communicating clearly.',
                details: [
                  'People with high linguistic intelligence excel at telling stories, arguing and teaching.',
                  'They demonstrate ease in learning languages, building speeches and adapting messages to different audiences.'
                ],
                professions: ['Journalist', 'Writer', 'Teacher', 'Lawyer', 'Advertiser', 'Editor', 'Screenwriter', 'Radio Host', 'Copywriter', 'Translator']
              },
              espacial: {
                name: 'Spatial',
                description: 'Ability to visualize shapes, colors and spaces in three dimensions, with a high aesthetic sense.',
                details: [
                  'People with this intelligence perceive visual details and can imagine objects from different perspectives.',
                  'They have ease planning environments, interpreting maps, creating images and working with design.'
                ],
                professions: ['Graphic Designer', 'Architect', 'Urban Planner', 'Photographer', 'Illustrator', 'Interior Designer', 'Civil Engineer', 'Pilot', 'Videomaker', 'Visual Artist']
              },
              musical: {
                name: 'Musical',
                description: 'Sensitivity to sounds, rhythms and melodies, with focus on harmony, composition and sound emotion.',
                details: [
                  'People with musical intelligence identify auditory patterns, recognize notes and understand how music influences emotions.',
                  'They have ease learning instruments, singing, composing and exploring different musical styles.'
                ],
                professions: ['Musician', 'Music Producer', 'Composer', 'Sound Technician', 'Conductor', 'Music Teacher', 'DJ', 'Singer', 'Music Critic', 'Music Therapist']
              },
              corporal: {
                name: 'Bodily-Kinesthetic',
                description: 'Creative and precise use of the body, with learning based on practice and movement.',
                details: [
                  'People with this intelligence learn by doing, manipulating objects and exploring the physical environment.',
                  'They demonstrate coordination, dexterity and body control in sports, artistic or technical activities.'
                ],
                professions: ['Athlete', 'Dancer', 'Physiotherapist', 'Personal Trainer', 'Surgeon', 'Actor/Actress', 'Choreographer', 'Physical Education Teacher', 'Massage Therapist', 'Artisan']
              },
              interpessoal: {
                name: 'Interpersonal',
                description: 'Ability to understand and connect with other people with empathy and collaboration.',
                details: [
                  'People with high interpersonal intelligence understand others\' feelings and facilitate teamwork.',
                  'They are references in communication, conflict mediation and relationship-based leadership.'
                ],
                professions: ['Psychologist', 'Teacher', 'Community Leader', 'HR Manager', 'Social Worker', 'Coach', 'Mediator', 'Salesperson', 'Nurse', 'Public Relations']
              },
              intrapessoal: {
                name: 'Intrapersonal',
                description: 'Focused on self-knowledge — understanding emotions, values and personal motivations.',
                details: [
                  'Introspective and reflective people use this intelligence to define goals consistent with their principles.',
                  'They have clarity about strengths, limitations and constantly seek personal growth.'
                ],
                professions: ['Psychotherapist', 'Philosopher', 'Writer', 'Artist', 'Researcher', 'Career Consultant', 'Teacher', 'Life Coach', 'Mindfulness Instructor', 'Entrepreneur']
              },
              naturalista: {
                name: 'Naturalist',
                description: 'Related to understanding nature, ecosystems and sustainability.',
                details: [
                  'People with naturalist intelligence observe patterns in the environment and connect with ecological themes.',
                  'They demonstrate interest in biology, care for living beings and conservation of natural resources.'
                ],
                professions: ['Biologist', 'Veterinarian', 'Agronomist', 'Ecologist', 'Geographer', 'Environmental Engineer', 'Oceanographer', 'Landscaper', 'Environmental Educator', 'Botanist']
              }
            }
          },
          riasec: {
            title: 'RIASEC Test — Professional Personality Types',
            clickToUnderstand: 'Click to understand how this model guides career choices.',
            yourHollandCode: 'Your Holland Code',
            dominantSequence: 'Dominant sequence',
            hollandCodeDesc: 'The Holland code combines your three highest profiles, revealing a professional compass to guide career decisions.',
            characteristics: 'Highlighted characteristics',
            challenges: 'Common challenges',
            recommendedAreas: 'Recommended areas and professions',
            otherProfiles: '📊 Other Profiles in Your Holland Code',
            profiles: {
              R: {
                name: 'Realistic',
                description: 'Practical, objective people with manual skills.',
                paragraphs: [
                  'Practical, objective people with manual skills. They like to work with tools, machines, animals or physical activities.',
                  'They prefer concrete tasks and structured environments, where they can make things happen in a tangible way.'
                ],
                characteristics: ['Efficiency', 'Persistence', 'Results focus', 'Direct action'],
                challenges: ['Difficulty dealing with abstractions or very theoretical environments'],
                areas: ['Mechanical Engineering', 'Electronics', 'Architecture', 'Product Design', 'Agronomy', 'Nursing', 'Maintenance Technician', 'Civil Construction', 'Logistics', 'Gastronomy']
              },
              I: {
                name: 'Investigative',
                description: 'Analytical, curious and rational people.',
                paragraphs: [
                  'Analytical, curious and rational people, with interest in understanding complex phenomena.',
                  'They like to research, analyze and solve problems through observation and logic, valuing knowledge and critical thinking.'
                ],
                characteristics: ['Intellectual curiosity', 'Autonomy', 'Precision', 'Reflection'],
                challenges: ['Tendency to isolation', 'Difficulty with very practical tasks'],
                areas: ['Medicine', 'Biology', 'Psychology', 'Data Engineering', 'Scientific Research', 'Statistics', 'Systems Analysis', 'Chemistry', 'Actuarial Sciences', 'Information Technology']
              },
              A: {
                name: 'Artistic',
                description: 'Creative, expressive and intuitive people.',
                paragraphs: [
                  'Creative, expressive and intuitive people, who value originality and aesthetics.',
                  'They seek free and flexible environments to experiment, innovate and express ideas through art, writing, design, music or communication.'
                ],
                characteristics: ['Sensitivity', 'Imagination', 'Freedom', 'Personal expression'],
                challenges: ['Difficulty with rigid rules', 'Resistance to excessive routines'],
                areas: ['Graphic Design', 'Architecture', 'Advertising', 'Fashion', 'Photography', 'Cinema', 'Visual Arts', 'Journalism', 'Cultural Production', 'Music']
              },
              S: {
                name: 'Social',
                description: 'Empathetic, communicative and collaborative people.',
                paragraphs: [
                  'Empathetic, communicative and collaborative people, who feel fulfilled helping, teaching or guiding others.',
                  'They have high emotional intelligence and excel in support, teaching and human care roles.'
                ],
                characteristics: ['Patience', 'Sensitivity', 'Active listening', 'Sense of community'],
                challenges: ['Difficulty dealing with intense conflicts', 'Challenges in strictly rational decisions'],
                areas: ['Psychology', 'Pedagogy', 'Social Work', 'Physiotherapy', 'Medicine', 'Nursing', 'Human Resources', 'Coaching', 'Physical Education', 'Career Guidance']
              },
              E: {
                name: 'Enterprising',
                description: 'Innovative, ambitious and communicative people.',
                paragraphs: [
                  'Innovative, ambitious and communicative people, who like to lead, influence and create impact.',
                  'They feel motivated by challenges, decision-making power and recognition, valuing dynamic environments and quick results.'
                ],
                characteristics: ['Leadership', 'Persuasion', 'Initiative', 'Strategic vision'],
                challenges: ['Impatience', 'Aversion to operational details'],
                areas: ['Administration', 'Marketing', 'Sales', 'Law', 'Public Relations', 'Business Management', 'Entrepreneurship', 'Consulting', 'Economics', 'Business Communication']
              },
              C: {
                name: 'Conventional',
                description: 'Organized, methodical and responsible people.',
                paragraphs: [
                  'Organized, methodical and responsible people, who like to work with data, systems and well-defined processes.',
                  'They value rules, stability and precision, being excellent in planning, control and quality assurance.'
                ],
                characteristics: ['Discipline', 'Reliability', 'Attention to detail', 'Quality focus'],
                challenges: ['Resistance to change', 'Difficulty in very improvised contexts'],
                areas: ['Accounting', 'Administration', 'Finance', 'Executive Secretariat', 'Archival Science', 'Data Analysis', 'Tax Law', 'Banking and Insurance', 'Planning', 'Controllership']
              }
            }
          },
          archetypes: {
            title: 'Archetypes Test — Universal Profiles of Personal and Professional Journey',
            clickToUnderstand: 'Click to understand how archetypes can guide your personal and professional choices.',
            yourTop3: '⭐ Your 3 Dominant Archetypes',
            otherArchetypes: '📊 Other Archetypes Present in You',
            strengths: 'Potential highlights',
            attentionPoints: 'Attention points',
            suggestedAreas: 'Suggested areas and roles',
            archetypes: {
              inocente: {
                name: 'The Innocent',
                short: 'Seeks happiness, optimism and simplicity.',
                paragraphs: [
                  'The Innocent believes in good and seeks to live with authenticity, simplicity and faith in people\'s goodness.',
                  'Prefers light, welcoming and positive environments, where they can nurture hope and inspire optimism.'
                ],
                strengths: ['Contagious optimism', 'Trust in people', 'Search for harmony', 'Positive view of life'],
                challenges: ['Naivety in competitive environments', 'Difficulty dealing with conflicts', 'Tendency to avoid difficult realities'],
                areas: ['Early Childhood Education', 'Hospitality', 'Pastoral or Religious Activity', 'Community Services', 'Wellness Experiences', 'Experience Marketing', 'Humanized Service Design']
              },
              sabio: {
                name: 'The Sage',
                short: 'Seeks truth, knowledge and deep understanding.',
                paragraphs: [
                  'The Sage is driven by intellectual curiosity, the desire to understand how the world works and share wisdom.',
                  'Values deep analysis, continuous learning and decisions based on evidence and reflection.'
                ],
                strengths: ['Critical thinking', 'Intellectual leadership', 'Data-driven decision making', 'Continuous learning'],
                challenges: ['Excessive analysis', 'Intellectual perfectionism', 'Difficulty acting without all information'],
                areas: ['Academic Research', 'Teaching', 'Strategic Consulting', 'Investigative Journalism', 'Data Science', 'Psychology', 'Mentoring and Corporate Education']
              },
              explorador: {
                name: 'The Explorer',
                short: 'Seeks freedom, adventure and discovery.',
                paragraphs: [
                  'The Explorer values autonomy, authenticity and new experiences. Has a strong desire to expand boundaries and discover possibilities.',
                  'Prefers careers and projects with creative freedom, constant movement and space to innovate.'
                ],
                strengths: ['Practical curiosity', 'Courage to take risks', 'Authenticity', 'Ability to reinvent oneself'],
                challenges: ['Restlessness with routines', 'Difficulty maintaining long projects', 'Constant search for novelty'],
                areas: ['Tourism and Hospitality', 'Travel Photography', 'Creative Entrepreneurship', 'Market Research', 'Lifestyle Marketing', 'Languages and International Relations', 'Startups and Digital Business']
              },
              foraDaLei: {
                name: 'The Outlaw',
                short: 'Challenges the status quo and seeks radical change.',
                paragraphs: [
                  'The Outlaw has a disruptive spirit, confronts patterns and believes in social or structural transformation.',
                  'Sees opportunities where there are limiting rules and acts to create new alternatives.'
                ],
                strengths: ['Courage to question', 'Innovative vision', 'Ability to mobilize changes', 'Entrepreneurial spirit'],
                challenges: ['Conflicts with authority', 'Impulsiveness in decisions', 'Difficulty with formal routines'],
                areas: ['Social Innovation', 'Social Movements', 'Disruptive Entrepreneurship', 'Service Design', 'Critical Advertising', 'Technology', 'Cultural Transformation Consulting']
              },
              mago: {
                name: 'The Magician',
                short: 'Transforms ideas into meaningful experiences.',
                paragraphs: [
                  'The Magician believes in the power of vision and imagination to materialize profound changes.',
                  'Brings a strategic and inspiring approach, connecting people to transformative experiences.'
                ],
                strengths: ['Strategic vision', 'Ability to inspire', 'Creation of memorable experiences', 'Sharp intuition'],
                challenges: ['High expectations', 'Risk of overloading', 'Desire for excessive control'],
                areas: ['Customer Experience', 'Event Production', 'Corporate Storytelling', 'Transformative Travel', 'Experiential Education', 'Coaching and Mentoring', 'Design Thinking']
              },
              heroi: {
                name: 'The Hero',
                short: 'Overcomes challenges and seeks to impact the world.',
                paragraphs: [
                  'The Hero is motivated by challenges, seeks to prove their worth and generate positive impact on society.',
                  'Has energy to lead difficult projects, persist in demanding goals and inspire courage.'
                ],
                strengths: ['Resilience under pressure', 'Ability to mobilize teams', 'Results orientation', 'Healthy competitiveness'],
                challenges: ['Excessive self-demand', 'Difficulty delegating', 'Tendency to ignore personal limits'],
                areas: ['Executive Management', 'Military Careers', 'High Performance Sports', 'Emergencies and Rescues', 'Public Policy', 'Entrepreneurship', 'Performance Consulting']
              },
              amante: {
                name: 'The Lover',
                short: 'Values intimacy, beauty and deep connections.',
                paragraphs: [
                  'The Lover lives emotions and relationships intensely, seeking to create memorable and meaningful experiences.',
                  'Dedicates themselves to projects involving aesthetics, human sensitivity and proximity to people.'
                ],
                strengths: ['Aesthetic sensitivity', 'Deep empathy', 'Ability to create bonds', 'Passionate dedication'],
                challenges: ['Difficulty establishing personal boundaries', 'High sensitivity to criticism', 'Need for approval'],
                areas: ['Design and Fashion', 'Sensory Marketing', 'Social Events', 'Image Consulting', 'Gastronomy', 'Integrative Therapies', 'Artistic Acting']
              },
              bobo: {
                name: 'The Jester',
                short: 'Brings joy, spontaneity and lightness.',
                paragraphs: [
                  'The Jester lives in the present with humor, improvisation and creativity, contributing to relieve tensions.',
                  'Transforms rigid environments into more human and accessible spaces, cultivating joy and lightness.'
                ],
                strengths: ['Spontaneity', 'Charisma', 'Ability to break tensions', 'Social creativity'],
                challenges: ['May be underestimated', 'Difficulty in very formal contexts', 'Propensity to avoid difficult conversations'],
                areas: ['Comedy', 'Content Production', 'Social Media', 'Working with Children', 'Event Animation', 'Laughter Therapy', 'Entertainment Experiences']
              },
              caraComum: {
                name: 'The Everyman',
                short: 'Seeks belonging and equality.',
                paragraphs: [
                  'The Everyman values authenticity, proximity and the feeling of being part of a community.',
                  'Prefers collaborative, democratic environments with a culture of mutual respect.'
                ],
                strengths: ['Cooperation', 'Building trust', 'Humility', 'Sensitivity to injustices'],
                challenges: ['Avoids protagonism', 'May underestimate themselves', 'Difficulty in competitive contexts'],
                areas: ['Human Resources', 'Community Services', 'Customer Service', 'Internal Communication', 'Social Projects', 'Education', 'Hospitality']
              },
              cuidador: {
                name: 'The Caregiver',
                short: 'Cares, nurtures and protects with compassion.',
                paragraphs: [
                  'The Caregiver feels fulfilled supporting others\' well-being and offering genuine support.',
                  'Has high empathy and sense of responsibility, seeking relief and security for those they accompany.'
                ],
                strengths: ['Genuine empathy', 'Emotional resilience', 'Dedicated delivery', 'Welcoming listening'],
                challenges: ['Risk of burnout', 'Difficulty establishing boundaries', 'Propensity to overload'],
                areas: ['Psychology', 'Nursing', 'Social Work', 'Physiotherapy', 'Pedagogy', 'Occupational Therapy', 'Life Coaching', 'Humanized People Management']
              },
              governante: {
                name: 'The Ruler',
                short: 'Creates order, structures and direction.',
                paragraphs: [
                  'The Ruler leads with a sense of responsibility, seeking stability and consistent results.',
                  'Likes to define clear goals, structure teams and establish standards to deliver excellence.'
                ],
                strengths: ['Organization', 'Decision making', 'Natural authority', 'Strategic planning'],
                challenges: ['Excessive control', 'Difficulty delegating', 'Risk of centralizing power'],
                areas: ['Executive Direction', 'Public Management', 'Educational Coordination', 'Strategic Planning', 'Business Consulting', 'Corporate Governance']
              },
              criador: {
                name: 'The Creator',
                short: 'Seeks innovation and expression with purpose.',
                paragraphs: [
                  'The Creator transforms ideas into something concrete and original, combining aesthetics, meaning and impact.',
                  'Finds fulfillment in authorial processes, where they can leave their mark and build memorable narratives.'
                ],
                strengths: ['Creative vision', 'Dedication to authorial projects', 'Ability to materialize ideas', 'Refined aesthetic sensitivity'],
                challenges: ['Intense self-criticism', 'Perfectionism', 'Difficulty completing extensive projects'],
                areas: ['Design', 'Architecture', 'Advertising', 'Audiovisual Production', 'Visual Arts', 'UX/UI', 'Branding', 'Creative Ventures']
              }
            }
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
        selectOption: 'Por favor, selecione uma opção.',
      },
      likertScale: {
        option1: 'Discordo totalmente',
        option2: 'Discordo',
        option3: 'Neutro',
        option4: 'Concordo',
        option5: 'Concordo totalmente',
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
      reportDownload: {
        hint: 'Complete todos os testes acima para gerar seu relatório personalizado',
        unlockSteps: 'Complete todas as {{total}} etapas para desbloquear',
        progress: 'Progresso: {{completed}}/{{total}} testes completados',
        title: 'Relatório Completo',
        subtitleReady: 'Baixe um PDF profissional com todos os seus resultados',
        subtitleLocked: 'Complete todas as etapas para desbloquear o relatório',
        backendOffline: 'Backend Offline',
        backendOfflineDesc: 'O servidor de geração de relatórios está offline. Por favor, certifique-se de que o backend está rodando na porta 3001.',
        backendOfflineCmd: 'Execute:',
        reportIncludes: 'O relatório {{verb}}:',
        reportIncludesPresent: 'inclui',
        reportIncludesFuture: 'incluirá',
        featureAnamnese: 'Anamnese Inicial completa',
        featureDisc: 'Análise DISC detalhada',
        featureMI: 'Perfil de Inteligências Múltiplas',
        featureRiasec: 'Código Holland (RIASEC)',
        featureArchetypes: 'Arquétipos de Personalidade',
        featureRecommendations: 'Recomendações personalizadas',
        generatingPdf: 'Gerando seu PDF...',
        completeAllTests: 'Complete Todos os {{total}} Testes ({{completed}}/{{total}})',
        downloadReport: 'Baixar Relatório Completo',
        mayTakeSeconds: 'Isso pode levar alguns segundos...',
        narrativeTitle: 'Narrativa personalizada gerada pela IA',
        generatedAt: 'Gerado em {{date}}',
        downloadAgain: 'Baixar PDF novamente',
        testsRemaining: 'Testes Restantes: {{count}}',
        testsRemainingDesc: 'Para gerar o relatório completo, você precisa completar TODOS os {{total}} testes disponíveis. Progresso atual: {{completed}} de {{total}} completos ({{percent}}%)',
        errorGeneric: 'Erro ao gerar o relatório. Tente novamente.',
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
        disc: {
          intro: {
            title: 'Teste DISC',
            subtitle: 'Descubra Seu Perfil de Personalidade',
            whatIs: 'O que é o DISC?',
            whatIsDesc: 'O DISC é uma ferramenta de avaliação comportamental que identifica quatro tipos principais de personalidade. Este modelo ajuda você a entender melhor seu estilo de trabalho, comunicação e relacionamento.',
            types: [
              { letter: 'D', name: 'Dominância', desc: 'Orientado para resultados, direto e decidido' },
              { letter: 'I', name: 'Influência', desc: 'Sociável, persuasivo e otimista' },
              { letter: 'S', name: 'Estabilidade', desc: 'Estável, paciente e leal' },
              { letter: 'C', name: 'Conformidade', desc: 'Preciso, analítico e sistemático' },
            ],
            infoTitle: 'Informações sobre o teste',
            duration: 'Duração:',
            durationText: 'Aproximadamente 10-15 minutos',
            questionsCount: 'Questões:',
            questionsCountText: '25 perguntas sobre comportamento e estilo de trabalho',
            objective: 'Objetivo:',
            objectiveText: 'Identificar seu perfil comportamental dominante',
            honesty: 'Responda com sinceridade baseado em como você realmente age',
            backButton: 'Voltar',
            startButton: 'Iniciar Teste',
          },
          header: {
            testNumber: 'Teste 2',
            title: 'Descubra seu perfil de personalidade DISC',
            objective: 'Entenda melhor seu estilo de trabalho e relacionamento através desta avaliação comportamental.',
          },
          steps: { 1: 'Comportamento no Trabalho', 2: 'Resolução de Problemas e Decisões', 3: 'Comunicação e Feedback', 4: 'Gestão e Adaptação', 5: 'Estilo Pessoal e Preferências' },
          questions: {
            step1: [
              { text: 'Em situações de trabalho, eu tendo a:', options: ['Tomar decisões rapidamente e assumir a liderança', 'Buscar consenso e motivar a equipe', 'Manter a calma e buscar estabilidade', 'Analisar detalhadamente antes de agir'] },
              { text: 'Quando enfrento conflitos, eu:', options: ['Confronto diretamente o problema', 'Tento persuadir e encontrar soluções criativas', 'Evito confrontos e busco harmonia', 'Analiso cuidadosamente todos os aspectos'] },
              { text: 'Meu estilo de comunicação é:', options: ['Direto e objetivo', 'Entusiástico e expressivo', 'Calmo e paciente', 'Preciso e detalhado'] },
              { text: 'Em reuniões, eu costumo:', options: ['Conduzir e tomar decisões', 'Contribuir com ideias e energizar o grupo', 'Ouvir e apoiar as decisões do grupo', 'Fazer perguntas e questionar detalhes'] },
              { text: 'Quando trabalho em equipe, eu:', options: ['Assumo responsabilidades e comando', 'Motivo e inspiro os outros', 'Sou confiável e colaborativo', 'Garanto que tudo seja feito corretamente'] },
            ],
            step2: [
              { text: 'Sob pressão, eu:', options: ['Tomo ação imediata', 'Busco apoio e motivação dos outros', 'Mantenho a compostura', 'Analiso a situação metodicamente'] },
              { text: 'Minha abordagem para resolver problemas é:', options: ['Focada em resultados rápidos', 'Criativa e colaborativa', 'Sistemática e cuidadosa', 'Baseada em dados e análise'] },
              { text: 'Em novos projetos, eu:', options: ['Me lanço de cabeça', 'Fico empolgado com as possibilidades', 'Prefiro entender tudo antes de começar', 'Planejo meticulosamente cada etapa'] },
              { text: 'Quando tomo decisões, eu:', options: ['Confio na minha intuição e experiência', 'Consulto outras pessoas', 'Considero o impacto em todos', 'Analiso todas as opções disponíveis'] },
              { text: 'Meu ambiente de trabalho ideal é:', options: ['Dinâmico com desafios constantes', 'Social e estimulante', 'Estável e previsível', 'Organizado e estruturado'] },
            ],
            step3: [
              { text: 'Quando recebo feedback, eu:', options: ['Aceito e implemento rapidamente', 'Discuto e busco entender o contexto', 'Escuto pacientemente e reflito', 'Analiso criticamente e questiono'] },
              { text: 'Em situações de mudança, eu:', options: ['Adapto-me rapidamente', 'Vejo como uma oportunidade empolgante', 'Preciso de tempo para me ajustar', 'Quero entender todos os detalhes primeiro'] },
              { text: 'Minha motivação principal no trabalho é:', options: ['Alcançar resultados e vencer desafios', 'Reconhecimento e interação social', 'Segurança e harmonia no ambiente', 'Qualidade e precisão no trabalho'] },
              { text: 'Quando lidero uma equipe, eu:', options: ['Estabeleço metas claras e cobraço resultados', 'Inspiro e motivo através do entusiasmo', 'Apoio e desenvolvo cada membro', 'Defino processos e padrões claros'] },
              { text: 'Em apresentações, eu:', options: ['Vou direto ao ponto', 'Uso histórias e exemplos envolventes', 'Sou calmo e metódico', 'Apresento dados detalhados e precisos'] },
            ],
            step4: [
              { text: 'Minha abordagem para prazos é:', options: ['Trabalho intensamente para cumprir', 'Mantenho o otimismo mesmo sob pressão', 'Planejo com antecedência para evitar pressa', 'Organizo tudo meticulosamente desde o início'] },
              { text: 'Quando cometo erros, eu:', options: ['Aceito a responsabilidade e sigo em frente', 'Mantenho o otimismo e aprendo com a experiência', 'Reflito cuidadosamente sobre o que aconteceu', 'Analiso detalhadamente para evitar repetição'] },
              { text: 'Em networking, eu:', options: ['Foco em contatos que podem trazer resultados', 'Gosto de conhecer pessoas e fazer amizades', 'Prefiro aprofundar relacionamentos existentes', 'Sou seletivo e cauteloso com novos contatos'] },
              { text: 'Minha forma de lidar com detalhes é:', options: ['Foco no que é essencial para o resultado', 'Delego ou passo rapidamente pelos detalhes', 'Sou cuidadoso mas não obsessivo', 'Presto atenção meticulosa a cada detalhe'] },
              { text: 'Em situações de risco, eu:', options: ['Assumo riscos calculados para grandes ganhos', 'Sou otimista sobre os resultados', 'Prefiro alternativas mais seguras', 'Analiso todos os riscos antes de decidir'] },
            ],
            step5: [
              { text: 'Meu estilo de aprendizagem é:', options: ['Prático, aprendendo através da experiência', 'Social, aprendendo com e através de outros', 'Gradual, precisando de tempo para absorver', 'Teórico, estudando profundamente o assunto'] },
              { text: 'Quando trabalho sozinho, eu:', options: ['Sou mais produtivo e focado', 'Sinto falta da interação social', 'Aprecio a tranquilidade e concentração', 'Posso me aprofundar sem interrupções'] },
              { text: 'Em situações de incerteza, eu:', options: ['Tomo decisões com base nas informações disponíveis', 'Mantenho uma atitude positiva', 'Busco estabilidade e informações tranquilizadoras', 'Procuro obter mais dados antes de agir'] },
              { text: 'Minha relação com autoridade é:', options: ['Questiono quando necessário', 'Busco construir relacionamentos positivos', 'Respeito e sigo as diretrizes estabelecidas', 'Espero clareza e consistência nas instruções'] },
              { text: 'Ao final do dia de trabalho, eu me sinto mais satisfeito quando:', options: ['Alcancei metas importantes', 'Tive interações positivas com colegas', 'Contribuí para a harmonia da equipe', 'Completei tarefas com qualidade e precisão'] },
            ],
          },
          errorSelect: 'Por favor, selecione uma opção.',
        },
        multipleIntelligences: {
          intro: {
            title: 'Múltiplas Inteligências',
            subtitle: 'Descubra Seus Pontos Fortes',
            whatIs: 'O que são Múltiplas Inteligências?',
            whatIsDesc: 'A teoria das Múltiplas Inteligências, desenvolvida por Howard Gardner, propõe que a inteligência não é uma capacidade única, mas sim um conjunto de 8 habilidades distintas que todos possuímos em diferentes níveis. Este teste ajuda você a identificar suas inteligências mais fortes.',
            types: [
              { icon: '3d_rotation', name: 'Espacial', desc: 'Visualizar e manipular objetos' },
              { icon: 'calculate', name: 'Lógico-Matemática', desc: 'Raciocínio e resolução de problemas' },
              { icon: 'menu_book', name: 'Linguística', desc: 'Linguagem escrita e falada' },
              { icon: 'music_note', name: 'Musical', desc: 'Perceber e criar música' },
              { icon: 'directions_run', name: 'Corporal-Cinestésica', desc: 'Usar o corpo habilidosamente' },
              { icon: 'groups', name: 'Interpessoal', desc: 'Compreender outras pessoas' },
              { icon: 'self_improvement', name: 'Intrapessoal', desc: 'Autoconhecimento' },
              { icon: 'park', name: 'Naturalista', desc: 'Sensibilidade ao mundo natural' },
            ],
            infoTitle: 'Informações sobre o teste',
            duration: 'Duração:',
            durationText: 'Aproximadamente 15-20 minutos',
            questionsCount: 'Questões:',
            questionsCountText: '40 afirmações divididas em 8 categorias',
            objective: 'Objetivo:',
            objectiveText: 'Identificar suas inteligências mais desenvolvidas',
            honesty: 'Avalie cada afirmação em uma escala de 1 a 5',
            backButton: 'Voltar',
            startButton: 'Iniciar Teste',
          },
          header: {
            testNumber: 'Múltiplas Inteligências',
            title: 'Descubra Suas Múltiplas Inteligências',
            objective: 'Baseado na teoria de Howard Gardner, este teste identifica seus pontos fortes e como você pode aplicá-los em sua vida profissional.',
          },
          steps: { 1: 'Inteligência Espacial', 2: 'Inteligência Lógico-Matemática', 3: 'Inteligência Linguística', 4: 'Inteligência Musical', 5: 'Inteligência Corporal-Cinestésica', 6: 'Inteligência Interpessoal', 7: 'Inteligência Intrapessoal', 8: 'Inteligência Naturalista' },
          subtitles: { 1: 'Capacidade de visualizar e manipular objetos no espaço', 2: 'Habilidade para raciocínio lógico e resolução de problemas', 3: 'Sensibilidade para a linguagem escrita e falada', 4: 'Capacidade de perceber, criar e reproduzir música', 5: 'Habilidade para usar o corpo de forma habilidosa', 6: 'Capacidade de compreender e interagir com outras pessoas', 7: 'Conhecimento de si mesmo e capacidade de autorreflexão', 8: 'Sensibilidade para o mundo natural' },
          questions: {
            step1: [{ label: 'Tenho facilidade para ler mapas e me orientar em lugares novos' }, { label: 'Gosto de desenhar, pintar ou criar imagens mentais vívidas' }, { label: 'Consigo visualizar objetos de diferentes ângulos na minha mente' }, { label: 'Aprecio arte visual, arquitetura e design' }, { label: 'Tenho facilidade para montar quebra-cabeças e jogos espaciais' }],
            step2: [{ label: 'Gosto de resolver problemas matemáticos e quebra-cabeças lógicos' }, { label: 'Tenho facilidade para identificar padrões e relações entre conceitos' }, { label: 'Prefiro explicações lógicas e baseadas em evidências' }, { label: 'Gosto de experimentar e testar hipóteses' }, { label: 'Sinto-me confortável trabalhando com números e estatísticas' }],
            step3: [{ label: 'Tenho facilidade para expressar minhas ideias por escrito' }, { label: 'Gosto de ler livros, artigos e outros textos' }, { label: 'Aprendo bem através de palestras e discussões verbais' }, { label: 'Tenho um vocabulário amplo e gosto de aprender palavras novas' }, { label: 'Consigo contar histórias de forma envolvente' }],
            step4: [{ label: 'Consigo identificar facilmente diferentes instrumentos em uma música' }, { label: 'Tenho facilidade para lembrar melodias e ritmos' }, { label: 'Gosto de cantar, tocar instrumentos ou compor músicas' }, { label: 'A música influencia bastante meu humor e concentração' }, { label: 'Consigo perceber quando uma nota está desafinada' }],
            step5: [{ label: 'Aprendo melhor quando posso praticar fisicamente' }, { label: 'Tenho boa coordenação motora e habilidades físicas' }, { label: 'Gosto de atividades que envolvem movimento e uso do corpo' }, { label: 'Tenho facilidade para imitar gestos e movimentos' }, { label: 'Prefiro trabalhar com as mãos em projetos práticos' }],
            step6: [{ label: 'Tenho facilidade para entender os sentimentos dos outros' }, { label: 'Gosto de trabalhar em equipe e colaborar com outras pessoas' }, { label: 'Sou bom em resolver conflitos entre pessoas' }, { label: 'As pessoas costumam me procurar para pedir conselhos' }, { label: 'Tenho facilidade para me comunicar e criar conexões com diferentes tipos de pessoas' }],
            step7: [{ label: 'Tenho uma boa compreensão das minhas próprias emoções' }, { label: 'Gosto de refletir sobre meus valores e objetivos de vida' }, { label: 'Prefiro trabalhar sozinho em alguns projetos' }, { label: 'Tenho consciência dos meus pontos fortes e áreas de melhoria' }, { label: 'Costumo fazer autorreflexão regularmente' }],
            step8: [{ label: 'Gosto de estar em contato com a natureza' }, { label: 'Tenho facilidade para identificar plantas, animais e outros elementos naturais' }, { label: 'Me preocupo com questões ambientais e sustentabilidade' }, { label: 'Gosto de observar padrões e mudanças na natureza' }, { label: 'Sinto-me revigorado quando passo tempo ao ar livre' }],
          },
          errorSelect: 'Por favor, selecione uma opção.',
        },
        riasec: {
          intro: {
            title: 'Teste RIASEC',
            subtitle: 'Descubra Seu Perfil Profissional',
            whatIs: 'O que é o Modelo RIASEC?',
            whatIsDesc: 'O modelo RIASEC, criado por John Holland, ajuda a identificar o tipo de ambiente profissional que mais combina com cada pessoa. Ele se baseia em seis perfis — Realista, Investigativo, Artístico, Social, Empreendedor e Convencional — e mostra como nossos interesses, valores e habilidades se conectam com diferentes áreas de trabalho.',
            types: [
              { icon: 'construction', name: 'Realista', desc: 'Prático e manual' },
              { icon: 'science', name: 'Investigativo', desc: 'Analítico e curioso' },
              { icon: 'palette', name: 'Artístico', desc: 'Criativo e expressivo' },
              { icon: 'groups', name: 'Social', desc: 'Empático e colaborativo' },
              { icon: 'trending_up', name: 'Empreendedor', desc: 'Persuasivo e líder' },
              { icon: 'checklist', name: 'Convencional', desc: 'Organizado e metódico' },
            ],
            infoTitle: 'Informações sobre o teste',
            duration: 'Duração:',
            durationText: 'Aproximadamente 10-15 minutos',
            questionsCount: 'Questões:',
            questionsCountText: '25 perguntas divididas em 5 etapas',
            objective: 'Objetivo:',
            objectiveText: 'Identificar seu perfil profissional dominante',
            honesty: 'Você pode salvar seu progresso a qualquer momento',
            backButton: 'Voltar',
            startButton: 'Iniciar Teste',
          },
          header: {
            testNumber: 'Teste RIASEC',
            title: 'Descubra Seu Perfil Profissional RIASEC',
            objective: 'Identificar o tipo de ambiente profissional que mais combina com você através do modelo de John Holland.',
          },
          steps: { 1: 'Preferências e Interesses (1-5)', 2: 'Habilidades e Motivações (6-10)', 3: 'Valores e Reconhecimento (11-15)', 4: 'Ambiente e Características (16-20)', 5: 'Decisões e Realização (21-25)' },
          questions: {
            step1: [
              { text: 'Qual atividade você mais gostaria de realizar?', options: ['Consertar equipamentos ou máquinas', 'Conduzir experimentos científicos', 'Criar uma obra de arte ou design', 'Ajudar pessoas com seus problemas', 'Liderar uma equipe em um projeto', 'Organizar documentos e arquivos'] },
              { text: 'Em qual ambiente você se sente mais confortável?', options: ['Oficina ou área externa', 'Laboratório ou biblioteca', 'Estúdio ou espaço criativo', 'Ambiente com interação social', 'Sala de reuniões ou escritório executivo', 'Escritório organizado e estruturado'] },
              { text: 'Qual habilidade você considera mais importante?', options: ['Habilidade manual e técnica', 'Pensamento analítico e lógico', 'Criatividade e imaginação', 'Empatia e comunicação', 'Persuasão e negociação', 'Atenção aos detalhes e precisão'] },
              { text: 'O que mais te motiva em um trabalho?', options: ['Trabalhar com objetos concretos e ferramentas', 'Resolver problemas complexos', 'Expressar ideias de forma original', 'Fazer diferença na vida das pessoas', 'Alcançar metas e resultados financeiros', 'Manter sistemas organizados e eficientes'] },
              { text: 'Qual tipo de desafio você prefere?', options: ['Construir ou reparar algo físico', 'Investigar e descobrir novos conhecimentos', 'Criar algo único e inovador', 'Apoiar e desenvolver outras pessoas', 'Competir e vencer no mercado', 'Implementar processos e padrões'] },
            ],
            step2: [
              { text: 'Como você prefere aprender coisas novas?', options: ['Fazendo e praticando', 'Estudando teoria e pesquisando', 'Experimentando e improvisando', 'Conversando e trocando experiências', 'Aplicando em situações reais de negócio', 'Seguindo manuais e procedimentos'] },
              { text: 'Qual seria seu projeto ideal de fim de semana?', options: ['Fazer reformas ou trabalhos manuais', 'Ler livros sobre ciência ou filosofia', 'Pintar, escrever ou fazer música', 'Fazer voluntariado ou ajudar amigos', 'Planejar um novo negócio ou investimento', 'Organizar a casa ou fazer planejamento financeiro'] },
              { text: 'O que você valoriza mais em um colega de trabalho?', options: ['Ser prático e eficiente', 'Ser inteligente e racional', 'Ser original e inspirador', 'Ser gentil e compreensivo', 'Ser ambicioso e determinado', 'Ser organizado e confiável'] },
              { text: 'Qual atividade escolar você mais gostava?', options: ['Educação física ou trabalhos práticos', 'Matemática ou ciências', 'Artes ou literatura', 'Trabalhos em grupo ou apresentações', 'Projetos de empreendedorismo ou liderança', 'Contabilidade ou organização de eventos'] },
              { text: 'Como você lida com problemas?', options: ['Tento consertar ou resolver na prática', 'Analiso profundamente para entender a causa', 'Busco soluções criativas e diferentes', 'Peço ajuda e discuto com outras pessoas', 'Tomo decisões rápidas e sigo em frente', 'Sigo procedimentos estabelecidos'] },
            ],
            step3: [
              { text: 'Qual tipo de reconhecimento você mais valoriza?', options: ['Ver o resultado concreto do meu trabalho', 'Ser reconhecido pela minha expertise', 'Ter minha criatividade admirada', 'Receber gratidão das pessoas que ajudei', 'Alcançar posições de liderança e status', 'Ser elogiado pela qualidade e precisão'] },
              { text: 'Qual ferramenta ou recurso você prefere usar?', options: ['Ferramentas manuais e equipamentos', 'Softwares de análise e pesquisa', 'Materiais artísticos ou programas de design', 'Redes sociais e ferramentas de comunicação', 'Planilhas financeiras e CRM', 'Sistemas de gestão e organização'] },
              { text: 'O que você faz quando tem tempo livre?', options: ['Atividades físicas ou hobbies manuais', 'Estudar ou aprender algo novo', 'Atividades artísticas ou culturais', 'Passar tempo com amigos e família', 'Networking ou desenvolvendo projetos', 'Organizar coisas ou fazer planejamentos'] },
              { text: 'Qual característica melhor te descreve?', options: ['Prático e direto', 'Curioso e questionador', 'Imaginativo e expressivo', 'Empático e prestativo', 'Ambicioso e persuasivo', 'Metódico e cuidadoso'] },
              { text: 'Qual seria seu ambiente de trabalho ideal?', options: ['Ao ar livre ou em campo', 'Ambiente silencioso para concentração', 'Espaço inspirador e flexível', 'Local com muita interação humana', 'Escritório dinâmico e competitivo', 'Ambiente estruturado e previsível'] },
            ],
            step4: [
              { text: 'O que você acha mais interessante?', options: ['Como as coisas funcionam mecanicamente', 'Teorias e conceitos abstratos', 'Expressão artística e estética', 'Relacionamentos e psicologia humana', 'Estratégias de negócios e mercado', 'Sistemas, regras e processos'] },
              { text: 'Como você prefere trabalhar?', options: ['De forma independente e autônoma', 'Com tempo para pesquisa e reflexão', 'Com liberdade criativa', 'Em colaboração com outras pessoas', 'Com metas claras e recompensas', 'Seguindo procedimentos estabelecidos'] },
              { text: 'Qual tipo de livro ou filme você prefere?', options: ['Aventura e ação', 'Ficção científica ou documentários', 'Drama artístico ou obras autorais', 'Histórias sobre relacionamentos e pessoas', 'Biografias de empreendedores de sucesso', 'Suspense ou histórias de investigação'] },
              { text: 'O que te deixa mais satisfeito?', options: ['Completar uma tarefa física ou prática', 'Resolver um problema complexo', 'Criar algo belo ou original', 'Ver alguém melhorar por minha ajuda', 'Fechar um bom negócio ou venda', 'Finalizar um projeto sem erros'] },
              { text: 'Qual habilidade você gostaria de desenvolver?', options: ['Habilidades técnicas e manuais', 'Conhecimento científico avançado', 'Técnicas artísticas ou criativas', 'Inteligência emocional e social', 'Habilidades de vendas e negociação', 'Gestão de projetos e organização'] },
            ],
            step5: [
              { text: 'Como você toma decisões importantes?', options: ['Baseado em experiência prática', 'Após extensa pesquisa e análise', 'Seguindo minha intuição e criatividade', 'Considerando o impacto nas pessoas', 'Focando em resultados e lucros', 'Seguindo dados e procedimentos'] },
              { text: 'O que você valoriza em uma carreira?', options: ['Trabalho manual e tangível', 'Desafios intelectuais constantes', 'Liberdade de expressão criativa', 'Oportunidade de ajudar os outros', 'Crescimento financeiro e poder', 'Estabilidade e clareza de funções'] },
              { text: 'Qual seria seu emprego dos sonhos?', options: ['Trabalhar com as mãos criando ou consertando', 'Pesquisador ou cientista', 'Artista ou designer profissional', 'Profissional que trabalha diretamente com pessoas', 'Empreendedor ou executivo de alto nível', 'Gerente de operações ou analista'] },
              { text: 'Como você lida com mudanças?', options: ['Me adapto fazendo o que precisa ser feito', 'Analiso e entendo antes de agir', 'Vejo como oportunidade criativa', 'Busco apoio e converso com outros', 'Vejo como chance de crescimento', 'Prefiro estabilidade, mas me adapto quando necessário'] },
              { text: 'O que te faz sentir realizado profissionalmente?', options: ['Ver algo funcionar que construí ou consertei', 'Descobrir algo novo ou resolver mistérios', 'Ter minhas criações apreciadas', 'Saber que fiz diferença na vida de alguém', 'Alcançar sucesso e reconhecimento', 'Manter tudo funcionando perfeitamente'] },
            ],
          },
          errorSelect: 'Por favor, selecione uma opção.',
        },
        archetypes: {
          intro: {
            title: 'Arquétipos de Jung',
            subtitle: 'Descubra Seu Arquétipo Dominante',
            whatIs: 'O que são os Arquétipos?',
            whatIsDesc: 'Os Arquétipos de Jung são padrões universais de comportamento e personalidade que refletem motivações, medos e desejos profundos. Este teste identifica quais dos 12 arquétipos principais mais se alinham com sua personalidade, ajudando você a entender melhor suas motivações e como você interage com o mundo.',
            types: [
              { icon: 'sentiment_satisfied', name: 'Inocente', desc: 'Otimista' },
              { icon: 'auto_stories', name: 'Sábio', desc: 'Conhecedor' },
              { icon: 'explore', name: 'Explorador', desc: 'Aventureiro' },
              { icon: 'emergency', name: 'Fora da Lei', desc: 'Rebelde' },
              { icon: 'auto_fix_high', name: 'Mago', desc: 'Transformador' },
              { icon: 'shield', name: 'Herói', desc: 'Corajoso' },
              { icon: 'favorite', name: 'Amante', desc: 'Apaixonado' },
              { icon: 'theater_comedy', name: 'Bobo', desc: 'Alegre' },
              { icon: 'group', name: 'Cara Comum', desc: 'Genuíno' },
              { icon: 'healing', name: 'Cuidador', desc: 'Protetor' },
              { icon: 'workspace_premium', name: 'Governante', desc: 'Líder' },
              { icon: 'brush', name: 'Criador', desc: 'Inovador' },
            ],
            infoTitle: 'Informações sobre o teste',
            duration: 'Duração:',
            durationText: 'Aproximadamente 20-25 minutos',
            questionsCount: 'Questões:',
            questionsCountText: '60 afirmações divididas em 12 arquétipos',
            objective: 'Objetivo:',
            objectiveText: 'Identificar seus arquétipos dominantes',
            honesty: 'Avalie cada afirmação de acordo com o quanto ela se aplica a você',
            backButton: 'Voltar',
            startButton: 'Iniciar Teste',
          },
          header: {
            testNumber: 'Arquétipos',
            title: 'Descubra Seus Arquétipos de Jung',
            objective: 'Baseado na teoria dos arquétipos de Carl Jung, este teste identifica os padrões de personalidade que mais se alinham com você.',
          },
          steps: { 1: 'O Inocente', 2: 'O Sábio', 3: 'O Explorador', 4: 'O Fora da Lei', 5: 'O Mago', 6: 'O Herói', 7: 'O Amante', 8: 'O Bobo da Corte', 9: 'O Cara Comum', 10: 'O Cuidador', 11: 'O Governante', 12: 'O Criador' },
          subtitles: { 1: 'Busca felicidade, otimismo e simplicidade. Acredita no bem e na pureza.', 2: 'Busca verdade, conhecimento e compreensão profunda do mundo.', 3: 'Busca liberdade, aventura e descoberta de novos horizontes.', 4: 'Desafia o status quo, quebra regras e busca revolução e mudança radical.', 5: 'Transforma sonhos em realidade, cria experiências mágicas e momentos especiais.', 6: 'Busca superar desafios, provar seu valor e fazer a diferença no mundo.', 7: 'Busca intimidade, paixão e conexões profundas com pessoas e experiências.', 8: 'Traz alegria, diversão e leveza. Vive o momento e faz os outros rirem.', 9: 'Busca pertencimento, conexão autêntica e igualdade entre todos.', 10: 'Cuida, nutre e protege os outros. Busca ajudar e servir com compaixão.', 11: 'Busca controle, ordem e liderança. Cria estruturas e toma decisões importantes.', 12: 'Busca inovação, expressão e criar algo com valor duradouro.' },
          questions: {
            step1: [{ label: 'Acredito que as pessoas são naturalmente boas' }, { label: 'Prefiro ver o lado positivo das situações' }, { label: 'Valorizo a simplicidade e a honestidade acima de tudo' }, { label: 'Confio nas pessoas facilmente' }, { label: 'Busco a felicidade nas pequenas coisas do dia a dia' }],
            step2: [{ label: 'Adoro aprender coisas novas e buscar conhecimento' }, { label: 'Prefiro analisar e refletir antes de tomar decisões' }, { label: 'Valorizo a sabedoria e a experiência' }, { label: 'Gosto de compartilhar o que sei com os outros' }, { label: 'Busco sempre entender o porquê das coisas' }],
            step3: [{ label: 'Adoro viajar e conhecer novos lugares' }, { label: 'Sinto-me sufocado quando tenho muitas restrições' }, { label: 'Gosto de sair da minha zona de conforto' }, { label: 'Prefiro experiências novas a rotinas estabelecidas' }, { label: 'Valorizo minha independência e autonomia' }],
            step4: [{ label: 'Questiono regras que não fazem sentido' }, { label: 'Não tenho medo de ir contra a maioria' }, { label: 'Acredito que às vezes é preciso quebrar as regras' }, { label: 'Gosto de desafiar o que é considerado "normal"' }, { label: 'Prefiro criar meu próprio caminho' }],
            step5: [{ label: 'Acredito que posso transformar minhas ideias em realidade' }, { label: 'Gosto de criar experiências únicas para as pessoas' }, { label: 'Vejo possibilidades onde outros veem limitações' }, { label: 'Tenho facilidade em visualizar e manifestar meus sonhos' }, { label: 'Busco sempre inovar e criar algo especial' }],
            step6: [{ label: 'Gosto de superar desafios difíceis' }, { label: 'Sinto-me motivado a fazer a diferença' }, { label: 'Não desisto facilmente dos meus objetivos' }, { label: 'Valorizo coragem e determinação' }, { label: 'Quero deixar um legado positivo' }],
            step7: [{ label: 'Valorizo profundamente minhas relações pessoais' }, { label: 'Busco beleza e prazer na vida' }, { label: 'Sou apaixonado pelo que faço' }, { label: 'Gosto de criar momentos especiais com quem amo' }, { label: 'Sinto as emoções de forma muito intensa' }],
            step8: [{ label: 'Adoro fazer as pessoas rirem' }, { label: 'Prefiro não levar a vida tão a sério' }, { label: 'Gosto de diversão e espontaneidade' }, { label: 'Vivo o momento presente intensamente' }, { label: 'Uso o humor para lidar com situações difíceis' }],
            step9: [{ label: 'Valorizo a simplicidade e autenticidade' }, { label: 'Prefiro estar com pessoas comuns e genuínas' }, { label: 'Acredito que todos merecem respeito igual' }, { label: 'Gosto de fazer parte de um grupo ou comunidade' }, { label: 'Não gosto de privilégios ou elitismo' }],
            step10: [{ label: 'Sinto-me realizado ao ajudar os outros' }, { label: 'Coloco as necessidades dos outros antes das minhas' }, { label: 'Sou muito empático e compassivo' }, { label: 'Gosto de cuidar e proteger quem amo' }, { label: 'Sinto-me responsável pelo bem-estar dos outros' }],
            step11: [{ label: 'Gosto de estar no controle das situações' }, { label: 'Tenho facilidade em liderar e organizar' }, { label: 'Valorizo poder e influência' }, { label: 'Gosto de estabelecer regras e estruturas' }, { label: 'Sinto-me responsável por criar ordem' }],
            step12: [{ label: 'Adoro criar coisas novas e originais' }, { label: 'Expresso-me através da minha criatividade' }, { label: 'Valorizo a inovação e a originalidade' }, { label: 'Gosto de dar vida às minhas ideias' }, { label: 'Busco deixar minha marca pessoal em tudo que faço' }],
          },
          errorSelect: 'Por favor, selecione uma opção.',
        },
        resultsModal: {
          titles: {
            anamnese: 'Anamnese - Seus Resultados',
            disc: 'DISC Insight - Seu Perfil',
            multipleIntelligences: 'Múltiplas Inteligências - Seu Perfil',
            riasec: 'RIASEC - Seu Perfil Profissional',
            archetypes: 'Arquétipos de Jung - Seus Resultados',
          },
          completedOn: 'Concluído em',
          close: 'Fechar',
          footerNote: 'Seus dados estão salvos localmente no navegador',
          disc: {
            yourProfile: 'Seu Perfil',
            dominance: 'dominância',
            understandModel: 'Entenda o Modelo DISC',
            clickToView: 'Clique para visualizar uma explicação completa sobre o teste e seus pilares.',
            fullDistribution: 'Distribuição Completa',
            intro: 'Descubra seu perfil de personalidade e entenda melhor seu estilo de trabalho e relacionamento.',
            whatIs: 'O que é o DISC?',
            description: 'O DISC é uma ferramenta de avaliação comportamental que identifica quatro estilos principais e ajuda você a compreender como prefere agir, comunicar e tomar decisões em diferentes contextos.',
            characteristics: 'Características em destaque',
            challenges: 'Desafios comuns',
            suggestedAreas: 'Áreas e profissões sugeridas',
          },
          anamnese: {
            personalInfo: 'Informações Pessoais',
            name: 'Nome',
            age: 'Idade',
            location: 'Localização',
            email: 'E-mail',
            education: 'Escolaridade',
            area: 'Área',
            professionalSituation: 'Situação Profissional',
            occupation: 'Ocupação',
            areasOfInterest: 'Áreas de Interesse',
            careerGoals: 'Objetivos de Carreira',
          },
          multipleIntelligences: {
            theoryTitle: 'Teoria das Inteligências Múltiplas — Howard Gardner',
            clickToUnderstand: 'Clique para entender o modelo e como aplicá-lo à sua trajetória.',
            yourTop3: '🏆 Suas 3 Inteligências Dominantes',
            otherIntelligences: '📊 Outras Inteligências no Seu Perfil',
            professions: 'Profissões em que pode se destacar',
            intelligences: {
              logica: {
                name: 'Lógico-Matemática',
                description: 'Capacidade de raciocínio lógico, análise de padrões e resolução de problemas.',
                details: [
                  'Pessoas com essa inteligência gostam de organizar, calcular e entender como as coisas funcionam.',
                  'Têm afinidade com números, experimentos e ambientes que estimulam a análise estruturada.'
                ],
                professions: ['Engenheiro(a)', 'Cientista de Dados', 'Analista Financeiro', 'Estatístico(a)', 'Programador(a)', 'Físico(a)', 'Contador(a)', 'Economista', 'Arquiteto(a)', 'Pesquisador(a)']
              },
              linguistica: {
                name: 'Linguística',
                description: 'Relacionada à habilidade com a linguagem — falar, escrever, ler e se comunicar com clareza.',
                details: [
                  'Pessoas com alta inteligência linguística se destacam ao contar histórias, argumentar e ensinar.',
                  'Demonstram facilidade em aprender idiomas, construir discursos e adaptar mensagens a diferentes públicos.'
                ],
                professions: ['Jornalista', 'Escritor(a)', 'Professor(a)', 'Advogado(a)', 'Publicitário(a)', 'Revisor(a)', 'Roteirista', 'Radialista', 'Copywriter', 'Tradutor(a)']
              },
              espacial: {
                name: 'Espacial',
                description: 'Capacidade de visualizar formas, cores e espaços em três dimensões, com alto senso estético.',
                details: [
                  'Pessoas com essa inteligência percebem detalhes visuais e conseguem imaginar objetos sob diferentes perspectivas.',
                  'Têm facilidade para planejar ambientes, interpretar mapas, criar imagens e trabalhar com design.'
                ],
                professions: ['Designer Gráfico', 'Arquiteto(a)', 'Urbanista', 'Fotógrafo(a)', 'Ilustrador(a)', 'Designer de Interiores', 'Engenheiro(a) Civil', 'Piloto(a)', 'Videomaker', 'Artista Visual']
              },
              musical: {
                name: 'Musical',
                description: 'Sensibilidade a sons, ritmos e melodias, com foco em harmonia, composição e emoção sonora.',
                details: [
                  'Pessoas com inteligência musical identificam padrões auditivos, reconhecem notas e entendem como a música influencia emoções.',
                  'Têm facilidade para aprender instrumentos, cantar, compor e explorar diferentes estilos musicais.'
                ],
                professions: ['Músico(a)', 'Produtor(a) musical', 'Compositor(a)', 'Técnico(a) de som', 'Maestro(a)', 'Professor(a) de música', 'DJ', 'Cantor(a)', 'Crítico(a) musical', 'Terapeuta musical']
              },
              corporal: {
                name: 'Corporal-Cinestésica',
                description: 'Uso criativo e preciso do corpo, com aprendizagem baseada na prática e no movimento.',
                details: [
                  'Pessoas com essa inteligência aprendem fazendo, manipulando objetos e explorando o ambiente físico.',
                  'Demonstram coordenação, destreza e controle corporal em atividades esportivas, artísticas ou técnicas.'
                ],
                professions: ['Atleta', 'Dançarino(a)', 'Fisioterapeuta', 'Personal Trainer', 'Cirurgião(ã)', 'Ator/Atriz', 'Coreógrafo(a)', 'Professor(a) de Educação Física', 'Massoterapeuta', 'Artesão(ã)']
              },
              interpessoal: {
                name: 'Interpessoal',
                description: 'Habilidade de compreender e se conectar com outras pessoas com empatia e colaboração.',
                details: [
                  'Pessoas com alta inteligência interpessoal entendem sentimentos alheios e facilitam o trabalho em equipe.',
                  'São referência em comunicação, mediação de conflitos e liderança baseada em relacionamentos.'
                ],
                professions: ['Psicólogo(a)', 'Professor(a)', 'Líder Comunitário', 'Gestor(a) de RH', 'Assistente Social', 'Coach', 'Mediador(a)', 'Vendedor(a)', 'Enfermeiro(a)', 'Relações Públicas']
              },
              intrapessoal: {
                name: 'Intrapessoal',
                description: 'Voltada ao autoconhecimento — compreender emoções, valores e motivações pessoais.',
                details: [
                  'Pessoas introspectivas e reflexivas usam essa inteligência para definir metas coerentes com seus princípios.',
                  'Têm clareza sobre pontos fortes, limitações e buscam constantemente crescimento pessoal.'
                ],
                professions: ['Psicoterapeuta', 'Filósofo(a)', 'Escritor(a)', 'Artista', 'Pesquisador(a)', 'Consultor(a) de carreira', 'Professor(a)', 'Coach de vida', 'Instrutor(a) de mindfulness', 'Empreendedor(a)']
              },
              naturalista: {
                name: 'Naturalista',
                description: 'Relacionada à compreensão da natureza, dos ecossistemas e da sustentabilidade.',
                details: [
                  'Pessoas com inteligência naturalista observam padrões no meio ambiente e se conectam com temas ecológicos.',
                  'Demonstram interesse por biologia, cuidado com seres vivos e conservação dos recursos naturais.'
                ],
                professions: ['Biólogo(a)', 'Veterinário(a)', 'Agrônomo(a)', 'Ecólogo(a)', 'Geógrafo(a)', 'Engenheiro(a) Ambiental', 'Oceanógrafo(a)', 'Paisagista', 'Educador(a) Ambiental', 'Botânico(a)']
              }
            }
          },
          riasec: {
            title: 'Teste RIASEC — Tipos de Personalidade Profissional',
            clickToUnderstand: 'Clique para entender como este modelo orienta escolhas de carreira.',
            yourHollandCode: 'Seu Código Holland',
            dominantSequence: 'Sequência dominante',
            hollandCodeDesc: 'O código Holland combina seus três perfis mais altos, revelando uma bússola profissional para orientar decisões de carreira.',
            characteristics: 'Características em destaque',
            challenges: 'Desafios comuns',
            recommendedAreas: 'Áreas e profissões recomendadas',
            otherProfiles: '📊 Outros Perfis no Seu Código Holland',
            profiles: {
              R: {
                name: 'Realista',
                description: 'Pessoas práticas, objetivas e com habilidades manuais.',
                paragraphs: [
                  'Pessoas práticas, objetivas e com habilidades manuais. Gostam de trabalhar com ferramentas, máquinas, animais ou atividades físicas.',
                  'Preferem tarefas concretas e ambientes estruturados, onde possam fazer acontecer de forma tangível.'
                ],
                characteristics: ['Eficiência', 'Persistência', 'Foco em resultados', 'Ação direta'],
                challenges: ['Dificuldade em lidar com abstrações ou ambientes muito teóricos'],
                areas: ['Engenharia Mecânica', 'Eletrônica', 'Arquitetura', 'Design de Produto', 'Agronomia', 'Enfermagem', 'Técnico em Manutenção', 'Construção Civil', 'Logística', 'Gastronomia']
              },
              I: {
                name: 'Investigativo',
                description: 'Pessoas analíticas, curiosas e racionais.',
                paragraphs: [
                  'Pessoas analíticas, curiosas e racionais, com interesse em compreender fenômenos complexos.',
                  'Gostam de pesquisar, analisar e resolver problemas por meio da observação e da lógica, valorizando o conhecimento e o pensamento crítico.'
                ],
                characteristics: ['Curiosidade intelectual', 'Autonomia', 'Precisão', 'Reflexão'],
                challenges: ['Tendência ao isolamento', 'Dificuldade em tarefas muito práticas'],
                areas: ['Medicina', 'Biologia', 'Psicologia', 'Engenharia de Dados', 'Pesquisa Científica', 'Estatística', 'Análise de Sistemas', 'Química', 'Ciências Atuariais', 'Tecnologia da Informação']
              },
              A: {
                name: 'Artístico',
                description: 'Pessoas criativas, expressivas e intuitivas.',
                paragraphs: [
                  'Pessoas criativas, expressivas e intuitivas, que valorizam a originalidade e a estética.',
                  'Buscam ambientes livres e flexíveis para experimentar, inovar e expressar ideias por meio da arte, escrita, design, música ou comunicação.'
                ],
                characteristics: ['Sensibilidade', 'Imaginação', 'Liberdade', 'Expressão pessoal'],
                challenges: ['Dificuldade com regras rígidas', 'Resistência a rotinas excessivas'],
                areas: ['Design Gráfico', 'Arquitetura', 'Publicidade', 'Moda', 'Fotografia', 'Cinema', 'Artes Visuais', 'Jornalismo', 'Produção Cultural', 'Música']
              },
              S: {
                name: 'Social',
                description: 'Pessoas empáticas, comunicativas e colaborativas.',
                paragraphs: [
                  'Pessoas empáticas, comunicativas e colaborativas, que se sentem realizadas ao ajudar, ensinar ou orientar os outros.',
                  'Têm alta inteligência emocional e se destacam em papéis de apoio, ensino e cuidado humano.'
                ],
                characteristics: ['Paciência', 'Sensibilidade', 'Escuta ativa', 'Senso de comunidade'],
                challenges: ['Dificuldade em lidar com conflitos intensos', 'Desafios em decisões estritamente racionais'],
                areas: ['Psicologia', 'Pedagogia', 'Serviço Social', 'Fisioterapia', 'Medicina', 'Enfermagem', 'Recursos Humanos', 'Coaching', 'Educação Física', 'Orientação Profissional']
              },
              E: {
                name: 'Empreendedor',
                description: 'Pessoas inovadoras, ambiciosas e comunicativas.',
                paragraphs: [
                  'Pessoas inovadoras, ambiciosas e comunicativas, que gostam de liderar, influenciar e criar impacto.',
                  'Sentem-se motivadas por desafios, poder de decisão e reconhecimento, valorizando ambientes dinâmicos e resultados rápidos.'
                ],
                characteristics: ['Liderança', 'Persuasão', 'Iniciativa', 'Visão estratégica'],
                challenges: ['Impaciência', 'Aversão a detalhes operacionais'],
                areas: ['Administração', 'Marketing', 'Vendas', 'Direito', 'Relações Públicas', 'Gestão de Negócios', 'Empreendedorismo', 'Consultoria', 'Economia', 'Comunicação Empresarial']
              },
              C: {
                name: 'Convencional',
                description: 'Pessoas organizadas, metódicas e responsáveis.',
                paragraphs: [
                  'Pessoas organizadas, metódicas e responsáveis, que gostam de trabalhar com dados, sistemas e processos bem definidos.',
                  'Valorizam regras, estabilidade e precisão, sendo excelentes em planejamento, controle e garantia de qualidade.'
                ],
                characteristics: ['Disciplina', 'Confiabilidade', 'Atenção aos detalhes', 'Foco em qualidade'],
                challenges: ['Resistência à mudança', 'Dificuldade em contextos muito improvisados'],
                areas: ['Contabilidade', 'Administração', 'Finanças', 'Secretariado Executivo', 'Arquivologia', 'Análise de Dados', 'Direito Tributário', 'Banco e Seguros', 'Planejamento', 'Controladoria']
              }
            }
          },
          archetypes: {
            title: 'Teste de Arquétipos — Os Perfis Universais da Jornada Pessoal e Profissional',
            clickToUnderstand: 'Clique para entender como os arquétipos podem orientar suas escolhas pessoais e profissionais.',
            yourTop3: '⭐ Seus 3 Arquétipos Dominantes',
            otherArchetypes: '📊 Outros Arquétipos Presentes em Você',
            strengths: 'Potenciais destaques',
            attentionPoints: 'Pontos de atenção',
            suggestedAreas: 'Áreas e papéis sugeridos',
            archetypes: {
              inocente: {
                name: 'O Inocente',
                short: 'Busca felicidade, otimismo e simplicidade.',
                paragraphs: [
                  'O Inocente acredita no bem e busca viver com autenticidade, simplicidade e fé na bondade das pessoas.',
                  'Prefere ambientes leves, acolhedores e positivos, onde possa nutrir esperança e inspirar otimismo.'
                ],
                strengths: ['Otimismo contagiante', 'Confiança nas pessoas', 'Busca por harmonia', 'Visão positiva da vida'],
                challenges: ['Ingenuidade em ambientes competitivos', 'Dificuldade em lidar com conflitos', 'Tendência a evitar realidades difíceis'],
                areas: ['Educação Infantil', 'Hospitalidade', 'Pastoral ou Atividade Religiosa', 'Serviços Comunitários', 'Experiências de Bem-Estar', 'Marketing de Experiências', 'Design de Serviços Humanizados']
              },
              sabio: {
                name: 'O Sábio',
                short: 'Busca verdade, conhecimento e compreensão profunda.',
                paragraphs: [
                  'O Sábio é movido pela curiosidade intelectual, pelo desejo de entender como o mundo funciona e compartilhar sabedoria.',
                  'Valoriza análises profundas, aprendizado contínuo e decisões embasadas em evidências e reflexão.'
                ],
                strengths: ['Pensamento crítico', 'Liderança intelectual', 'Tomada de decisão orientada por dados', 'Aprendizado contínuo'],
                challenges: ['Excesso de análise', 'Perfeccionismo intelectual', 'Dificuldade em agir sem todas as informações'],
                areas: ['Pesquisa Acadêmica', 'Docência', 'Consultoria Estratégica', 'Jornalismo Investigativo', 'Ciência de Dados', 'Psicologia', 'Mentoria e Educação Corporativa']
              },
              explorador: {
                name: 'O Explorador',
                short: 'Busca liberdade, aventura e descoberta.',
                paragraphs: [
                  'O Explorador valoriza autonomia, autenticidade e novas experiências. Tem forte desejo de expandir fronteiras e conhecer possibilidades.',
                  'Prefere carreiras e projetos com liberdade criativa, movimento constante e espaço para inovar.'
                ],
                strengths: ['Curiosidade prática', 'Coragem para arriscar', 'Autenticidade', 'Capacidade de se reinventar'],
                challenges: ['Inquietação com rotinas', 'Dificuldade em manter projetos longos', 'Busca constante por novidade'],
                areas: ['Turismo e Hospitalidade', 'Fotografia de Viagem', 'Empreendedorismo Criativo', 'Pesquisas de Mercado', 'Marketing de Lifestyle', 'Idiomas e Relações Internacionais', 'Startups e Negócios Digitais']
              },
              foraDaLei: {
                name: 'O Fora da Lei',
                short: 'Desafia o status quo e busca mudança radical.',
                paragraphs: [
                  'O Fora da Lei tem espírito disruptivo, confronta padrões e acredita na transformação social ou estrutural.',
                  'Enxerga oportunidades onde existem regras limitantes e atua para criar novas alternativas.'
                ],
                strengths: ['Coragem para questionar', 'Visão inovadora', 'Capacidade de mobilizar mudanças', 'Espírito empreendedor'],
                challenges: ['Conflitos com autoridade', 'Impulsividade em decisões', 'Dificuldade com rotinas formais'],
                areas: ['Inovação Social', 'Movimentos Sociais', 'Empreendedorismo Disruptivo', 'Design de Serviços', 'Publicidade Crítica', 'Tecnologia', 'Consultoria de Transformação Cultural']
              },
              mago: {
                name: 'O Mago',
                short: 'Transforma ideias em experiências significativas.',
                paragraphs: [
                  'O Mago acredita no poder da visão e da imaginação para materializar mudanças profundas.',
                  'Traz uma abordagem estratégica e inspiradora, conectando pessoas a experiências transformadoras.'
                ],
                strengths: ['Visão estratégica', 'Capacidade de inspirar', 'Criação de experiências marcantes', 'Intuição aguçada'],
                challenges: ['Expectativas elevadas', 'Risco de se sobrecarregar', 'Desejo de controle excessivo'],
                areas: ['Experiência do Cliente', 'Produção de Eventos', 'Storytelling Corporativo', 'Viagens Transformadoras', 'Educação Experiencial', 'Coaching e Mentoria', 'Design Thinking']
              },
              heroi: {
                name: 'O Herói',
                short: 'Supera desafios e busca impactar o mundo.',
                paragraphs: [
                  'O Herói se motiva por desafios, busca provar seu valor e gerar impacto positivo na sociedade.',
                  'Possui energia para liderar projetos difíceis, persistir em metas exigentes e inspirar coragem.'
                ],
                strengths: ['Resiliência sob pressão', 'Capacidade de mobilizar equipes', 'Orientação a resultados', 'Competitividade saudável'],
                challenges: ['Excesso de autoexigência', 'Dificuldade em delegar', 'Tendência a ignorar limites pessoais'],
                areas: ['Gestão Executiva', 'Carreiras Militares', 'Esportes de Alto Desempenho', 'Emergências e Resgates', 'Política Pública', 'Empreendedorismo', 'Consultoria de Performance']
              },
              amante: {
                name: 'O Amante',
                short: 'Valoriza intimidade, beleza e conexões profundas.',
                paragraphs: [
                  'O Amante vive intensamente emoções e relações, buscando criar experiências memoráveis e significativas.',
                  'Dedica-se a projetos que envolvem estética, sensibilidade humana e proximidade com pessoas.'
                ],
                strengths: ['Sensibilidade estética', 'Empatia profunda', 'Capacidade de criar vínculos', 'Dedicação apaixonada'],
                challenges: ['Dificuldade em estabelecer limites pessoais', 'Sensibilidade elevada a críticas', 'Necessidade de aprovação'],
                areas: ['Design e Moda', 'Marketing Sensorial', 'Eventos Sociais', 'Consultoria de Imagem', 'Gastronomia', 'Terapias Integrativas', 'Atuação Artística']
              },
              bobo: {
                name: 'O Bobo da Corte',
                short: 'Traz alegria, espontaneidade e leveza.',
                paragraphs: [
                  'O Bobo da Corte vive o presente com humor, improviso e criatividade, contribuindo para aliviar tensões.',
                  'Transforma ambientes rígidos em espaços mais humanos e acessíveis, cultivando alegria e leveza.'
                ],
                strengths: ['Espontaneidade', 'Carisma', 'Capacidade de quebrar tensões', 'Criatividade social'],
                challenges: ['Pode ser subestimado', 'Dificuldade em contextos muito formais', 'Propensão a evitar conversas difíceis'],
                areas: ['Comédia', 'Produção de Conteúdo', 'Mídias Sociais', 'Trabalho com Crianças', 'Animação de Eventos', 'Terapia do Riso', 'Experiências de Entretenimento']
              },
              caraComum: {
                name: 'O Cara Comum',
                short: 'Busca pertencimento e igualdade.',
                paragraphs: [
                  'O Cara Comum valoriza autenticidade, proximidade e a sensação de fazer parte de uma comunidade.',
                  'Prefere ambientes colaborativos, democráticos e com cultura de respeito mútuo.'
                ],
                strengths: ['Cooperação', 'Construção de confiança', 'Humildade', 'Sensibilidade a injustiças'],
                challenges: ['Evita protagonismo', 'Pode se subestimar', 'Dificuldade em contextos competitivos'],
                areas: ['Recursos Humanos', 'Serviços Comunitários', 'Atendimento ao Cliente', 'Comunicação Interna', 'Projetos Sociais', 'Educação', 'Hospitalidade']
              },
              cuidador: {
                name: 'O Cuidador',
                short: 'Cuida, nutre e protege com compaixão.',
                paragraphs: [
                  'O Cuidador sente-se realizado ao apoiar o bem-estar dos outros e oferecer suporte genuíno.',
                  'Possui alta empatia e senso de responsabilidade, buscando alívio e segurança para quem acompanha.'
                ],
                strengths: ['Empatia genuína', 'Resiliência emocional', 'Entrega dedicada', 'Escuta acolhedora'],
                challenges: ['Risco de esgotamento', 'Dificuldade em estabelecer limites', 'Propensão a se sobrecarregar'],
                areas: ['Psicologia', 'Enfermagem', 'Serviço Social', 'Fisioterapia', 'Pedagogia', 'Terapia Ocupacional', 'Coaching de Vida', 'Gestão de Pessoas Humanizada']
              },
              governante: {
                name: 'O Governante',
                short: 'Cria ordem, estruturas e direção.',
                paragraphs: [
                  'O Governante lidera com senso de responsabilidade, buscando estabilidade e resultados consistentes.',
                  'Gosta de definir metas claras, estruturar equipes e estabelecer padrões para entregar excelência.'
                ],
                strengths: ['Organização', 'Tomada de decisão', 'Autoridade natural', 'Planejamento estratégico'],
                challenges: ['Controle excessivo', 'Dificuldade em delegar', 'Risco de centralizar poder'],
                areas: ['Direção Executiva', 'Gestão Pública', 'Coordenação Educacional', 'Planejamento Estratégico', 'Consultoria Empresarial', 'Governança Corporativa']
              },
              criador: {
                name: 'O Criador',
                short: 'Busca inovação e expressão com propósito.',
                paragraphs: [
                  'O Criador transforma ideias em algo concreto e original, unindo estética, significado e impacto.',
                  'Encontra realização em processos autorais, onde pode deixar sua marca e construir narrativas memoráveis.'
                ],
                strengths: ['Visão criativa', 'Dedicação a projetos autorais', 'Capacidade de materializar ideias', 'Sensibilidade estética apurada'],
                challenges: ['Autocrítica intensa', 'Perfeccionismo', 'Dificuldade em concluir projetos extensos'],
                areas: ['Design', 'Arquitetura', 'Publicidade', 'Produção Audiovisual', 'Artes Visuais', 'UX/UI', 'Branding', 'Empreendimentos Criativos']
              }
            }
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
    lng: 'en',
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

