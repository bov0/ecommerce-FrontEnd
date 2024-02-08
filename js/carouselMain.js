async function cargarProductosAleatorios() {
    try {
        const response = await fetch('productos.json');
        const data = await response.json();

        const carouselInner = document.getElementById('carouselMain');
        const todosLosProductos = data.zapatillas;

        const productosAleatorios = todosLosProductos.sort(() => Math.random() - 0.5).slice(0, 3);

        productosAleatorios.forEach((producto, i) => {
            const carouselItem = document.createElement('div');
            // si index es 0 es ademas de carousel item, active;
            carouselItem.className = i === 0 ? 'carousel-item active' : 'carousel-item';
            /*
            if (index === 0) {
                carouselItem.className = 'carousel-item active';
            } else {
                carouselItem.className = 'carousel-item';
            }
            No entiendo porque asi no funciona, si deberia ser igual
            */

            const imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.alt = producto.modelo;
            imagen.className = 'd-block w-100 rounded-4';

            const infoProducto = document.createElement('div');
            infoProducto.className = 'carousel-caption bg-opacity-50 d-none d-md-block bg-dark rounded-4 fw-bold';
            infoProducto.innerHTML = `<h3 class="fw-bold">${producto.modelo}</h3>
                        <p>${producto.marca} - ${producto.color} - ${producto.precio} €</p>`;

            carouselItem.appendChild(imagen);
            carouselItem.appendChild(infoProducto);
            carouselInner.appendChild(carouselItem);
        });

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

cargarProductosAleatorios();
