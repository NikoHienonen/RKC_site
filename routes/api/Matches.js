const router = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require('../../models/Tournament');
const Match = require('../../models/Match');

// Get matches by a tournament ID
router.get('/', (req, res) => {
  const { tournamentId } = req.params;
  Tournament.findOne({_id: tournamentId})
    .then(tournament => {
      const { matches } = tournament;
      res.status(200).json({
        count: matches.length,
        matches: matches
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "No tournament found"
      });
    });
});

//Get one match from a tournament by tournament and match IDs
router.get('/:matchId', (req, res) => {
  const { tournamentId, matchId } = req.params;
  Tournament.findOne({_id: tournamentId})
    .then(tournament => {
      const match = tournament.matches.id(matchId);
      if(match) {
        res.status(200).json({
          match: match
        });
      } else {
        res.status(500).json({
          error: "No match found"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Add matches to a tournament by a tournament ID
router.post('/', (req, res) => {
  const { tournamentId } = req.params;
  const { matches } = req.body;
  Tournament.findByIdAndUpdate(tournamentId,
    {$set: {"matches": matches}},
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

//Update the matches of a tournament by ID
router.patch('/', (req ,res) => {
  const { tournamentId } = req.params;
  Tournament.findByIdAndUpdate(tournamentId, {
    $set: {matches: req.body}
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

// Delete a match by its ID
router.delete('/:matchId', (req, res) => {
  const { matchId, tournamentId } = req.params;
  Tournament.findByIdAndUpdate(tournamentId, {
    $pull: {
      matches: { _id: matchId}
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