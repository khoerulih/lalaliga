import Api from '../data/api.js';
import CacheApi from '../data/cache.js';

const matchLoader = () => {
  
  CacheApi.getScheduledMatch()
  .then(data => {
    getMatch(data);
  })
  .catch(message => {
    console.log(message);
  })

  if(window.navigator.onLine){
    Api.getScheduledMatch()
    .then(data => {
      getMatch(data);
    })
    .catch(message => {
      console.log(message);
    })
  }
}

const getMatch = (datas) => {
  let matchHTML = '';
  if(datas != undefined){
    if(datas.length > 0){
      datas.forEach((data) => {
        matchHTML += `
        <tr>
          <td>Matchday ${data.matchday}</td>
          <td>${data.homeTeam.name}</td>
          <td>Vs</td>
          <td>${data.awayTeam.name}</td>
          <td>${data.utcDate}</td>
        </tr>
        `;
      });
    }else{
      matchHTML +=`
      <h6 class="message center-align">No Upcoming Match Available / Liga has ended </h6>`;
    }
  } else {
    matchHTML += `<h6 class="message center-align">Slow/No Network Connection Detected, This page never accessed, so it can be accesed in offline mode</h6>`;
  }
  document.getElementById("match-table").innerHTML = matchHTML;
}

export default matchLoader;
