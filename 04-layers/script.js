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

// What is a Layer?
// A layer is a grouping of other layers : layer in general can be a marker, a shape, etc.
// Remember the bottomost part of the map is the tile layer
let group = L.layerGroup();
group.addTo(map); // add the group to the map
for (let i = 0; i < 10; i++) {
    let randomCoordinate = getRandomLatLng(map);
    let marker = L.marker(randomCoordinate);
    marker.addTo(group);
}

// second layer will hold some random circles
let circleGroup = L.layerGroup();
for(let i = 0; i < 10; i++) {
    let randomCoordinate = getRandomLatLng(map);
    let circle = L.circle(randomCoordinate, {
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.5,
        radius: 500
    });
    circle.addTo(circleGroup);
    //circleGroup.add(circle);
}
circleGroup.addTo(map);

// third layer
let circleMarkerLayer = L.layerGroup();
for (let i = 0; i < 10; i++) {
    let randomCoordinate = getRandomLatLng(map);
    let circleMarker = L.circleMarker(randomCoordinate, {
        radius: 50,
        color: "blue",
        fillColor: "green",
        fillOpacity: 0.25
    })
    circleMarker.addTo(circleMarkerLayer);
}
circleMarkerLayer.addTo(map);

// create a control to switch on/switch off layers

// 1. create the lookup tables for the layers
// the map can only display ONE layer from the base layers
let baseLayers = {
    'Markers': group,
    'Circles': circleGroup
}

// but can display 0 or more of the overlay layers
let overlayLayer = {
    'Circle Markers': circleMarkerLayer
}

// 2. Display the layer control
L.control.layers(baseLayers, overlayLayer).addTo(map);

document.querySelector('#toggle-btn').addEventListener('click', function(){
    if (map.hasLayer(circleMarkerLayer)) {
        map.removeLayer(circleMarkerLayer);
    } else {
        map.addLayer(circleMarkerLayer);
    }
})