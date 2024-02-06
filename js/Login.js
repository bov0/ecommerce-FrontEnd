document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', comprobarUsuario);
});

function comprobarUsuario(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.toLowerCase();
    const contrasena = document.getElementById('contrasena').value;

    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    console.log(usuarios);

    const usuarioEncontrado = usuarios.find(user => user.email.toLowerCase() === email.toLowerCase() && user.contrasena === contrasena);

    if (usuarioEncontrado) {
        localStorage.setItem('email', email);
        localStorage.setItem('contrasena', contrasena);
        mostrarNotificacion('Iniciada sesión como: ' + localStorage.getItem('email'));
        window.location.href = 'productos.html';
    } else {
        mostrarNotificacion('Usuario o contraseña incorrectos');
    }
}

function mostrarNotificacion(mensaje) {
    if (!('Notification' in window)) {
        console.log('Las notificaciones no son compatibles en este navegador.');
        return;
    }

    if (Notification.permission === 'granted') {
        const opciones = {
            body: mensaje,
        };

        const notificacion = new Notification('GZ Shop', opciones);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                mostrarNotificacion(mensaje);
            }
        });
    }
}