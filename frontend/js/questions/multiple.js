function renderMultiple(slide) {
  const colors = ['#e74c3c','#2980b9','#27ae60','#f39c12'];
  const opts = slide.options ? slide.options.split(',') : [];
  return `
    <div class="question-card">
      <h2 class="question-text">${slide.question}</h2>
      <div class="options-grid">
        ${opts.map((o, i) => `
          <button class="option-btn"
            style="background:${colors[i % colors.length]}"
            onclick="submitAnswer('${o.trim()}')">
            ${o.trim()}
          </button>
        `).join('')}
      </div>
    </div>`;
}