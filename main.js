const selectForm = document.querySelector("#search-select");
const myTable = document.querySelector("#tableBody");
let tbIndex = document.querySelector(".index");
let tbFirst = document.querySelector(".first");
let tbSecond = document.querySelector(".second");
let tbThird = document.querySelector(".third");


searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (selectForm.value == "artiste") {
        myTable.innerHTML = null;
        myCounter = 1;

        tbIndex.textContent = myCounter;
        tbFirst.textContent = "Artiste";
        tbSecond.textContent = "Titres";
        tbThird.textContent = "Album";

        apiGetArtist(artistName.value);
    } else if (selectForm.value == "titre") {
        myTable.innerHTML = null;
        myCounter = 1;

        tbIndex.textContent = myCounter;
        tbFirst.textContent = "Titre";
        tbSecond.textContent = "Artiste";
        tbThird.textContent = "Album";

        apiGetOnlyRecords(artistName.value);
    } else if (selectForm.value == "album") {
        myTable.innerHTML = null;
        myCounter = 1;

        tbIndex.textContent = myCounter;
        tbFirst.textContent = "Album";
        tbSecond.textContent = "Artiste";
        tbThird.textContent = "Nombre de titres";


        apiGetRelease(artistName.value);
    } else if (selectForm.value == "all") {
        myTable.innerHTML = null;
        myCounter = 1;

        tbIndex.textContent = myCounter;
        tbFirst.textContent = "Artiste";
        tbSecond.textContent = "Titre";
        tbThird.textContent = "Album";


        apiGetAll(artistName.value);
    }
});




// Créer un spinner avec un timeout d'une seconde pour afficher le chargement