const selectForm = document.querySelector("#search-select");

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (selectForm.value == "artiste") {
        apiGetArtist(artistName.value);
    } else if (selectForm.value == "titre") {
        console.log("input sélectionné : titre");
    } else if (selectForm.value == "album") {
        console.log("input sélectionné : album");
    } else if (selectForm.value == "all") {
        console.log("input sélectionné : all");
    }
});


// Créer un spinner avec un timeout d'une seconde pour afficher le chargement