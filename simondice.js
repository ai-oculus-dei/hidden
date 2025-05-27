const colores = ["verde", "rojo", "amarillo", "azul"];
let secuencia = [];
let secuenciaUsuario = [];
let esperando = false;
let rondaActual = 1;
const totalRondas = 4;

const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

function actualizarContador() {
  contador.textContent = `${rondaActual}/${totalRondas}`;
}

function siguientePaso() {
  secuencia = [];
  for (let i = 0; i < rondaActual; i++) {
    const color = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(color);
  }
  secuenciaUsuario = [];
  reproducirSecuencia();
}

function reproducirSecuencia() {
  esperando = false;
  let i = 0;

  const intervalo = setInterval(() => {
    resaltar(secuencia[i]);
    i++;
    if (i >= secuencia.length) {
      clearInterval(intervalo);
      esperando = true;
      mensaje.textContent = "¡Tu turno!";
    }
  }, 800);
}

function resaltar(color) {
  const boton = document.getElementById(color);
  boton.style.opacity = "1";
  setTimeout(() => {
    boton.style.opacity = "0.6";
  }, 400);
}

function manejarClick(color) {
  if (!esperando) return;

  secuenciaUsuario.push(color);
  resaltar(color);

  const index = secuenciaUsuario.length - 1;
  if (secuenciaUsuario[index] !== secuencia[index]) {
    mensaje.textContent = "¡Fallaste! Volviendo al principio...";
    secuenciaUsuario = [];
    esperando = false;
    rondaActual = 1;        // volvemos a la primera ronda
    actualizarContador();   // actualizamos el contador
    setTimeout(() => {
      mensaje.textContent = "Observa la secuencia...";
      siguientePaso();
    }, 1500);
    return;
  }

  if (secuenciaUsuario.length === secuencia.length) {
    if (rondaActual === totalRondas) {
      mensaje.textContent = "¡Has ganado!";
      setTimeout(() => {
        window.location.href = "final.html";
      }, 1500);
    } else {
      rondaActual++;
      actualizarContador();
      mensaje.textContent = "¡Bien hecho! Preparando siguiente ronda...";
      esperando = false;
      setTimeout(() => {
        mensaje.textContent = "Observa la secuencia...";
        siguientePaso();
      }, 1500);
    }
  }
}

colores.forEach(color => {
  document.getElementById(color).addEventListener("click", () => manejarClick(color));
});

actualizarContador();
mensaje.textContent = "Observa la secuencia...";
setTimeout(siguientePaso, 1500);
