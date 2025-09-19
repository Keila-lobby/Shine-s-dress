document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const mensajeError = document.getElementById('mensajeError');


    // Simulación de la base de datos de usuarios, esto se obtendría de BDusuarios.json
    const usuarios = [
    {
     "id":"1",
     "Nombre":"Martha",
     "Contraseña":"12349876",
     "Sexo":"F"
   },

   {
     "id":"2",
     "Nombre":"Thomas",
     "Contraseña":"01928374",
     "Sexo":"M"
   }
    ];


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional


        const usuarioInput = document.getElementById('usuario').value;
        const contrasenaInput = document.getElementById('contrasena').value;


        // Busca si hay un usuario que coincida
        const usuarioEncontrado = usuarios.find(user =>
            user.usuario === usuarioInput && user.contrasena === contrasenaInput
        );


        

        if (usuarioEncontrado) {
            mensajeError.textContent = '';
            html +=
            `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#"> Home</a>
                            </li>
                            <li>
                                <p>${user.usuario}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="car-container">
                        <button class="btn btn-secondary car" type="button" onClick="openCloseCar()"> 
                            <img src="Vimg/Darklover.png" alt="Bolsa de carrito" height="50px" width="50px"/>
                        </button>
                        <div class="Heart hidden">

                        </div>
                    </div>
                </div>
            </nav>`;
        ;}
        
        if (usuarioEncontrado) {
            mensajeError.textContent = '';
            alert('¡Inicio de sesión exitoso!');
            // Redirige al usuario a otra página
            window.location.href = 'Index.html';
        } else {
            mensajeError.textContent = 'Usuario o contraseña incorrectos.';
        }
    });
});
