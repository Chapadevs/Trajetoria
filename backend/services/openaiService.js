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