const API_URL = "https://musicbrainz.org/ws/2/";

// function artist(artist){
//     apiResult(artist)
//     // console.log(artist.id);
//     // console.log(artist.type);
//     // console.log(artist.name);
// }

function apiGetArtist(name) {
    const request = new XMLHttpRequest();
    // request.open("GET", API_URL + "artist?query=" + name + "&fmt=json", true);
    request.open("GET", API_URL + "artist/?query=" + encodeURIComponent(name) + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                console.log(response);
                // Ici j'appelle la fonction apiResult avec pour parametre l'artiste
                // De la reponse, je vais dans la première clée "artistes" sur laquelle je fais un map (tableau), puis chaque entrée va correspondre a "artiste" puis je fais un traitement dessus : ici de lui passer la fonction apiResult
                response.artists.map(artiste => apiResult(artiste));
                
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
    request.open("GET", API_URL + "recording/?query=arid:" + encodeURIComponent(artistId) + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                console.log(response);
                response.recordings.map(artistId => apiRecords(artistId));
                
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}


// Il va falloir obtenir l'ensemble des résultats et pas que les 25 premiers par défaut / pour cela je vais devoir décaler mon offset de 25 a chaque requete.

// // Paging
// Browse requests are the only requests which support paging: any browse request supports an 'offset=' argument to get more results. Browse requests also support 'limit=': the default limit is 25, and you can increase that up to 100.

// ${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}

// return await fetch(`${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}&limit=100&offset=${offset}&fmt=json`)

// https://musicbrainz.org/ws/2/recording/?query=artist:%22Daft%20punk%22&limit=100&offset=0&fmt=json

// https://musicbrainz.org/ws/2/recording/?query=collection:%22Daft%20punk%22&limit=100&offset=0&fmt=json

// scroll spy ou avec un detecteur viewport height

// En MODAL ou NON : penser a charger puis effacer la recherche après fermeture



// Je vais devoir faire 4 requetes : une requete sur les artists, les titres, les albums, et les 3

// 


// s'occuper du count