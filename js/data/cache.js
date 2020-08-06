const baseUrl = "https://api.football-data.org/v2";

class CacheApi{
  static getStandings(){
    if('caches' in window){
      return caches.match(`${baseUrl}/competitions/2014/standings`)
        .then(response => {
          if(response){
            return response.json();
          }
        })
        .then(responseJson => {
          if(responseJson){
            if(responseJson.standings){
              return Promise.resolve(responseJson.standings);
            } else {
              return Promise.reject('Data Error');
            }
          }
        })
    }
  }

  static getScheduledMatch(){
    if("caches" in window){
      return caches.match(`${baseUrl}/competitions/2014/matches?status=SCHEDULED`)
        .then(response => {
          if(response){
            return response.json();
          }
        })
        .then(responseJson => {
          if(responseJson){
            if(responseJson.matches){
              return Promise.resolve(responseJson.matches);
            } else {
              return Promise.reject('Data Error');
            }
          }
        })
    }
  }

  static getTopScorer(){
    if("caches" in window){
      return caches.match(`${baseUrl}/competitions/2014/scorers`)
        .then(response => {
          if(response){
            return response.json();
          }
        })
        .then(responseJson => {
          if(responseJson){
            if(responseJson.scorers){
              return Promise.resolve(responseJson.scorers);
            } else {
              return Promise.reject('Data Error');
            }
          }
        })
    }
  }

  static getDetailTeam(teamId){
    if("caches" in window){
      return caches.match(`${baseUrl}/teams/${teamId}`)
        .then(response => {
          if(response){
            return response.json();
          }
        })
        .then(responseJson => {
          if(responseJson){
            return Promise.resolve(responseJson);
          }
        })
    }
  }

  static getClubScheduledMatch(team_id){
    if("caches" in window){
      return caches.match(`${baseUrl}/teams/${team_id}/matches?competitions=2014&status=SCHEDULED`)
        .then(response => {
          if(response){
            return response.json();
          }
        })
        .then(responseJson => {
          if(responseJson){
            if(responseJson.matches){
              return Promise.resolve(responseJson.matches);
            } else {
              return Promise.reject('Data Error');
            }
          }
        })
    }
  }

  static getClubFinishedMatch(team_id){
    if("caches" in window){
      return caches.match(`${baseUrl}/teams/${team_id}/matches?competitions=2014&status=FINISHED`)
        .then(response => {
          if(response){
            return response.json();
          }
        })
        .then(responseJson => {
          if(responseJson){
            if(responseJson.matches){
              return Promise.resolve(responseJson.matches);
            } else {
              return Promise.reject('Data Error');
            }
          }
        })
    }
  }
}

export default CacheApi;