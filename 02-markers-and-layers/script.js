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

// A marker is a layer that we can add on top of the map
let singaporeMarker = L.marker([1.29, 103.85]);
singaporeMarker.addTo(map);

let newMarker = L.marker([1.3076, 103.8812]);
newMarker.addTo(map);

singaporeMarker.bindPopup(`<h1>Welcome to Singapore!</h1>
    <img src="merlion.jpg" style="width:50%"/>
`)

newMarker.addEventListener('click', function(){
    alert("Trent Global");
})

let circle = L.circle([1.3541, 103.7769],{
    'color': 'red',
    'radius': 500,
    'fillColor': 'orange',
    'fillOpacity':0.5
})
circle.addTo(map);
circle.bindPopup('<h1>Lots of steps</h1>')
circle.addEventListener('click', function(){
    map.flyTo([1.3541, 103.7769], 16);
});