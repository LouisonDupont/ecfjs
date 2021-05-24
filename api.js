const API_URL = "https://musicbrainz.org/ws/2/";


function apiGetArtist(name, error) {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "artist/?query=" + encodeURIComponent(name) + "&limit=100&offset=0&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                // console.log(response);
                // Ici j'appelle la fonction apiResult avec pour parametre l'artiste
                // De la reponse, je vais dans la première clée "artistes" sur laquelle je fais un map (tableau), puis chaque entrée va correspondre a "artiste" puis je fais un traitement dessus : ici de lui passer la fonction apiResult
                response.artists.map(artiste => apiResult(artiste, response));

                if(response.count == 0){
                    // Resultat de recherche
                    console.log("Coucou");
                    let newError = document.createElement("span");
                    newError.setAttribute('style', 'margin:2rem 0;');
                    newError.textContent = "Il n'y a pas de résultats à votre recherche.";
                    searchResult.appendChild(newError);
                    tableHeader.setAttribute("style", "display:none;")
                }
                
            } else {
                error(request);
            }
        }
    });
    request.send();
}


function apiGetRecords(artistId, error) {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "recording/?query=arid:" + encodeURIComponent(artistId) + "&limit=100&offset=" + offset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                console.log(response);
                response.recordings.map(artistId => apiRecords(artistId, response));

                if(response.count == 0){
                    // Resultat de recherche
                    console.log("Coucou");
                    let newError = document.createElement("span");
                    newError.setAttribute('style', 'margin:2rem 0;');
                    newError.textContent = "Il n'y a pas de résultats à votre recherche.";
                    searchResult.appendChild(newError);
                    tableHeader.setAttribute("style", "display:none;")
                }
                
            } else {
                error(request);
            }
        }
    });
    request.send();
}

function apiGetOnlyRecords(artistId) {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "recording/?query=" + encodeURIComponent(artistId) + "&limit=100&offset=" + offset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                // console.log(response);
                response.recordings.map(artistId => apiTitres(artistId, response));

                if(response.count == 0){
                    // Resultat de recherche
                    console.log("Coucou");
                    let newError = document.createElement("span");
                    newError.setAttribute('style', 'margin:2rem 0;');
                    newError.textContent = "Il n'y a pas de résultats à votre recherche.";
                    searchResult.appendChild(newError);
                    tableHeader.setAttribute("style", "display:none;")
                }
                
            } else {
                error(request);
            }
        }
    });
    request.send();
}

function apiGetRelease(releaseName) {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "release/?query=" + encodeURIComponent(releaseName) + "&limit=100&offset=" + offset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.releases.map(releaseName => apiRelease(releaseName, response));

                if(response.count == 0){
                    // Resultat de recherche
                    console.log("Coucou");
                    let newError = document.createElement("span");
                    newError.setAttribute('style', 'margin:2rem 0;');
                    newError.textContent = "Il n'y a pas de résultats à votre recherche.";
                    searchResult.appendChild(newError);
                    tableHeader.setAttribute("style", "display:none;")
                }
                
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}

function apiGetAll(artistId) {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "recording/?query=" + encodeURIComponent(artistId) + "%20OR%20artist-credit:" + encodeURIComponent(artistId) + "%20OR%20release:" + encodeURIComponent(artistId) + "&limit=100&offset=" + offset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                // console.log(response);
                response.recordings.map(artistId => apiRecords(artistId, response));

                if(response.count == 0){
                    // Resultat de recherche
                    console.log("Coucou");
                    let newError = document.createElement("span");
                    newError.setAttribute('style', 'margin:2rem 0;');
                    newError.textContent = "Il n'y a pas de résultats à votre recherche.";
                    searchResult.appendChild(newError);
                    tableHeader.setAttribute("style", "display:none;")
                }
                
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}