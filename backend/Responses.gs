// ── RESPUESTAS ───────────────────────────────────────────────

function saveResponse(data) {
  const sheet = getSheet('responses');
  const id = generateId();
  const now = new Date().toISOString();

  // Evitar respuesta duplicada del mismo participante al mismo slide
  const existing = sheetToObjects(sheet);
  const duplicate = existing.find(r =>
    r.session_id === data.session_id &&
    r.slide_id === data.slide_id &&
    r.participant === data.participant
  );

  if (duplicate) {
    return { success: false, message: 'Ya respondiste esta pregunta' };
  }

  // Para dibujos: data.answer puede ser una cadena base64 larga — se guarda tal cual
  sheet.appendRow([
    id,
    data.session_id,
    data.slide_id,
    data.participant || 'Anónimo',
    data.answer || '',
    now
  ]);

  return { success: true, id, message: 'Respuesta guardada' };
}

function getResponses(session_id, slide_id) {
  const sheet = getSheet('responses');
  const data = sheetToObjects(sheet);

  let filtered = data.filter(r => String(r.session_id) === String(session_id));
  
  // Solo filtrar por slide_id si viene un valor real
  if (slide_id && slide_id !== 'null' && slide_id !== '') {
    filtered = filtered.filter(r => String(r.slide_id) === String(slide_id));
  }

  return { success: true, data: filtered };
}

function getResponseCount(session_id, slide_id) {
  const result = getResponses(session_id, slide_id);
  return { success: true, count: result.data.length };
}

// Resumen de respuestas para opción múltiple
function getResponseSummary(session_id, slide_id) {
  const result = getResponses(session_id, slide_id);
  const summary = {};

  result.data.forEach(r => {
    const ans = r.answer || 'Sin respuesta';
    summary[ans] = (summary[ans] || 0) + 1;
  });

  return { success: true, data: summary, total: result.data.length };
}