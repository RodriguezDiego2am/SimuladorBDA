let preguntasSeleccionadas = [];
let respuestasUsuario = [];

fetch("preguntas.json")
  .then(res => res.json())
  .then(preguntas => {
    preguntasSeleccionadas = preguntas.sort(() => 0.5 - Math.random()).slice(0, 10);
    mostrarPreguntas();
  });

function mostrarPreguntas() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  preguntasSeleccionadas.forEach((p, i) => {
    const opcionesHTML = p.opciones.map((op, j) => `
      <label>
        <input type="radio" name="pregunta${i}" value="${j}" />
        ${op}
      </label><br/>
    `).join("");

    quizDiv.innerHTML += `
      <div>
        <strong>${i + 1}. ${p.pregunta}</strong><br/>
        ${opcionesHTML}
        <hr/>
      </div>
    `;
  });
}

function evaluar() {
  respuestasUsuario = preguntasSeleccionadas.map((p, i) => {
    const seleccion = document.querySelector(`input[name="pregunta${i}"]:checked`);
    return seleccion ? parseInt(seleccion.value) === p.respuestaCorrecta : false;
  });

  const correctas = respuestasUsuario.filter(v => v).length;
  document.getElementById("resultado").innerText = `Tu puntaje: ${correctas}/10`;
}
