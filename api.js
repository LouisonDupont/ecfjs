const API_URL = "https://musicbrainz.org/ws/2/";


function apiGetArtist(name) {
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
                
            } else {
                // errorMessage.textContent = "Il y a une erreur";
                console.log("error");
            }
        }
    });
    request.send();
}


function apiGetRecords(artistId) {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "recording/?query=arid:" + encodeURIComponent(artistId) + "&limit=100&offset=" + offset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                console.log(response);
                response.recordings.map(artistId => apiRecords(artistId, response));
                
            } else {
                console.log("error");
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
                
            } else {
                console.log("error");
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
                // console.log(response);
                response.releases.map(releaseName => apiRelease(releaseName, response));
                
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
                
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}




// En MODAL ou NON : penser a charger puis effacer la recherche après fermeture



// Je vais devoir faire 4 requetes : une requete sur les artists, les titres, les albums, et les 3

// 


/*
Reste a faire :

- Créer un if, si le counter est supérieur au nombre de resultat, arreter l'affichage et faire en sorte de supprimer le bouton.
- Set time Out pour le spinner au chargement
- Faire les autres requetes
- Evenement pour faire apparaitre le resultat de la recherche

*/