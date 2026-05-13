// ── PRESENTACIONES ──────────────────────────────────────────

function getPresentations() {
  const sheet = getSheet('presentations');
  const data = sheetToObjects(sheet);
  return { success: true, data };
}

function createPresentation(data) {
  const sheet = getSheet('presentations');
  const id = generateId();
  const now = new Date().toISOString();

  sheet.appendRow([
    id,
    data.name || 'Sin nombre',
    data.description || '',
    now,
    'active'
  ]);

  return { success: true, id, message: 'Presentación creada' };
}

function getPresentation(id) {
  const sheet = getSheet('presentations');
  const data = sheetToObjects(sheet);
  const found = data.find(p => p.id === id);
  if (!found) return { success: false, message: 'No encontrada' };
  return { success: true, data: found };
}

function updatePresentation(data) {
  const sheet = getSheet('presentations');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf('id');

  for (let i = 1; i < values.length; i++) {
    if (values[i][idCol] === data.id) {
      if (data.name)        sheet.getRange(i+1, headers.indexOf('name')+1).setValue(data.name);
      if (data.description) sheet.getRange(i+1, headers.indexOf('description')+1).setValue(data.description);
      if (data.status)      sheet.getRange(i+1, headers.indexOf('status')+1).setValue(data.status);
      return { success: true, message: 'Presentación actualizada' };
    }
  }
  return { success: false, message: 'No encontrada' };
}

function deletePresentation(id) {
  const sheet = getSheet('presentations');
  const values = sheet.getDataRange().getValues();
  const idCol = values[0].indexOf('id');

  for (let i = 1; i < values.length; i++) {
    if (values[i][idCol] === id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Presentación eliminada' };
    }
  }
  return { success: false, message: 'No encontrada' };
}
function uploadImage(data) {
  try {
    const folder = DriveApp.getRootFolder(); // o una carpeta específica
    const blob = Utilities.newBlob(
      Utilities.base64Decode(data.data),
      data.type,
      data.name
    );
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const url = `https://drive.google.com/uc?export=view&id=${file.getId()}`;
    return { success: true, url };
  } catch(e) {
    return { success: false, message: e.message };
  }
}