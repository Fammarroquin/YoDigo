// ── SLIDES ──────────────────────────────────────────────────

function getSlides(presentation_id) {
  const sheet = getSheet('slides');
  const data = sheetToObjects(sheet);
  const slides = data
    .filter(s => s.presentation_id === presentation_id)
    .sort((a, b) => a.order - b.order);
  return { success: true, data: slides };
}

function createSlide(data) {
  const sheet = getSheet('slides');
  const id = generateId();

  // Calcular el siguiente número de orden
  const existing = sheetToObjects(sheet)
    .filter(s => s.presentation_id === data.presentation_id);
  const order = existing.length + 1;

  sheet.appendRow([
    id,
    data.presentation_id,
    order,
    data.type,          // multiple | open | blanks | wordcloud | drawing
    data.question || '',
    data.options || '', // Para múltiple: "opA,opB,opC,opD"
    data.correct || '', // Para múltiple y blanks
    data.media_url || ''
  ]);

  return { success: true, id, message: 'Slide creado' };
}

function updateSlide(data) {
  const sheet = getSheet('slides');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf('id');

  for (let i = 1; i < values.length; i++) {
    if (values[i][idCol] === data.id) {
      const fields = ['type', 'question', 'options', 'correct', 'media_url', 'order'];
      fields.forEach(field => {
        if (data[field] !== undefined) {
          sheet.getRange(i+1, headers.indexOf(field)+1).setValue(data[field]);
        }
      });
      return { success: true, message: 'Slide actualizado' };
    }
  }
  return { success: false, message: 'Slide no encontrado' };
}

function deleteSlide(id) {
  const sheet = getSheet('slides');
  const values = sheet.getDataRange().getValues();
  const idCol = values[0].indexOf('id');

  for (let i = 1; i < values.length; i++) {
    if (values[i][idCol] === id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Slide eliminado' };
    }
  }
  return { success: false, message: 'No encontrado' };
}