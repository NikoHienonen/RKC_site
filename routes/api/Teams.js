const teams = require('express').Router();

//Team Model
const Tournament = require('../../models/Tournament');

teams.get('/', (req, res) => {
  Tournament.find({ teams: { $elemMatch: { name: "RKC" } } })
    .sort({ roundsWon: -1 })
    .then(teams => res.json(teams))
});

teams.get('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(err => res.status(404).json({success: false}));
});

teams.post('/', (req, res) => {
  const newTeam = new Team({
    name: req.body.name
  });
  newTeam.save().then(team => res.json(team))
});

teams.delete('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => team.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = teams;