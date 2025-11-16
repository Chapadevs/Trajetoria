import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// Replace characters not encodable by WinAnsi (used by StandardFonts) with safe equivalents
function sanitizeForWinAnsi(text) {
  if (text == null) return ''
  return String(text)
    // normalize newlines to spaces (pdf-lib drawText does not handle raw newlines)
    .replace(/[\r\n]+/g, ' ')
    // various dashes (figure, en, em, non-breaking hyphen) -> hyphen
    .replace(/[\u2010-\u2015]/g, '-')
    // bullet -> asterisk
    .replace(/\u2022/g, '*')
    // non-breaking space -> regular space
    .replace(/\u00A0/g, ' ')
    // smart quotes -> ascii quotes
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
}

/**
 * Prepend a full-bleed cover image as the first page of an existing PDF (base64).
 * - coverImageUrl: path/url to an image (jpg or png). In Vite, importing an asset returns a URL we can fetch.
 * - originalPdfBase64: base64 string of the existing PDF (no data URL prefix).
 * Returns a base64 string (without data URL prefix).
 */
export async function prependCoverPage(coverImageUrl, originalPdfBase64) {
  if (!originalPdfBase64) {
    throw new Error('PDF original inválido para compor a capa.')
  }

  // Decode original PDF
  const originalPdfBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalPdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true })

  // Create new PDF and copy pages from original
  const composedPdf = await PDFDocument.create()
  const [width, height] = [595.28, 841.89] // A4 portrait in points

  // Embed cover image
  const imgResp = await fetch(coverImageUrl)
  const imgBytes = new Uint8Array(await imgResp.arrayBuffer())

  let embeddedImage
  let drawImage
  // Try detect PNG vs JPG by signature
  const isPng = imgBytes[0] === 0x89 && imgBytes[1] === 0x50
  if (isPng) {
    embeddedImage = await composedPdf.embedPng(imgBytes)
  } else {
    embeddedImage = await composedPdf.embedJpg(imgBytes)
  }

  const coverPage = composedPdf.addPage([width, height])
  const imgWidth = embeddedImage.width
  const imgHeight = embeddedImage.height
  // Scale to cover the full page while preserving aspect ratio
  const scale = Math.max(width / imgWidth, height / imgHeight)
  const drawWidth = imgWidth * scale
  const drawHeight = imgHeight * scale
  const x = (width - drawWidth) / 2
  const y = (height - drawHeight) / 2

  coverPage.drawImage(embeddedImage, { x, y, width: drawWidth, height: drawHeight })

  // DO NOT copy original pages - we only want our custom pages

  const composedBytes = await composedPdf.save()
  // Encode to base64 (no prefix)
  let binary = ''
  composedBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose a new PDF: Cover page + Summary page + original PDF pages.
 */
export async function prependCoverAndSummary(coverImageUrl, originalPdfBase64) {
  if (!originalPdfBase64) {
    throw new Error('PDF original inválido para compor a capa e sumário.')
  }

  const originalPdfBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalPdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true })

  const composedPdf = await PDFDocument.create()
  const pageSize = [595.28, 841.89] // A4 portrait
  const [width, height] = pageSize

  // COVER
  {
    const imgResp = await fetch(coverImageUrl)
    const imgBytes = new Uint8Array(await imgResp.arrayBuffer())
    const isPng = imgBytes[0] === 0x89 && imgBytes[1] === 0x50
    const embeddedImage = isPng ? await composedPdf.embedPng(imgBytes) : await composedPdf.embedJpg(imgBytes)
    const coverPage = composedPdf.addPage(pageSize)
    const imgWidth = embeddedImage.width
    const imgHeight = embeddedImage.height
    const scale = Math.max(width / imgWidth, height / imgHeight)
    const drawWidth = imgWidth * scale
    const drawHeight = imgHeight * scale
    const x = (width - drawWidth) / 2
    const y = (height - drawHeight) / 2
    coverPage.drawImage(embeddedImage, { x, y, width: drawWidth, height: drawHeight })
  }

  // SUMMARY - use SUMARIO.jpg image
  {
    let usedImage = false
    try {
      const summaryUrl = new URL('../assets/SUMARIO.jpg', import.meta.url).href
      const resp = await fetch(summaryUrl)
      if (resp.ok) {
        const imgBytes = new Uint8Array(await resp.arrayBuffer())
        const isPng = imgBytes[0] === 0x89 && imgBytes[1] === 0x50
        const embedded = isPng ? await composedPdf.embedPng(imgBytes) : await composedPdf.embedJpg(imgBytes)
        const page = composedPdf.addPage(pageSize)
        const scale = Math.max(width / embedded.width, height / embedded.height)
        const drawWidth = embedded.width * scale
        const drawHeight = embedded.height * scale
        const x = (width - drawWidth) / 2
        const y = (height - drawHeight) / 2
        page.drawImage(embedded, { x, y, width: drawWidth, height: drawHeight })
        usedImage = true
      }
    } catch (e) {
      console.warn('Erro ao carregar SUMARIO.jpg:', e)
    }
    if (!usedImage) {
      const page = composedPdf.addPage(pageSize)
      // Colors based on workspace palette
      const bg = rgb(0x41/255, 0x32/255, 0x88/255)      // #413288
      const header = rgb(0x61/255, 0x52/255, 0xBD/255)  // #6152BD
      const textColor = rgb(1, 1, 1)
      page.drawRectangle({ x: 0, y: 0, width, height, color: bg })
      const headerX = 30
      const headerY = height - 120
      const headerW = width - 60
      const headerH = 44
      page.drawRectangle({ x: headerX, y: headerY, width: headerW, height: headerH, color: header, borderRadius: 16 })
      const boldFont = await composedPdf.embedFont(StandardFonts.HelveticaBold)
      const headerText = 'SUMÁRIO'
      const headerFontSize = 18
      const textWidth = boldFont.widthOfTextAtSize(headerText, headerFontSize)
      const headerTextX = headerX + (headerW - textWidth) / 2
      const headerTextY = headerY + (headerH - headerFontSize) / 2 + 6
      page.drawText(sanitizeForWinAnsi(headerText), { x: headerTextX, y: headerTextY, size: headerFontSize, font: boldFont, color: textColor })
    }
  }

  // DO NOT copy original pages - we only want our custom pages

  const composedBytes = await composedPdf.save()
  let binary = ''
  composedBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: Cover + Summary + Anamnese page + original PDF
 * anamneseData: { nomeCompleto, idade, cidadeEstado, email, nivelEscolaridade, areaEstudo, situacaoProfissional, ocupacaoAtual, areasInteresse[], objetivosCarreira[] }
 */
export async function composeWithCoverSummaryAnamnese(coverImageUrl, originalPdfBase64, anamneseData = {}) {
  if (!originalPdfBase64) {
    throw new Error('PDF original inválido para compor as páginas.')
  }
  const originalPdfBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalPdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true })

  const composedPdf = await PDFDocument.create()
  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize

  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)   // #6152BD
  const SECONDARY = rgb(0x92/255, 0x66/255, 0xCC/255) // #9266CC
  const BG_DARK = rgb(0x41/255, 0x32/255, 0x88/255)   // #413288
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const WHITE = rgb(1,1,1)
  const BLACK = rgb(0,0,0)

  const boldFont = await composedPdf.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await composedPdf.embedFont(StandardFonts.Helvetica)

  // 1) COVER + 2) SUMMARY
  const baseWithSummary = await prependCoverAndSummary(coverImageUrl, originalPdfBase64)
  const baseBytes = Uint8Array.from(atob(baseWithSummary), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const basePages = await composedPdf.copyPages(baseDoc, baseDoc.getPageIndices())
  basePages.forEach(p => composedPdf.addPage(p))

  // 3) ANAMNESE PAGE
  const page = composedPdf.addPage(pageSize)
  // background subtle
  page.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  // Title bar
  const title = 'Anamnese - Dados Gerais'
  const titleH = 46
  page.drawRectangle({ x: 30, y: height - 100, width: width - 60, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 16
  const titleWidth = boldFont.widthOfTextAtSize(title, titleSize)
  page.drawText(sanitizeForWinAnsi(title), {
    x: 30 + (width - 60 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: boldFont,
    color: WHITE
  })

  // Cards layout (two columns when possible)
  const card = (x, y, w, h, heading, lines) => {
    page.drawRectangle({ x, y, width: w, height: h, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
    // heading
    page.drawText(sanitizeForWinAnsi(heading), { x: x + 16, y: y + h - 24, size: 12, font: boldFont, color: SLATE_700 })
    // content lines
    let cy = y + h - 44
    lines.forEach((line) => {
      if (!line) return
      page.drawText(sanitizeForWinAnsi(line), { x: x + 16, y: cy, size: 11, font: regularFont, color: BLACK })
      cy -= 16
    })
  }

  const colGap = 16
  const colW = (width - 60 - colGap) / 2
  let cursorY = height - 140

  // Informações pessoais (full width)
  const infoH = 92
  card(30, cursorY - infoH, width - 60, infoH, 'Informações Pessoais', [
    `Nome: ${anamneseData.nomeCompleto || 'Não informado'}`,
    `Idade: ${anamneseData.idade ? `${anamneseData.idade} anos` : '—'}`,
    `Localização: ${anamneseData.cidadeEstado || '—'}`,
    `E-mail: ${anamneseData.email || '—'}`
  ])
  cursorY -= infoH + 12

  // Escolaridade (left), Situação Profissional (right)
  const smallH = 80
  card(30, cursorY - smallH, colW, smallH, 'Escolaridade', [
    anamneseData.nivelEscolaridade || '—',
    anamneseData.areaEstudo ? `Área: ${anamneseData.areaEstudo}` : null
  ])
  card(30 + colW + colGap, cursorY - smallH, colW, smallH, 'Situação Profissional', [
    anamneseData.situacaoProfissional || '—',
    anamneseData.ocupacaoAtual ? `Ocupação: ${anamneseData.ocupacaoAtual}` : null
  ])
  cursorY -= smallH + 12

  // Áreas de Interesse (full width)
  const interests = Array.isArray(anamneseData.areasInteresse) ? anamneseData.areasInteresse : []
  const interestLines = interests.length ? [`${interests.join(' • ')}`] : ['—']
  const interestsH = 64
  card(30, cursorY - interestsH, width - 60, interestsH, 'Áreas de Interesse', interestLines)
  cursorY -= interestsH + 12

  // Objetivos de Carreira (full width)
  const goals = Array.isArray(anamneseData.objetivosCarreira) ? anamneseData.objetivosCarreira : []
  const goalText = goals.length ? goals.join(' • ') : '—'
  const goalsH = 64
  card(30, cursorY - goalsH, width - 60, goalsH, 'Objetivos de Carreira', [goalText])
  cursorY -= goalsH + 12

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await composedPdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: Cover + Summary + Anamnese + DISC + original report
 * discResults: object with keys D, I, S, C as percentages.
 */
export async function composeWithCoverSummaryAnamneseDisc(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}) {
  // First build up to Anamnese
  const base64WithAnamnese = await composeWithCoverSummaryAnamnese(coverImageUrl, originalPdfBase64, anamneseData)

  // Load composed so far to append DISC page
  const baseBytes = Uint8Array.from(atob(base64WithAnamnese), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })

  // Load original to copy final pages after DISC (avoid duplicating again)
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize

  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  // DISC colors to match modal accents
  const COLOR_D = rgb(0xEF/255, 0x44/255, 0x44/255) // red-500
  const COLOR_I = rgb(0xF5/255, 0xA5/255, 0x0A/255) // yellow-500
  const COLOR_S = rgb(0x8B/255, 0x5C/255, 0xF6/255) // purple-500
  const COLOR_C = rgb(0x3B/255, 0x82/255, 0xF6/255) // blue-500

  const discPage = pdf.addPage(pageSize)
  discPage.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  // Title
  const title = 'DISC Insight - Perfil de Personalidade'
  const titleH = 46
  discPage.drawRectangle({ x: 30, y: height - 100, width: width - 60, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 16
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  discPage.drawText(sanitizeForWinAnsi(title), {
    x: 30 + (width - 60 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  // Dominant card
  const entries = [['D','Dominância', COLOR_D], ['I','Influência', COLOR_I], ['S','Estabilidade', COLOR_S], ['C','Conformidade', COLOR_C]]
  const scores = {
    D: Number(discResults.D ?? 0),
    I: Number(discResults.I ?? 0),
    S: Number(discResults.S ?? 0),
    C: Number(discResults.C ?? 0),
  }
  const dominant = entries.reduce((best, curr) => (scores[curr[0]] > scores[best[0]] ? curr : best), entries[0])
  const dominantScore = scores[dominant[0]] || 0

  // Card
  const domX = 30
  const domY = height - 220
  const domW = width - 60
  const domH = 90
  discPage.drawRectangle({ x: domX, y: domY, width: domW, height: domH, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
  // Circle badge
  const badgeSize = 42
  discPage.drawCircle({ x: domX + 24 + badgeSize/2, y: domY + domH - 24 - badgeSize/2, size: badgeSize/2, color: dominant[2] })
  discPage.drawText(sanitizeForWinAnsi(dominant[0]), { x: domX + 24 + badgeSize/2 - 8, y: domY + domH - 24 - badgeSize/2 - 6, size: 18, font: bold, color: WHITE })
  // Title and description
  discPage.drawText(sanitizeForWinAnsi(`Seu Perfil: ${dominant[1]}`), { x: domX + 24 + badgeSize + 12, y: domY + domH - 28, size: 14, font: bold, color: SLATE_700 })
  discPage.drawText(sanitizeForWinAnsi(`${dominantScore}% dominância`), { x: domX + 24 + badgeSize + 12, y: domY + domH - 46, size: 11, font: regular, color: SLATE_700 })

  // Distribution bars
  const barStartY = domY - 20
  const barH = 10
  const barGap = 22
  const barMaxW = domW
  const labelX = 30
  let y = barStartY
  const drawBar = (label, value, color) => {
    const w = Math.max(0, Math.min(100, value)) / 100 * (barMaxW - 120)
    discPage.drawText(sanitizeForWinAnsi(label), { x: labelX, y: y + 2, size: 11, font: bold, color: SLATE_700 })
    discPage.drawRectangle({ x: labelX + 90, y, width: barMaxW - 120, height: barH, color: SLATE_200, borderRadius: 5 })
    discPage.drawRectangle({ x: labelX + 90, y, width: w, height: barH, color, borderRadius: 5 })
    discPage.drawText(sanitizeForWinAnsi(`${value}%`), { x: labelX + 90 + (barMaxW - 120) + 6, y: y + 2, size: 10, font: bold, color: SLATE_700 })
    y -= barGap
  }
  y = barStartY
  drawBar('Dominância (D)', scores.D, COLOR_D)
  drawBar('Influência (I)', scores.I, COLOR_I)
  drawBar('Estabilidade (S)', scores.S, COLOR_S)
  drawBar('Conformidade (C)', scores.C, COLOR_C)

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: Cover + Summary + Anamnese + DISC + Multiple Intelligences + original report
 * miResults: object with keys like 'logica','linguistica','espacial','musical','corporal','interpessoal','intrapessoal','naturalista'
 */
export async function composeWithCoverSummaryAnamneseDiscMI(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}) {
  const base64WithDisc = await composeWithCoverSummaryAnamneseDisc(coverImageUrl, originalPdfBase64, anamneseData, discResults)

  const baseBytes = Uint8Array.from(atob(base64WithDisc), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  const miPage = pdf.addPage(pageSize)
  miPage.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  const title = 'Inteligências Múltiplas'
  const titleH = 46
  miPage.drawRectangle({ x: 30, y: height - 100, width: width - 60, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 16
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  miPage.drawText(sanitizeForWinAnsi(title), {
    x: 30 + (width - 60 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  // Prepare sorted list of intelligences by score
  const keys = ['logica','linguistica','espacial','musical','corporal','interpessoal','intrapessoal','naturalista']
  const labels = {
    logica: 'Lógico-Matemática',
    linguistica: 'Linguística',
    espacial: 'Espacial',
    musical: 'Musical',
    corporal: 'Corporal-Cinestésica',
    interpessoal: 'Interpessoal',
    intrapessoal: 'Intrapessoal',
    naturalista: 'Naturalista'
  }
  const list = keys.map(k => ({ key: k, label: labels[k], value: Number(miResults[k] ?? 0) }))
    .sort((a,b) => b.value - a.value)

  // Top 3 badges
  const top = list.slice(0,3)
  const badgeW = (width - 60 - 20*2) / 3
  const badgeH = 80
  let x = 30
  const y = height - 200
  top.forEach((item, idx) => {
    miPage.drawRectangle({ x, y, width: badgeW, height: badgeH, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
    miPage.drawText(sanitizeForWinAnsi(`#${idx+1} ${item.label}`), { x: x + 14, y: y + badgeH - 26, size: 12, font: bold, color: SLATE_700 })
    miPage.drawText(sanitizeForWinAnsi(`${item.value}%`), { x: x + 14, y: y + 16, size: 18, font: bold, color: SLATE_700 })
    x += badgeW + 20
  })

  // Distribution bars for all
  let barY = y - 24
  const barH = 10
  const barGap = 22
  const barMaxW = width - 60 - 120
  const labelX = 30
  list.forEach(item => {
    const w = Math.max(0, Math.min(100, item.value)) / 100 * barMaxW
    barY -= barGap
    miPage.drawText(sanitizeForWinAnsi(item.label), { x: labelX, y: barY + 2, size: 11, font: bold, color: SLATE_700 })
    miPage.drawRectangle({ x: labelX + 110, y: barY, width: barMaxW, height: barH, color: SLATE_200, borderRadius: 5 })
    miPage.drawRectangle({ x: labelX + 110, y: barY, width: w, height: barH, color: PRIMARY, borderRadius: 5 })
    miPage.drawText(sanitizeForWinAnsi(`${item.value}%`), { x: labelX + 110 + barMaxW + 6, y: barY + 2, size: 10, font: bold, color: SLATE_700 })
  })

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: + RIASEC page after MI
 * riasecResults: object with keys R,I,A,S,E,C as percentages.
 */
export async function composeWithCoverSummaryAnamneseDiscMIRiasec(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}, riasecResults = {}) {
  const base64WithMI = await composeWithCoverSummaryAnamneseDiscMI(coverImageUrl, originalPdfBase64, anamneseData, discResults, miResults)

  const baseBytes = Uint8Array.from(atob(base64WithMI), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  // RIASEC colors (just distinct accents)
  const COLOR_R = rgb(0x06/255, 0xB6/255, 0xD4/255) // cyan-500
  const COLOR_I = rgb(0x22/255, 0xC5/255, 0x5E/255) // emerald-500
  const COLOR_A = rgb(0xA7/255, 0xF3/255, 0xD0/255) // light green-ish for bar bg alt, but we will use violet
  const COLOR_A_BAR = rgb(0x8B/255, 0x5C/255, 0xF6/255) // violet-500
  const COLOR_S = rgb(0xF5/255, 0xA5/255, 0x0A/255) // yellow-500
  const COLOR_E = rgb(0xF9/255, 0x26/255, 0x72/255) // pink-500
  const COLOR_C = rgb(0x3B/255, 0x82/255, 0xF6/255) // blue-500

  const rPage = pdf.addPage(pageSize)
  rPage.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  const title = 'RIASEC - Orientação Profissional'
  const titleH = 46
  rPage.drawRectangle({ x: 30, y: height - 100, width: width - 60, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 16
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  rPage.drawText(sanitizeForWinAnsi(title), {
    x: 30 + (width - 60 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  const scores = {
    R: Number(riasecResults.R ?? 0),
    I: Number(riasecResults.I ?? 0),
    A: Number(riasecResults.A ?? 0),
    S: Number(riasecResults.S ?? 0),
    E: Number(riasecResults.E ?? 0),
    C: Number(riasecResults.C ?? 0)
  }
  const entries = [
    ['R','Realista', COLOR_R],
    ['I','Investigativo', COLOR_I],
    ['A','Artístico', COLOR_A_BAR],
    ['S','Social', COLOR_S],
    ['E','Empreendedor', COLOR_E],
    ['C','Convencional', COLOR_C],
  ]
  const sorted = entries.sort((a,b) => (scores[b[0]]||0) - (scores[a[0]]||0))
  const dominant = sorted[0]

  // Dominant card
  const domX = 30
  const domY = height - 220
  const domW = width - 60
  const domH = 90
  rPage.drawRectangle({ x: domX, y: domY, width: domW, height: domH, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
  rPage.drawText(sanitizeForWinAnsi(`Seu Perfil Dominante: ${dominant[1]}`), { x: domX + 20, y: domY + domH - 28, size: 14, font: bold, color: SLATE_700 })
  rPage.drawText(sanitizeForWinAnsi(`${scores[dominant[0]] || 0}%`), { x: domX + 20, y: domY + 20, size: 18, font: bold, color: SLATE_700 })

  // Bars for all
  let barY = domY - 20
  const barH = 10
  const barGap = 22
  const barMaxW = domW - 140
  const labelX = 30
  const drawBar = (label, value, color) => {
    const w = Math.max(0, Math.min(100, value)) / 100 * barMaxW
    barY -= barGap
    rPage.drawText(sanitizeForWinAnsi(label), { x: labelX, y: barY + 2, size: 11, font: bold, color: SLATE_700 })
    rPage.drawRectangle({ x: labelX + 120, y: barY, width: barMaxW, height: barH, color: SLATE_200, borderRadius: 5 })
    rPage.drawRectangle({ x: labelX + 120, y: barY, width: w, height: barH, color, borderRadius: 5 })
    rPage.drawText(sanitizeForWinAnsi(`${value}%`), { x: labelX + 120 + barMaxW + 6, y: barY + 2, size: 10, font: bold, color: SLATE_700 })
  }
  drawBar('Realista (R)', scores.R, COLOR_R)
  drawBar('Investigativo (I)', scores.I, COLOR_I)
  drawBar('Artístico (A)', scores.A, COLOR_A_BAR)
  drawBar('Social (S)', scores.S, COLOR_S)
  drawBar('Empreendedor (E)', scores.E, COLOR_E)
  drawBar('Convencional (C)', scores.C, COLOR_C)

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: + Archetypes page after RIASEC
 * archetypesResults: object with keys for 12 archetypes, percent values
 */
export async function composeWithCoverSummaryAnamneseDiscMIRiasecArchetypes(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}, riasecResults = {}, archetypesResults = {}) {
  const base64WithRiasec = await composeWithCoverSummaryAnamneseDiscMIRiasec(coverImageUrl, originalPdfBase64, anamneseData, discResults, miResults, riasecResults)

  const baseBytes = Uint8Array.from(atob(base64WithRiasec), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  const aPage = pdf.addPage(pageSize)
  aPage.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  const title = 'Arquétipos de Personalidade'
  const titleH = 46
  aPage.drawRectangle({ x: 30, y: height - 100, width: width - 60, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 16
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  aPage.drawText(sanitizeForWinAnsi(title), {
    x: 30 + (width - 60 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  const keys = ['inocente','sabio','explorador','foraDaLei','mago','heroi','amante','bobo','caraComum','cuidador','governante','criador']
  const labels = {
    inocente: 'O Inocente',
    sabio: 'O Sábio',
    explorador: 'O Explorador',
    foraDaLei: 'O Fora da Lei',
    mago: 'O Mago',
    heroi: 'O Herói',
    amante: 'O Amante',
    bobo: 'O Bobo da Corte',
    caraComum: 'O Cara Comum',
    cuidador: 'O Cuidador',
    governante: 'O Governante',
    criador: 'O Criador'
  }
  const items = keys.map(k => ({ key: k, label: labels[k], value: Number(archetypesResults[k] ?? 0) }))
    .sort((a,b) => b.value - a.value)

  // Top 3
  const top = items.slice(0,3)
  const badgeW = (width - 60 - 20*2) / 3
  const badgeH = 80
  let x = 30
  const y = height - 200
  top.forEach((item, idx) => {
    aPage.drawRectangle({ x, y, width: badgeW, height: badgeH, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
    aPage.drawText(sanitizeForWinAnsi(`#${idx+1} ${item.label}`), { x: x + 14, y: y + badgeH - 26, size: 12, font: bold, color: SLATE_700 })
    aPage.drawText(sanitizeForWinAnsi(`${item.value}%`), { x: x + 14, y: y + 16, size: 18, font: bold, color: SLATE_700 })
    x += badgeW + 20
  })

  // Grid with bars: 2 columns list
  let barYLeft = y - 24
  let barYRight = y - 24
  const barH = 10
  const barGap = 22
  const colW = (width - 60 - 20) / 2
  const startLeftX = 30
  const startRightX = 30 + colW + 20
  const drawBar = (pageRef, startX, yPos, label, value) => {
    const barMaxW = colW - 120
    const w = Math.max(0, Math.min(100, value)) / 100 * barMaxW
    pageRef.drawText(sanitizeForWinAnsi(label), { x: startX, y: yPos + 2, size: 11, font: bold, color: SLATE_700 })
    pageRef.drawRectangle({ x: startX + 110, y: yPos, width: barMaxW, height: barH, color: SLATE_200, borderRadius: 5 })
    pageRef.drawRectangle({ x: startX + 110, y: yPos, width: w, height: barH, color: PRIMARY, borderRadius: 5 })
    pageRef.drawText(sanitizeForWinAnsi(`${value}%`), { x: startX + 110 + barMaxW + 6, y: yPos + 2, size: 10, font: bold, color: SLATE_700 })
  }

  items.forEach((item, idx) => {
    if (idx % 2 === 0) {
      barYLeft -= barGap
      drawBar(aPage, startLeftX, barYLeft, item.label, item.value)
    } else {
      barYRight -= barGap
      drawBar(aPage, startRightX, barYRight, item.label, item.value)
    }
  })

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: + Highlights page after Archetypes
 * Builds texts for: Direção, Alvo, Impulso, Caminho usando dados dos testes
 */
export async function composeWithHighlights(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}, riasecResults = {}, archetypesResults = {}) {
  const base64WithArchetypes = await composeWithCoverSummaryAnamneseDiscMIRiasecArchetypes(coverImageUrl, originalPdfBase64, anamneseData, discResults, miResults, riasecResults, archetypesResults)

  const baseBytes = Uint8Array.from(atob(base64WithArchetypes), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  // Derive simple highlights heuristically
  const discOrder = ['D','I','S','C'].sort((a,b) => (discResults[b]||0) - (discResults[a]||0))
  const dominantDisc = discOrder[0] || 'D'
  const miKeys = ['logica','linguistica','espacial','musical','corporal','interpessoal','intrapessoal','naturalista']
  const topMi = miKeys.sort((a,b) => (miResults[b]||0) - (miResults[a]||0)).slice(0,2)
  const riasecOrder = ['R','I','A','S','E','C'].sort((a,b)=> (riasecResults[b]||0)-(riasecResults[a]||0))
  const topRiasec = riasecOrder.slice(0,2)
  const archKeys = ['heroi','mago','sabio','explorador','governante','criador','amante','bobo','caraComum','cuidador','inocente','foraDaLei']
  const topArch = archKeys.sort((a,b)=> (archetypesResults[b]||0)-(archetypesResults[a]||0)).slice(0,1)

  const mapDiscName = { D: 'Dominância', I: 'Influência', S: 'Estabilidade', C: 'Conformidade' }
  const mapMiLabel = {
    logica:'Lógico‑Matemática', linguistica:'Linguística', espacial:'Espacial', musical:'Musical',
    corporal:'Corporal‑Cinestésica', interpessoal:'Interpessoal', intrapessoal:'Intrapessoal', naturalista:'Naturalista'
  }
  const mapRiasec = { R:'Realista', I:'Investigativo', A:'Artístico', S:'Social', E:'Empreendedor', C:'Convencional' }
  const mapArch = { heroi:'Herói', mago:'Mago', sabio:'Sábio', explorador:'Explorador', governante:'Governante', criador:'Criador', amante:'Amante', bobo:'Bobo da Corte', caraComum:'Cara Comum', cuidador:'Cuidador', inocente:'Inocente', foraDaLei:'Fora da Lei' }

  const direcao = `Sua motivação se orienta por ${mapArch[topArch[0]] || 'propósito claro'} e pelo estilo ${mapDiscName[dominantDisc] || ''}, buscando fazer a diferença com consistência.`
  const alvo = `Seus destaques combinam ${topMi.map(k=>mapMiLabel[k]).filter(Boolean).join(' e ')} com interesses ${topRiasec.map(k=>mapRiasec[k]).filter(Boolean).join(' e ')} - ótimos para interagir, resolver problemas e aprender continuamente.`
  const impulso = `O potencial de crescimento está em usar ${mapMiLabel[topMi[0]] || 'suas competências'} para alavancar projetos alinhados a ${mapRiasec[topRiasec[0]] || 'seu perfil'}, mantendo foco e ritmo.`
  const caminho = `Tecnologia, empreendedorismo e áreas afins oferecem oportunidades coerentes com seus valores; priorize trilhas que unam ${mapMiLabel[topMi[0]] || ''} e ${mapRiasec[topRiasec[0]] || ''}.`

  // Draw page layout following the provided model (title + 2x2 cards)
  const p = pdf.addPage(pageSize)
  p.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  const title = 'DESTAQUES DA JORNADA'
  const titleH = 46
  p.drawRectangle({ x: 20, y: height - 100, width: width - 40, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 20
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  p.drawText(title, {
    x: 20 + (width - 40 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  const cardW = (width - 60) / 2
  const cardH = 200
  const topY = height - 140 - cardH
  const bottomY = topY - 20 - cardH
  const leftX = 30
  const rightX = 30 + cardW + 0

  // Helper function to load and embed SVG icon as PNG
  const loadSvgIcon = async (iconPath) => {
    try {
      const iconUrl = new URL(iconPath, import.meta.url).href
      const response = await fetch(iconUrl)
      if (!response.ok) return null
      
      const svgText = await response.text()
      
      // Create a canvas to render SVG
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 200
      canvas.height = 200
      
      // Create an image from SVG
      const img = new Image()
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url)
            if (blob) {
              blob.arrayBuffer().then(buffer => {
                resolve(new Uint8Array(buffer))
              }).catch(reject)
            } else {
              reject(new Error('Failed to convert SVG to blob'))
            }
          }, 'image/png')
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('Failed to load SVG'))
        }
        img.src = url
      })
    } catch (error) {
      console.warn('Error loading SVG icon:', error)
      return null
    }
  }

  // Helper function to draw SVG icon
  const drawSvgIcon = async (iconPath, iconX, iconY, iconSize) => {
    const iconBytes = await loadSvgIcon(iconPath)
    if (!iconBytes) return false
    
    try {
      const iconImage = await pdf.embedPng(iconBytes)
      // Maintain aspect ratio - use iconSize as the maximum dimension
      const aspectRatio = iconImage.width / iconImage.height
      let drawWidth, drawHeight
      
      if (aspectRatio > 1) {
        // Wider than tall
        drawWidth = iconSize
        drawHeight = iconSize / aspectRatio
      } else {
        // Taller than wide or square
        drawHeight = iconSize
        drawWidth = iconSize * aspectRatio
      }
      
      p.drawImage(iconImage, {
        x: iconX - drawWidth / 2,
        y: iconY - drawHeight / 2,
        width: drawWidth,
        height: drawHeight
      })
      return true
    } catch (error) {
      console.warn('Error embedding icon:', error)
      return false
    }
  }

  const drawCard = async (x,y,w,h,heading,text,iconPath) => {
    p.drawRectangle({ x, y, width: w, height: h, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
    
    // Draw icon if provided
    let iconDrawn = false
    if (iconPath) {
      const iconSize = 24
      const iconX = x + 18 + iconSize / 2
      const iconY = y + h - 24
      iconDrawn = await drawSvgIcon(iconPath, iconX, iconY, iconSize)
    }
    
    // Adjust heading position to make room for icon
    const headingX = iconDrawn ? x + 18 + 24 + 8 : x + 18
    p.drawText(sanitizeForWinAnsi(heading), { x: headingX, y: y + h - 28, size: 13, font: bold, color: PRIMARY })
    
    // wrap text manually
    const maxWidth = w - 36
    const words = sanitizeForWinAnsi(String(text || '')).split(' ')
    let line = ''
    let cy = y + h - 48
    const size = 11
    words.forEach((word) => {
      const test = sanitizeForWinAnsi((line ? line + ' ' : '') + word)
      const w = regular.widthOfTextAtSize(test, size)
      if (w > maxWidth) {
        p.drawText(sanitizeForWinAnsi(line), { x: x + 18, y: cy, size, font: regular, color: SLATE_700 })
        cy -= 14
        line = word
      } else {
        line = test
      }
    })
    if (line) {
      p.drawText(sanitizeForWinAnsi(line), { x: x + 18, y: cy, size, font: regular, color: SLATE_700 })
    }
  }

  await drawCard(leftX, topY, cardW, cardH, 'Direção:', direcao, '../assets/icons-relatorio/ICON DIREÇÃO.svg')
  await drawCard(rightX, topY, cardW, cardH, 'Alvo:', alvo, null) // No icon for Alvo yet
  await drawCard(leftX, bottomY, cardW, cardH, 'Impulso:', impulso, '../assets/icons-relatorio/ICON IMPULSO-42.svg')
  await drawCard(rightX, bottomY, cardW, cardH, 'Caminho:', caminho, '../assets/icons-relatorio/icon caminho.svg')

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose an additional Highlights page (model 2)
 */
export async function composeWithMoreHighlights(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}, riasecResults = {}, archetypesResults = {}) {
  const base64WithHighlights = await composeWithHighlights(coverImageUrl, originalPdfBase64, anamneseData, discResults, miResults, riasecResults, archetypesResults)

  const baseBytes = Uint8Array.from(atob(base64WithHighlights), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_700 = rgb(0x38/255, 0x47/255, 0x59/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  // Reuse mappings
  const mapDiscName = { D: 'Influente', I: 'Influente', S: 'Estável', C: 'Conforme' }
  const mapMiLabel = {
    logica:'lógica', linguistica:'linguística', espacial:'espacial', musical:'musical',
    corporal:'corporal‑cinestésica', interpessoal:'interpessoal', intrapessoal:'intrapessoal', naturalista:'naturalista'
  }
  const mapRiasec = { R:'Realista', I:'Investigativo', A:'Artístico', S:'Social', E:'Empreendedor', C:'Convencional' }
  const archKeys = ['sabio','explorador','foraDaLei','mago','heroi','governante','criador','amante','bobo','caraComum','cuidador','inocente']
  const topArch = archKeys.sort((a,b)=> (archetypesResults[b]||0)-(archetypesResults[a]||0)).slice(0,2)

  // Compute tops
  const discOrder = ['D','I','S','C'].sort((a,b)=> (discResults[b]||0)-(discResults[a]||0))
  const dominantDisc = discOrder[0] || 'I'
  const miKeys = ['logica','linguistica','espacial','musical','corporal','interpessoal','intrapessoal','naturalista']
  const topMi = miKeys.sort((a,b)=> (miResults[b]||0)-(miResults[a]||0)).slice(0,2)
  const riasecOrder = ['I','R','A','S','E','C'].sort((a,b)=> (riasecResults[b]||0)-(riasecResults[a]||0))
  const topRiasec = riasecOrder.slice(0,2)

  // Texts per the second model
  const estilo = `Seu perfil comportamental, com predominância em ${mapDiscName[dominantDisc] || 'influência'}, indica que você navega com carisma e sociabilidade. Sua habilidade de se comunicar e conectar pessoas é um diferencial em qualquer caminho profissional.`
  const terreno = `As suas múltiplas inteligências, especialmente a ${mapMiLabel[topMi[0]] || 'interpessoal'} e a ${mapMiLabel[topMi[1]] || 'lógica'}, são o terreno fértil onde seu potencial pode florescer. Você aprende rápido e transforma ideias em colaboração e inovação.`
  const mapa = `No RIASEC, destacam-se ${mapRiasec[topRiasec[0]] || 'seu perfil'} e ${mapRiasec[topRiasec[1]] || ''}. Isso sugere que você gosta de resolver problemas com base em evidências e criar soluções práticas com impacto real.`
  const essencia = `Com arquétipos como ${topArch.map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(' e ')}, sua essência combina conhecimento, exploração e liberdade de criar. Você tem vocação para histórias de descoberta e transformação, inspirando pessoas ao seu redor.`

  const p = pdf.addPage(pageSize)
  p.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  const title = 'DESTAQUES DA JORNADA'
  const titleH = 46
  p.drawRectangle({ x: 20, y: height - 100, width: width - 40, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 20
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  p.drawText(title, {
    x: 20 + (width - 40 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  const cardW = (width - 60) / 2
  const cardH = 200
  const topY = height - 140 - cardH
  const bottomY = topY - 20 - cardH
  const leftX = 30
  const rightX = 30 + cardW + 0

  // Reuse the SVG icon loading functions from composeWithHighlights
  const loadSvgIcon = async (iconPath) => {
    try {
      const iconUrl = new URL(iconPath, import.meta.url).href
      const response = await fetch(iconUrl)
      if (!response.ok) return null
      
      const svgText = await response.text()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 200
      canvas.height = 200
      
      const img = new Image()
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url)
            if (blob) {
              blob.arrayBuffer().then(buffer => {
                resolve(new Uint8Array(buffer))
              }).catch(reject)
            } else {
              reject(new Error('Failed to convert SVG to blob'))
            }
          }, 'image/png')
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('Failed to load SVG'))
        }
        img.src = url
      })
    } catch (error) {
      console.warn('Error loading SVG icon:', error)
      return null
    }
  }

  const drawSvgIcon = async (iconPath, iconX, iconY, iconSize) => {
    const iconBytes = await loadSvgIcon(iconPath)
    if (!iconBytes) return false
    
    try {
      const iconImage = await pdf.embedPng(iconBytes)
      // Maintain aspect ratio - use iconSize as the maximum dimension
      const aspectRatio = iconImage.width / iconImage.height
      let drawWidth, drawHeight
      
      if (aspectRatio > 1) {
        // Wider than tall
        drawWidth = iconSize
        drawHeight = iconSize / aspectRatio
      } else {
        // Taller than wide or square
        drawHeight = iconSize
        drawWidth = iconSize * aspectRatio
      }
      
      p.drawImage(iconImage, {
        x: iconX - drawWidth / 2,
        y: iconY - drawHeight / 2,
        width: drawWidth,
        height: drawHeight
      })
      return true
    } catch (error) {
      console.warn('Error embedding icon:', error)
      return false
    }
  }

  const drawCard = async (x,y,w,h,heading,text,iconPath) => {
    p.drawRectangle({ x, y, width: w, height: h, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
    
    // Draw icon if provided
    let iconDrawn = false
    if (iconPath) {
      const iconSize = 24
      const iconX = x + 18 + iconSize / 2
      const iconY = y + h - 24
      iconDrawn = await drawSvgIcon(iconPath, iconX, iconY, iconSize)
    }
    
    const headingX = iconDrawn ? x + 18 + 24 + 8 : x + 18
    p.drawText(sanitizeForWinAnsi(heading), { x: headingX, y: y + h - 28, size: 13, font: bold, color: PRIMARY })
    const maxWidth = w - 36
    const words = sanitizeForWinAnsi(String(text || '')).split(' ')
    let line = ''
    let cy = y + h - 48
    const size = 11
    words.forEach((word) => {
      const test = sanitizeForWinAnsi((line ? line + ' ' : '') + word)
      const w = regular.widthOfTextAtSize(test, size)
      if (w > maxWidth) {
        p.drawText(sanitizeForWinAnsi(line), { x: x + 18, y: cy, size, font: regular, color: SLATE_700 })
        cy -= 14
        line = word
      } else {
        line = test
      }
    })
    if (line) {
      p.drawText(sanitizeForWinAnsi(line), { x: x + 18, y: cy, size, font: regular, color: SLATE_700 })
    }
  }

  await drawCard(leftX, topY, cardW, cardH, 'O Estilo de Navegação', estilo, '../assets/icons-relatorio/ICON DIREÇÃO.svg')
  await drawCard(rightX, topY, cardW, cardH, 'O Terreno de Habilidades', terreno, null) // No specific icon
  await drawCard(leftX, bottomY, cardW, cardH, 'O Mapa das Possibilidades', mapa, '../assets/icons-relatorio/icon mapa das possibidlidades.svg')
  await drawCard(rightX, bottomY, cardW, cardH, 'A Essência do Caminhante', essencia, '../assets/icons-relatorio/icon essencia do caminhante.svg')

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: Action Plan page after More Highlights
 * Builds three possible routes and a checklist of next steps.
 */
export async function composeWithActionPlan(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}, riasecResults = {}, archetypesResults = {}) {
  const base64WithMoreHighlights = await composeWithMoreHighlights(coverImageUrl, originalPdfBase64, anamneseData, discResults, miResults, riasecResults, archetypesResults)

  const baseBytes = Uint8Array.from(atob(base64WithMoreHighlights), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const SLATE_50 = rgb(0xF8/255, 0xFA/255, 0xFC/255)
  const SLATE_200 = rgb(0xE2/255, 0xE8/255, 0xF0/255)
  const SLATE_600 = rgb(0x47/255, 0x55/255, 0x65/255)
  const PRIMARY = rgb(0x61/255, 0x52/255, 0xBD/255)

  // Derive simple suggestions
  const topMi = Object.entries(miResults).sort((a,b)=> (b[1]??0)-(a[1]??0)).map(([k])=>k).slice(0,2)
  const topRiasec = Object.entries(riasecResults).sort((a,b)=> (b[1]??0)-(a[1]??0)).map(([k])=>k).slice(0,2)
  const mapMi = { logica:'lógico‑matemática', linguistica:'linguística', espacial:'espacial', musical:'musical', corporal:'corporal‑cinestésica', interpessoal:'interpessoal', intrapessoal:'intrapessoal', naturalista:'naturalista' }
  const mapRiasec = { R:'Realista', I:'Investigativo', A:'Artístico', S:'Social', E:'Empreendedor', C:'Convencional' }

  const routes = [
    {
      title: 'Gestão de Projetos Sociais:',
      text: `Combinando suas inteligências ${mapMi[topMi[0]] || 'interpessoal'} e ${mapMi[topMi[1]] || 'intrapessoal'}, atue em projetos que impactem a sociedade. Use sua empatia e organização para mobilizar stakeholders e gerar transformação.`
    },
    {
      title: 'Consultoria em Inovação:',
      text: `Aproveite seu perfil ${mapRiasec[topRiasec[0]] || 'Investigativo'} e ${mapRiasec[topRiasec[1]] || 'Empreendedor'} para implementar ideias novas. Analise dados, conduza experimentos e pilote soluções que destravem resultados nas organizações.`
    },
    {
      title: 'Empreendedorismo em Tecnologia:',
      text: `Se sua combinação de ${mapMi[topMi[0]] || 'competências'} e visão prática fala alto, crie soluções digitais enxutas para problemas reais. O ambiente ágil e flexível de tecnologia combina com seu perfil.`
    }
  ]

  const steps = [
    'Identifique oportunidades de aprendizado alinhadas ao seu perfil.',
    'Experimente áreas que unam inovação e flexibilidade.',
    'Desenvolva competências complementares aos seus destaques.',
    'Busque feedbacks para ajustar direção e acelerar metas.',
    'Inicie um projeto-piloto que una suas forças e interesses.'
  ]

  const p = pdf.addPage(pageSize)
  p.drawRectangle({ x: 0, y: 0, width, height, color: SLATE_50 })

  // Title bar
  const title = 'ROTAS DE AÇÃO'
  const titleH = 46
  p.drawRectangle({ x: 20, y: height - 100, width: width - 40, height: titleH, color: PRIMARY, borderRadius: 12 })
  const titleSize = 20
  const titleWidth = bold.widthOfTextAtSize(title, titleSize)
  p.drawText(title, {
    x: 20 + (width - 40 - titleWidth) / 2,
    y: height - 100 + (titleH - titleSize) / 2 + 6,
    size: titleSize,
    font: bold,
    color: WHITE
  })

  // Subtitle pill
  const sub = 'Três Caminhos Possíveis'
  const subW = width - 40
  const subH = 44
  p.drawRectangle({ x: 20, y: height - 160, width: subW, height: subH, color: WHITE, borderColor: SLATE_200, borderWidth: 1, borderRadius: 12 })
  const subSize = 18
  const subWidth = bold.widthOfTextAtSize(sub, subSize)
  p.drawText(sanitizeForWinAnsi(sub), { x: 20 + (subW - subWidth) / 2, y: height - 160 + (subH - subSize) / 2 + 6, size: subSize, font: bold, color: PRIMARY })

  // Routes blocks
  let y = height - 220
  const blockW = width - 60
  const blockH = 70  // Reduced from 80 to 70 for tighter spacing
  routes.forEach((r) => {
    p.drawText(sanitizeForWinAnsi(r.title), { x: 30, y: y + blockH - 16, size: 12, font: bold, color: PRIMARY })
    // wrap paragraph
    const textSize = 11
    const maxWidth = blockW
    let line = ''
    let cy = y + blockH - 34
    const sanitizedText = sanitizeForWinAnsi(r.text || '')
    sanitizedText.split(' ').forEach(word => {
      const test = sanitizeForWinAnsi((line ? line + ' ' : '') + word)
      const w = regular.widthOfTextAtSize(test, textSize)
      if (w > maxWidth) {
        p.drawText(line, { x: 30, y: cy, size: textSize, font: regular, color: SLATE_600 })
        cy -= 14
        line = word
      } else {
        line = test
      }
    })
    if (line) {
      p.drawText(line, { x: 30, y: cy, size: textSize, font: regular, color: SLATE_600 })
    }
    y -= blockH + 10  // Reduced gap from 18 to 10 for tighter spacing
  })

  // Checklist
  let cy = y - 8
  const bulletPrefix = '- '
  const stepSize = 11.5
  steps.forEach(step => {
    p.drawText(sanitizeForWinAnsi(bulletPrefix + step), { x: 30, y: cy, size: stepSize, font: regular, color: SLATE_600 })
    cy -= 16
  })

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

/**
 * Compose: Conclusions page after Action Plan
 * Optionally receives narrativeText to ground the final message.
 */
export async function composeWithConclusion(coverImageUrl, originalPdfBase64, anamneseData = {}, discResults = {}, miResults = {}, riasecResults = {}, archetypesResults = {}, narrativeText = '') {
  const base64WithPlan = await composeWithActionPlan(coverImageUrl, originalPdfBase64, anamneseData, discResults, miResults, riasecResults, archetypesResults)

  const baseBytes = Uint8Array.from(atob(base64WithPlan), c => c.charCodeAt(0))
  const baseDoc = await PDFDocument.load(baseBytes, { ignoreEncryption: true })
  const originalBytes = Uint8Array.from(atob(originalPdfBase64), c => c.charCodeAt(0))
  const originalDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true })

  const pdf = await PDFDocument.create()
  const existingPages = await pdf.copyPages(baseDoc, baseDoc.getPageIndices())
  existingPages.forEach(p => pdf.addPage(p))

  const pageSize = [595.28, 841.89]
  const [width, height] = pageSize
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const regular = await pdf.embedFont(StandardFonts.Helvetica)

  const WHITE = rgb(1,1,1)
  const BG = rgb(0x61/255, 0x52/255, 0xBD/255) // primary background block
  const SLATE_100 = rgb(0xF1/255, 0xF5/255, 0xF9/255)
  const SLATE_300 = rgb(0xC4/255, 0xCF/255, 0xE1/255)
  const TEXT_LIGHT = rgb(1,1,1)

  const p = pdf.addPage(pageSize)

  // Top label
  const topLabel = 'CONCLUSÕES'
  p.drawText(sanitizeForWinAnsi(topLabel), { x: 12, y: height - 24, size: 10, font: bold, color: SLATE_300 })

  // Main block
  const blockX = 12
  const blockY = 60
  const blockW = width - 24
  const blockH = height - 100
  p.drawRectangle({ x: blockX, y: blockY, width: blockW, height: blockH, color: BG, borderRadius: 12 })

  // Brand logo instead of text
  try {
    const logoUrl = new URL('../assets/logo.png', import.meta.url).href
    const logoResponse = await fetch(logoUrl)
    if (logoResponse.ok) {
      const logoBytes = new Uint8Array(await logoResponse.arrayBuffer())
      const logoImage = await pdf.embedPng(logoBytes)
      // Calculate size to fit nicely (max width ~200px, maintain aspect ratio)
      const maxLogoWidth = 200
      const logoScale = maxLogoWidth / logoImage.width
      const logoWidth = logoImage.width * logoScale
      const logoHeight = logoImage.height * logoScale
      // Center the logo horizontally
      const logoX = blockX + (blockW - logoWidth) / 2
      const logoY = blockY + blockH - 72 - logoHeight / 2
      p.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoWidth,
        height: logoHeight
      })
    } else {
      // Fallback to text if logo fails to load
      const brand = 'TRAJETÓRIA'
      const brandSize = 32
      const brandWidth = bold.widthOfTextAtSize(brand, brandSize)
      p.drawText(sanitizeForWinAnsi(brand), { x: blockX + (blockW - brandWidth)/2, y: blockY + blockH - 72, size: brandSize, font: bold, color: TEXT_LIGHT })
    }
  } catch (error) {
    console.warn('Error loading logo, using text fallback:', error)
    // Fallback to text if logo fails to load
    const brand = 'TRAJETÓRIA'
    const brandSize = 32
    const brandWidth = bold.widthOfTextAtSize(brand, brandSize)
    p.drawText(sanitizeForWinAnsi(brand), { x: blockX + (blockW - brandWidth)/2, y: blockY + blockH - 72, size: brandSize, font: bold, color: TEXT_LIGHT })
  }

  // Parse narrativeText from AI
  const firstName = (anamneseData?.nomeCompleto || '').trim().split(' ')[0] || ''
  const heading = 'O Destino é o Caminho'
  
  let body = ''
  let finalMsg = ''
  let nextSteps = []
  
  if (narrativeText && narrativeText.length > 60) {
    // Clean up markdown if present
    let cleanText = narrativeText
      .replace(/^##\s*/gm, '') // Remove markdown headers
      .replace(/^###\s*/gm, '')
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '')
      .trim()
    
    // Find "O Destino é o Caminho" section (case insensitive)
    const destinoRegex = /O\s+Destino\s+é\s+o\s+Caminho/i
    const destinoMatch = cleanText.match(destinoRegex)
    if (destinoMatch) {
      const destinoIndex = destinoMatch.index + destinoMatch[0].length
      const afterDestino = cleanText.substring(destinoIndex).trim()
      const finalMsgRegex = /Mensagem\s+Final/i
      const finalMsgMatch = afterDestino.match(finalMsgRegex)
      if (finalMsgMatch) {
        body = afterDestino.substring(0, finalMsgMatch.index).trim()
        // Clean up any remaining markdown or extra whitespace
        body = body.replace(/\n{3,}/g, '\n\n').trim()
      } else {
        body = afterDestino.substring(0, 600).trim()
      }
    }
    
    // Find "Mensagem Final da TRAJETÓRIA" section
    const finalMsgRegex = /Mensagem\s+Final\s+da\s+TRAJETÓRIA:?/i
    const finalMsgMatch = cleanText.match(finalMsgRegex)
    if (finalMsgMatch) {
      const finalMsgIndex = finalMsgMatch.index + finalMsgMatch[0].length
      const afterFinal = cleanText.substring(finalMsgIndex).trim()
      const nextStepsRegex = /Próximos\s+Passos/i
      const nextStepsMatch = afterFinal.match(nextStepsRegex)
      if (nextStepsMatch) {
        finalMsg = afterFinal.substring(0, nextStepsMatch.index).trim()
        finalMsg = finalMsg.replace(/\n{3,}/g, '\n\n').trim()
      } else {
        finalMsg = afterFinal.trim()
      }
    }
    
    // Find "Próximos Passos" section
    const nextStepsRegex = /Próximos\s+Passos/i
    const nextStepsMatch = cleanText.match(nextStepsRegex)
    if (nextStepsMatch) {
      const nextStepsIndex = nextStepsMatch.index + nextStepsMatch[0].length
      const afterNext = cleanText.substring(nextStepsIndex).trim()
      // Extract lines starting with -, •, or numbers
      const lines = afterNext.split('\n').filter(line => {
        const trimmed = line.trim()
        return trimmed.length > 0 && (
          trimmed.startsWith('-') || 
          trimmed.startsWith('•') || 
          trimmed.match(/^\d+[\.\)]\s/)
        )
      })
      nextSteps = lines.map(line => {
        // Remove list markers and clean up
        return line.trim()
          .replace(/^[-•]\s*/, '')
          .replace(/^\d+[\.\)]\s*/, '')
          .replace(/\*\*/g, '')
          .trim()
      }).filter(step => step.length > 10).slice(0, 5) // Minimum 10 chars per step
    }
  }
  
  // Fallbacks if parsing failed
  if (!body || body.length < 50) {
    body = `${firstName ? firstName + ',' : ''} lembre-se: o propósito da sua trajetória é encontrar direção e significado, passo a passo. Este relatório não é o ponto final, e sim o início de um caminho consciente rumo a um futuro alinhado à sua essência.`
  }
  
  if (!finalMsg || finalMsg.length < 30) {
    finalMsg = 'Acredite na sua capacidade de fazer a diferença. Cada passo conta para se tornar um protagonista de impacto.'
  }
  
  if (nextSteps.length === 0) {
    nextSteps = [
      'Revise seus resultados com frequência para acompanhar sua evolução.',
      'Use estes insights para orientar decisões de carreira.',
      'Busque oportunidades alinhadas aos seus pontos fortes.',
      'Desenvolva áreas que deseja fortalecer.',
      'Converse com mentores ou coaches de carreira.'
    ]
  }
  
  const finalMsgTitle = 'Mensagem Final da TRAJETÓRIA:'
  const nextTitle = 'Próximos Passos'

  let cursorY = blockY + blockH - 110
  // heading
  p.drawText(sanitizeForWinAnsi(heading), { x: blockX + 24, y: cursorY, size: 12, font: bold, color: TEXT_LIGHT })
  cursorY -= 18
  // paragraph wrap
  const wrap = (text, x, y, maxWidth, size) => {
    const words = sanitizeForWinAnsi(String(text)).split(' ')
    let line = ''
    let cy = y
    words.forEach(word => {
      const test = sanitizeForWinAnsi((line ? line + ' ' : '') + word)
      const w = regular.widthOfTextAtSize(test, size)
      if (w > maxWidth) {
        p.drawText(sanitizeForWinAnsi(line), { x, y: cy, size, font: regular, color: TEXT_LIGHT })
        cy -= 14
        line = word
      } else {
        line = test
      }
    })
    if (line) p.drawText(sanitizeForWinAnsi(line), { x, y: cy, size, font: regular, color: TEXT_LIGHT })
    return cy - 22
  }
  cursorY = wrap(body, blockX + 24, cursorY, blockW - 48, 11)

  // final message
  p.drawText(sanitizeForWinAnsi(finalMsgTitle), { x: blockX + 24, y: cursorY, size: 11, font: bold, color: TEXT_LIGHT })
  cursorY -= 16
  cursorY = wrap(finalMsg, blockX + 24, cursorY, blockW - 48, 11)

  // next steps
  p.drawText(sanitizeForWinAnsi(nextTitle), { x: blockX + 24, y: cursorY, size: 11, font: bold, color: TEXT_LIGHT })
  cursorY -= 16
  nextSteps.forEach(step => {
    p.drawText(sanitizeForWinAnsi('- ' + step), { x: blockX + 24, y: cursorY, size: 11, font: regular, color: TEXT_LIGHT })
    cursorY -= 14
  })

  // DO NOT append original pages - we only want our custom pages

  const outBytes = await pdf.save()
  let binary = ''
  outBytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}


