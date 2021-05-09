const searchForm = document.querySelector("#search_artist_form");
const inputSearch = document.querySelector("#inputSearch");
const resultsZone = document.querySelector("#results_container");
const artistName = document.querySelector("#artist");
const bodyContainer = document.body;
// Creation du COUNTER

let myCounter = 0;

function apiResult(artiste, response){
    if (artiste) {
        if (artiste.score === 100){ // je ressort que l'artiste avec un score de 100
            console.log(artiste);
            console.log(response);


            apiGetRecords(artiste.id);
            }

    } else {


        resultsZone.textContent = "Vous n'avez rien saisi";
        console.log("Error : 1 ");
    }
}


function apiRecords(artistId, response){
    console.log(artistId)

    // 1. Partie Nom de l'artiste


    // Création de l'article (container)
    let myArtist = document.createElement("article");
    myArtist.className = "myArtistArticle";

    // Création du nom de l'artiste et attribution
    let newArtisteName = document.createElement("span");
    newArtisteName.className = "myArtistName";
    newArtisteName.textContent = artistId["artist-credit"][0].name + " ";
    myArtist.appendChild(newArtisteName);

    // Resultat de recherche
    let newArtisteResultat = document.createElement("span");
    newArtisteResultat.textContent = "Résultat de la recherche :" + response.count + " ";
    myArtist.appendChild(newArtisteResultat);

    // ici j'intègre l'article à l'espace principal
    resultsZone.appendChild(myArtist);




    // 2. Création de l'Article

    // Création de l'article (container)
    let myRecord = document.createElement("article");
    myRecord.className = "myRecordArticle";

    // Integration du counter dans l'article
    let counter = document.createElement("span");
    counter.textContent = myCounter;
    myCounter++;
    myRecord.appendChild(counter);


    // Affichage des noms d'artistes
    let artistName = document.createElement("span");
    artistName.className = "artistName";
    artistName.textContent = "Artiste : " + recordNomFor() + " ";
    myRecord.appendChild(artistName);

    function recordNomFor () {
        let recordNom = '';
        for (var i = 0; i < artistId["artist-credit"].length; i++) {
            recordNom += artistId["artist-credit"][i].name + " + ";
        }
        return recordNom;
    }

    // Affichage des titres
    let newRecordName = document.createElement("span");
    newRecordName.className = "myRecordName";
    newRecordName.textContent = "Titre : " + artistId.title + " ";
    myRecord.appendChild(newRecordName);


    // Affichages des albums
    let newReleaseName = document.createElement("span");
    newReleaseName.className = "myRecordName";
    newReleaseName.textContent = "Album : " + recordAlbumFor() + " ";
    myRecord.appendChild(newReleaseName);

    function recordAlbumFor () {
        let recordAlbum = '';
        for (var i = 0; i < artistId["artist-credit"].length; i++) {
            recordAlbum += artistId["artist-credit"][i].name + " + ";
        }
        return recordAlbum;
    }

    // // Affichages id de la Release
    // let newReleaseId = document.createElement("span");
    // newReleaseId.className = "myRecordId";
    // newReleaseId.textContent = "Id de l'album : " + artistId.releases[0].id + " ";
    // myRecord.appendChild(newReleaseId);


    // Bouton PLUS

    let buttonInfo = document.createElement('button');
    buttonInfo.textContent = "Voir plus";
    buttonInfo.className ="btn btn-primary";
    buttonInfo.setAttribute("data-bs-toggle", "modal");
    buttonInfo.setAttribute("data-bs-target", "#testmodal");
    buttonInfo.setAttribute("dataId", artistId.releases[0].id);

    // Création Modal

    let divModal = document.createElement("div");
    divModal.className = "modal fade";
    divModal.id = "testmodal";
    divModal.setAttribute('tabindex', '-1');
    divModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    divModal.setAttribute('aria-hidden', 'true');
    bodyContainer.appendChild(divModal); // ajout de la modal au body

    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";
    divModal.appendChild(modalDialog);

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.className = "modal-title";
    modalTitle.id = "exampleModalLabel";
    modalTitle.textContent= "Modal title";
    modalHeader.appendChild(modalTitle);

    let modalBtn = document.createElement("button");
    modalBtn.className = "btn-close";
    modalBtn.setAttribute('type', 'button');
    modalBtn.setAttribute('data-bs-dismiss', 'modal');
    modalBtn.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(modalBtn);

    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.id = "modalBodyId"
    modalContent.appendChild(modalBody);

    // EVENEMENTS A L'OUVERTURE DE LA MODAL : AFFICHAGE
    divModal.addEventListener('shown.bs.modal', function () {
        // console.log("ouverturemodal");
        // modalBody.textContent = null;
        // if(artistId.length){
        //     let duree = document.createElement("p");
        //     duree.textContent = "duréee : " + (artistId.length * 0.001 / 60) + ' minutes';
        //         modalBody.appendChild(duree);
        // }
        // if(artistId.title){
        //     let titreNom = document.createElement("p");
        //     titreNom.textContent = "title : " + artistId.title;
        //     modalBody.appendChild(titreNom);
        // }
        // if(artistId["artist-credit"]){
        //     let artistNom = document.createElement("p");
                
        //         artistNom.textContent =  " nom artiste : " + artistNomFor() + " ";
        //         modalBody.appendChild(artistNom);
        //     function artistNomFor () {
        //         let identiteArtist = '';
        //         for (var i = 0; i < artistId["artist-credit"].length; i++) {
        //             identiteArtist += artistId["artist-credit"][i].name + " + ";
        //         }
        //         return identiteArtist;
        //     }
        // }
        // if(artistId.releases){
        //     let releaseNom = document.createElement("p");
                
        //         releaseNom.textContent =  " nom album : " + releaseNomFor() + " ";
        //         modalBody.appendChild(releaseNom);
        //     function releaseNomFor () {
        //         let identiteRelease = '';
        //         for (var i = 0; i < artistId.releases.length; i++) {
        //             identiteRelease += artistId.releases[i].title + " + ";
        //         }
        //         return identiteRelease;
        //     }
        // }
        // if(artistId.tags){
        //     let tags = document.createElement("p");
                
        //         tags.textContent =  " genre : " + tagsFor() + " ";
        //         modalBody.appendChild(tags);
        //     function tagsFor () {
        //         let tagsNom = '';
        //         for (var i = 0; i < artistId.tags.length; i++) {
        //             tagsNom += artistId.tags[i].name + " + ";
        //         }
        //         return tagsNom;
        //     }
        // }
    });

    // Appel des cover via un événement.

    buttonInfo.addEventListener("click", (ev) => {
        apiGetCover(artistId.releases[0].id);

        console.log("ouverturemodal");
        modalBody.textContent = null;
        if(artistId.length){
            let duree = document.createElement("p");
            duree.textContent = "duréee : " + (artistId.length * 0.001 / 60) + ' minutes';
                modalBody.appendChild(duree);
        }
        if(artistId.title){
            let titreNom = document.createElement("p");
            titreNom.textContent = "title : " + artistId.title;
            modalBody.appendChild(titreNom);
        }
        if(artistId["artist-credit"]){
            let artistNom = document.createElement("p");
                
                artistNom.textContent =  " nom artiste : " + artistNomFor() + " ";
                modalBody.appendChild(artistNom);
            function artistNomFor () {
                let identiteArtist = '';
                for (var i = 0; i < artistId["artist-credit"].length; i++) {
                    identiteArtist += artistId["artist-credit"][i].name + " + ";
                }
                return identiteArtist;
            }
        }
        if(artistId.releases){
            let releaseNom = document.createElement("p");
                
                releaseNom.textContent =  " nom album : " + releaseNomFor() + " ";
                modalBody.appendChild(releaseNom);
            function releaseNomFor () {
                let identiteRelease = '';
                for (var i = 0; i < artistId.releases.length; i++) {
                    identiteRelease += artistId.releases[i].title + " + ";
                }
                return identiteRelease;
            }
        }
        if(artistId.tags){
            let tags = document.createElement("p");
                
                tags.textContent =  " genre : " + tagsFor() + " ";
                modalBody.appendChild(tags);
            function tagsFor () {
                let tagsNom = '';
                for (var i = 0; i < artistId.tags.length; i++) {
                    tagsNom += artistId.tags[i].name + " + ";
                }
                return tagsNom;
            }
        }
    });
   
    // CONDITION D'APPARITION SI YA QUELQUE CHOSE OU NON
    // REFRESH APRES CHAQUE APPEL


    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalFooterClose = document.createElement("button");
    modalFooterClose.className = "btn btn-secondary";
    modalFooterClose.setAttribute('data-bs-dismiss', 'modal');
    modalFooterClose.setAttribute('type', 'button');
    modalFooterClose.textContent = 'Close';
    modalFooter.appendChild(modalFooterClose);



    myRecord.appendChild(buttonInfo);

    resultsZone.appendChild(myRecord);

    // apiGetCover(artistId.releases[0].id);

}


function apiCover(idrelease){
    console.log(idrelease);

    // Création de l'article (container)
    let myRelease = document.createElement("article");
    myRelease.className = "myRelease";

    // Affichages image
    let newReleaseCover = document.createElement("img");
    newReleaseCover.className = "myRecordId";
    newReleaseCover.setAttribute('src', idrelease.thumbnails.small);
    myRelease.appendChild(newReleaseCover); 


    // Puis j'assigne le résultat à la modal

    const modalContainer = document.querySelector("#modalBodyId")
    modalContainer.appendChild(myRelease);
}

// Créer function Counter

let offset = 0;
const btn_plus = document.querySelector("#btn_more");

btn_plus.addEventListener("click", () =>{
    apiGetArtist(artistName.value);
    offset++;
});
