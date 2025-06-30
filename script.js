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
      <div class="question-box">
        <strong>${i + 1}. ${p.pregunta}</strong><br/>
        ${opcionesHTML}
      </div>
    `;
  });
}

function evaluar() {
  let correctas = 0;
  const quizDiv = document.getElementById("quiz");
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

    const contenedorPregunta = quizDiv.children[i];

    // Eliminar estilos anteriores
    contenedorPregunta.classList.remove("correcta", "incorrecta");

    // Mostrar feedback visual y texto
    if (seleccion === p.respuestaCorrecta) {
      correctas++;
      contenedorPregunta.classList.add("correcta");
      contenedorPregunta.innerHTML += `<p style="color:green;"><strong>✅ ¡Correcto!</strong></p>`;
    } else {
      contenedorPregunta.classList.add("incorrecta");
      const respuestaCorrecta = p.opciones[p.respuestaCorrecta];
      contenedorPregunta.innerHTML += `<p style="color:red;"><strong>❌ Incorrecto.</strong> La correcta era: <em>${respuestaCorrecta}</em></p>`;
    }
  });

  resultadoDiv.innerHTML = `<h3>Obtuviste ${correctas} de ${preguntasSeleccionadas.length} correctas.</h3>`;
}
