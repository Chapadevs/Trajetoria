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
  en: {
    'disc-insight': 'DISC',
    'multiple-intelligences': 'Multiple Intelligences',
    'riasec': 'RIASEC',
    'archetypes': 'Archetypes',
  },
  pt: {
    'disc-insight': 'DISC',
    'multiple-intelligences': 'Inteligências Múltiplas',
    'riasec': 'RIASEC',
    'archetypes': 'Arquétipos',
  },
};

function normalizeLang(lang) {
  return lang === 'pt' ? 'pt' : 'en';
}

function formatUserData(userData = {}, lang = 'en') {
  if (!userData || typeof userData !== 'object') {
    return lang === 'en' ? 'Participant data unavailable.' : 'Dados de participante indisponíveis.';
  }
  const isEn = lang === 'en';
  const keys = isEn
    ? { nome: 'name', idade: 'age', cidade: 'city', email: 'email', escolaridade: 'education', areaEstudo: 'studyArea', situacaoProfissional: 'professionalSituation', ocupacao: 'occupation', interesses: 'interests', objetivos: 'goals' }
    : { nome: 'nome', idade: 'idade', cidade: 'cidade', email: 'email', escolaridade: 'escolaridade', areaEstudo: 'areaEstudo', situacaoProfissional: 'situacaoProfissional', ocupacao: 'ocupacao', interesses: 'interesses', objetivos: 'objetivos' };

  const normalized = {
    [keys.nome]: userData.nomeCompleto,
    [keys.idade]: userData.idade ? (isEn ? `${userData.idade} years` : `${userData.idade} anos`) : undefined,
    [keys.cidade]: userData.cidadeEstado,
    [keys.email]: userData.email,
    [keys.escolaridade]: userData.nivelEscolaridade,
    [keys.areaEstudo]: userData.areaEstudo,
    [keys.situacaoProfissional]: userData.situacaoProfissional,
    [keys.ocupacao]: userData.ocupacaoAtual,
  };

  const fields = Object.entries(normalized)
    .filter(([, value]) => value && String(value).trim() !== '')
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`);

  if (Array.isArray(userData.areasInteresse) && userData.areasInteresse.length > 0) {
    fields.push(`${keys.interesses}: ${userData.areasInteresse.join(', ')}`);
  }
  if (Array.isArray(userData.objetivosCarreira) && userData.objetivosCarreira.length > 0) {
    fields.push(`${keys.objetivos}: ${userData.objetivosCarreira.join(', ')}`);
  }

  const empty = isEn ? 'Participant data unavailable.' : 'Dados de participante indisponíveis.';
  return fields.length > 0 ? fields.join(' | ') : empty;
}

function formatTestResults(key, data = {}, lang = 'en') {
  if (!data || typeof data !== 'object') {
    return lang === 'en' ? `${key}: no results.` : `${key}: sem resultados.`;
  }
  const labels = TEST_LABELS[lang === 'en' ? 'en' : 'pt'] || TEST_LABELS.en;
  const label = labels[key] || key;
  const { results, summary, highlights } = data;
  const scorePairs = [];
  if (results && typeof results === 'object') {
    const sortable = Object.entries(results)
      .filter(([, value]) => typeof value === 'number')
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
    sortable.forEach(([metric, value]) => scorePairs.push(`${metric}:${Math.round(value)}`));
  }
  const fragments = [];
  if (scorePairs.length > 0) fragments.push(`top=${scorePairs.join(', ')}`);
  if (Array.isArray(highlights) && highlights.length > 0) {
    fragments.push(lang === 'en' ? `highlights=${highlights.slice(0, 3).join(' | ')}` : `destaques=${highlights.slice(0, 3).join(' | ')}`);
  } else if (typeof summary === 'string' && summary.trim() !== '') {
    fragments.push(lang === 'en' ? `summary=${summary.trim()}` : `resumo=${summary.trim()}`);
  }
  if (fragments.length === 0) {
    fragments.push(lang === 'en' ? 'no additional details' : 'sem detalhes adicionais');
  }
  return `${label}: ${fragments.join(' | ')}`;
}

function buildDataPrompt(userData = {}, tests = {}, lang = 'en') {
  const participantLine = formatUserData(userData, lang);
  const testLines = Object.entries(tests)
    .map(([key, data]) => `- ${formatTestResults(key, data, lang)}`)
    .join('\n');
  const partLabel = lang === 'en' ? 'Participant' : 'Participante';
  const testsLabel = lang === 'en' ? 'Assessments' : 'Testes';
  const none = lang === 'en' ? '- no assessments provided' : '- nenhum teste fornecido';
  return `${partLabel}: ${participantLine}\n${testsLabel}:\n${testLines || none}`;
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

export async function generateReportNarrative(userData, tests, lang = 'en') {
  try {
    const openai = getOpenAIClient();
    const normalizedLang = normalizeLang(lang);
    const prompt = buildDataPrompt(userData, tests, normalizedLang);
    await persistPrompt(prompt);

    const systemContent = normalizedLang === 'en'
      ? [
          'You are a career consultant.',
          'Produce a report with simple markdown (## headings, **highlights**, short lists).',
          'Required structure: Warm introduction (~80 words); Highlights in up to 4 bullets; Individual sections per assessment (same order as provided, 2 short paragraphs each); Practical recommendations (up to 5 bullets); Motivational closing (1 paragraph).',
          'Total limit: 450-550 words. Avoid repeating information and do not use tables. Write entirely in English.',
          'If any provided user data, goals, interests, or summaries are in Portuguese, translate them to English before writing. The final output must be English only.',
        ].join(' ')
      : [
          'Você é consultor de carreira.',
          'Produza relatório com markdown simples (## títulos, **destaques**, listas curtas).',
          'Estrutura obrigatória: Introdução calorosa (~80 palavras); Destaques em até 4 bullets; Seções individuais por teste (mesma ordem fornecida, 2 parágrafos curtos cada); Recomendações práticas (até 5 bullets); Encerramento motivador (1 parágrafo).',
          'Limite total: 450-550 palavras. Evite repetir informações e não use tabelas.',
          'Se algum dado do usuário, objetivos, interesses ou resumos vierem em inglês, traduza para português antes de escrever. A saída final deve ser em português apenas.',
        ].join(' ');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      max_tokens: 950,
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: prompt }
      ],
    });

    const message = completion.choices?.[0]?.message?.content;
    if (!message) {
      throw new Error(lang === 'en' ? 'Empty response from OpenAI model.' : 'Resposta vazia do modelo OpenAI.');
    }
    return message;
  } catch (error) {
    console.error('Erro ao gerar narrativa com OpenAI:', error);
    throw error;
  }
}

const COMPLETE_REPORT_SYSTEM_EN = `You are an experienced and inspiring career consultant for the TRAJETÓRIA platform. Your role is to turn psychological assessment data into a practical, motivating roadmap for professional life.

GENERATE A UNIQUE, PERSONALIZED TEXT (600-800 words) based EXCLUSIVELY on the assessment results provided. Be specific, practical and inspiring. Avoid generalizations. Write ENTIRELY in English.
If any provided user data, goals, interests, or summaries are in Portuguese, translate them to English before writing. The final output must be English only.

EXACT RESPONSE FORMAT (copy this structure exactly):

The Destination is the Path

[Write here 1 personal, inspiring paragraph of 120-150 words. Use the person's first name. Mention SPECIFIC aspects of the assessments with concrete values. Example: "Erik, your DISC profile shows 45% Dominance and 30% Influence, indicating a unique combination of assertive leadership and the ability to influence people. Your multiple intelligences stand out especially in bodily (68%) and interpersonal (72%) skills, meaning you learn by doing and connect naturally with others. Your RIASEC profile points to interests in Enterprising (40%) and Social (35%) areas, suggesting you seek to create impact while working with people."]

TRAJETÓRIA Final Message

[Write here 1 powerful, motivational paragraph of 100-120 words. Base it on the SPECIFIC results. Highlight unique potential and how to turn it into reality. End with an inspiring sentence.]

Next Steps

- [Action 1: Specific to the dominant DISC profile, mentioning the percentage and what to do exactly]
- [Action 2: Specific to main intelligences, mentioning which and how to develop them]
- [Action 3: Specific to RIASEC profile, mentioning types and opportunities]
- [Action 4: Specific to archetype, mentioning which and how to use it]
- [Action 5: Specific to networking, mentoring or development, based on full profile]

CRITICAL RULES:
1. INCLUDE the titles "The Destination is the Path", "TRAJETÓRIA Final Message" and "Next Steps" exactly as shown above
2. Do NOT use markdown (##, ###, **, etc.) - plain text only
3. Leave a blank line between each title and its content
4. Be SPECIFIC - mention values, percentages and concrete assessment characteristics
5. Personalize EVERYTHING based on real assessment data
6. Use direct, modern, inspiring language. Write in English only.
7. Actions must be actionable and practical. Do not use generic templates.`;

const COMPLETE_REPORT_SYSTEM_PT = `Você é um consultor de carreira experiente e inspirador da plataforma TRAJETÓRIA. Seu papel é transformar dados de testes psicológicos em um roteiro prático e motivador para a vida profissional.

GERE UM TEXTO ÚNICO E PERSONALIZADO (600-800 palavras) baseado EXCLUSIVAMENTE nos resultados dos testes fornecidos. Seja específico, prático e inspirador. Evite generalizações.
Se algum dado do usuário, objetivos, interesses ou resumos vierem em inglês, traduza para português antes de escrever. A saída final deve ser em português apenas.

FORMATO EXATO DA RESPOSTA (COPIE ESTA ESTRUTURA EXATAMENTE):

O Destino é o Caminho

[Escreva aqui 1 parágrafo pessoal e inspirador de 120-150 palavras. Use o primeiro nome da pessoa. Mencione aspectos ESPECÍFICOS dos testes com valores concretos.]

Mensagem Final da TRAJETÓRIA

[Escreva aqui 1 parágrafo poderoso e motivacional de 100-120 palavras. Baseie-se nos resultados ESPECÍFICOS.]

Próximos Passos

- [Ação 1: Específica para o perfil DISC dominante]
- [Ação 2: Específica para as inteligências principais]
- [Ação 3: Específica para o perfil RIASEC]
- [Ação 4: Específica para o arquétipo]
- [Ação 5: Específica para networking, mentoria ou desenvolvimento]

REGRAS CRÍTICAS: INCLUA os títulos exatamente como mostrado. NÃO use markdown. Seja ESPECÍFICO. Personalize TUDO. Escreva em português.`;

/**
 * Gera relatório completo com estrutura de jornada para o PDF
 * @param {string} lang - 'en' or 'pt'
 */
export async function generateCompleteReportNarrative(userData, tests, lang = 'en') {
  try {
    const openai = getOpenAIClient();
    const normalizedLang = normalizeLang(lang);
    const prompt = buildDataPrompt(userData, tests, normalizedLang);
    const svgValues = extractTestValuesForSVG(tests);
    await persistPrompt(`COMPLETE REPORT FOR PDF\n${prompt}`);

    const valuesLabel = normalizedLang === 'en' ? 'Values for reference' : 'Valores para SVGs';
    const enhancedPrompt = `${prompt}\n\n${valuesLabel}:\n` +
      `DISC: D=${svgValues.disc.D}, I=${svgValues.disc.I}, S=${svgValues.disc.S}, C=${svgValues.disc.C}\n` +
      `RIASEC: R=${svgValues.riasec.R}, I=${svgValues.riasec.I}, A=${svgValues.riasec.A}, S=${svgValues.riasec.S}, E=${svgValues.riasec.E}, C=${svgValues.riasec.C}\n` +
      (normalizedLang === 'en' ? `Main Archetype: ${svgValues.archetype || 'N/A'}\n` : `Arquétipo Principal: ${svgValues.archetype || 'N/A'}\n`) +
      (normalizedLang === 'en' ? `Intelligences: ` : `Inteligências: `) + `${Object.entries(svgValues.intelligences).map(([k, v]) => `${k}=${v}`).join(', ') || 'N/A'}`;

    const systemContent = normalizedLang === 'en' ? COMPLETE_REPORT_SYSTEM_EN : COMPLETE_REPORT_SYSTEM_PT;
    const userTip = normalizedLang === 'en'
      ? `\n\nIMPORTANT: Analyze the numerical values and career goals from the anamnesis. Generate a fully personalized, practical and inspiring text based on this specific data. Do NOT use a generic template - create something unique for this person. Write in English only.`
      : `\n\nIMPORTANTE: Analise os valores numéricos dos testes e os objetivos de carreira mencionados na anamnese. Gere um texto completamente personalizado, prático e inspirador baseado nestes dados específicos. NÃO use template genérico - crie algo único para esta pessoa. Escreva somente em português.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.8,
      max_tokens: 1800,
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: enhancedPrompt + userTip }
      ],
    });

    const message = completion.choices?.[0]?.message?.content;
    if (!message) {
      throw new Error(lang === 'en' ? 'Empty response from OpenAI model.' : 'Resposta vazia do modelo OpenAI.');
    }
    return message;
  } catch (error) {
    console.error('Erro ao gerar relatório completo para PDF:', error);
    throw error;
  }
}

export async function generateLifeRoadmap(userData, tests, lang = 'en') {
  try {
    const openai = getOpenAIClient();
    const normalizedLang = normalizeLang(lang);
    const prompt = buildDataPrompt(userData, tests, normalizedLang);
    await persistPrompt(`ROADMAP\n${prompt}`);

    const systemContent = normalizedLang === 'en'
      ? [
          'You are a career and personal development mentor.',
          'Create a life roadmap aligned with the interests and results presented.',
          'Respond exclusively with valid JSON, no code blocks or explanations.',
          'Required JSON structure: { "vision": string, "phases": [ { "title": string, "timeframe": string, "focus": string, "steps": [string] } ], "habits": [string], "support": [string], "finalMessage": string }.',
          'Include 3 to 4 phases ordered from short to long term. Limit each field to 30 words. Write all text content in English.',
          'If any provided user data, goals, interests, or summaries are in Portuguese, translate them to English before writing. Output must be English only.',
        ].join(' ')
      : [
          'Você é mentor de carreira e desenvolvimento pessoal.',
          'Crie um roteiro de vida alinhado aos interesses e resultados apresentados.',
          'Responda exclusivamente em JSON válido, sem blocos de código nem explicações.',
          'Estrutura JSON obrigatória: { "vision": string, "phases": [ { "title": string, "timeframe": string, "focus": string, "steps": [string] } ], "habits": [string], "support": [string], "finalMessage": string }.',
          'Inclua entre 3 e 4 fases ordenadas do curto ao longo prazo. Limite cada campo a 30 palavras.',
          'Se algum dado do usuário, objetivos, interesses ou resumos vierem em inglês, traduza para português antes de escrever. A saída final deve ser em português apenas.',
        ].join(' ');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.5,
      max_tokens: 700,
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: prompt },
      ],
    });

    const message = completion.choices?.[0]?.message?.content;
    if (!message) {
      throw new Error(lang === 'en' ? 'Empty response from model when generating roadmap.' : 'Resposta vazia do modelo ao gerar roadmap.');
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