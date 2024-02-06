document.addEventListener('DOMContentLoaded', async function () {
    const email = localStorage.getItem('email');
    if (!email) {
        window.location.href = 'login.html';
        return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    await mostrarCarrito(carrito);
    var botonComprar = document.getElementById('botonComprar');
    botonComprar.addEventListener('click', comprar);
});

const url = 'productos.json';

async function mostrarCarrito(carrito) {
    const response = await fetch(url);
    const data = await response.json();
    var hayProductos = false;

    const tableBody = document.getElementById('carritoTableBody');

    carrito.forEach(modelo => {
        const zapatillaEncontrada = data.zapatillas.find(zapatilla => zapatilla.modelo.toLowerCase().includes(modelo.toLowerCase()));

        if (zapatillaEncontrada) {
            hayProductos = true;

            const row = document.createElement('tr');

            row.innerHTML = `
                <td class='w-25 text-center'>${zapatillaEncontrada.modelo}</td>
                <td class='w-25 text-center'>${zapatillaEncontrada.marca}</td>
                <td class='w-25 text-center'>${zapatillaEncontrada.precio} €</td>
                <td class='d-flex justify-content-center'><img class='w-25 rounded-3' src=${zapatillaEncontrada.imagen}></img></td>
            `;

            tableBody.appendChild(row);
        }
    });

    if (!hayProductos) {
        mostrarNotificacion('El carrito está vacío');
        window.location.href = 'index.html';
    }
}

function comprar() {
    localStorage.setItem('carrito', JSON.stringify([]));
    mostrarNotificacion('Compra realizada');
    window.location.href = 'index.html';
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

