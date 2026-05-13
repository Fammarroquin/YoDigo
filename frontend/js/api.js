// ── CONFIGURACIÓN ────────────────────────────────────────────
const API_URL = 'https://script.google.com/macros/s/AKfycbydX3EjJoRZ-_z3KLMtjeBw0BbkEm099tx9J03uUDfNrAvXVFiYd8IxVHwWB8-uzfIjPA/exec';

// ── FUNCIÓN BASE ─────────────────────────────────────────────
async function apiCall(action, data = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action, ...data })
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error('Error API:', err);
    return { success: false, message: err.message };
  }
}

// ── PRESENTACIONES ───────────────────────────────────────────
const Presentations = {
  getAll:  ()     => apiCall('getPresentations'),
  get:     (id)   => apiCall('getPresentation', { id }),
  create:  (data) => apiCall('createPresentation', data),
  update:  (data) => apiCall('updatePresentation', data),
  delete:  (id)   => apiCall('deletePresentation', { id })
};

// ── SLIDES ───────────────────────────────────────────────────
const Slides = {
  getAll:  (presentation_id) => apiCall('getSlides', { presentation_id }),
  create:  (data)            => apiCall('createSlide', data),
  update:  (data)            => apiCall('updateSlide', data),
  delete:  (id)              => apiCall('deleteSlide', { id })
};

// ── SESIONES ─────────────────────────────────────────────────
const Sessions = {
  create:   (presentation_id) => apiCall('createSession', { presentation_id }),
  getByPin: (pin)             => apiCall('getSession', { pin }),
  getById:  (id)              => apiCall('getSessionById', { id }),
  update:   (data)            => apiCall('updateSession', data),
  setSlide: (id, slide_id)    => apiCall('setCurrentSlide', { id, slide_id })
};

// ── RESPUESTAS ───────────────────────────────────────────────
const Responses = {
  save:    (data)                      => apiCall('saveResponse', data),
  get:     (session_id, slide_id)      => apiCall('getResponses', { session_id, slide_id }),
  count:   (session_id, slide_id)      => apiCall('getResponseCount', { session_id, slide_id }),
  summary: (session_id, slide_id)      => apiCall('getResponseSummary', { session_id, slide_id })
};