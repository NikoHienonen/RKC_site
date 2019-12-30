const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require('../../models/Tournament');

// load auxiliary routes
const teams = require('./Teams');
const matches = require('./Matches');
const referees = require('./Referees');

// Get all tournaments
router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      console.log(err)
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
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
              defaultMatch: doc.defaultMatch,
              teams: doc.teams,
              referees: doc.referees,
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
    }
  });
});

// Get tournament by id
router.get('/:tournamentId', verifyToken, (req, res) => {
  const { tournamentId } = req.params;
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      console.log(err)
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
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
    }
  });
});

//Create new tournament
router.post('/', verifyToken, (req, res) => {
  const { name, location, date, defaultMatch } = req.body;
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      console.log(err)
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
      Tournament.create({
        name: name,
        location: location,
        date: date,
        defaultMatch: defaultMatch
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
    }
  });
})

// Update a tournament by ID
router.patch('/:tournamentId', verifyToken, (req ,res) => {
  const { tournamentId } = req.params;
  const { name, date, location, defaultMatch } = req.body;
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      console.log(err)
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
      Tournament.findByIdAndUpdate(tournamentId, 
        {
          name: name,
          date: date,
          location: location,
          defaultMatch: defaultMatch
        })
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
    }
  });
})

// Delete a tournament by ID
router.delete('/:tournamentId', verifyToken, (req, res) => {
  const { tournamentId } = req.params;
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      console.log(err)
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
      Tournament.findByIdAndRemove(tournamentId, (err, result) => {
        if(err) {
          res.status(500).json({
            error: err
          });
        } else {
          res.status(200).json({
            message: "Tournament deleted"
          })
        }
      })
    }
  });
});

function verifyToken(req, res, next) {
  // Get Auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Deconstruct bearer
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next(); 
  } else {
    // Forbidden
    res.status(403).json({
      err: 'Unauthorized'
    });
  }
}

// Use auxiliary routes
router.use('/:tournamentId/teams', teams);
router.use('/:tournamentId/matches', matches);
router.use('/:tournamentId/referees', referees);

module.exports = router;