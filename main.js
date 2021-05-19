const selectForm = document.querySelector("#search-select");

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (selectForm.value == "artiste") {
        resultsZone.innerHTML = " ";
        myCounter = 1;
        apiGetArtist(artistName.value);
    } else if (selectForm.value == "titre") {
        resultsZone.innerHTML = " ";
        myCounter = 1;
        apiGetOnlyRecords(artistName.value);
    } else if (selectForm.value == "album") {
        resultsZone.innerHTML = " ";
        myCounter = 1;
        apiGetRelease(artistName.value);
    } else if (selectForm.value == "all") {
        resultsZone.innerHTML = " ";
        myCounter = 1;
        apiGetAll(artistName.value);
    }
});


// Créer un spinner avec un timeout d'une seconde pour afficher le chargement