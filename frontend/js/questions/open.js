function renderOpen(slide) {
  return `
    <div class="question-card">
      <h2 class="question-text">${slide.question}</h2>
      <textarea id="open-answer" class="open-input"
        placeholder="Escribe tu respuesta..." rows="4"></textarea>
      <button class="btn-primary" onclick="submitAnswer(
        document.getElementById('open-answer').value.trim()
      )">Enviar</button>
    </div>`;
}