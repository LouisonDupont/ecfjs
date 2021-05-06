const API_COVER_URL = "https://coverartarchive.org/";

function apiGetCover(idrelease) {
    const request = new XMLHttpRequest();
    request.open("GET", API_COVER_URL + "release/" + idrelease, true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                console.log(response);
                response.images.map(idrelease => apiCover(idrelease));
                
            }if (request.status=== 404){
                console.log("Pas d'image pour cette album");
            }
            else {
                console.log("error");
            }
        }
    });
    request.send();
}