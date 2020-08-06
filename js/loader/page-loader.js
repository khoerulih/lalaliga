import standingsLoader from './standings-loader.js';
import matchLoader from './match-loader.js';
import scorerLoader from './scorer-loader.js';
import getFavouritedTeam from './favourite-loader.js';
import preloader from '../component/preloader.js';

function pageLoader(page) {
  const xhttp =  new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      let content = document.querySelector("#content");
      
      if(page === 'home'){
        preloader.showPreloader();
        standingsLoader();
        preloader.hidePreloader();
      } else if (page === 'match'){
        preloader.showPreloader();
        matchLoader();
        preloader.hidePreloader();
      } else if (page === 'scorers'){
        preloader.showPreloader();
        scorerLoader();
        preloader.hidePreloader();
      } else if (page === 'favourite'){
        preloader.showPreloader();
        getFavouritedTeam();
        preloader.hidePreloader();
      }

      if(this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404){
        content.innerHTML = "<p>Halaman yang anda tuju tidak ditemukan, mungkin terdapat kesalahan pada link yang anda tuju?</p>";
      } else {
        content.innerHTML = "<p>Halaman tidak dapat diakses</p>";
      }
    }
  };
  xhttp.open("GET", "/common/pages/" + page + ".html", true);
  xhttp.send();
}

export default pageLoader;