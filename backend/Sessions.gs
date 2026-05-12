// ── SESIONES ────────────────────────────────────────────────

function createSession(data) {
  const sheet = getSheet('sessions');
  const id = generateId();
  const pin = generatePin();
  const now = new Date().toISOString();

  sheet.appendRow([
    id,
    data.presentation_id,
    pin,
    'waiting',  // status inicial
    now,
    ''          // ended_at vacío
  ]);

  return { success: true, id, pin, message: 'Sesión creada' };
}

function getSession(pin) {
  const sheet = getSheet('sessions');
  const data = sheetToObjects(sheet);
  const session = data.find(s => String(s.pin) === String(pin));
  if (!session) return { success: false, message: 'PIN no encontrado' };
  return { success: true, data: session };
}

function getSessionById(id) {
  const sheet = getSheet('sessions');
  const data = sheetToObjects(sheet);
  const session = data.find(s => s.id === id);
  if (!session) return { success: false, message: 'Sesión no encontrada' };
  return { success: true, data: session };
}

function updateSession(data) {
  const sheet = getSheet('sessions');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf('id');

  for (let i = 1; i < values.length; i++) {
    if (values[i][idCol] === data.id) {
      if (data.status) {
        sheet.getRange(i+1, headers.indexOf('status')+1).setValue(data.status);
      }
      if (data.status === 'ended') {
        sheet.getRange(i+1, headers.indexOf('ended_at')+1).setValue(new Date().toISOString());
      }
      return { success: true, message: 'Sesión actualizada' };
    }
  }
  return { success: false, message: 'Sesión no encontrada' };
}

// Genera un PIN de 6 dígitos único
function generatePin() {
  const sheet = getSheet('sessions');
  const data = sheetToObjects(sheet);
  const usedPins = data.map(s => String(s.pin));

  let pin;
  do {
    pin = String(Math.floor(100000 + Math.random() * 900000));
  } while (usedPins.includes(pin));

  return pin;
}