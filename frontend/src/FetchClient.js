import axios from 'axios';


export function getTournaments (callback) {
  axios.get('/api/tournaments')
  .then(response => {
    callback(response.data);
  })
  .catch(err => console.log(err));
}

export function getTournamentById  (id, callback) {
  axios.get(`/api/tournaments/${id}`)
  .then(response => {
    callback(response.data);
  })
  .catch(err => console.log(err));
}

export function postNewTournament  (data, callback) {
  axios.post(`/api/tournaments/`, data)
  .then(response => {
    callback(response.data);
  })
  .catch(err => console.log(err));
}