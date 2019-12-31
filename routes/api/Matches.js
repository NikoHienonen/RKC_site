const router = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require('../../models/Tournament');
const Match = require('../../models/Match');

// Get matches by a tournament ID
router.get('/', verifyToken, (req, res) => {
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

// Get matches by a referee name from a tournament
router.get('/byReferee/:refereeName', verifyToken, (req, res) => {
  const { tournamentId, refereeName } = req.params;
  Tournament.findById(tournamentId, (err, tournament) => {
    if(err) {
      res.status(500).json({
        err: err
      });
    } else {
      const { matches } = tournament; 
      if(!matches || matches.length === 0) {
        res.status(400).json({
          err: 'Ei otteluita'
        });
      } else {
        const foundMatches = matches.filter(match => match.refereeName === refereeName);
        if(!foundMatches || foundMatches.length === 0) {
          res.status(400).json({
            err: `Tuomarilla ${refereeName} ei ole otteluita`
          })
        } else {
          res.status(200).json({
            count: foundMatches.length,
            matches: foundMatches
          })
        }
      }
    }
  });
});

//Get one match from a tournament by tournament and match IDs
router.get('/:matchId', verifyToken, (req, res) => {
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

// Add a match to a tournament by a tournament ID
router.post('/', verifyToken, (req, res) => {
  const { tournamentId } = req.params;
  const { match } = req.body;
  console.log(match)
  Tournament.findByIdAndUpdate(tournamentId,
    {$push: {"matches": match}},
    {new: true},
    (err, result) => {
      if(err) {
        res.status(500).json({
          error: err
        });
      } else {
        res.status(201).send({
          result: result.matches
        });
      }
    }
  );
});

// Update a match by its ID and the tournament ID
router.patch('/:matchId', verifyToken, (req, res) => {
  const { tournamentId, matchId } = req.params;
  const { match } = req.body;
  console.log(match)
  Tournament.findById(tournamentId, (err, tournament) => {
    if(err) res.status(500).json({
      err: err
    })
    if(!tournament) res.status(404).json({
      err: "Turnausta ei löytynyt"
    });
    let foundMatch = tournament.matches.id(matchId);

    if(!foundMatch) res.status(404).json({
      err: "Ottelua ei löytynyt"
    });

    foundMatch = match;
    tournament.save();
    res.status(200).json({
      msg: "Ottelu päivitetty onnistuneesti"
    })
  });
});

//Save the stats of a match after it has been played of a tournament by ID
router.patch('/played/:matchId', verifyToken, (req ,res) => {
  const { tournamentId, matchId } = req.params;
  const { match } = req.body;
  if(!match) {
    res.status(400).json({
      err: 'No match found in body'
    });
  } else {
    Tournament.findById(tournamentId, (err, tournament) => {
      if(err) {
        console.log("no tournament")
        res.status(500).json({
          error: err
        });
      } else {
        const foundMatch = tournament.matches.id(matchId);
        console.log(foundMatch)
        if(!foundMatch) {
          console.log("no match")
          res.status(404).json({
            error: "No match found"
          })
        } else {
          foundMatch.homeRoundsWon = match.homeRoundsWon;
          foundMatch.visitorRoundsWon = match.visitorRoundsWon;
          foundMatch.homePointsWon = match.homePointsWon;
          foundMatch.visitorPointsWon = match.visitorPointsWon;
  
          const home = tournament.teams.find(team => team.name === foundMatch.homeTeam);
          const visitor = tournament.teams.find(team => team.name === foundMatch.visitorTeam);
          if(!home || !visitor) {
            console.log("no team")
            res.status(404).json({
              error: "No team found"
            })
          } else {
            const { homeRoundsWon, visitorRoundsWon, homePointsWon, visitorPointsWon} = match;
  
            if(homeRoundsWon > visitorRoundsWon) {
              home.gamesWon++;
              visitor.gamesLost++;
            } else if (homeRoundsWon < visitorRoundsWon) {
              home.gamesLost++;
              visitor.gamesWon++;
            } else {
              home.gamesDraw++;
              visitor.gamesDraw++;
            }
            home.roundsWon += Number(homeRoundsWon);
            home.roundsLost += Number(visitorRoundsWon);
            home.pointsWon += Number(homePointsWon);
            home.pointsLost += Number(visitorPointsWon);
            home.gamesPlayed++;
            visitor.roundsPlayed += Number(homeRoundsWon) + Number(visitorRoundsWon);
            visitor.roundsWon += Number(visitorRoundsWon);
            visitor.roundsLost += Number(homeRoundsWon);
            visitor.pointsWon += Number(visitorPointsWon);
            visitor.pointsLost += Number(homePointsWon);
            visitor.gamesPlayed++;
            tournament.save()
            res.status(201).json({
              msg: "Succesfully updated"
            });
          }
        }
      }
    })
  }
});

// Delete a match by its ID
router.delete('/:matchId', verifyToken, (req, res) => {
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

module.exports = router;