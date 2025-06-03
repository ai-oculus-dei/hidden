const btnEmpezar = document.getElementById('btn-empezar');
const btnContinuar = document.getElementById('btn-continuar');
const textoInicial = document.getElementById('texto-inicial');
const cronometro = document.getElementById('cronometro');
const textoClave = document.getElementById('texto-clave');
const pista = document.getElementById('pista');
const imagenMery = document.getElementById('imagen-mery');
const inputsClave = Array.from(document.querySelectorAll('#clave input'));
let segundosRestantesGlobal;
let timeoutID;

const DURACION_SEGUNDOS = 12 * 60;

// Guardado local
function guardarTiempoFinal(timestamp) {
  localStorage.setItem('meryTiempoFinal', timestamp);
}
function obtenerTiempoFinal() {
  return localStorage.getItem('meryTiempoFinal');
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

function marcarMeryComoMuerta() {
  localStorage.setItem('meryMuerta', 'true');
}
function mostrarEstadoMeryMuerta() {
  cronometro.textContent = "00:00:00";
  cronometro.classList.add('rojo');
  cronometro.classList.remove('cronometro-verde');
  imagenMery.src = 'images/redhead-dead.png';
  textoInicial.textContent = 'Oh no, la pobre Mery ha muerto, su hermana pequeña la va a echar mucho de menos';
  cronometro.style.display = 'block';
  btnEmpezar.style.display = 'none';
  btnContinuar.textContent = 'Continuar sin Mery';
  btnContinuar.style.display = 'inline-block';
}

function iniciarCuentaAtras(segundosRestantes) {
  segundosRestantesGlobal = segundosRestantes;
  mostrarCronometro();

  function tick() {
    if (segundosRestantesGlobal <= 0) {
      cronometro.textContent = "00:00:00";
      cronometro.classList.add('rojo');
      cronometro.classList.remove('cronometro-verde');
      imagenMery.src = 'images/redhead-dead.png';
      textoInicial.textContent = 'Mery no sobrevivió. Fallaste.';
      marcarMeryComoMuerta();
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

function mostrarClave() {
  textoClave.style.display = 'block';
  pista.style.display = 'block';
  document.getElementById('clave').style.display = 'flex';
  inputsClave.forEach(input => {
    input.disabled = false;
    input.value = '';
  });
  inputsClave[0].focus();
}

btnEmpezar.addEventListener('click', () => {
  const tiempoFinal = Date.now() + DURACION_SEGUNDOS * 1000;
  guardarTiempoFinal(tiempoFinal);
  iniciarCuentaAtras(DURACION_SEGUNDOS);
  mostrarClave();
});

btnContinuar.addEventListener('click', () => {
  window.location.href = 'inicio.html';
});

window.addEventListener('load', () => {
  if (localStorage.getItem('meryMuerta') === 'true') {
    mostrarEstadoMeryMuerta();
    return;
  }

  const prueba3Completada = localStorage.getItem('prueba3Completada') === 'true';
  const tiempoFinal = obtenerTiempoFinal();

  if (prueba3Completada) {
    cronometro.classList.add('cronometro-verde');
    imagenMery.src = 'images/redhead-free.png';

    const tiempoRestaurado = parseInt(localStorage.getItem('meryTiempoRestanteSalvada') || '0');
    cronometro.textContent = formatearTiempo(tiempoRestaurado);
    cronometro.style.display = 'block';

    textoClave.textContent = "Clave correcta, ¡Salvaste a Mery!";
    textoClave.style.display = 'block';
    pista.style.display = 'block';

    document.getElementById('clave').style.display = 'flex';
    const claveGuardada = localStorage.getItem('claveIntroducida') || CLAVE_CORRECTA;
    inputsClave.forEach((input, idx) => {
      input.value = claveGuardada[idx] || '';
      input.disabled = true;
    });

    btnEmpezar.disabled = true;
    btnEmpezar.style.display = 'none';
    btnContinuar.style.display = 'inline-block';
    textoInicial.style.display = 'none';
    return;
  }

  if (tiempoFinal && !prueba3Completada) {
    const segRestantes = Math.round((tiempoFinal - Date.now()) / 1000);
    if (segRestantes > 0) {
      iniciarCuentaAtras(segRestantes);
      mostrarClave();
    } else {
      localStorage.removeItem('meryTiempoFinal');
    }
  }
});

inputsClave.forEach((input, idx) => {
  input.addEventListener('input', () => {
    input.value = input.value.toUpperCase();
    if (input.value.length === 1) {
      if (idx < inputsClave.length - 1) {
        inputsClave[idx + 1].focus();
      } else {
        const claveIngresada = inputsClave.map(i => i.value).join('');
        verificarClave(claveIngresada);
      }
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key.length === 1 && !/[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
  });
});

function verificarClave(clave) {
  
    textoClave.textContent = "Pobrecita, vas a hacer que muera";
    segundosRestantesGlobal -= 120;
    if (segundosRestantesGlobal < 0) segundosRestantesGlobal = 0;
    const nuevoTiempoFinal = Date.now() + segundosRestantesGlobal * 1000;
    guardarTiempoFinal(nuevoTiempoFinal);
    inputsClave.forEach(input => input.value = '');
    inputsClave[0].focus();

}
