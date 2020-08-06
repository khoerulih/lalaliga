import pageLoader from '../loader/page-loader.js';

function loadNav() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      if(this.status != 200) return;

      document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
        elm.innerHTML = xhttp.responseText;
      });

      document.querySelectorAll(".topnav a, .sidenav a").forEach(elm => {
        elm.addEventListener("click", event => {
          const sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();
          let page = event.target.getAttribute("href").substr(1);
          pageLoader(page);
        });
      });
    }
  };
  xhttp.open("GET", "/common/nav.html", true);
  xhttp.send();
}

export default loadNav;