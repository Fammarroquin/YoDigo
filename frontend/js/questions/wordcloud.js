function renderWordcloud(slide) {
  return `
    <div class="question-card">
      <h2 class="question-text">${slide.question}</h2>
      <p class="question-hint">Escribe una palabra que se te venga a la mente</p>
      <input type="text" id="word-input" class="word-input"
        placeholder="Tu palabra..." maxlength="30"/>
      <button class="btn-primary" onclick="submitAnswer(
        document.getElementById('word-input').value.trim()
      )">Enviar</button>
    </div>`;
}