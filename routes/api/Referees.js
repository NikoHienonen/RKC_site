const router = require("express").Router({ mergeParams: true });
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use body-parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Tournament Model
const Tournament = require("../../models/Tournament");

// Referee login
// Admin login
router.post("/login", (req, res) => {
  const { tournamentId } = req.params;
  const { username, password } = req.body;
  console.log(username);
  Tournament.findById(tournamentId, (err, tournament) => {
    if (err) {
      res.status(500).json({
        err: err,
      });
    } else {
      if (!tournament.referees || tournament.referees.length === 0) {
        res.status(404).json({
          err: "Turnauksessa ei ole tuomareita",
        });
      } else {
        const referee = tournament.referees.find(
          ({ name }) => name === username
        );
        if (!referee) {
          res.status(404).json({
            err: "Väärä käyttäjä",
          });
        } else {
          bcrypt.compare(password, referee.password, (err, result) => {
            if (err) {
              res.status(500).json({
                err: err,
              });
            } else {
              if (!result) {
                res.status(403).json({
                  err: "Väärä salasana",
                });
              } else {
                jwt.sign(
                  { referee: referee },
                  "secretKey",
                  { expiresIn: "24h" },
                  (err, token) => {
                    if (err) {
                      res.status(500).json({
                        err: er,
                      });
                    } else {
                      res.status(200).json({
                        message: "Kirjauduttu",
                        token: token,
                      });
                    }
                  }
                );
              }
            }
          });
        }
      }
    }
  });
});

// Get referees by a tournament ID
router.get("/", verifyToken, (req, res) => {
  const { tournamentId } = req.params;
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      console.log(err);
      res.status(403).json({
        msg: "Unauthorized",
      });
    } else {
      Tournament.findOne({ _id: tournamentId })
        .then((tournament) => {
          const { referees } = tournament;
          console.log(referees);
          res.status(200).json({
            count: referees.length,
            referees: referees.map((referee) => {
              return {
                id: referee._id,
                name: referee.name,
              };
            }),
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "No tournament found",
          });
        });
    }
  });
});

//Get one referee from a tournament by tournament and referee IDs
router.get("/:refereeId", verifyToken, (req, res) => {
  const { tournamentId, refereeId } = req.params;
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      console.log(err);
      res.status(403).json({
        msg: "Unauthorized",
      });
    } else {
      Tournament.findOne({ _id: tournamentId })
        .then((tournament) => {
          const referee = tournament.referees.id(refereeId);
          if (match) {
            res.status(200).json({
              referee: {
                id: referee._id,
                name: referee.name,
              },
            });
          } else {
            res.status(500).json({
              error: "No referee found",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

//Update the referees of a tournament by ID
router.patch("/", verifyToken, (req, res) => {
  const { tournamentId } = req.params;
  const { referees } = req.body;
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      console.log(err);
      res.status(403).json({
        msg: "Unauthorized",
      });
    } else {
      Tournament.findByIdAndUpdate(tournamentId, {
        $set: { referees: referees },
      })
        .then((result) => {
          res.status(200).json({
            message: "Successfully updated",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

//Add a referee to tournament referees by ID
router.patch("/add", verifyToken, (req, res) => {
  const { tournamentId } = req.params;
  const { name, password } = req.body.referee;
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      console.log(err);
      res.status(403).json({
        msg: "Unauthorized",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        Tournament.findByIdAndUpdate(tournamentId, {
          $push: {
            referees: {
              name: name,
              password: hash,
            },
          },
        })
          .then((result) => {
            res.status(200).json({
              message: "Successfully updated",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    }
  });
});

// Delete a referee by its name
router.delete("/:name", verifyToken, (req, res) => {
  const { tournamentId, name } = req.params;
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      console.log(err);
      res.status(403).json({
        msg: "Unauthorized",
      });
    } else {
      Tournament.findByIdAndUpdate(tournamentId, {
        $pull: {
          referees: { name: name },
        },
      })
        .then((result) => {
          res.status(200).json({
            message: "Delete succesful",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

function verifyToken(req, res, next) {
  // Get Auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Deconstruct bearer
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.status(403).json({
      err: "Unauthorized",
    });
  }
}

module.exports = router;
