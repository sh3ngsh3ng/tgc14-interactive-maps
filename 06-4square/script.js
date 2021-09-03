async function main() {
    function init() {
        let map = initMap();
        window.addEventListener('DOMContentLoaded', function(){
            // we will add event listners here later
        })

    }

    init();
}

const API_BASE_URL="https://api.foursquare.com/v2/";

async function search(lat, lng, query) {
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/venues/search",{
        params: {
            'll': ll,
            'client_id':'1OL0PJTKSLAM1NHXSXMDVOGFKO43UYFO1RANBSIX02WWR13E',
            'client_secret':'FQV04PP4U1O5U5SBJZYWSNU1FRROX4GI5FQ3GMWL2PXUOGN5',
            'v': '20210903',  // YYYYMMDD format
            'query': query
        }
    })
    return response.data;
}

main();

