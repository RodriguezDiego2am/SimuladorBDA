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
      <div id="pregunta${i}" class="pregunta">
        <strong>${i + 1}. ${p.pregunta}</strong><br/>
        ${opcionesHTML}
        <div class="feedback-container"></div>
        <hr/>
      </div>
    `;
  });
}

function evaluar() {
  let correctas = 0;
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  preguntasSeleccionadas.forEach((p, i) => {
    const opciones = document.getElementsByName(`pregunta${i}`);
    let seleccion = -1;
    opciones.forEach((op, j) => {
      if (op.checked) {
        seleccion = j;
      }
    });

    const contenedorPregunta = document.getElementById(`pregunta${i}`);
    const feedbackDiv = contenedorPregunta.querySelector(".feedback-container");

    // Limpiar feedback y clases anteriores
    feedbackDiv.innerHTML = "";
    contenedorPregunta.classList.remove("correcta", "incorrecta");

    // Evaluar selección
    if (seleccion === p.respuestaCorrecta) {
      correctas++;
      contenedorPregunta.classList.add("correcta");
      feedbackDiv.innerHTML = `<p style="color:green;"><strong>✅ ¡Correcto!</strong></p>`;
    } else {
      contenedorPregunta.classList.add("incorrecta");
      const respuestaCorrecta = p.opciones[p.respuestaCorrecta];
      feedbackDiv.innerHTML = `<p style="color:red;"><strong>❌ Incorrecto.</strong> La correcta era: <em>${respuestaCorrecta}</em></p>`;
    }
  });

  resultadoDiv.innerHTML = `<h3>Obtuviste ${correctas} de ${preguntasSeleccionadas.length} correctas.</h3>`;
}

function iniciarSimulador() {
  preguntasSeleccionadas = seleccionarPreguntasAleatorias(10);
  mostrarPreguntas();
  document.getElementById("resultado").innerHTML = "";
}
