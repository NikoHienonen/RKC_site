const router = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require('../../models/Tournament');
const Team = require('../../models/Team');

// Get teams by a tournament ID
router.get('/', (req, res) => {
  const { tournamentId } = req.params;
  Tournament.findOne({_id: tournamentId})
    .then(tournament => {
      const { teams } = tournament;
      res.status(200).json({
        count: teams.length,
        teams: teams
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "No tournament found"
      });
    });
});

//Get one team from a tournament by tournament and team IDs
router.get('/:teamId', (req, res) => {
  const { tournamentId, teamId } = req.params;
  Tournament.findOne({_id: tournamentId})
    .then(tournament => {
      const team = tournament.teams.id(teamId);
      if(team) {
        res.status(200).json({
          team: team
        });
      } else {
        res.status(500).json({
          error: "No team found"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Add teams to a tournament by a tournament ID
router.post('/', (req, res) => {
  const { tournamentId } = req.params;
  const { teams } = req.body;
  console.log(teams);
  Tournament.findByIdAndUpdate(tournamentId,
    {$set: {"teams": teams}},
    (err, result) => {
      if(err) {
        res.status(500).json({
          error: err
        });
      } else {
        res.status(201).send({
          count: result
        });
      }
    }
  );
});

module.exports = router;