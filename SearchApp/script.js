const search_input = document.getElementById("txt");
const spinner = document.getElementById("spinner");
const resultsDiv = document.getElementsByClassName("search-results")[0];
const p = document.getElementsByTagName("p")[0];
let ITUNES_ARRAY = [];

//sakrivanje results diva i teksta
if (search_input.value === "") {
    resultsDiv.style.backgroundColor = "#0e0e0e00";
    p.setAttribute("hidden", "");
}

//izvrsavanje funkcije na klik tipke
search_input.addEventListener("keyup", () => {
    ITUNES_ARRAY = [];
    let search_value = document.getElementById("txt").value;
    let typedEncoded = encodeURIComponent(search_value);
    let endpointFull =
        "https://itunes.apple.com/search?entity=song&country=hr&term=" +
        typedEncoded;
    const ul = document.getElementById("list");
    ul.innerHTML = "";

    //provjera da li je input prazan - sakrivanje spinnera
    if (search_value === "") {
        spinner.setAttribute("hidden", ""); //sakrivanje spinnera
        resultsDiv.style.backgroundColor = "#0e0e0e00";
        resultsDiv.style.boxShadow = "";
        p.setAttribute("hidden", "");
    } else {
        spinner.removeAttribute("hidden"); //prikaz spinnera
        resultsDiv.style.backgroundColor = "#2c2c2c";
    }

    //dohvat podataka
    if (search_value !== "") {
        //ako je input prazan, ne salji request
        fetch(endpointFull)
            .then((response) => response.json())
            .then((data) => {
                ITUNES_ARRAY = data.results;

                //provjera da li je array prazan - poruka tekst
                if (ITUNES_ARRAY === undefined || ITUNES_ARRAY.length == 0) {
                    p.removeAttribute("hidden");
                } else {
                    //kreiranje elemenata za sve u arrayu
                    ITUNES_ARRAY.map((element) => {
                        let li = document.createElement("li");
                        let img = document.createElement("img");
                        let span = document.createElement("span");

                        img.src = element.artworkUrl60;
                        span.textContent =
                            element.artistName + " - " + element.trackName;
                        li.appendChild(img);
                        li.appendChild(span);
                        ul.appendChild(li);
                    });
                    //sakrivanje teksta
                    p.setAttribute("hidden", "");
                }
                //sakrivanje spinnera
                spinner.setAttribute("hidden", "");
            });
    }
});
