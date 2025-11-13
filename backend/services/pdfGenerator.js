import PDFDocument from 'pdfkit';
import { getColors, addPageHeader, addSection, addFooter } from '../utils/pdfStyles.js';

/**
 * Gera um PDF completo com todos os resultados dos testes
 */
export async function generateCompletePDF(userData, tests, roadmap, completeNarrative = null) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: 'A4',
        margins: { top: 60, bottom: 60, left: 50, right: 50 },
        info: {
          Title: 'Relatório de Testes - Trajetória',
          Author: 'Trajetória Platform',
          Subject: 'Relatório Completo de Avaliações'
        }
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      const colors = getColors();

      // ============ PÁGINA 1: CAPA ============
      addCoverPage(doc, userData, colors);

      // ============ PÁGINA 2: SUMÁRIO ============
      doc.addPage();
      addTableOfContents(doc, tests, colors);

      // ============ PÁGINA 3+: ANAMNESE INICIAL ============
      doc.addPage();
      addPageHeader(doc, 'Anamnese Inicial', colors);
      addAnamneseSection(doc, userData, colors);

      // ============ DISC INSIGHT ============
      if (tests['disc-insight']) {
        doc.addPage();
        addPageHeader(doc, 'DISC Insight - Perfil de Personalidade', colors);
        addDISCSection(doc, tests['disc-insight'], colors);
      }

      // ============ INTELIGÊNCIAS MÚLTIPLAS ============
      if (tests['multiple-intelligences']) {
        doc.addPage();
        addPageHeader(doc, 'Inteligências Múltiplas', colors);
        addMultipleIntelligencesSection(doc, tests['multiple-intelligences'], colors);
      }

      // ============ RIASEC ============
      if (tests['riasec']) {
        doc.addPage();
        addPageHeader(doc, 'RIASEC - Orientação Profissional', colors);
        addRIASECSection(doc, tests['riasec'], colors);
      }

      // ============ ARQUÉTIPOS ============
      if (tests['archetypes']) {
        doc.addPage();
        addPageHeader(doc, 'Arquétipos de Personalidade', colors);
        addArchetypesSection(doc, tests['archetypes'], colors);
      }

      if (roadmap) {
        doc.addPage();
        addPageHeader(doc, 'Plano de Vida Personalizado', colors);
        addRoadmapSection(doc, roadmap, colors);
      }

      // ============ RELATÓRIO COMPLETO COM ESTRUTURA DE JORNADA ============
      if (completeNarrative) {
        doc.addPage();
        addPageHeader(doc, 'Relatório Vocacional Completo', colors);
        addCompleteNarrativeSection(doc, completeNarrative, colors);
      }

      // ============ PÁGINA FINAL: CONCLUSÃO ============
      doc.addPage();
      addConclusionPage(doc, userData, tests, colors, roadmap);

      // Finaliza o documento
      doc.end();

    } catch (error) {
      reject(error);
    }
  });
}

// ============ FUNÇÕES AUXILIARES ============

function addCoverPage(doc, userData, colors) {
  // Logo/Título principal
  doc.fontSize(36)
     .fillColor(colors.primary)
     .text('TRAJETÓRIA', { align: 'center' });

  doc.moveDown(0.5);
  doc.fontSize(18)
     .fillColor(colors.secondary)
     .text('Relatório Completo de Avaliações', { align: 'center' });

  doc.moveDown(3);

  // Informações do usuário
  const boxY = doc.y;
  doc.roundedRect(50, boxY, doc.page.width - 100, 180, 10)
     .fillAndStroke(colors.lightBackground, colors.primary);

  doc.fillColor(colors.text)
     .fontSize(14)
     .text(`Nome: ${userData.nomeCompleto || 'Não informado'}`, 70, boxY + 30);
  
  doc.text(`Idade: ${userData.idade || 'Não informada'} anos`, 70, boxY + 60);
  doc.text(`Localização: ${userData.cidadeEstado || 'Não informada'}`, 70, boxY + 90);
  doc.text(`E-mail: ${userData.email || 'Não informado'}`, 70, boxY + 120);
  doc.text(`Data do Relatório: ${new Date().toLocaleDateString('pt-BR')}`, 70, boxY + 150);

  doc.moveDown(8);

  // Descrição
  doc.fontSize(11)
     .fillColor(colors.textLight)
     .text(
       'Este relatório apresenta uma análise completa dos seus resultados em múltiplos testes de autoconhecimento e orientação profissional. Os dados aqui apresentados são baseados nas suas respostas e têm como objetivo auxiliar no seu desenvolvimento pessoal e profissional.',
       { align: 'justify', lineGap: 5 }
     );
}

function addTableOfContents(doc, tests, colors) {
  doc.fontSize(24)
     .fillColor(colors.primary)
     .text('Sumário', { underline: true });

  doc.moveDown(2);

  const contents = [
    { title: '1. Anamnese Inicial', page: 3 },
    { title: '2. DISC Insight - Perfil de Personalidade', included: !!tests['disc-insight'] },
    { title: '3. Inteligências Múltiplas', included: !!tests['multiple-intelligences'] },
    { title: '4. RIASEC - Orientação Profissional', included: !!tests['riasec'] },
    { title: '5. Arquétipos de Personalidade', included: !!tests['archetypes'] },
    { title: '6. Conclusões e Recomendações', page: 'última' }
  ];

  doc.fontSize(12);
  contents.forEach((item, index) => {
    if (item.included === false) {
      doc.fillColor(colors.textLight)
         .text(`${item.title} (não realizado)`, { continued: false });
    } else {
      doc.fillColor(colors.text)
         .text(item.title, { continued: false });
    }
    doc.moveDown(0.8);
  });
}

function addAnamneseSection(doc, userData, colors) {
  addSection(doc, 'Informações Pessoais', colors);

  doc.fontSize(11)
     .fillColor(colors.text)
     .text(`Nome Completo: ${userData.nomeCompleto || 'N/A'}`)
     .moveDown(0.5)
     .text(`Idade: ${userData.idade || 'N/A'} anos`)
     .moveDown(0.5)
     .text(`Cidade/Estado: ${userData.cidadeEstado || 'N/A'}`)
     .moveDown(0.5)
     .text(`E-mail: ${userData.email || 'N/A'}`)
     .moveDown(1.5);

  if (userData.nivelEscolaridade) {
    addSection(doc, 'Escolaridade', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(userData.nivelEscolaridade);
    
    if (userData.areaEstudo) {
      doc.moveDown(0.5).text(`Área de Estudo: ${userData.areaEstudo}`);
    }
    doc.moveDown(1.5);
  }

  if (userData.situacaoProfissional) {
    addSection(doc, 'Situação Profissional', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(userData.situacaoProfissional);
    
    if (userData.ocupacaoAtual) {
      doc.moveDown(0.5).text(`Ocupação Atual: ${userData.ocupacaoAtual}`);
    }
    doc.moveDown(1.5);
  }

  if (userData.areasInteresse && userData.areasInteresse.length > 0) {
    addSection(doc, 'Áreas de Interesse', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .list(userData.areasInteresse, { bulletRadius: 2 });
    doc.moveDown(1.5);
  }

  if (userData.objetivosCarreira && userData.objetivosCarreira.length > 0) {
    addSection(doc, 'Objetivos de Carreira', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .list(userData.objetivosCarreira, { bulletRadius: 2 });
  }
}

function addDISCSection(doc, testData, colors) {
  const { results, completedAt } = testData;
  
  doc.fontSize(10)
     .fillColor(colors.textLight)
     .text(`Realizado em: ${new Date(completedAt).toLocaleDateString('pt-BR')}`)
     .moveDown(2);

  addSection(doc, 'Seu Perfil DISC', colors);

  const types = [
    { key: 'D', name: 'Dominância', description: 'Orientado para resultados, direto e decidido' },
    { key: 'I', name: 'Influência', description: 'Sociável, persuasivo e otimista' },
    { key: 'S', name: 'Estabilidade', description: 'Estável, paciente e leal' },
    { key: 'C', name: 'Conformidade', description: 'Preciso, analítico e sistemático' }
  ];

  // Encontra o tipo dominante
  const dominant = Object.entries(results).reduce((a, b) => a[1] > b[1] ? a : b);
  const dominantType = types.find(t => t.key === dominant[0]);

  doc.fontSize(14)
     .fillColor(colors.primary)
     .text(`Perfil Dominante: ${dominantType.name} (${dominant[1]}%)`, { underline: true })
     .moveDown(1);

  doc.fontSize(11)
     .fillColor(colors.text)
     .text(dominantType.description)
     .moveDown(2);

  addSection(doc, 'Distribuição Completa', colors);

  types.forEach(type => {
    const percentage = results[type.key];
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(`${type.name} (${type.key}): ${percentage}%`);
    
    // Barra de progresso visual
    const barWidth = (percentage / 100) * 400;
    const yPos = doc.y + 5;
    doc.rect(doc.x, yPos, 400, 10)
       .fillAndStroke(colors.lightBackground, colors.border);
    doc.rect(doc.x, yPos, barWidth, 10)
       .fill(colors.primary);
    
    doc.moveDown(1.5);
  });
}

function addMultipleIntelligencesSection(doc, testData, colors) {
  const { results, completedAt } = testData;
  
  doc.fontSize(10)
     .fillColor(colors.textLight)
     .text(`Realizado em: ${new Date(completedAt).toLocaleDateString('pt-BR')}`)
     .moveDown(2);

  const intelligences = [
    { key: 'espacial', name: 'Espacial', description: 'Visualização e manipulação espacial' },
    { key: 'logica', name: 'Lógico-Matemática', description: 'Raciocínio lógico e matemático' },
    { key: 'linguistica', name: 'Linguística', description: 'Linguagem escrita e falada' },
    { key: 'musical', name: 'Musical', description: 'Percepção e criação musical' },
    { key: 'corporal', name: 'Corporal-Cinestésica', description: 'Habilidades físicas e motoras' },
    { key: 'interpessoal', name: 'Interpessoal', description: 'Interação com outras pessoas' },
    { key: 'intrapessoal', name: 'Intrapessoal', description: 'Autoconhecimento e reflexão' },
    { key: 'naturalista', name: 'Naturalista', description: 'Conexão com a natureza' }
  ];

  // Ordena por pontuação
  const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3);

  addSection(doc, 'Suas 3 Inteligências Dominantes', colors);

  top3.forEach(([key, value], index) => {
    const intelligence = intelligences.find(i => i.key === key);
    doc.fontSize(12)
       .fillColor(colors.primary)
       .text(`${index + 1}º - ${intelligence.name}: ${value}%`, { underline: true })
       .moveDown(0.5);
    
    doc.fontSize(10)
       .fillColor(colors.text)
       .text(intelligence.description)
       .moveDown(1.5);
  });

  addSection(doc, 'Perfil Completo', colors);

  intelligences.forEach(intelligence => {
    const percentage = results[intelligence.key];
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(`${intelligence.name}: ${percentage}%`);
    
    const barWidth = (percentage / 100) * 400;
    const yPos = doc.y + 5;
    doc.rect(doc.x, yPos, 400, 10)
       .fillAndStroke(colors.lightBackground, colors.border);
    doc.rect(doc.x, yPos, barWidth, 10)
       .fill(colors.secondary);
    
    doc.moveDown(1.5);
  });
}

function addRIASECSection(doc, testData, colors) {
  const { results, completedAt } = testData;
  
  doc.fontSize(10)
     .fillColor(colors.textLight)
     .text(`Realizado em: ${new Date(completedAt).toLocaleDateString('pt-BR')}`)
     .moveDown(2);

  const profiles = [
    { 
      key: 'R', 
      name: 'Realista', 
      description: 'Prefere atividades práticas e trabalho manual.',
      careers: 'Engenharia, mecânica, agricultura, construção, veterinária'
    },
    { 
      key: 'I', 
      name: 'Investigativo', 
      description: 'Analítico, gosta de resolver problemas complexos.',
      careers: 'Ciências, medicina, pesquisa, análise de dados, tecnologia'
    },
    { 
      key: 'A', 
      name: 'Artístico', 
      description: 'Criativo, valoriza a expressão pessoal.',
      careers: 'Design, artes, música, literatura, arquitetura, publicidade'
    },
    { 
      key: 'S', 
      name: 'Social', 
      description: 'Gosta de trabalhar com pessoas e ajudar os outros.',
      careers: 'Educação, psicologia, serviço social, RH, enfermagem'
    },
    { 
      key: 'E', 
      name: 'Empreendedor', 
      description: 'Persuasivo, gosta de liderar.',
      careers: 'Administração, vendas, marketing, direito, empreendedorismo'
    },
    { 
      key: 'C', 
      name: 'Convencional', 
      description: 'Organizado, valoriza precisão e eficiência.',
      careers: 'Contabilidade, administração, finanças, secretariado'
    }
  ];

  const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
  const dominantKey = sorted[0][0];
  const dominantProfile = profiles.find(p => p.key === dominantKey);

  addSection(doc, `Perfil Dominante: ${dominantProfile.name}`, colors);

  doc.fontSize(11)
     .fillColor(colors.text)
     .text(dominantProfile.description)
     .moveDown(1);

  doc.fontSize(10)
     .fillColor(colors.primary)
     .text(`Carreiras Ideais:`, { underline: true })
     .moveDown(0.5);

  doc.fontSize(10)
     .fillColor(colors.text)
     .text(dominantProfile.careers)
     .moveDown(2);

  addSection(doc, 'Seu Código Holland (Top 3)', colors);

  sorted.slice(0, 3).forEach(([key, value]) => {
    const profile = profiles.find(p => p.key === key);
    doc.fontSize(11)
       .fillColor(colors.primary)
       .text(`${key} - ${profile.name}: ${value}%`)
       .moveDown(0.3);
  });

  doc.moveDown(2);

  addSection(doc, 'Todos os Perfis', colors);

  profiles.forEach(profile => {
    const percentage = results[profile.key];
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(`${profile.name} (${profile.key}): ${percentage}%`);
    
    const barWidth = (percentage / 100) * 400;
    const yPos = doc.y + 5;
    doc.rect(doc.x, yPos, 400, 10)
       .fillAndStroke(colors.lightBackground, colors.border);
    doc.rect(doc.x, yPos, barWidth, 10)
       .fill(colors.primary);
    
    doc.moveDown(1.5);
  });
}

function addArchetypesSection(doc, testData, colors) {
  const { results, completedAt } = testData;
  
  doc.fontSize(10)
     .fillColor(colors.textLight)
     .text(`Realizado em: ${new Date(completedAt).toLocaleDateString('pt-BR')}`)
     .moveDown(2);

  addSection(doc, 'Seus Arquétipos Dominantes', colors);

  // Assumindo que results tem os arquétipos e suas pontuações
  if (results && typeof results === 'object') {
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    
    sorted.forEach(([archetype, score], index) => {
      doc.fontSize(12)
         .fillColor(colors.primary)
         .text(`${index + 1}º - ${archetype}: ${score}%`)
         .moveDown(1);

      const barWidth = (score / 100) * 400;
      const yPos = doc.y;
      doc.rect(doc.x, yPos, 400, 10)
         .fillAndStroke(colors.lightBackground, colors.border);
      doc.rect(doc.x, yPos, barWidth, 10)
         .fill(colors.secondary);
      
      doc.moveDown(2);
    });
  }
}

function addConclusionPage(doc, userData, tests, colors, roadmap) {
  doc.fontSize(24)
     .fillColor(colors.primary)
     .text('Conclusões e Recomendações', { align: 'center' })
     .moveDown(2);

  addSection(doc, 'Resumo dos Testes Realizados', colors);

  const testsCompleted = Object.keys(tests).length;
  doc.fontSize(11)
     .fillColor(colors.text)
     .text(`Você completou ${testsCompleted} teste(s) de autoconhecimento e orientação profissional.`)
     .moveDown(2);

  if (roadmap?.finalMessage) {
    addSection(doc, 'Mensagem Final do Mentor', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(roadmap.finalMessage, { align: 'justify', lineGap: 4 })
       .moveDown(2);
  }

  addSection(doc, 'Próximos Passos', colors);

  const recommendations = [
    'Revise seus resultados regularmente para acompanhar sua evolução',
    'Utilize as informações para guiar suas decisões de carreira',
    'Busque oportunidades que alinhem com seus pontos fortes',
    'Considere desenvolver áreas que deseja fortalecer',
    'Compartilhe seus resultados com mentores ou coaches de carreira'
  ];

  doc.fontSize(11)
     .fillColor(colors.text)
     .list(recommendations, { bulletRadius: 2 })
     .moveDown(2);

  doc.fontSize(10)
     .fillColor(colors.textLight)
     .text('Este relatório foi gerado automaticamente pela plataforma Trajetória.', { align: 'center' })
     .moveDown(0.5)
     .text(`Data de geração: ${new Date().toLocaleDateString('pt-BR')}`, { align: 'center' });
}

function addRoadmapSection(doc, roadmap, colors) {
  if (!roadmap) return;

  if (roadmap.vision) {
    addSection(doc, 'Visão Geral', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .text(roadmap.vision, { align: 'justify', lineGap: 4 })
       .moveDown(1.5);
  }

  if (Array.isArray(roadmap.phases) && roadmap.phases.length > 0) {
    addSection(doc, 'Fases de Desenvolvimento', colors);

    roadmap.phases.forEach((phase, index) => {
      const title = phase.title || `Fase ${index + 1}`;
      doc.fontSize(13)
         .fillColor(colors.primary)
         .text(`${index + 1}. ${title}`, { underline: true })
         .moveDown(0.4);

      if (phase.timeframe || phase.focus) {
        const details = [phase.timeframe, phase.focus].filter(Boolean).join(' • ');
        if (details) {
          doc.fontSize(11)
             .fillColor(colors.text)
             .text(details)
             .moveDown(0.6);
        }
      }

      if (Array.isArray(phase.steps) && phase.steps.length > 0) {
        doc.fontSize(11)
           .fillColor(colors.text)
           .list(phase.steps, { bulletRadius: 2 })
           .moveDown(1);
      } else {
        doc.moveDown(0.6);
      }
    });
  }

  if (Array.isArray(roadmap.habits) && roadmap.habits.length > 0) {
    addSection(doc, 'Hábitos e Rotinas de Suporte', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .list(roadmap.habits, { bulletRadius: 2 })
       .moveDown(1.5);
  }

  if (Array.isArray(roadmap.support) && roadmap.support.length > 0) {
    addSection(doc, 'Rede de Apoio e Recursos', colors);
    doc.fontSize(11)
       .fillColor(colors.text)
       .list(roadmap.support, { bulletRadius: 2 })
       .moveDown(1.5);
  }
}

/**
 * Adiciona a seção do relatório completo com estrutura de jornada
 */
function addCompleteNarrativeSection(doc, narrative, colors) {
  if (!narrative) return;

  // Processa o markdown e renderiza no PDF
  const lines = narrative.split('\n');
  let currentY = doc.y;

  lines.forEach((line) => {
    // Verifica se precisa de nova página
    if (currentY > doc.page.height - 100) {
      doc.addPage();
      currentY = 60;
    }

    const trimmedLine = line.trim();

    // Títulos (##)
    if (trimmedLine.startsWith('## ')) {
      const title = trimmedLine.substring(3).trim();
      addSection(doc, title, colors);
      currentY = doc.y;
    }
    // Subtítulos (###)
    else if (trimmedLine.startsWith('### ')) {
      const subtitle = trimmedLine.substring(4).trim();
      doc.fontSize(13)
         .fillColor(colors.secondary)
         .text(subtitle, { underline: true })
         .moveDown(0.8);
      currentY = doc.y;
    }
    // Listas com bullets
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const item = trimmedLine.substring(2).trim();
      // Remove emojis para o PDF
      const cleanItem = item.replace(/[🧭🎯🚀🌱🔭]/g, '').trim();
      doc.fontSize(11)
         .fillColor(colors.text)
         .text(`• ${cleanItem}`, { indent: 20 })
         .moveDown(0.5);
      currentY = doc.y;
    }
    // Listas numeradas
    else if (/^\d+\.\s/.test(trimmedLine)) {
      const item = trimmedLine.replace(/^\d+\.\s/, '').trim();
      doc.fontSize(11)
         .fillColor(colors.text)
         .text(item, { indent: 20 })
         .moveDown(0.5);
      currentY = doc.y;
    }
    // Texto em negrito (**texto**)
    else if (trimmedLine.includes('**')) {
      const parts = trimmedLine.split(/(\*\*[^*]+\*\*)/g);
      doc.fontSize(11)
         .fillColor(colors.text);
      
      parts.forEach((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          doc.font('Helvetica-Bold')
             .text(boldText, { continued: true });
        } else if (part.trim()) {
          doc.font('Helvetica')
             .text(part, { continued: true });
        }
      });
      
      doc.moveDown(0.8);
      currentY = doc.y;
    }
    // Parágrafos normais
    else if (trimmedLine && !trimmedLine.startsWith('<') && !trimmedLine.startsWith('</')) {
      // Ignora tags HTML/SVG e linhas vazias
      if (!trimmedLine.match(/^<[^>]+>$/) && trimmedLine.length > 0) {
        // Remove qualquer tag SVG/HTML que possa estar no texto
        const cleanText = trimmedLine.replace(/<[^>]*>/g, '').trim();
        if (cleanText) {
          doc.fontSize(11)
             .fillColor(colors.text)
             .text(cleanText, { align: 'justify', lineGap: 3 })
             .moveDown(0.6);
          currentY = doc.y;
        }
      }
    }
  });
}

