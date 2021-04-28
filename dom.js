const searchForm = document.querySelector("#search_artist_form");
const inputSearch = document.querySelector("#inputSearch");
const resultsZone = document.querySelector("#results_container");
const artistName = document.querySelector("#artist");
const bodyContainer = document.body;

function apiResult(artiste){
    if (artiste) {
        if (artiste.score === 100){ // je ressort que l'artiste avec un score de 100


            //     Insertion de l'artiste
            // 1. Partie Nom de l'artiste


            // Création de l'article (container)
            let myArtist = document.createElement("article");
            myArtist.className = "myArtistArticle";

            // myArtist.id = id; // ici j'attribue le parametre id 

            // Création du nom de l'artiste et attribution
            let newArtisteName = document.createElement("span");
            newArtisteName.className = "myArtistName";
            newArtisteName.textContent = artiste.name + " ";
            myArtist.appendChild(newArtisteName);

            // Création du type de l'artiste et attribution
            let newArtisteType = document.createElement("span");
            newArtisteType.className = "myArtistType";
            newArtisteType.textContent = artiste.type + " ";
            myArtist.appendChild(newArtisteType);

            // ID
            let newArtisteId = document.createElement("span");
            newArtisteId.className = "myArtistId";
            newArtisteId.textContent = artiste.id + " ";
            myArtist.appendChild(newArtisteId);

            // Release
            // let newArtisteRelease = document.createElement("span");
            // newArtisteRelease.className = "myArtistRelease";
            // newArtisteRelease.textContent = artiste.release + " ";
            // myArtist.appendChild(newArtisteRelease);

            // ici j'intègre l'article à l'espace principal
            resultsZone.appendChild(myArtist);

            apiGetRecords(artiste.id);
            }

    } else {
        // Création de l'espace d'erreur
        // let errorMessage = document.createElement("p");
        // errorMessage.className = "errorMessage";
        // resultsZone.appendChild(errorMessage);


        resultsZone.textContent = "Vous n'avez rien saisi";
        console.log("Error : 1 ");
    }
}


function apiRecords(artistId){
    console.log(artistId)

    // Création de l'article (container)
    let myRecord = document.createElement("article");
    myRecord.className = "myRecordArticle";

    // Affichage des noms d'artistes
    let artistName = document.createElement("span");
    artistName.className = "artistName";
    artistName.textContent = "Artiste : " + artistId["artist-credit"][0].name + " ";
    myRecord.appendChild(artistName);

    // Affichage des titres
    let newRecordName = document.createElement("span");
    newRecordName.className = "myRecordName";
    newRecordName.textContent = "Titre : " + artistId.title + " ";
    myRecord.appendChild(newRecordName);

    // Affichages des albums
    let newReleaseName = document.createElement("span");
    newReleaseName.className = "myRecordName";
    newReleaseName.textContent = "Album : " + artistId.releases[0].title + " ";
    myRecord.appendChild(newReleaseName);

    // Affichages id de la Release
    let newReleaseId = document.createElement("span");
    newReleaseId.className = "myRecordId";
    newReleaseId.textContent = "Id de l'album : " + artistId.releases[0].id + " ";
    myRecord.appendChild(newReleaseId);

    // Bouton PLUS

    let buttonInfo = document.createElement('button');
    buttonInfo.textContent = "Voir plus";
    buttonInfo.className ="btn btn-primary";
    buttonInfo.setAttribute("data-bs-toggle", "modal");
    buttonInfo.setAttribute("data-bs-target", "#testmodal");

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

    apiGetCover(artistId.releases[0].id);

}

function apiCover(idrelease){
    console.log(idrelease);

    // Création de l'article (container)
    let myRelease = document.createElement("article");
    myRelease.className = "myRelease";

    // Affichages image
    let newReleaseCover = document.createElement("img");
    newReleaseCover.className = "myRecordId";
    newReleaseCover.setAttribute('src', idrelease.image);
    myRelease.appendChild(newReleaseCover); 


    // Puis j'assigne le résultat à la modal

    const modalContainer = document.querySelector("#modalBodyId")
    modalContainer.appendChild(myRelease);
}
