document.addEventListener('DOMContentLoaded', function () {
    audio = document.getElementById('sonidoCarrito');
    desplegarNovedades();
});

const url = 'productos.json';

async function desplegarNovedades() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const cardDeck = document.getElementById('novedadesCards');

        const ultimosProductos = data.zapatillas.slice(-4);

        ultimosProductos.forEach(zapatilla => {
            const card = document.createElement('div');
            card.className = 'card m-1 m-md-2 col-5 col-md-4 text-white position-relative rounded-4';

            const imagen = document.createElement('img');
            imagen.className = 'card-img-top';
            imagen.src = zapatilla.imagen;
            imagen.alt = zapatilla.modelo;
            imagen.className = 'rounded-4';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-img-overlay position-absolute top-0 d-flex flex-column justify-content-center rounded-4';
            cardBody.style.opacity = '0';

            const titulo = document.createElement('h5');
            titulo.className = 'card-title';
            titulo.textContent = zapatilla.modelo;

            const marca = document.createElement('p');
            marca.className = 'card-text';
            marca.textContent = 'Marca: ' + zapatilla.marca;

            const color = document.createElement('p');
            color.className = 'card-text';
            color.textContent = 'Color: ' + zapatilla.color;

            const precio = document.createElement('p');
            precio.className = 'card-text';
            precio.textContent = 'Precio: ' + zapatilla.precio + ' €';

            const boton = document.createElement('button');
            boton.className = 'mx-auto btn btn-sm w-75 btn-light text-center';
            boton.id = 'boton';
            boton.textContent = 'Añadir carrito';
            boton.addEventListener('click', () => anadirCarrito(zapatilla));

            cardBody.appendChild(titulo);
            cardBody.appendChild(marca);
            cardBody.appendChild(color);
            cardBody.appendChild(precio);
            cardBody.appendChild(boton);

            card.addEventListener('mouseover', () => {
                cardBody.style.opacity = '1';
            });

            card.addEventListener('mouseout', () => {
                cardBody.style.opacity = '0';
            });

            card.appendChild(imagen);
            card.appendChild(cardBody);

            cardDeck.appendChild(card);
        });
    } catch (error) {
        console.log('Error al obtener los datos:', error);
    }
}

function anadirCarrito(zapatilla) {
    const nombreZapatilla = zapatilla.modelo;

    if (!localStorage.getItem('email')) {
        mostrarNotificacion('Debes iniciar sesión', null);
        window.location.href = 'login.html';
    } else {
        const emailUsuario = localStorage.getItem('email');
        let carrito = JSON.parse(localStorage.getItem(`carrito-${emailUsuario}`)) || [];

        const productoExistente = carrito.find(producto => producto === nombreZapatilla);

        if (!productoExistente) {
            carrito.push(nombreZapatilla);

            localStorage.setItem(`carrito-${emailUsuario}`, JSON.stringify(carrito));

            if (audio) {
                audio.play();
            }

            mostrarNotificacion(`Producto añadido al carrito: ${nombreZapatilla}`, zapatilla.imagen);
        } else {
            mostrarNotificacion(`El producto ya está en el carrito: ${nombreZapatilla}`, zapatilla.imagen);
        }
    }
}

function mostrarNotificacion(mensaje, icono) {
    if (!('Notification' in window)) {
        console.log('Las notificaciones no son compatibles en este navegador.');
        return;
    }

    if (Notification.permission === 'granted') {
        const opciones = {
            body: mensaje,
            icon: icono,
        };

        const notificacion = new Notification('GZ Shop', opciones);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                mostrarNotificacion(mensaje, icono);
            }
        });
    }
}
