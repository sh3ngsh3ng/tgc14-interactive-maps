async function getTaxiCoordinates(map) {
    let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability');
    let coordinates = response.data.features[0].geometry.coordinates;
    let cluster = L.markerClusterGroup();
    cluster.addTo(map);
    for (let taxi of coordinates) {
        let lng = taxi[0];
        let lat = taxi[1]
        let actualCoordinate = [ lat, lng];
        let marker = L.marker(actualCoordinate);
        marker.addTo(cluster);
    }
}

// Leaflet, coordinates are represented by an array of 2 elements
// [ <lat>, <lng> ]
let singapore = [1.29, 103.85];
// L is defined by Leaflet's JavaScript file
let map = L.map('map'); // create a map and render it to the #map
map.setView(singapore, 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

getTaxiCoordinates(map);