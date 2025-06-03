const btnEmpezar = document.getElementById('btn-empezar');
const btnContinuar = document.getElementById('btn-continuar');
const textoInicial = document.getElementById('texto-inicial');
const cronometro = document.getElementById('cronometro');
const pista = document.getElementById('pista');
let segundosRestantesGlobal;
let timeoutID;

const DURACION_SEGUNDOS = 24 * 60 * 60;

// Guardado local
function guardarTiempoFinal(timestamp) {
  localStorage.setItem('bombaTiempoFinal', timestamp);
}
function obtenerTiempoFinal() {
  return localStorage.getItem('bombaTiempoFinal');
}
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


function iniciarCuentaAtras(segundosRestantes) {
  segundosRestantesGlobal = segundosRestantes;
  mostrarCronometro();

  function tick() {
    if (segundosRestantesGlobal <= 0) {
      cronometro.textContent = "00:00:00";
      cronometro.classList.add('rojo');
      cronometro.classList.remove('cronometro-verde');
      textoInicial.textContent = 'Todo el mundo ha muerto, fallaste... Me equivoque de persona';
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

btnEmpezar.addEventListener('click', () => {
  const tiempoFinal = Date.now() + DURACION_SEGUNDOS * 1000;
  guardarTiempoFinal(tiempoFinal);
  iniciarCuentaAtras(DURACION_SEGUNDOS);

  
});

btnContinuar.addEventListener('click', () => {
  window.location.href = 'lessontres.html';
});

