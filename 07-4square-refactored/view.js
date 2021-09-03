function addSearchResults(data, searchResultLayer, map) {
     // remove all the markers from the search result layer
     searchResultLayer.clearLayers();

     let searchResultElement =  document.querySelector('#search-results');
     
     // remove from search result div
     searchResultElement.innerHTML = "";

     for (let eachVenue of data.response.venues) {
         let coordinate = [ eachVenue.location.lat, eachVenue.location.lng ];
         let marker = L.marker(coordinate);
         marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
         // searchResultLayer.addLayer(marker)
         marker.addTo(searchResultLayer);

         // add the search result to #search-results
         let resultElement = document.createElement('div');
         resultElement.className="search-result";
         resultElement.innerHTML = eachVenue.name;

         resultElement.addEventListener('click', function(){
             map.flyTo(coordinate, 16);
             marker.openPopup();
         })

         searchResultElement.appendChild(resultElement);
     }

     map.addLayer(searchResultLayer);
}