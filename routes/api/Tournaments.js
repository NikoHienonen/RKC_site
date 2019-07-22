const express = require('express');
const router = express.Router();

//Tournament Model
const Tournament = require('../../models/Tournament');

//@route    GET api/tournaments
//@desc     GET All tournaments
//@access   Public
router.get('/', (req, res) => {
  Tournament.find()
    .sort({ date: -1 })
    .then(tournaments => res.json(tournaments))
});

//@route    POST api/tournaments
//@desc     Create a new tournament
//@access   Private
router.post('/', (req, res) => {
  const newTournament = new Tournament({
    name: req.body.name
    , active: req.body.active
    , teams: req.body.teams
    , matches: req.body.matches
  });
  newTournament.save().then(tournament => res.json(tournament))
});

//@route    DELETE api/tournaments
//@desc     Delete a tournament by Id
//@access   Private
router.delete('/:id', (req, res) => {
  Tournament.findById(req.params.id)
    .then(tournament => tournament.remove().then(() => res.json({success: true})))
    .catch(err => req.status(404).json({success: false}));
});

module.exports = router;