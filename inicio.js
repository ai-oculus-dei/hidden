const btnPrueba1 = document.getElementById('btn-prueba1');

document.addEventListener("DOMContentLoaded", () => {
    // Activar Prueba 2 si la 1 fue completada
    if (localStorage.getItem("prueba1Completada") === "true") {
      document.getElementById("btn-prueba2").disabled = false;
      btnPrueba1.disabled = true;
      btnPrueba1.classList.add('boton-verde');
    }

    if (localStorage.getItem("carlaMuerta") === "true") {
      document.getElementById("btn-prueba2").disabled = false;
      btnPrueba1.disabled = true;
      btnPrueba1.classList.add('boton-rojo');

    }
  
    // Activar Prueba 3 si la 2 fue completada
    if (localStorage.getItem("prueba2Completada") === "true") {
      document.getElementById("btn-prueba3").disabled = false;
      document.getElementById("btn-prueba2").disabled = true;
    }
  });
  