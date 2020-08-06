import Api from "../data/api.js";
import CacheApi from "../data/cache.js";

const standingsLoader = () => {
  CacheApi.getStandings()
  .then(data => {
    if(data != undefined){
      getTable(data[0].table);
    }else{
      getTable(data)
    }
  })
  .catch(message => {
    console.log(message);
  })

  if(window.navigator.onLine){
    Api.getStandings()
    .then(data => {
      getTable(data[0].table)
    })
    .catch(message => {
      console.log(message);
    })
  }
}

const getTable = (data) => {
  let standingsTableHTML = '';
  if(data != undefined){
    data.forEach((datas) => {
      let urlLogo = datas.team.crestUrl;
      urlLogo = urlLogo.replace(/^http:\/\//i, 'https://');
      standingsTableHTML += `
      <tr>
        <td>${datas.position}</td> 
        <td><a href="./detail-team.html?id=${datas.team.id}" class="link-detail"><img class="club-logo-standings" src="${urlLogo}" alt="" width="24px"> ${datas.team.name}</a></td>
        <td>${datas.playedGames}</td>
        <td>${datas.points}</td>
        <td>${datas.won}</td>
        <td>${datas.draw}</td>
        <td>${datas.lost}</td>
        <td>${datas.goalDifference}</td>
      </tr>
      `;
    });
  } else {
    standingsTableHTML += `<td colspan='8'><h6 class="message center-align">Slow/No Network Connection Detected, This page never accessed, so it can be accesed in offline mode</h6></td>`;
  }
  document.getElementById("standings").innerHTML = standingsTableHTML;
}

export default standingsLoader;
