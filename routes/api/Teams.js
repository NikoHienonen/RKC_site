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


//Add a team to teams of a tournament by ID
router.post('/addTeam', (req ,res) => {
  const { tournamentId } = req.params;
  const { name } = req.body;
  const team = new Team({name: name});
  console.log(team)
  Tournament.findByIdAndUpdate(tournamentId, {
    $push: {teams: team}
  }
  )
  .then(result => {
    res.status(200).json({
      message: "Successfully updated"
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

//Update the teams of a tournament by ID
router.patch('/', (req ,res) => {
  const { tournamentId } = req.params;
  Tournament.findByIdAndUpdate(tournamentId, {
    $set: {teams: req.body}
  }
  )
  .then(result => {
    res.status(200).json({
      message: "Successfully updated"
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// Delete a team from a tournament by id
router.delete('/:name', (req, res) => {
  const { name, tournamentId } = req.params;
  console.log(name)
  Tournament.findByIdAndUpdate(tournamentId, {
    $pull: {
      teams: { name: name}
    }
  })
    .then(result => {
      res.status(200).json({
        message: 'Delete succesful'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;