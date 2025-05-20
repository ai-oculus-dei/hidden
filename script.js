function checkPassword(event) {
    event.preventDefault();
  
    const password = document.getElementById("password").value;
    const validPassword = "Laura Plaza López"; // Cambia esta contraseña
  
    if (password === validPassword) {
      alert("Acceso concedido ✅");
      // Puedes redirigir aquí:
      // window.location.href = "pagina-secundaria.html";
    } else {
      alert("Contraseña incorrecta ❌");
    }
  }
  