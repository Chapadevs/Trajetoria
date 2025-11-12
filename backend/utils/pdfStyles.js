/**
 * Cores e estilos para o PDF
 */
export function getColors() {
  return {
    primary: '#413288',
    secondary: '#6152BD',
    accent: '#9266CC',
    light: '#C8A1FF',
    text: '#1e293b',
    textLight: '#64748b',
    border: '#cbd5e1',
    lightBackground: '#f8fafc',
    white: '#ffffff'
  };
}

/**
 * Adiciona cabeçalho de página
 */
export function addPageHeader(doc, title, colors) {
  const currentY = doc.y;
  
  // Linha decorativa superior
  doc.moveTo(50, 50)
     .lineTo(doc.page.width - 50, 50)
     .lineWidth(3)
     .strokeColor(colors.primary)
     .stroke();

  doc.fontSize(18)
     .fillColor(colors.primary)
     .text(title, 50, 60)
     .moveDown(2);
}

/**
 * Adiciona uma seção com título
 */
export function addSection(doc, title, colors) {
  const y = doc.y;
  
  // Verifica se há espaço suficiente, senão adiciona nova página
  if (y > doc.page.height - 150) {
    doc.addPage();
    doc.y = 60;
  }

  doc.fontSize(14)
     .fillColor(colors.secondary)
     .text(title, { underline: true })
     .moveDown(1);
}

/**
 * Adiciona rodapé na página
 */
export function addFooter(doc, pageNumber, colors) {
  const bottomY = doc.page.height - 50;
  
  doc.fontSize(9)
     .fillColor(colors.textLight)
     .text(
       `Trajetória | Página ${pageNumber}`,
       50,
       bottomY,
       { align: 'center', width: doc.page.width - 100 }
     );
}

/**
 * Desenha uma caixa/card
 */
export function drawBox(doc, x, y, width, height, colors, fill = true) {
  doc.roundedRect(x, y, width, height, 5);
  
  if (fill) {
    doc.fillAndStroke(colors.lightBackground, colors.border);
  } else {
    doc.stroke(colors.border);
  }
}

/**
 * Adiciona uma barra de progresso
 */
export function addProgressBar(doc, x, y, width, percentage, colors) {
  // Background da barra
  doc.rect(x, y, width, 12)
     .fillAndStroke(colors.lightBackground, colors.border);
  
  // Barra de progresso
  const fillWidth = (percentage / 100) * width;
  doc.rect(x, y, fillWidth, 12)
     .fill(colors.primary);
}

