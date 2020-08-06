import Api from '../data/api.js';
import CacheApi from '../data/cache.js';
import db from '../data/db.js';

class Fab{
  static fabFavourite(id){
    let btnFav = document.getElementById("favorite");
    let detailTeam;
    let scheduledMatch;
    let finishedMatch;
  
    // get data from page
    CacheApi.getDetailTeam(id).then(data => { detailTeam = data});
    CacheApi.getClubScheduledMatch(id).then(data => {scheduledMatch = data});
    CacheApi.getClubFinishedMatch(id).then(data => {finishedMatch = data});

    if(window.navigator.onLine){
      Api.getDetailTeam(id).then(data => { detailTeam = data});
      Api.getClubScheduledMatch(id).then(data => {scheduledMatch = data});
      Api.getClubFinishedMatch(id).then(data => {finishedMatch = data});
    }

    btnFav.onclick = () => {
      console.log("Button fav diklik");
      db.addToFavourite(
        detailTeam,
        scheduledMatch,
        finishedMatch
      );
    }
  }

  static fabDelete(id){
    let btnDelete = document.getElementById("delete");
    btnDelete.onclick = () => {
      console.log("Button delete di klik");
      db.deleteFavourite(id);
      location.href = `../../#favourite`;
    }
  }
}

export default Fab;