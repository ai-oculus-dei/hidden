const btnReset = document.getElementById('btn-reset');
const btnCarla = document.getElementById('btn-carla');
const btnInicio = document.getElementById('btn-inicio');

btnReset.addEventListener('click', () => {
  // Limpiar todo el progreso guardado
  localStorage.clear();
  alert('Progreso reseteado');
});

btnCarla.addEventListener('click', () => {
  window.location.href = 'carla.html';
});

btnInicio.addEventListener('click', () => {
  window.location.href = 'inicio.html';
});
