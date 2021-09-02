function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southwest = bounds.getSouthWest();
    let northeast = bounds.getNorthEast();
    
    // find the 'width' and 'length' of the box
    let lng = northeast.lng - southwest.lng;
    let lat = northeast.lat - southwest.lat;

    // generte a random marker
    let randomLng = Math.random() * lng + southwest.lng;
    let randomLat = Math.random() * lat + southwest.lat;
    console.log(randomLng, randomLat);
    return [randomLat, randomLng ];
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

// create 1000 markers

// 1.create a marker cluster layer
let markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(map);
for (let i =0; i < 1000; i++) {

    // get a random coordinate
    let coordinate = getRandomLatLng(map);
    // create a marker at that coordinate
    let marker = L.marker(coordinate);
    // add the marker to the map
    marker.addTo(markerClusterLayer);

}
