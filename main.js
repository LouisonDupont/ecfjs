const selectForm = document.querySelector("#search-select");
const myTable = document.querySelector("#tableBody");
const tableHeader = document.querySelector('#table_titres')
let tbIndex = document.querySelector(".index");
let tbFirst = document.querySelector(".first");
let tbSecond = document.querySelector(".second");
let tbThird = document.querySelector(".third");
let seeMore = document.querySelector("#btn_more");
let spinner = document.querySelector("#spinnerContainer");



searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();


    if (selectForm.value == "artiste") {
        myTable.innerHTML = null;
        tbIndex.textContent = " ";
        tbFirst.textContent = " ";
        tbSecond.textContent = " ";
        tbThird.textContent = " ";
        searchResult.innerHTML = null;
        spinner.setAttribute('style', 'padding: 5rem 0; display: flex; justify-content: center; align-items: center;');
        seeMore.setAttribute('style', 'display : none;');

        setTimeout(function(){
            resultatToggle = false;
            spinner.setAttribute('style', 'display: none;');

            tbIndex.textContent = "N°";
            tbFirst.textContent = "Artiste";
            tbSecond.textContent = "Titres";
            tbThird.textContent = "Album";

            

            apiGetArtist(artistName.value);},
                3000
        );
        
        myCounter = 1;
    } else if (selectForm.value == "titre") {
        myTable.innerHTML = null;

        tbIndex.textContent = " ";
        tbFirst.textContent = " ";
        tbSecond.textContent = " ";
        tbThird.textContent = " ";
        searchResult.innerHTML = null;
        spinner.setAttribute('style', 'padding: 5rem 0; display: flex; justify-content: center; align-items: center;');
        seeMore.setAttribute('style', 'display : none;');

        setTimeout(function(){
            spinner.setAttribute('style', 'display: none;');

            tbIndex.textContent = "N°";
            tbFirst.textContent = "Titre";
            tbSecond.textContent = "Artiste";
            tbThird.textContent = "Album";


            apiGetOnlyRecords(artistName.value);},
                3000
        );

        myCounter = 1;

        
    } else if (selectForm.value == "album") {
        myTable.innerHTML = null;
        tbIndex.textContent = " ";
        tbFirst.textContent = " ";
        tbSecond.textContent = " ";
        tbThird.textContent = " ";
        searchResult.innerHTML = null;
        spinner.setAttribute('style', 'padding: 5rem 0; display: flex; justify-content: center; align-items: center;');
        seeMore.setAttribute('style', 'display : none;');

        setTimeout(function(){
            spinner.setAttribute('style', 'display: none;');

            tbIndex.textContent = "N°";
            tbFirst.textContent = "Album";
            tbSecond.textContent = "Artiste";
            tbThird.textContent = "Nombre de titres";


            apiGetRelease(artistName.value);},
                3000
        );
        
        myCounter = 1;

    } else if (selectForm.value == "all") {
        myTable.innerHTML = null;
        tbIndex.textContent = " ";
        tbFirst.textContent = " ";
        tbSecond.textContent = " ";
        tbThird.textContent = " ";
        searchResult.innerHTML = null;
        spinner.setAttribute('style', 'padding: 5rem 0; display: flex; justify-content: center; align-items: center;');
        seeMore.setAttribute('style', 'display : none;');

        setTimeout(function(){
            spinner.setAttribute('style', 'display: none;');

            tbIndex.textContent = "N°";
            tbFirst.textContent = "Artiste";
            tbSecond.textContent = "Titre";
            tbThird.textContent = "Album";


            apiGetAll(artistName.value);},
                3000
        );
        
        myCounter = 1;
    }
});

