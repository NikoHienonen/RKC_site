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

export function deleteTeam(tournamentId, teamId, callback) {
  axios.delete(`/api/tournaments/${tournamentId}/teams/${teamId}`)
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}