const SHEET_ID = '1NlG2TR_1pqdeDZ5zrO-SWfhAt6GcKsUN3nGJfOedFkY';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const action = e.parameter.action || (e.postData && JSON.parse(e.postData.contents).action);
    const data = e.postData ? JSON.parse(e.postData.contents) : e.parameter;

    let result;

    switch (action) {
        // Presentaciones
        case 'getPresentations':    result = getPresentations(); break;
        case 'getPresentation':     result = getPresentation(data.id); break;
        case 'createPresentation':  result = createPresentation(data); break;
        case 'updatePresentation':  result = updatePresentation(data); break;
        case 'deletePresentation':  result = deletePresentation(data.id); break;
        // Slides
        case 'getSlides':           result = getSlides(data.presentation_id); break;
        case 'createSlide':         result = createSlide(data); break;
        case 'updateSlide':         result = updateSlide(data); break;
        case 'deleteSlide':         result = deleteSlide(data.id); break;
        // Sesiones
        case 'createSession':       result = createSession(data); break;
        case 'getSession':          result = getSession(data.pin); break;
        case 'updateSession':       result = updateSession(data); break;
        // Respuestas
        case 'saveResponse':        result = saveResponse(data); break;
        case 'getResponses':        result = getResponses(data.session_id, data.slide_id); break;
        case 'getSessionById':      result = getSessionById(data.id); break;
        case 'getResponseCount':    result = getResponseCount(data.session_id, data.slide_id); break;
        case 'getResponseSummary':  result = getResponseSummary(data.session_id, data.slide_id); break;
        case 'setCurrentSlide':     result = setCurrentSlide(data); break;
        case 'uploadImage'    :     result = uploadImage(data); break;
        default:
            result = { error: 'Acción no reconocida: ' + action };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Utilidades ──────────────────────────────────────────────
function getSheet(name) {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
}

function generateId() {
  return Utilities.getUuid();
}

function sheetToObjects(sheet) {
  const [headers, ...rows] = sheet.getDataRange().getValues();
  return rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}