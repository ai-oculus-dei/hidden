const btnContinuar = document.getElementById('btn-continuar');

btnContinuar.addEventListener('click', () => {

    localStorage.setItem('susanFinal', 'true');
    window.location.href = 'inicio.html'

});