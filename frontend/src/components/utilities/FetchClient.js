import axios from 'axios';

function getHeader() {
  const webToken = sessionStorage.getItem('currentAuthData');
  return {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${webToken}`
    }
  }
}

export function login(admin, callback) {
  axios.post(`/api/admin/login`, admin)
    .then(result => callback(result))
    .catch(err => callback(err));
}
export function changePassword(adminId, data, callback) {
  const { password, newPassword } = data;
  const sendData = {
    password,
    newPassword
  };
  axios.patch(`/api/admin/${adminId}/`, sendData, getHeader())
    .then(response => callback(response))
    .catch(err => callback(err));
}
export function getTournaments (callback) {
  axios.get('/api/tournaments', getHeader())
    .then(response => {
      callback(response.data.tournaments);
    })
    .catch(err => callback(err));
}

export function getTournamentById  (id, callback) {
  axios.get(`/api/tournaments/${id}`, getHeader())
    .then(response => {
      callback(response.data.tournament);
    })
    .catch(err => callback(err));
}

export function postNewTournament  (data, callback) {
  axios.post(`/api/tournaments/`, data, getHeader())
    .then(response => {
      callback(response.data);
    })
    .catch(err => callback(err));
}

export function deleteTournament(id, callback) {
  axios.delete(`/api/tournaments/${id}`, getHeader())
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}

export function updateTournament(id, data, callback) {
  axios.patch(`/api/tournaments/${id}`, data, getHeader())
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}

export function addReferee(referee, tournamentId, callback) {
  axios.patch(`/api/tournaments/${tournamentId}/referees/add`, referee, getHeader())
    .then(response => {
      callback(response);
    })
    .catch(err => callback(err));
}
export function deleteReferee(referee, tournamentId, callback) {
  axios.delete(`/api/tournaments/${tournamentId}/referees/${referee.name}`, getHeader())
    .then(response => callback(response))
    .catch(err => callback(err));
}
export function addTeam(team, id, callback) {
  axios.post(`/api/tournaments/${id}/teams/addTeam`, team, getHeader())
    .then(response => callback(response))
    .catch(err => callback(err));
}
export function deleteTeam(team, id, callback) {
  axios.delete(`/api/tournaments/${id}/teams/${team}`, getHeader())
    .then(response => callback(response))
    .catch(err => callback(err));
} 
export function addMatch(match, tournamentId, callback) {
  axios.post(`/api/tournaments/${tournamentId}/matches/`, match, getHeader())
    .then(result => callback(result))
    .catch(err => callback(err));
}
export function deleteMatchById(matchId, tournamentId, callback) {
  axios.delete(`/api/tournaments/${tournamentId}/matches/${matchId}`, getHeader())
    .then(response => callback(response))
    .catch(err => callback(err));
}