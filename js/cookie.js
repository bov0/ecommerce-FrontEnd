document.addEventListener('DOMContentLoaded', function () {
    const modalCookies = document.getElementById('modalCookies');
    const btnGuardar = document.getElementById('aceptarCookies');

    const cookiesAceptadas = getCookie('aceptada');

    if (!cookiesAceptadas) {
        modalCookies.style.display = "block";
        modalCookies.className = "modal fade show";
    }

    btnGuardar.addEventListener('click', (e) => {
        modalCookies.style.display = "none";
        modalCookies.className = "modal fade";
        cookieAceptada();
    });
});

function cookieAceptada() {
    document.cookie = 'aceptada=true;';
}

function getCookie(nombre) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key.trim() === nombre) {
            return value;
        }
    }
    return null;
}
