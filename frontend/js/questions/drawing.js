function renderDrawing(slide) {
  return `
    <div class="question-card">
      <h2 class="question-text">${slide.question}</h2>
      <canvas id="draw-canvas" width="320" height="220"
        class="draw-canvas"></canvas>
      <div class="draw-controls">
        <input type="color" id="draw-color" value="#ffffff" title="Color"/>
        <input type="range" id="draw-size" min="2" max="20" value="4" title="Tamaño"/>
        <button class="btn-secondary btn-sm" onclick="clearCanvas()">Borrar</button>
        <button class="btn-primary btn-sm" onclick="submitDrawing()">Enviar</button>
      </div>
    </div>`;
}

function initDrawing() {
  const canvas = document.getElementById('draw-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let drawing = false;

  canvas.addEventListener('mousedown', e => { drawing = true; ctx.beginPath(); });
  canvas.addEventListener('mouseup',   () => drawing = false);
  canvas.addEventListener('mouseleave',() => drawing = false);
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    const r = canvas.getBoundingClientRect();
    ctx.lineWidth   = document.getElementById('draw-size').value;
    ctx.strokeStyle = document.getElementById('draw-color').value;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
  });

  // Soporte táctil
  canvas.addEventListener('touchstart', e => {
    e.preventDefault(); drawing = true; ctx.beginPath();
  });
  canvas.addEventListener('touchend', () => drawing = false);
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!drawing) return;
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    ctx.lineWidth   = document.getElementById('draw-size').value;
    ctx.strokeStyle = document.getElementById('draw-color').value;
    ctx.lineCap = 'round';
    ctx.lineTo(t.clientX - r.left, t.clientY - r.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(t.clientX - r.left, t.clientY - r.top);
  });
}

function clearCanvas() {
  const canvas = document.getElementById('draw-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function submitDrawing() {
  const canvas = document.getElementById('draw-canvas');
  const dataUrl = canvas.toDataURL('image/png');
  submitAnswer(dataUrl);
}