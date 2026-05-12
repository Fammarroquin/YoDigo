function renderBlanks(slide) {
  // La pregunta usa ___ para indicar el espacio en blanco
  const html = slide.question.replace(/___/g,
    '<input type="text" class="blank-input" id="blank-field" placeholder="..."/>');
  return `
    <div class="question-card">
      <h2 class="question-text blanks-text">${html}</h2>
      <button class="btn-primary" onclick="submitAnswer(
        document.getElementById('blank-field').value.trim()
      )">Enviar</button>
    </div>`;
}