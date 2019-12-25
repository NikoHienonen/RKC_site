const router = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require('../../models/Tournament');
const Referee = require('../../models/Referee');

// Get referees by a tournament ID
router.get('/', (req, res) => {
  const { tournamentId } = req.params;
  Tournament.findOne({_id: tournamentId})
    .then(tournament => {
      const { referees } = tournament;
      res.status(200).json({
        count: referees.length,
        referees: referees.map(ref => {
          return {
            name: ref.name,
            matches: ref.matches
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "No tournament found"
      });
    });
});

//Get one referee from a tournament by tournament and referee IDs
router.get('/:refereeId', (req, res) => {
  const { tournamentId, refereeId } = req.params;
  Tournament.findOne({_id: tournamentId})
    .then(tournament => {
      const referee = tournament.referees.id(refereeId);
      if(match) {
        res.status(200).json({
          referee: referee
        });
      } else {
        res.status(500).json({
          error: "No referee found"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Add referees to a tournament by a tournament ID
router.post('/', (req, res) => {
  const { tournamentId } = req.params;
  const { referees } = req.body;
  Tournament.findByIdAndUpdate(tournamentId,
    {$set: {"referees": referees}},
    {new: true},
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

//Update the referees of a tournament by ID
router.patch('/', (req ,res) => {
  const { tournamentId } = req.params;
  const { referees } = req.body;
  Tournament.findByIdAndUpdate(tournamentId, {
    $set: {referees: referees}
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
})

// Delete a referee by its ID
router.delete('/:refereeId', (req, res) => {
  const { refereeId, tournamentId } = req.params;
  Tournament.findByIdAndUpdate(tournamentId, {
    $pull: {
      referees: { _id: refereeId}
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