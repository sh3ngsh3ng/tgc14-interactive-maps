async function main() {
    function init() {
        let map = initMap();
        let searchResultLayer = L.layerGroup();
        window.addEventListener('DOMContentLoaded', function(){
            // we will add event listners here later
            document.querySelector('#search-btn').addEventListener('click', async function(){
                let query = document.querySelector('#search-input').value;
                let center = map.getBounds().getCenter();
                let data = await search(center.lat, center.lng, query);

               addSearchResults(data, searchResultLayer, map);
            })

            document.querySelector("#toggle-search-btn").addEventListener('click', function(){
                let searchContainer =  document.querySelector("#search-container");
                // if the search container is not being displayed at the moment, show it
                if (searchContainer.style.display == 'none' || !searchContainer.style.display) {
                    searchContainer.style.display='block';
                } else {
                    searchContainer.style.display='none';
                }
            
            })
        })

    }

    init();
}



main();

