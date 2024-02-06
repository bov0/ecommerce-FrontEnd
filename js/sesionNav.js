
document.addEventListener('DOMContentLoaded', function () {
    var sesionItem = document.getElementById('sesionItem');

    if (localStorage.getItem('email') != null) {
        var cerrarSesionLink = document.createElement('a');
        cerrarSesionLink.className = 'nav-link';
        cerrarSesionLink.href = '#';
        cerrarSesionLink.textContent = 'Cerrar sesión';
        cerrarSesionLink.addEventListener('click', cerrarSesion);

        sesionItem.appendChild(cerrarSesionLink);
    } else {
        var iniciarSesionLink = document.createElement('a');
        iniciarSesionLink.className = 'nav-link';
        iniciarSesionLink.href = 'Login.html';
        iniciarSesionLink.textContent = 'Iniciar sesión';

        sesionItem.appendChild(iniciarSesionLink);
    }
});

function cerrarSesion() {
    localStorage.removeItem('email');
    localStorage.removeItem('contrasena');
    location.reload();
}
