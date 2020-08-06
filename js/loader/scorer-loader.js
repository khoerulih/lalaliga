import Api from '../data/api.js';
import CacheApi from '../data/cache.js';

const scorerLoader = () => {
  CacheApi.getTopScorer()
  .then(data => {
    getScorer(data);
  })
  .catch(message => {
    console.log(message);
  })

  if(window.navigator.onLine){
    Api.getTopScorer()
    .then(data => {
      getScorer(data);
    })
    .catch(message => {
      console.log(message);
    })
  }
}

const getScorer = (datas) => {
  let scorerHTML = '';
  let pos = 1;
  if(datas != undefined){
    datas.forEach((data) => {
      scorerHTML += `
      <tr>
        <td>${pos++}</td>
        <td>${data.player.name}</td>
        <td>${data.team.name}</td>
        <td>${data.numberOfGoals}</td>
      </tr>
      `;
    });
  } else{
    scorerHTML += `<td colspan='4'><h6 class="message center-align">Slow/No Network Connection Detected, This page never accessed, so it can be accesed in offline mode</h6></td>`;
  }
  document.getElementById("scorer-table").innerHTML = scorerHTML;
}

export default scorerLoader;