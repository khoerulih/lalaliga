import team from '../loader/detailteam-loader.js';
function loadDetailNav() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      if(this.status != 200) return;

      document.querySelectorAll(".topnav").forEach(elm => {
        elm.innerHTML = xhttp.responseText;
      });

      document.querySelectorAll(".topnav a").forEach(elm => {
        elm.addEventListener("click", event => {

          let page = window.location.hash.substr(1);
          page = event.target.getAttribute("href").substr(1);
          location.href = `../../#${page}`;         
        });
      });
    }
  };
  xhttp.open("GET", "/common/nav.html", true);
  xhttp.send();
}

export default loadDetailNav;