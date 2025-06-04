const btnEmpezar = document.getElementById('btn-empezar');
const btnContinuar = document.getElementById('btn-continuar');
const textoInicial = document.getElementById('texto-inicial');
const cronometro = document.getElementById('cronometro');
const pista = document.getElementById('pista');
const claveContainer = document.getElementById('clave');
const inputClave = document.getElementById('input-clave');

let segundosRestantesGlobal;
let timeoutID;

const DURACION_SEGUNDOS = 48 * 60 * 60;

// === LocalStorage helpers ===

function guardarTiempoFinal(timestamp) {
  localStorage.setItem('bombaTiempoFinal', timestamp);
}

function obtenerTiempoFinal() {
  return localStorage.getItem('bombaTiempoFinal');
}

function guardarEstadoIniciado() {
  localStorage.setItem('bombaEstadoIniciado', 'true');
}

function obtenerEstadoIniciado() {
  return localStorage.getItem('bombaEstadoIniciado') === 'true';
}

function guardarResuelto(tiempoDetenido) {
  localStorage.setItem('bombaResuelta', 'true');
  localStorage.setItem('bombaTiempoDetenido', tiempoDetenido);
}

function obtenerResuelto() {
  return localStorage.getItem('bombaResuelta') === 'true';
}

function obtenerTiempoDetenido() {
  return parseInt(localStorage.getItem('bombaTiempoDetenido') || '0');
}

// === Visuales ===

function formatearTiempo(segundos) {
  let h = Math.floor(segundos / 3600);
  let m = Math.floor((segundos % 3600) / 60);
  let s = segundos % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function mostrarCronometro() {
  textoInicial.style.display = 'none';
  btnEmpezar.style.display = 'none';
  cronometro.style.display = 'block';
}

function mostrarElementosJuego() {
  mostrarCronometro();
  pista.style.display = 'block';
  claveContainer.style.display = 'flex';
  btnContinuar.style.display = 'inline-block';
}

// === Cronómetro ===

function iniciarCuentaAtras(segundosRestantes) {
  segundosRestantesGlobal = segundosRestantes;
  mostrarCronometro();

  function tick() {
    if (segundosRestantesGlobal <= 0) {
      cronometro.textContent = "00:00:00";
      cronometro.classList.add('rojo');
      cronometro.classList.remove('cronometro-verde');
      textoInicial.textContent = 'Todo el mundo ha muerto, fallaste... Me equivoqué de persona';
      location.reload();
      clearTimeout(timeoutID);
      return;
    }

    cronometro.textContent = formatearTiempo(segundosRestantesGlobal);

    if (segundosRestantesGlobal <= 300) {
      cronometro.classList.add('rojo');
      cronometro.classList.remove('cronometro-verde');
    } else {
      cronometro.classList.remove('rojo');
      cronometro.classList.remove('cronometro-verde');
    }

    segundosRestantesGlobal--;
    timeoutID = setTimeout(tick, 1000);
  }

  tick();
}

function detenerCronometroYMarcarResuelto() {
  clearTimeout(timeoutID);
  cronometro.classList.remove('rojo');
  cronometro.classList.add('cronometro-verde');
  guardarResuelto(segundosRestantesGlobal);
  btnContinuar.textContent = 'Continuar';
  btnContinuar.onclick = () => window.location.href = 'lessontres.html';
}

// === Eventos ===

btnEmpezar.addEventListener('click', () => {
  const tiempoFinal = Date.now() + DURACION_SEGUNDOS * 1000;
  guardarTiempoFinal(tiempoFinal);
  guardarEstadoIniciado();
  iniciarCuentaAtras(DURACION_SEGUNDOS);
  mostrarElementosJuego();
});

// Función dual: Resolver / Continuar
btnContinuar.addEventListener('click', () => {
  if (btnContinuar.textContent === 'Resolver') {
    detenerCronometroYMarcarResuelto();
  } else {
    window.location.href = 'lessontres.html';
  }
});

// === Al cargar la página ===

window.addEventListener('load', () => {
  const tiempoFinalGuardado = obtenerTiempoFinal();
  const iniciado = obtenerEstadoIniciado();
  const resuelta = obtenerResuelto();

  if (resuelta) {
    mostrarElementosJuego();
    const tiempoDetenido = obtenerTiempoDetenido();
    cronometro.textContent = formatearTiempo(tiempoDetenido);
    cronometro.classList.add('cronometro-verde');
    btnContinuar.textContent = 'Continuar';
    btnContinuar.onclick = () => window.location.href = 'lessontres.html';
    return;
  }

  if (tiempoFinalGuardado) {
    const diferencia = Math.floor((tiempoFinalGuardado - Date.now()) / 1000);
    if (diferencia > 0) {
      iniciarCuentaAtras(diferencia);
      if (iniciado) {
        mostrarElementosJuego();
      }
    } else {
      cronometro.textContent = "00:00:00";
      cronometro.classList.add('rojo');
      textoInicial.textContent = 'Todo el mundo ha muerto, fallaste... Me equivoqué de persona';
      btnEmpezar.style.display = 'none';
    }
  }
});

// Guardar el valor del input en tiempo real
inputClave.addEventListener('input', () => {
  localStorage.setItem('bombaClaveIngresada', inputClave.value);
});

// Recuperar el valor del input al cargar la página
window.addEventListener('load', () => {
  const claveGuardada = localStorage.getItem('bombaClaveIngresada');
  if (claveGuardada) {
    inputClave.value = claveGuardada;
  }
});