const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const passwordInput = document.getElementById("password");
  const boton = document.getElementById("entrarBtn");
  const password = passwordInput.value;

  if (password === "Agente Plaza") {
    window.location.href = "simondice.html";
  } else {
    boton.style.backgroundColor = "red";
    passwordInput.value = "";
    passwordInput.placeholder = "Prueba otra vez";

    setTimeout(() => {
      boton.style.backgroundColor = "";
    }, 3000);
  }
});





