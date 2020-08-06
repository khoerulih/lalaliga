import Api from "../data/api.js";
import CacheApi from "../data/cache.js";
import db from "../data/db.js";

let urlParams = new URLSearchParams(window.location.search);
let idParam = urlParams.get("id");
let numberId = Number(idParam);
let savedParam = urlParams.get("saved");

const infoTeamLoader = () => {
  if(!savedParam){
    CacheApi.getDetailTeam(numberId)
    .then(data => {
      console.log("cache");
      getInfo(data);
      getInfoMobile(data);
    })
    .catch(message => {
      console.log(message);
    })
  
    if(window.navigator.onLine){
      Api.getDetailTeam(numberId)
      .then(data => {
        getInfo(data);
        getInfoMobile(data);
      })
      .catch(message => {
        console.log(message);
      })
    }
  } else{
    db.getById(numberId).then((data) => {
      getInfo(data.info_team);
      getInfoMobile(data.info_team);
    })
  }
}

const scheduledMatchLoader = () => {
  if(!savedParam){
    CacheApi.getClubScheduledMatch(numberId)
    .then(data => {
      getScheduled(data)
    })
    .catch(message => {
      console.log(message);
    })

    if(window.navigator.onLine){
      Api.getClubScheduledMatch(numberId)
      .then(data => {
        getScheduled(data)
      })
      .catch(message => {
        console.log(message);
      })
    }
  }else{
    db.getById(numberId).then((data) => {
      getScheduled(data.scheduled_match);
    })
  }
}

const finishedMatchLoader = () => {
  if(!savedParam){
    CacheApi.getClubFinishedMatch(numberId)
    .then(data => {
      getFinished(data)
    })
    .catch(message => {
      console.log(message);
    })

    if(window.navigator.onLine){
      Api.getClubFinishedMatch(numberId)
      .then(data => {
        getFinished(data)
      })
      .catch(message => {
        console.log(message);
      })
    }
  }else{
    db.getById(numberId).then((data) => {
      getFinished(data.finished_match);
    })
  }
}

const getInfo = (data) => {
  let infoTeamHTML = ''
  if(data != undefined){
    let urlLogo = data.crestUrl;
    urlLogo = urlLogo.replace(/^http:\/\//i, 'https://');
    infoTeamHTML += `
      <h2 class="header center-align">${data.name}</h2>
      <div class="card horizontal hide-on-med-and-down">
        <div class="card-image valign-wrapper">
          <img class="center-align" src="${urlLogo}" alt="${data.name}" onerror="this.src='/images/laliga-icon.png'">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <table>
              <tr>
                <td><i class="material-icons">person</i> : ${data.name}</td>
              </tr>
              <tr>
                <td><i class="material-icons">location_on</i> : ${data.address}</td>
              </tr>
              <tr>
                <td><i class="material-icons">phone</i> : ${data.phone}</td>
              </tr>
              <tr>
                <td><i class="material-icons">email</i> : ${data.email}</td>
              </tr>
              <tr>
                <td><i class="material-icons">home</i> : ${data.venue}</td>
              </tr>
              <tr>
                <td><i class="small material-icons">rss_feed</i> : <a href="${data.website}">${data.website}</a></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      `;
    }else{
      infoTeamHTML += `<h6 class="message center-align">Slow/No Network Connection Detected, This page never accessed, so it can be accesed in offline mode</h6>`;
    }
  document.getElementById("info-team").innerHTML = infoTeamHTML;
  // console.log(infoTeamHTML);
}

const getInfoMobile = (data) => {
  let infoTeamHTML = '';
  if(data != undefined){
    let urlLogo = data.crestUrl;
    urlLogo = urlLogo.replace(/^http:\/\//i, 'https://');
    infoTeamHTML = `
      <h2 class="header center-align">${data.name}</h2>
      <div class="card">
        <div class="card-image valign-wrapper">
          <img class="center-align" src="${urlLogo}" alt="${data.name}" onerror="/images/laliga-icon.png">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <table>
              <tr>
                <td><i class="material-icons">person</i> : ${data.name}</td>
              </tr>
              <tr>
                <td><i class="material-icons">location_on</i> : ${data.address}</td>
              </tr>
              <tr>
                <td><i class="material-icons">phone</i> : ${data.phone}</td>
              </tr>
              <tr>
                <td><i class="material-icons">email</i> : ${data.email}</td>
              </tr>
              <tr>
                <td><i class="material-icons">home</i> : ${data.venue}</td>
              </tr>
              <tr>
                <td><i class="small material-icons">web_asset</i> : <a href="${data.website}">${data.website}</a></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      `;
  } else {
    infoTeamHTML += `<h6 class="message center-align">Slow/No Network Connection Detected, This page never accessed, so it can be accesed in offline mode</h6>`;
  }
  document.getElementById("info-team-mobile").innerHTML = infoTeamHTML;
  // console.log(infoTeamHTML);
}

const getScheduled = (datas) => {
  let scheduledMatchHTML = '';
  if(datas != undefined){
    if(datas.length > 0){
      datas.forEach((data) => {
        scheduledMatchHTML += `
        <tr>
          <td>Matchday ${data.matchday}</td>
          <td>${data.homeTeam.name}</td>
          <td>Vs</td>
          <td>${data.awayTeam.name}</td>
          <td>${data.utcDate}</td>
        </tr>
        `;
      });
    } else {
      scheduledMatchHTML += `
      <h6 class="message center-align">No Upcoming Match Available / Liga has ended </h6>`;
    }
  }
  document.getElementById("table-upcoming").innerHTML = scheduledMatchHTML;
}

const getFinished = (datas) => {
  let finishedMatchHTML = '';
  if(datas != undefined){
    if(datas.length > 0){
    datas.forEach((data) => {
      finishedMatchHTML += `
        <tr>
          <td>Matchday ${data.matchday}</td>
          <td>${data.homeTeam.name}</td>
          <td>${data.score.fullTime.homeTeam}</td>
          <td>Vs</td>
          <td>${data.score.fullTime.awayTeam}</td>
          <td>${data.awayTeam.name}</td>
          <td>${data.utcDate}</td>
        </tr>
        `;
      });
    } else {
      finishedMatchHTML += `
      <h6 class="message center-align">No Finished Match Available </h6>`;
    }
  }
  document.getElementById("table-finished").innerHTML = finishedMatchHTML;
}

export default {
  infoTeamLoader,
  scheduledMatchLoader,
  finishedMatchLoader
};
