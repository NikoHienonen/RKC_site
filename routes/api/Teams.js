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

teams.post('/:id', (req, res) => {
  Tournament.findOne({
    _id: req.params.id
  })
    .then(tournament => {
      const newTeam = new Team({
        name: req.body.name
      });
      tournament.teams.unshift(newTeam);
      tournament.save()
        .then(result => res.json(result))
        .catch(error => {
          console.log(error);
          res.send(error);
        })
    });
});

teams.delete('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => team.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = teams;