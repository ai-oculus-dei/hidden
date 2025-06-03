const btnContinuar = document.getElementById('btn-continuar');

btnContinuar.addEventListener('click', () => {

    localStorage.setItem('carlaFinal', 'true');
    window.location.href = 'inicio.html'

});