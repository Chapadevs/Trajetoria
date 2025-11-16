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
      temperature: 0.8,
      max_tokens: 1800,
      messages: [
        {
          role: 'system',
          content: `Você é um consultor de carreira experiente e inspirador da plataforma TRAJETÓRIA. Seu papel é transformar dados de testes psicológicos em um roteiro prático e motivador para a vida profissional.

GERE UM TEXTO ÚNICO E PERSONALIZADO (600-800 palavras) baseado EXCLUSIVAMENTE nos resultados dos testes fornecidos. Seja específico, prático e inspirador. Evite generalizações.

FORMATO EXATO DA RESPOSTA (COPIE ESTA ESTRUTURA EXATAMENTE):

O Destino é o Caminho

[Escreva aqui 1 parágrafo pessoal e inspirador de 120-150 palavras. Use o primeiro nome da pessoa. Mencione aspectos ESPECÍFICOS dos testes com valores concretos. Exemplo: "Erik, seu perfil DISC mostra 45% de Dominância e 30% de Influência, indicando que você tem uma combinação única de liderança assertiva e capacidade de influenciar pessoas. Suas inteligências múltiplas destacam-se especialmente em habilidades corporais (68%) e interpessoais (72%), o que significa que você aprende fazendo e se conecta naturalmente com outros. Seu perfil RIASEC aponta para interesses em áreas Empreendedoras (40%) e Sociais (35%), sugerindo que você busca criar impacto enquanto trabalha com pessoas."]

Mensagem Final da TRAJETÓRIA

[Escreva aqui 1 parágrafo poderoso e motivacional de 100-120 palavras. Baseie-se nos resultados ESPECÍFICOS. Destaque o potencial único e como transformar em realidade. Termine com uma frase inspiradora. Exemplo: "Erik, seus resultados revelam um perfil de líder natural com forte capacidade de conexão humana. Você tem todas as ferramentas para construir uma carreira que una sua paixão por resultados com seu talento para inspirar equipes. O caminho está claro: use sua Dominância para tomar decisões estratégicas, sua Influência para mobilizar pessoas e suas inteligências corporais e interpessoais para criar experiências transformadoras. Sua trajetória não é sobre chegar a um destino - é sobre cada passo consciente que você dá transformando desafios em oportunidades de crescimento."]

Próximos Passos

- [Ação 1: Específica para o perfil DISC dominante, mencionando o percentual e o que fazer exatamente]
- [Ação 2: Específica para as inteligências principais, mencionando quais e como desenvolvê-las]
- [Ação 3: Específica para o perfil RIASEC, mencionando os tipos e oportunidades]
- [Ação 4: Específica para o arquétipo, mencionando qual e como usar]
- [Ação 5: Específica para networking, mentoria ou desenvolvimento, baseada no perfil completo]

REGRAS CRÍTICAS:
1. INCLUA os títulos "O Destino é o Caminho", "Mensagem Final da TRAJETÓRIA" e "Próximos Passos" exatamente como mostrado acima
2. NÃO use markdown (##, ###, **, etc.) - apenas texto puro
3. Use os títulos exatamente como mostrado (sem markdown, sem dois pontos após "Próximos Passos")
4. Deixe uma linha em branco entre o título e o conteúdo de cada seção
5. Seja ESPECÍFICO - mencione valores, percentuais e características concretas dos testes
6. Personalize TUDO baseado nos dados reais dos testes
7. Use linguagem direta, moderna e inspiradora
8. Evite repetições e textos vazios
9. Cada seção deve ter SUBSTÂNCIA - não apenas palavras bonitas
10. As ações devem ser acionáveis e práticas

IMPORTANTE: Analise os valores numéricos dos testes fornecidos e gere recomendações específicas baseadas nesses números e perfis identificados. NÃO use templates genéricos.`
        },
        { 
          role: 'user', 
          content: `${enhancedPrompt}\n\nIMPORTANTE: Analise os valores numéricos dos testes e os objetivos de carreira mencionados na anamnese. Gere um texto completamente personalizado, prático e inspirador baseado nestes dados específicos. NÃO use template genérico - crie algo único para esta pessoa.`
        }
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