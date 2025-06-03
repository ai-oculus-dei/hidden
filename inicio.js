const btnPrueba1 = document.getElementById('btn-prueba1');
const btnPrueba2 = document.getElementById('btn-prueba2');
const btnPrueba3 = document.getElementById('btn-prueba3');
const btnContinuar = document.getElementById('btn-continuar');
const maintext = document.getElementById('texto-principal');

document.addEventListener("DOMContentLoaded", () => {
    
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

    if (localStorage.getItem("susanMuerta") === "true") {
      document.getElementById("btn-prueba3").disabled = false;
      btnPrueba2.disabled = true;
      btnPrueba2.classList.add('boton-rojo');

    }
  
    // Activar Prueba 3 si la 2 fue completada
    if (localStorage.getItem("prueba2Completada") === "true") {
      document.getElementById("btn-prueba3").disabled = false;
      btnPrueba2.disabled = true;
      btnPrueba2.classList.add('boton-verde');
    }

    if (localStorage.getItem("meryMuerta") === "true") {
      btnPrueba3.disabled = true;
      btnPrueba3.classList.add('boton-rojo');
      btnContinuar.style.display = 'inline-block';
    }

    if(localStorage.getItem("carlaFinal") === "true"){
      btnPrueba1.disabled = true;
      btnPrueba2.disabled = false;
    }

    if(localStorage.getItem("susanFinal") === "true"){
      btnPrueba2.disabled = true;
    }

    if(localStorage.getItem("chicasfinal") === "true"){
      btnPrueba1.classList.add('boton-rojo');
      btnPrueba2.classList.add('boton-rojo');
      btnPrueba3.classList.add('boton-rojo');

      btnContinuar.disabled = true;

      btnPrueba1.disabled = false;

      maintext.textContent = 'Vaya! ¿Qué está pasando? Se han puesto los nombres en rojo. Comprueba a ver lo que pasa.';

      btnPrueba1.onclick = () => {
        location.href = 'carladead.html';
      };
    
      btnPrueba2.onclick = () => {
        location.href = 'susandead.html';
      };
    
      btnPrueba3.onclick = () => {
        location.href = 'merydead.html';
      };

      if(localStorage.getItem("carlaFinal") === "true"){

        btnPrueba1.disabled = true;
        btnPrueba2.disabled = false;
      }

      if(localStorage.getItem("susanFinal") === "true"){

        btnPrueba2.disabled = true;
        btnPrueba3.disabled = false;
      }

    }

  });

btnContinuar.addEventListener('click', () => {

  localStorage.setItem("chicasfinal", "true");
  localStorage.removeItem('prueba1Completada');
  localStorage.removeItem('prueba2Completada');
  localStorage.removeItem('susanMuerta');
  localStorage.removeItem('carlaMuerta');
  localStorage.removeItem('meryMuerta');
  location.reload();

});