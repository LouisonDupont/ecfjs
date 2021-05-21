const searchForm = document.querySelector("#search_artist_form");
const inputSearch = document.querySelector("#inputSearch");
const resultsZone = document.querySelector("#results_container");
const artistName = document.querySelector("#artist");
const searchResult = document.querySelector(".searchResult");
const bodyContainer = document.body;




// Variables changeantes

let myCounter = 1;
let resultatToggle = false;

function apiResult(artiste, response){
    if (artiste) {
        if (artiste.score === 100){ // je ressort que l'artiste avec un score de 100

            apiGetRecords(artiste.id);
            }

    } else {


        resultsZone.textContent = "Vous n'avez rien saisi";
        console.log("Error : 1 ");
    }
}


function apiRecords(artistId, response){
    // console.log(artistId)

    if(!resultatToggle){

        // 1. Partie Nom de l'artiste


        // Resultat de recherche
        let newArtisteResultat = document.createElement("span");
        newArtisteResultat.setAttribute('style', 'margin:2rem 0;');
        newArtisteResultat.textContent = "Résultat de la recherche :" + response.count + " ";

        // ici j'intègre l'article à l'espace principal
        searchResult.setAttribute('style', 'padding: 1rem 0; text-decoration: underline;')
        searchResult.appendChild(newArtisteResultat);

        resultatToggle = true;
        
    }

    // 2. Création de l'Article


    // Création de l'article (container)
    let myRecord = document.createElement("tr");
    myRecord.className = "resultTableData";

    myTable.appendChild(myRecord);

    // Integration du counter dans l'article
    let counter = document.createElement("th");
    counter.setAttribute("scope", "row");
    counter.textContent = myCounter;
    myCounter++;
    myRecord.appendChild(counter);


    if(myCounter >= 100){
        seeMore.setAttribute('style', 'display : block;')
    } else {
        seeMore.setAttribute('style', 'display : none;')
    }
    


    // Affichage des noms d'artistes
    let artistName = document.createElement("td");
    artistName.setAttribute("scope", "col");
    artistName.className = "artistName";
    artistName.textContent = recordNomFor();
    myRecord.appendChild(artistName);

    function recordNomFor () {
        let recordNom = '';
        for (var i = 0; i < artistId["artist-credit"].length; i++) {
            // tableau =  artistId["artist-credit"];
            // console.log(tableau);
            if(i>0){
                recordNom += " / " + artistId["artist-credit"][i].name;
            } else recordNom += artistId["artist-credit"][i].name;
            
        }
        return recordNom;
    }

    // Affichage des titres
    let newRecordName = document.createElement("td");
    newRecordName.className = "myRecordName";
    newRecordName.textContent = artistId.title;
    myRecord.appendChild(newRecordName);


    // Affichages des albums
    let newReleaseNom = document.createElement("td");
    newReleaseNom.className = "myRecordName";
    newReleaseNom.textContent = artistId.releases[0].title;
    myRecord.appendChild(newReleaseNom);

    // Case Bouton

    let btnTd = document.createElement("td");
    btnTd.className = "buttonInfoCase";
    myRecord.appendChild(btnTd);


    // Bouton PLUS

    let buttonInfo = document.createElement('button');
    buttonInfo.textContent = "Voir plus";
    buttonInfo.className ="btn btn-primary";
    buttonInfo.setAttribute("data-bs-toggle", "modal");
    buttonInfo.setAttribute("data-bs-target", "#testmodal");
    buttonInfo.setAttribute("dataId", artistId.releases[0].id);
    btnTd.appendChild(buttonInfo);

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
    modalTitle.textContent= "Plus d'informations sur : " + artistId["artist-credit"][0].name;
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
    });

    // Bouton "Voir plus "-> Appel des cover via un événement.

    buttonInfo.addEventListener("click", (ev) => {
        apiGetCover(artistId.releases[0].id);


        //  1. LA DUREE 

        if(artistId.length){
            duree = (millisToMinutesAndSeconds(artistId.length));
            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        }

        //  2. LE TITRE

        if(artistId.title){
            titre = artistId.title;
        }


         //  3. LE NOM

         if(artistId["artist-credit"]){
            artiste =  artistNomFor();
        function artistNomFor () {
            let artisteName = '';
            for (var i = 0; i < artistId["artist-credit"].length; i++) {
                artisteName += artistId["artist-credit"][i].name  + " ";
            }
            return artisteName;
        }
    }


        //  4. LA RELEASE

        if(artistId.releases){
            album = artistId.releases[0].title;
            // function releaseNomFor () {
            //     let releaseName = '';
            //     for (var i = 0; i < artistId.releases.length; i++) {
            //         releaseName += artistId.releases[i].title + " + ";
            //     }
            //     return releaseName;
            // }
        }

        //  5. LES TAGS / Genres

        if(artistId.tags){
            tag =tagsFor();
            function tagsFor () {
                let tagsName = '';
                for (var i = 0; i < artistId.tags.length; i++) {
                    tagsName += artistId.tags[i].name + " + ";
                }
                return tagsName;
            }
        }

        apiModal(duree, titre, artiste, album, tag = "");

    });

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalFooterClose = document.createElement("button");
    modalFooterClose.className = "btn btn-secondary";
    modalFooterClose.setAttribute('data-bs-dismiss', 'modal');
    modalFooterClose.setAttribute('type', 'button');
    modalFooterClose.textContent = 'Close';
    modalFooter.appendChild(modalFooterClose);

    modalFooterClose.addEventListener('click', function () {
        modalBody.textContent = null;
    })

    modalBtn.addEventListener('click', function () {
        modalBody.textContent = null;
    })

}

function apiTitres(artistId, response){
    // console.log(artistId)

    if(!resultatToggle){

        // 1. Partie Nom de l'artiste


        // Resultat de recherche
        let newArtisteResultat = document.createElement("span");
        newArtisteResultat.textContent = "Résultat de la recherche :" + response.count + " ";

        // ici j'intègre l'article à l'espace principal
        searchResult.setAttribute('style', 'padding: 1rem 0; text-decoration: underline;')
        searchResult.appendChild(newArtisteResultat);

        resultatToggle = true;
        
    }

    // 2. Création de l'Article


    // Création de l'article (container)
    let myRecord = document.createElement("tr");
    myRecord.className = "resultTableData";

    myTable.appendChild(myRecord);

    // Integration du counter dans l'article
    let counter = document.createElement("th");
    counter.setAttribute("scope", "row");
    counter.textContent = " " + myCounter;
    myCounter++;
    myRecord.appendChild(counter);

    if(myCounter >= 100){
        seeMore.setAttribute('style', 'display : block;')
    } else {
        seeMore.setAttribute('style', 'display : none;')
    }

    // Affichage des titres
    let newRecordName = document.createElement("td");
    newRecordName.className = "myRecordName";
    newRecordName.textContent = artistId.title;
    myRecord.appendChild(newRecordName);


    // Affichage des noms d'artistes
    let artistName = document.createElement("td");
    artistName.setAttribute("scope", "col");
    artistName.className = "artistName";
    artistName.textContent = recordNomFor();
    myRecord.appendChild(artistName);

    function recordNomFor () {
        let recordNom = '';
        for (var i = 0; i < artistId["artist-credit"].length; i++) {
            // tableau =  artistId["artist-credit"];
            // console.log(tableau);
            if(i>0){
                recordNom += " / " + artistId["artist-credit"][i].name;
            } else recordNom += artistId["artist-credit"][i].name;
            
        }
        return recordNom;
    }


    // Affichages des albums
    let newReleaseNom = document.createElement("td");
    newReleaseNom.className = "myRecordName";
    newReleaseNom.textContent = artistId.releases[0].title;
    myRecord.appendChild(newReleaseNom);

    // Case Bouton

    let btnTd = document.createElement("td");
    btnTd.className = "buttonInfoCase";
    myRecord.appendChild(btnTd);


    // Bouton PLUS

    let buttonInfo = document.createElement('button');
    buttonInfo.textContent = "Voir plus";
    buttonInfo.className ="btn btn-primary";
    buttonInfo.setAttribute("data-bs-toggle", "modal");
    buttonInfo.setAttribute("data-bs-target", "#testmodal");
    buttonInfo.setAttribute("dataId", artistId.releases[0].id);
    btnTd.appendChild(buttonInfo);

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
    modalTitle.textContent= "Plus d'informations sur : " + artistId.title;
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
    });

    // Bouton "Voir plus "-> Appel des cover via un événement.

    buttonInfo.addEventListener("click", (ev) => {
        apiGetCover(artistId.releases[0].id);


        //  1. LA DUREE 

        if(artistId.length){
            duree = (millisToMinutesAndSeconds(artistId.length)) + " minutes";
            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        }

        //  2. LE TITRE

        if(artistId.title){
            titre = artistId.title;
        }


         //  3. LE NOM

         if(artistId["artist-credit"]){
            artiste =  artistNomFor();
        function artistNomFor () {
            let artisteName = '';
            for (var i = 0; i < artistId["artist-credit"].length; i++) {
                artisteName += artistId["artist-credit"][i].name;
            }
            return artisteName;
        }
    }


        //  4. LA RELEASE

        if(artistId.releases){
            album = artistId.releases[0].title;
            // function releaseNomFor () {
            //     let releaseName = '';
            //     for (var i = 0; i < artistId.releases.length; i++) {
            //         releaseName += artistId.releases[i].title + " + ";
            //     }
            //     return releaseName;
            // }
        }

        //  5. LES TAGS / Genres

        if(artistId.tags){
            tag = tagsFor();
            function tagsFor () {
                let tagsName = '';
                for (var i = 0; i < artistId.tags.length; i++) {
                    tagsName += artistId.tags[i].name;
                }
                return tagsName;
            }
        }

        apiModal(duree, titre, artiste, album, tag = "");

    });

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalFooterClose = document.createElement("button");
    modalFooterClose.className = "btn btn-secondary";
    modalFooterClose.setAttribute('data-bs-dismiss', 'modal');
    modalFooterClose.setAttribute('type', 'button');
    modalFooterClose.textContent = 'Close';
    modalFooter.appendChild(modalFooterClose);

    modalFooterClose.addEventListener('click', function () {
        modalBody.textContent = null;
    })

    modalBtn.addEventListener('click', function () {
        modalBody.textContent = null;
    })

}



function apiModal(duree, titre, artiste, album, tag){
    const resultModal = document.querySelector("#modalBodyId");

    let myModalArtiste = document.createElement("p");
    myModalArtiste.textContent = "Artiste : " + artiste;
    myModalArtiste.className = "myModalArtiste";
    resultModal.appendChild(myModalArtiste);

    let myModalTitre = document.createElement("p");
    myModalTitre.textContent = "Titre : " + titre;
    myModalTitre.className = "myModalTitre";
    resultModal.appendChild(myModalTitre);

    let myModalDuree = document.createElement("p");
    myModalDuree.textContent = "Durée du titre : " + duree;
    myModalDuree.className = "myModalDuree";
    resultModal.appendChild(myModalDuree);

    let myModalAlbum = document.createElement("p");
    myModalAlbum.textContent = "Album : " + album;
    myModalAlbum.className = "myModalAlbum";
    resultModal.appendChild(myModalAlbum);

    if(tag != 0){
        let myModalTag = document.createElement("p");
        myModalTag.textContent = "Genre : " + tag;
        myModalTag.className = "myModalTag";
        resultModal.appendChild(myModalTag);
    }

    
}

function apiModalAlbum(titre, artiste, nbTitres, dateSortie){

    const resultModal = document.querySelector("#modalBodyId");

    let myModalTitre = document.createElement("p");
    myModalTitre.textContent = "Titre : " + titre;
    myModalTitre.className = "myModalTitre";
    resultModal.appendChild(myModalTitre);

    let myModalArtiste = document.createElement("p");
    myModalArtiste.textContent = "Artiste : " + artiste;
    myModalArtiste.className = "myModalArtiste";
    resultModal.appendChild(myModalArtiste);

    let myModalNbTitre = document.createElement("p");
    myModalNbTitre.textContent = "Nombre de titres : " + nbTitres;
    myModalNbTitre.className = "myModalNbTitre";
    resultModal.appendChild(myModalNbTitre);

    let myModalDate = document.createElement("p");
    myModalDate.textContent = "Date de sortie : " + dateSortie;
    myModalDate.className = "myModalDate";
    resultModal.appendChild(myModalDate);
}


function apiRelease(releaseName, response){
    console.log(releaseName);

    if (!resultatToggle){

        // 1. Partie Nom de l'album

        // Resultat de recherche
        let newReleaseResultat = document.createElement("span");
        newReleaseResultat.textContent = 'Résultat de la recherche pour : "' + releaseName.title +  '" ' + response.count + " ";

        // ici j'intègre l'article à l'espace principal
        searchResult.setAttribute('style', 'padding: 1rem 0; text-decoration: underline;')
        searchResult.appendChild(newReleaseResultat);

        resultatToggle = true;

    }


    // 2. Création de l'album

    // Création de l'article (container)
    let myRecord = document.createElement("tr");
    myRecord.className = "resultTableData";

    myTable.appendChild(myRecord);

    // Integration du counter dans l'article
    let counter = document.createElement("th");
    counter.setAttribute("scope", "row");
    counter.textContent = myCounter;
    myCounter++;
    myRecord.appendChild(counter);

    if(myCounter >= 100){
        seeMore.setAttribute('style', 'display : block;')
    } else {
        seeMore.setAttribute('style', 'display : none;')
    }


    // Affichage du titre de l'album
    let newReleaseName = document.createElement("td");
    newReleaseName.className = "myReleaseName";
    newReleaseName.textContent = releaseName.title;
    myRecord.appendChild(newReleaseName);

    // Affichage des noms d'artistes
    let artistName = document.createElement("td");
    artistName.className = "artistName";
    artistName.textContent = recordNomFor();
    myRecord.appendChild(artistName);

    function recordNomFor () {
        let recordNom = '';
        for (var i = 0; i < releaseName["artist-credit"].length; i++) {
            recordNom += releaseName["artist-credit"][i].name;
        }
        return recordNom;
    }

    // Affichage des titres
    let newReleaseNumber = document.createElement("td");
    newReleaseNumber.className = "myReleaseNumber";
    newReleaseNumber.textContent = releaseName["track-count"];
    myRecord.appendChild(newReleaseNumber);

    // Case Bouton

    let btnTd = document.createElement("td");
    btnTd.className = "buttonInfoCase";
    myRecord.appendChild(btnTd);

    // Bouton PLUS

    let buttonInfo = document.createElement('button');
    buttonInfo.textContent = "Voir plus";
    buttonInfo.className ="btn btn-primary";
    buttonInfo.setAttribute("data-bs-toggle", "modal");
    buttonInfo.setAttribute("data-bs-target", "#testmodal");
    buttonInfo.setAttribute("dataId", releaseName.id);
    btnTd.appendChild(buttonInfo);

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
    modalTitle.textContent= "Plus d'informations sur : " + releaseName.title;;
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
    });

    // Bouton "Voir plus "-> Appel des cover via un événement.

    buttonInfo.addEventListener("click", (ev) => {
        apiGetCover(releaseName.id);

        //titre, artiste, nbTitres, dateSortie

        //  1. LE TITRE

        if(releaseName.title){
            titre = releaseName.title;
        }


         //  2. l'Artiste

         if(releaseName["artist-credit"]){
            artiste = artistNomFor();
        function artistNomFor () {
            let artisteName = '';
            for (var i = 0; i < releaseName["artist-credit"].length; i++) {
                artisteName += releaseName["artist-credit"][i].name;
            }
            return artisteName;
        }
    }


        //  3. Le nombres de titres

        if(releaseName['track-count']){
            nbTitres = releaseName['track-count'];
        }

        //  4. Date de sortie

        if(releaseName.date){
            dateSortie = releaseName.date;
        }

        apiModalAlbum(titre, artiste, nbTitres, dateSortie);

    });

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalFooterClose = document.createElement("button");
    modalFooterClose.className = "btn btn-secondary";
    modalFooterClose.setAttribute('data-bs-dismiss', 'modal');
    modalFooterClose.setAttribute('type', 'button');
    modalFooterClose.textContent = 'Close';
    modalFooter.appendChild(modalFooterClose);

    modalFooterClose.addEventListener('click', function () {
        modalBody.textContent = null;
    })

    modalBtn.addEventListener('click', function () {
        modalBody.textContent = null;
    })

}

function apiAll(releaseName, response){
    // console.log(releaseName);

    

    if (!resultatToggle){

        // 1. Partie Nom de l'album

        // Resultat de recherche
        let newReleaseResultat = document.createElement("span");
        newReleaseResultat.textContent = 'Résultat de la recherche pour : "' + releaseName.title +  '" ' + response.count + " ";

        // ici j'intègre l'article à l'espace principal
        searchResult.setAttribute('style', 'padding: 1rem 0; text-decoration: underline;')
        searchResult.appendChild(myRelease);

        resultatToggle = true;

    }

    if (releaseName) {
        if (releaseName.score === 100){ 

            
    // 2. Création de l'album

    // Création de l'article (container)
    let myRecord = document.createElement("tr");
    myRecord.className = "resultTableData";

    myTable.appendChild(myRecord);

    // Integration du counter dans l'article
    let counter = document.createElement("th");
    counter.setAttribute("scope", "row");
    counter.textContent = myCounter;
    myCounter++;
    myRecord.appendChild(counter);

    if(myCounter >= 100){
        seeMore.setAttribute('style', 'display : block;')
    } else {
        seeMore.setAttribute('style', 'display : none;')
    }

    // Affichage des noms d'artistes
    let artistName = document.createElement("td");
    artistName.className = "artistName";
    artistName.textContent = recordNomFor();
    myRecord.appendChild(artistName);

    function recordNomFor () {
        let recordNom = '';
        for (var i = 0; i < releaseName["artist-credit"].length; i++) {
            recordNom += releaseName["artist-credit"][i].name;
        }
        return recordNom;
    }


    // Affichage des titres
    let newReleaseName = document.createElement("td");
    newReleaseName.className = "myReleaseName";
    newReleaseName.textContent = releaseName.title;
    myRecord.appendChild(newReleaseName);

    // Affichages des albums
    let newReleaseNom = document.createElement("td");
    newReleaseNom.className = "myRecordName";
    newReleaseNom.textContent = releaseName.releases[0].title;
    myRecord.appendChild(newReleaseNom);

     // Case Bouton

     let btnTd = document.createElement("td");
     btnTd.className = "buttonInfoCase";
     myRecord.appendChild(btnTd);

    // Bouton PLUS

    let buttonInfo = document.createElement('button');
    buttonInfo.textContent = "Voir plus";
    buttonInfo.className ="btn btn-primary";
    buttonInfo.setAttribute("data-bs-toggle", "modal");
    buttonInfo.setAttribute("data-bs-target", "#testmodal");
    buttonInfo.setAttribute("dataId", releaseName.id);
    btnTd.appendChild(buttonInfo);

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
    });

    // Bouton "Voir plus "-> Appel des cover via un événement.

    buttonInfo.addEventListener("click", (ev) => {
        apiGetCover(releaseName.id);

        //titre, artiste, nbTitres, dateSortie

        //  1. LE TITRE

        if(releaseName.title){
            titre = "title : " + releaseName.title;
        }


         //  2. l'Artiste

         if(releaseName["artist-credit"]){
            artiste =  " nom artiste : " + artistNomFor() + " ";
        function artistNomFor () {
            let artisteName = '';
            for (var i = 0; i < releaseName["artist-credit"].length; i++) {
                artisteName += releaseName["artist-credit"][i].name + " + ";
            }
            return artisteName;
        }
    }


        //  3. Le nombres de titres

        if(releaseName['track-count']){
            nbTitres = "Nombre de titres : " + releaseName['track-count'];
        }

        //  4. Date de sortie

        if(releaseName.date){
            dateSortie = "Date de sortie : " + releaseName.date;
        }

        apiModalAlbum(titre, artiste, nbTitres, dateSortie);

    });

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalFooterClose = document.createElement("button");
    modalFooterClose.className = "btn btn-secondary";
    modalFooterClose.setAttribute('data-bs-dismiss', 'modal');
    modalFooterClose.setAttribute('type', 'button');
    modalFooterClose.textContent = 'Close';
    modalFooter.appendChild(modalFooterClose);

    // Gestion des refresh 

    modalFooterClose.addEventListener('click', function () {
        modalBody.textContent = null;
    })

    modalBtn.addEventListener('click', function () {
        modalBody.textContent = null;
    })


            }

    } else {
        resultsZone.textContent = "Vous n'avez rien saisi";
        console.log("Error : 1 ");
    }

}


function apiCover(idrelease){
    // console.log(idrelease);

    let myCoverContainer = document.createElement("div");
    myCoverContainer.className = "myCoverContainer";
    myCoverContainer.setAttribute('style', 'grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));')


    // Création de l'article (container)
    let myRelease = document.createElement("div");
    myRelease.className = "myRelease";
    myRelease.setAttribute('style', 'display: flex; justify-content : center; align-items: center; margin: 2rem 0;')
    myCoverContainer.appendChild(myRelease);

    // Affichages image
    let newReleaseCover = document.createElement("img");
    newReleaseCover.className = "myRecordId";
    newReleaseCover.setAttribute('src', idrelease.thumbnails.small);
    newReleaseCover.setAttribute('style', 'display: inline;')
    myRelease.appendChild(newReleaseCover); 


    // Puis j'assigne le résultat à la modal

    const modalContainer = document.querySelector("#modalBodyId")
    modalContainer.appendChild(myCoverContainer);
}

// Créer function Counter

let offset = 0;
const btn_plus = document.querySelector("#btn_more");

btn_plus.addEventListener("click", () =>{
    apiGetArtist(artistName.value);
    offset++;
});
