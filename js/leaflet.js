let osmUrl; // url
let map; // mapa
let markerGroup; // marcadores
window.addEventListener('DOMContentLoaded', setMap())

function setMap() {
    // Creamos el mapa
    osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });
    // Esto de setView sirve para situar la cámara, las coordenadas desde las que 
    map = L.map('map').setView([40.3691389, -3.5991667], 13).addLayer(osm);
    markerGroup = L.layerGroup().addTo(map);
    showMap();
}

// Comprueba si has hecho el mapa entero
function setFullMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showFullMap);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showMap() {

    L.marker([40.3691389, -3.5991667]).addTo(map)
        .bindPopup('GZ Shop - La Gavia')
        .openPopup()
        .addTo(map);
}

// Añade el marcador de tu localización
function showFullMap(position) {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup('Tu localización')
        .openPopup()
        .addTo(map);
}
