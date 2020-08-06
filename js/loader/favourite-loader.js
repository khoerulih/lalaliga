import db from '../data/db.js';

const getFavouritedTeam = () => {
  db.getAll().then((teams) => {
    console.log(teams);
    let infoTeam = "";
    if(teams != undefined){
      if(teams.length > 0){
        teams.forEach((team) => {
          let urlLogo = team.info_team.crestUrl;
          urlLogo = urlLogo.replace(/^http:\/\//i, 'https://');
          infoTeam += `
          <div class="col s12 l6">
            <div class="card hoverable">
              <div class="card-image">
                <a href="./detail-team.html?id=${team.info_team.id}&saved=true"><img class="club-logo" src="${urlLogo}"></a>
              </div>
              <div class="card-content">
                <span class="card-title">${team.info_team.name}</span>
                <table>
                  <tr>
                    <td><i class="material-icons">location_on</i> : ${team.info_team.address}</td>
                  </tr>
                  <tr>
                    <td><i class="material-icons">phone</i> : ${team.info_team.phone}</td>
                  </tr>
                  <tr>
                    <td><i class="material-icons">email</i> : ${team.info_team.email}</td>
                  </tr>
                  <tr>
                    <td><i class="material-icons">home</i> : ${team.info_team.venue}</td>
                  </tr>
                  <tr>
                    <td><i class="small material-icons">web_asset</i> : <a href="${team.info_team.website}">${team.info_team.website}</a></td>
                  </tr>
                </table>
              </div>
              <div class="card-action right-align">
                <a href="./detail-team.html?id=${team.info_team.id}&saved=true"><i class="material-icons">send</i> Detail</a>
              </div>
            </div>
          </div>
          `;
        });
      }else{
        infoTeam += `<h6 class="message center-align">You don't have any favourite club in la liga, to add favourite team, please click favourite button in detail team page</h6>`;
      }
    }else {
      InfoTeam += `<h6 class="message center-align"><h6 class="message center-align">Slow/No Network Connection Detected, This page never accessed, so it can be accesed in offline mode</h6>`;
    }
    document.getElementById("favourite-page").innerHTML = infoTeam;
  })
}

export default getFavouritedTeam;