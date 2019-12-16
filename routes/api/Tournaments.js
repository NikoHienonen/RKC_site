const router = require('express').Router();
const mongoose = require('mongoose');

//Tournament Model
require('../../models/Tournament');
const Tournament = mongoose.model('tournament');
/*
require('../../models/Team');
const Team = mongoose.model('team');
*/
router.get('/', (req, res) => {
  Tournament.find()
    .sort({ date: 'desc' })
    .then(tournaments => res.json(tournaments))
});

router.get('/:id', (req, res) => {
  Tournament.findById(req.params.id)
    .then(tournament => {
      console.log(tournament)
      res.json(tournament)
    })
    .catch(err => res.status(404).json({success: false}));
});

router.post('/', (req, res) => {
  let teamArray;
  /*if(req.body.teams){
    teamArray = req.body.teams.map(team => {
      let newTeam = new Team(team)
      console.log(newTeam)
      return newTeam
    });
  }*/
  console.log(teamArray)
  const newTournament = {
    name: req.body.name
    , date: req.body.date
    , teams: req.body.teams
    , location: req.body.location
  }
  new Tournament(newTournament)
    .save()
      .then(tournament => res.send(tournament))
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      });
});

router.delete('/:id', (req, res) => {
  Tournament.findById(req.params.id)
    .then(tournament => tournament.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

router.put('/update/:id', (req, res) => {
  Tournament.findOne({_id: req.params.id }, (err, found) => {
    if(err) {
      res.status(500).send();
    } else {
      if(!found) {
        res.status(404).send();
      } else {
        if(req.body.name) {
          found.name = req.body.name;
        }
        if(req.body.active) {
          found.active = req.body.active;
        }
        if(req.body.date) {
          found.date = req.body.date;
        }
        if(req.body.teams) {
          found.teams = req.body.teams;
        }
        if(req.body.matches) {
          found.matches = req.body.matches;
        }
        found.save((err, updatedObj) => {
          if(err) {
            res.status(500).send();
          } else {
            res.send(updatedObj);
          }
        })
      }
    }
  })
})


module.exports = router;