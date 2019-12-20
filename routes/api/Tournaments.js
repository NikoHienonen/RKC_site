const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require('../../models/Tournament');

// load auxiliary routes
const teams = require('./teams');

router.use('/:tournamentId/teams', teams);

// Get all tournaments
router.get('/', (req, res) => {
  Tournament.find()
    .exec()
    .then(documents => {
      res.status(200).json({
        count: documents.length,
        tournaments: documents.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            location: doc.location,
            date: doc.date,
            teams: doc.teams,
            referees: doc.referees.map(referee => {
              // Don't send the encrypted referee passwords
              return {name: referee.name, matches: referee.matches}
            }),
            matches: doc.matches,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/api/tournaments/'+doc._id
            }
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
});

// Get tournament by id
router.get('/:tournamentId', (req, res) => {
  const { tournamentId } = req.params;
  Tournament.findById(tournamentId)
    .exec()
    .then(tournament => {
      if (!tournament) {
        return res.status(404).json({
          message: "Tournament not found"
        });
      }
      res.status(200).json({
        tournament: tournament
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

//Create new tournament
router.post('/', (req, res) => {
  const { name, location, date } = req.body;
  Tournament.create({
    name: name,
    location: location,
    date: date,
  })
    .then(tournament => {
      res.status(201).json({
        message: "Tournament created",
        tournament: tournament
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})

// Update a tournament by ID
router.patch('/:tournamentId', (req ,res) => {
  const { tournamentId } = req.params;
  const updateFields = {};
  for (const [key, value] of Object.entries(req.body)) {
    console.log(key, value)
    updateFields[key] = value;
  }
  Tournament.update({_id: tournamentId}, {
    $set: updateFields
  }
  )
  .exec()
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
})

// Delete a tournament by ID
router.delete('/tournamentId', (req, res) => {
  const { tournamentId } = req.params;
  Tournament.remove({_id: tournamentId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Tournament deleted"
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;