import axios from 'axios';

export function getTournaments (callback) {
  axios.get('/api/tournaments')
    .then(response => {
      callback(response.data.tournaments);
    })
    .catch(err => console.log(err));
}

export function getTournamentById  (id, callback) {
  axios.get(`/api/tournaments/${id}`)
    .then(response => {
      callback(response.data.tournament);
    })
    .catch(err => console.log(err));
}

export function postNewTournament  (data, callback) {
  axios.post(`/api/tournaments/`, data)
    .then(response => {
      callback(response.data);
    })
    .catch(err => callback(err));
}

export function deleteTournament(id, callback) {
  axios.delete(`/api/tournaments/${id}`)
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}

export function updateTournament(id, callback) {
  axios.patch(`/api/tournaments/${id}`)
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}

export function addReferee(referee, tournamentId, callback) {
  axios.patch(`/api/tournaments/${tournamentId}/referees/add`, referee)
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}
export function deleteReferee(referee, tournamentId, callback) {
  console.log(referee)
  axios.delete(`/api/tournaments/${tournamentId}/referees/${referee.name}`)
    .then(response => callback(response))
    .catch(err => callback(err));
}
export function addTeam(team, id, callback) {
  axios.patch(`/api/tournaments/${id}/teams/${team}`)
    .then(response => callback(response))
    .catch(err => callback(err));
}
export function deleteTeam(team, id, callback) {
  axios.delete(`/api/tournaments/${id}/teams/${team}`)
    .then(response => callback(response))
    .catch(err => callback(err));
} 