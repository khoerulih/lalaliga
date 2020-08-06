const baseUrl = "https://api.football-data.org/v2";
const token = "c260a79c4292464a818cf276dc622551";

class Api{
  static getStandings(){
    return fetch(`${baseUrl}/competitions/2014/standings`, {
      headers: {
        "X-Auth-Token" : token
      }
    })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if(responseJson.standings){
        return Promise.resolve(responseJson.standings);
      } else {
        return Promise.reject('Data Error');
      }
    });
  }

  static getScheduledMatch(){
    return fetch(`${baseUrl}/competitions/2014/matches?status=SCHEDULED`, {
      headers: {
        "X-Auth-Token" : token
      }
    })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if(responseJson.matches){
        return Promise.resolve(responseJson.matches);
      } else {
        return Promise.reject('Data Error');
      }
    })
  }

  static getTopScorer(){
    return fetch(`${baseUrl}/competitions/2014/scorers`, {
      headers: {
        "X-Auth-Token" : token
      }
    })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if(responseJson.scorers){
        return Promise.resolve(responseJson.scorers);
      } else {
        return Promise.reject('Data Error');
      }
    })
  }

  static getDetailTeam(teamId){
      return fetch(`${baseUrl}/teams/${teamId}`, {
        headers: {
          "X-Auth-Token" : token
        }
      })
      .then(response => {
        if(response){
          return response.json();
        }
      })
      .then(responseJson => {
        if(responseJson){
          return Promise.resolve(responseJson);
        } else {
          return Promise.reject('Data Error');
        }
      })
  }

  static getClubScheduledMatch(team_id){
    return fetch(`${baseUrl}/teams/${team_id}/matches?competitions=2014&status=SCHEDULED`, {
      headers: {
        "X-Auth-Token" : token
      }
    })
    .then(response => {
      if(response){
        return response.json();
      }
    })
    .then(responseJson => {
      if(responseJson.matches){
        return Promise.resolve(responseJson.matches);
      } else {
        return Promise.reject('Data Error');
      }
    })
  }

  static getClubFinishedMatch(team_id){
    return fetch(`${baseUrl}/teams/${team_id}/matches?competitions=2014&status=FINISHED`, {
      headers: {
        "X-Auth-Token" : token
      }
    })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if(responseJson.matches){
        return Promise.resolve(responseJson.matches);
      } else {
        return Promise.reject('Data Error');
      }
    })
  }
}

export default Api;