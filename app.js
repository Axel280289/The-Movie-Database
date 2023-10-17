// Je stocke ma clé API fourni par le site
const apiKey = "401cfc08b6dfde69142cdb54155f0c01";

const urlSearch =
  "https://api.themoviedb.org/3/search/movie?query=Batman&api_key=";

let page = 1;
const urlAll = `https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${page}&api_key=`;
const url = `${urlAll}${apiKey}`;

// Je crée une fonction asynchrone de manière générique que je nomme fetchApi et qui prend un url en paramètre
async function fetchApi(url) {
  // Je fait un "appel" sur l'api grâce à la méthode fetch et l'url et je stock la réponse obtenu dans une variable
  const response = await fetch(url);

  // Je transforme au format json les données contenue dans la réponse
  const datas = await response.json();

  // Je return les données
  return datas;
}
const datas = fetchApi(url);

//console.log(datas);

const moviesList = document.querySelector(".movies");

// Pour obtenir le résultat de la promesse on va utiliser la méthode .then
// Cette méthode va contenir une callback dont le paramètre correspond à nos fameuses données
datas.then((datas) => {
  // console.log(datas);
  //datas.result
  //datas['result']
  const { results, total_pages } = datas;

  const pages = document.querySelectorAll(".pages *");

  pages.forEach((element) => {
    if (element.classList.contains("previous")) {
      element.innerHTML = page - 1;
      element.addEventListener("click", () => {
        page--;
        if (page < 1) {
          page = 1;
        }
        element.innerHTML = page - 1 < 1 ? 1 : page - 1;
      });
    } else if (element.classList.contains("next")) {
      element.addEventListener("click", () => {
        page++;
        if (page > total_pages) {
          page = total_pages;
        }
        element.innerHTML = page + 1;
      });
    } else if (element.classList.contains("current")) {
      element.innerHTML = page;
    }
  });

  //console.log(results);
  results.forEach((movie) => {
    console.log(movie);
    const { poster_path, title, overview, original_title } = movie;

    moviesList.innerHTML += `

            <article>
                    <img src="https://image.tmdb.org/t/p/original${poster_path}" alt=" Affiche du film ${title}" />
                        <div class="desc">
                            <h2>${title}</h2>
                            <h3 id ="subtitle"> <mark> Titre Original :</mark> ${original_title}</h3>
                            <p><strong> Description :</strong> ${overview}</p>
                        </div>
            </article> `;
  });
});
