document.addEventListener('DOMContentLoaded', function () {
    var botonGuardar = document.getElementById('botonGuardar');
    botonGuardar.addEventListener('click', function () {
        var email = document.getElementById('email').value;
        var contrasena = document.getElementById('contrasena').value;
        var contrasena2 = document.getElementById('contrasena2').value;
        guardarUsuario(email, contrasena, contrasena2);
    });
});

const usuariosArray = JSON.parse(localStorage.getItem('usuarios')) || [];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function guardarUsuario(email, contrasena, contrasena2) {
    if (!emailRegex.test(email)) {
        mostrarNotificacion('Ingrese un correo electrónico válido');
        return;
    }

    if (contrasena === contrasena2 && email.trim() !== '' && contrasena.trim() !== '') {
        var nuevoUsuario = {
            email: email,
            contrasena: contrasena
        };

        const usuarioExistente = usuariosArray.find(usuario => usuario.email.toLowerCase() === nuevoUsuario.email.toLowerCase());

        if (!usuarioExistente) {
            usuariosArray.push(nuevoUsuario);
            mostrarNotificacion('Usuario agregado exitosamente');
            localStorage.setItem('usuarios', JSON.stringify(usuariosArray));
            window.location.href = 'login.html';
        } else {
            mostrarNotificacion('El usuario ya existe');
        }
    } else {
        mostrarNotificacion('Las contraseñas no son idénticas o algunos campos están vacíos');
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
