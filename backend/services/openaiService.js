import OpenAI from 'openai';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let cachedClient = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_DIR = path.resolve(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'openai-prompts.log');

async function persistPrompt(prompt) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    const entry = [
      `timestamp=${new Date().toISOString()}`,
      `prompt=`,
      prompt,
      '---\n',
    ].join('\n');
    await fs.appendFile(LOG_FILE, entry, { encoding: 'utf8' });
  } catch (error) {
    console.warn('Não foi possível registrar o prompt da OpenAI:', error);
  }
}

function getOpenAIClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY é obrigatório. Defina-o no ambiente antes de iniciar o servidor.');
  }

  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

const TEST_LABELS = {
  'disc-insight': 'DISC',
  'multiple-intelligences': 'Inteligências Múltiplas',
  'riasec': 'RIASEC',
  'archetypes': 'Arquétipos',
};

function formatUserData(userData = {}) {
  if (!userData || typeof userData !== 'object') {
    return 'Dados de participante indisponíveis.';
  }

  const normalized = {
    nome: userData.nomeCompleto,
    idade: userData.idade ? `${userData.idade} anos` : undefined,
    cidade: userData.cidadeEstado,
    email: userData.email,
    escolaridade: userData.nivelEscolaridade,
    areaEstudo: userData.areaEstudo,
    situacaoProfissional: userData.situacaoProfissional,
    ocupacao: userData.ocupacaoAtual,
  };

  const fields = Object.entries(normalized)
    .filter(([, value]) => value && String(value).trim() !== '')
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`);

  if (Array.isArray(userData.areasInteresse) && userData.areasInteresse.length > 0) {
    fields.push(`interesses: ${userData.areasInteresse.join(', ')}`);
  }

  if (Array.isArray(userData.objetivosCarreira) && userData.objetivosCarreira.length > 0) {
    fields.push(`objetivos: ${userData.objetivosCarreira.join(', ')}`);
  }

  return fields.length > 0 ? fields.join(' | ') : 'Dados de participante indisponíveis.';
}

function formatTestResults(key, data = {}) {
  if (!data || typeof data !== 'object') {
    return `${key}: sem resultados.`;
  }

  const label = TEST_LABELS[key] || key;
  const { results, summary, highlights } = data;
  const scorePairs = [];

  if (results && typeof results === 'object') {
    const sortable = Object.entries(results)
      .filter(([, value]) => typeof value === 'number')
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    sortable.forEach(([metric, value]) => {
      scorePairs.push(`${metric}:${Math.round(value)}`);
    });
  }

  const fragments = [];

  if (scorePairs.length > 0) {
    fragments.push(`top=${scorePairs.join(', ')}`);
  }

  if (Array.isArray(highlights) && highlights.length > 0) {
    fragments.push(`destaques=${highlights.slice(0, 3).join(' | ')}`);
  } else if (typeof summary === 'string' && summary.trim() !== '') {
    fragments.push(`resumo=${summary.trim()}`);
  }

  if (fragments.length === 0) {
    fragments.push('sem detalhes adicionais');
  }

  return `${label}: ${fragments.join(' | ')}`;
}

function buildDataPrompt(userData = {}, tests = {}) {
  const participantLine = formatUserData(userData);

  const testLines = Object.entries(tests)
    .map(([key, data]) => `- ${formatTestResults(key, data)}`)
    .join('\n');

  return `Participante: ${participantLine}\nTestes:\n${testLines || '- nenhum teste fornecido'}`;
}

/**
 * Extrai valores dos testes para uso nos SVGs
 * Retorna valores numéricos e o arquétipo principal para serem usados na geração dos gráficos
 */
function extractTestValuesForSVG(tests = {}) {
  const values = {
    disc: { D: 0, I: 0, S: 0, C: 0 },
    intelligences: {},
    riasec: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    archetype: ''
  };

  // DISC - extrai valores percentuais (0-100)
  if (tests['disc-insight']?.results) {
    const discResults = tests['disc-insight'].results;
    values.disc.D = Math.round(discResults.D || discResults.d || 0);
    values.disc.I = Math.round(discResults.I || discResults.i || 0);
    values.disc.S = Math.round(discResults.S || discResults.s || 0);
    values.disc.C = Math.round(discResults.C || discResults.c || 0);
  }

  // Múltiplas Inteligências - extrai todas as inteligências
  if (tests['multiple-intelligences']?.results) {
    const intResults = tests['multiple-intelligences'].results;
    Object.keys(intResults).forEach(key => {
      const val = intResults[key];
      if (typeof val === 'number') {
        values.intelligences[key] = Math.round(val);
      }
    });
  }

  // RIASEC - extrai valores percentuais (0-100)
  if (tests['riasec']?.results) {
    const riasecResults = tests['riasec'].results;
    values.riasec.R = Math.round(riasecResults.R || riasecResults.Realista || 0);
    values.riasec.I = Math.round(riasecResults.I || riasecResults.Investigativo || 0);
    values.riasec.A = Math.round(riasecResults.A || riasecResults.Artistico || riasecResults.Artístico || 0);
    values.riasec.S = Math.round(riasecResults.S || riasecResults.Social || 0);
    values.riasec.E = Math.round(riasecResults.E || riasecResults.Empreendedor || 0);
    values.riasec.C = Math.round(riasecResults.C || riasecResults.Convencional || 0);
  }

  // Arquétipo principal - encontra o arquétipo com maior pontuação
  if (tests['archetypes']?.results) {
    const archetypeResults = tests['archetypes'].results;
    if (typeof archetypeResults === 'object' && archetypeResults !== null) {
      const sorted = Object.entries(archetypeResults)
        .filter(([, value]) => typeof value === 'number')
        .sort((a, b) => b[1] - a[1]);
      if (sorted.length > 0) {
        values.archetype = String(sorted[0][0]);
      }
    }
  }

  return values;
}

export async function generateReportNarrative(userData, tests) {
  try {
    const openai = getOpenAIClient();
    const prompt = buildDataPrompt(userData, tests);
    await persistPrompt(prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      max_tokens: 950,
      messages: [
        {
          role: 'system',
          content: [
            'Você é consultor de carreira.',
            'Produza relatório com markdown simples (## títulos, **destaques**, listas curtas).',
            'Estrutura obrigatória: Introdução calorosa (~80 palavras); Destaques em até 4 bullets; Seções individuais por teste (mesma ordem fornecida, 2 parágrafos curtos cada); Recomendações práticas (até 5 bullets); Encerramento motivador (1 parágrafo).',
            'Limite total: 450-550 palavras. Evite repetir informações e não use tabelas.',
          ].join(' '),
        },
        { role: 'user', content: prompt }
      ],
    });

    const message = completion.choices?.[0]?.message?.content;

    if (!message) {
      throw new Error('Resposta vazia do modelo OpenAI.');
    }

    return message;
  } catch (error) {
    console.error('Erro ao gerar narrativa com OpenAI:', error);
    throw error;
  }
}

/**
 * Gera relatório completo com estrutura de jornada para o PDF
 * Esta função é usada apenas no PDF, não no relatório exibido na tela
 */
export async function generateCompleteReportNarrative(userData, tests) {
  try {
    const openai = getOpenAIClient();
    const prompt = buildDataPrompt(userData, tests);
    const svgValues = extractTestValuesForSVG(tests);
    await persistPrompt(`COMPLETE REPORT FOR PDF\n${prompt}`);

    // Constrói o prompt com valores SVG para referência
    const enhancedPrompt = `${prompt}\n\nValores para SVGs:\n` +
      `DISC: D=${svgValues.disc.D}, I=${svgValues.disc.I}, S=${svgValues.disc.S}, C=${svgValues.disc.C}\n` +
      `RIASEC: R=${svgValues.riasec.R}, I=${svgValues.riasec.I}, A=${svgValues.riasec.A}, S=${svgValues.riasec.S}, E=${svgValues.riasec.E}, C=${svgValues.riasec.C}\n` +
      `Arquétipo Principal: ${svgValues.archetype || 'N/A'}\n` +
      `Inteligências: ${Object.entries(svgValues.intelligences).map(([k, v]) => `${k}=${v}`).join(', ') || 'N/A'}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: `Você é um consultor de carreira e designer de experiências interativas atuando na plataforma TRAJETÓRIA.

Sua tarefa é gerar um relatório vocacional completo e visualmente estruturado com base nos testes aplicados (DISC, Múltiplas Inteligências, RIASEC e Arquétipos) e nas informações de anamnese fornecidas pelo usuário.

O relatório deve unir análise psicológica, design visual e narrativa inspiradora, apresentando o resultado como um roadmap de autoconhecimento — uma jornada com miras, setas e caminhos tracejados que simbolizam o direcionamento e o crescimento pessoal.

🎯 OBJETIVO
Gerar um relatório digital em markdown (450–550 palavras), com:
• Linguagem empática e motivacional.
• Estrutura de "jornada" (roadmap vocacional).
• Três sugestões de carreira baseadas na combinação dos resultados e da anamnese.

📘 ESTRUTURA OBRIGATÓRIA DO RELATÓRIO:

1. Introdução — "O Início da Jornada" (~80 palavras)
Apresente o relatório como o mapa de autoconhecimento do usuário, simbolizando o início de sua trajetória pessoal e profissional. Conecte o conceito de caminho, direção e propósito. Mencione brevemente que os resultados foram obtidos a partir de testes psicológicos validados e da análise da anamnese, que orientam o jovem sobre suas potencialidades e caminhos de carreira.

2. Destaques da Jornada (até 4 bullets)
Mostre os pontos principais da análise geral:
• 🧭 Direção: o que guia o usuário.
• 🎯 Alvo: suas forças e vocações naturais.
• 🚀 Impulso: onde há maior potencial de desenvolvimento.
• 🌱 Caminho: oportunidades para crescer com propósito.

3. Etapas da Jornada — Seções Individuais (2 parágrafos por teste)

Para DISC — "O Estilo de Navegação":
Explique o perfil comportamental (D, I, S, C) como se fosse a forma com que o usuário conduz seu "veículo profissional". Interprete a predominância dos traços com metáforas de direção e liderança.

Para Múltiplas Inteligências — "O Terreno de Habilidades":
Descreva as principais inteligências identificadas (lógica, linguística, espacial, interpessoal etc.) e como elas moldam o modo como o usuário aprende e age no mundo. Mostre como essas inteligências são os "terrenos férteis" por onde o potencial pode florescer.

Para RIASEC — "O Mapa das Possibilidades":
Analise as seis dimensões (Realista, Investigativo, Artístico, Social, Empreendedor e Convencional). Mostre em quais ambientes o usuário tende a se destacar — com pessoas, ideias, dados ou práticas — e como isso guia sua rota profissional.

Para Arquétipos — "A Essência do Caminhante":
Descreva o arquétipo predominante e o que ele representa em termos de motivação, propósito e comportamento profissional. Traga uma reflexão simbólica: "qual é a história que o usuário está escrevendo?"

4. Rotas de Ação (Recomendações Práticas — até 5 bullets)
Apresente orientações personalizadas para o usuário aplicar seus resultados:
• 🔭 Identifique oportunidades de aprendizado alinhadas ao seu perfil.
• 🧭 Experimente áreas que unam propósito e estabilidade.
• 🚀 Desenvolva competências complementares ao seu estilo DISC.
• 🎯 Busque feedbacks para ajustar sua direção profissional.
• 🌱 Invista em projetos que expressem suas inteligências múltiplas.

5. Três Caminhos Possíveis (Sugestões de Carreira)
Com base na combinação dos resultados e na anamnese, apresente 3 opções de carreira viáveis, cada uma com um breve resumo (3 linhas) explicando:
• Por que combina com o perfil psicológico e comportamental.
• Quais habilidades e inteligências ela aproveita.
• Que tipo de ambiente profissional seria mais adequado.

6. Encerramento — "O Destino é o Caminho" (1 parágrafo)
Finalize com uma mensagem inspiradora, reforçando que o propósito da TRAJETÓRIA é ajudar o jovem a encontrar direção e significado. O relatório não representa um ponto final, mas o início de um percurso consciente rumo a um futuro alinhado à sua essência.
Encerrar obrigatoriamente com a frase: "A sua trajetória não é sobre o ponto de chegada — é sobre cada passo consciente no caminho."

IMPORTANTE:
- Use markdown simples (## títulos, **destaques**, listas).
- NÃO inclua SVGs ou código HTML no texto.
- Limite total: 450-550 palavras.
- Linguagem empática, motivacional e inspiradora.
- Use metáforas de jornada, caminho, direção e roadmap.`
        },
        { role: 'user', content: enhancedPrompt }
      ],
    });

    const message = completion.choices?.[0]?.message?.content;

    if (!message) {
      throw new Error('Resposta vazia do modelo OpenAI.');
    }

    return message;
  } catch (error) {
    console.error('Erro ao gerar relatório completo para PDF:', error);
    throw error;
  }
}

export async function generateLifeRoadmap(userData, tests) {
  try {
    const openai = getOpenAIClient();
    const prompt = buildDataPrompt(userData, tests);
    await persistPrompt(`ROADMAP\n${prompt}`);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.5,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: [
            'Você é mentor de carreira e desenvolvimento pessoal.',
            'Crie um roteiro de vida alinhado aos interesses e resultados apresentados.',
            'Responda exclusivamente em JSON válido, sem blocos de código nem explicações.',
            'Estrutura JSON obrigatória: { "vision": string, "phases": [ { "title": string, "timeframe": string, "focus": string, "steps": [string] } ], "habits": [string], "support": [string], "finalMessage": string }.',
            'Inclua entre 3 e 4 fases ordenadas do curto ao longo prazo. Limite cada campo a 30 palavras.',
          ].join(' '),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const message = completion.choices?.[0]?.message?.content;
    if (!message) {
      throw new Error('Resposta vazia do modelo ao gerar roadmap.');
    }

    const trimmed = message.trim();
    try {
      const parsed = JSON.parse(trimmed);
      const sanitized = {
        vision: typeof parsed.vision === 'string' ? parsed.vision : '',
        phases: Array.isArray(parsed.phases) ? parsed.phases.map((phase) => ({
          title: typeof phase?.title === 'string' ? phase.title : '',
          timeframe: typeof phase?.timeframe === 'string' ? phase.timeframe : '',
          focus: typeof phase?.focus === 'string' ? phase.focus : '',
          steps: Array.isArray(phase?.steps) ? phase.steps.filter((s) => typeof s === 'string') : [],
        })).filter((phase) => phase.title || phase.focus || phase.steps.length > 0) : [],
        habits: Array.isArray(parsed.habits) ? parsed.habits.filter((item) => typeof item === 'string') : [],
        support: Array.isArray(parsed.support) ? parsed.support.filter((item) => typeof item === 'string') : [],
        finalMessage: typeof parsed.finalMessage === 'string' ? parsed.finalMessage : '',
      };
      return sanitized;
    } catch (parseError) {
      console.error('Falha ao analisar JSON do roadmap:', parseError, trimmed);
      throw new Error('Não foi possível interpretar o roadmap gerado.');
    }
  } catch (error) {
    console.error('Erro ao gerar roadmap com OpenAI:', error);
    throw error;
  }
}