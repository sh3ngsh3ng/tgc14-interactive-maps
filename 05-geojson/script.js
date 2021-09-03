window.addEventListener('DOMContentLoaded', async function () {
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

    // read in the two geojson files
    let response = await axios.get('cycle.geojson');
    console.log(response.data)
    // response.data will contain the geojson
    // use the Leaflet map object to process the geojson file
    // the geojson return of the function will be a layer group (aka L.layerGroup)
    let cyclingLayer = L.geoJSON(response.data, {
        onEachFeature:function(feature, layer) {
            // layer.bindPopup(feature.properties.Description)
            console.log(feature.properties.Description);

            // create an empty div and set its innerHTML to be the HTML from the description
            let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.Description;
            let cells = divElement.querySelectorAll('td');
            console.log(cells);
            let name = cells[0].innerHTML;
            let agency = cells[1].innerHTML;
            layer.bindPopup(`${name} maintained by ${agency}`)

        },
        style: function(){
            return {
                color:'green'
            }
        }
    }); 
    cyclingLayer.addTo(map)


})
