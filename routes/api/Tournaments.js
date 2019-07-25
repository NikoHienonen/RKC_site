const router = require('express').Router();

//Tournament Model
const Tournament = require('../../models/Tournament');

router.get('/', (req, res) => {
  Tournament.find()
    .sort({ date: -1 })
    .then(tournaments => res.json(tournaments))
});

router.get('/:id', (req, res) => {
  Tournament.findById(req.params.id)
    .then(tournament => res.json(tournament))
    .catch(err => res.status(404).json({success: false}));
});

router.post('/', (req, res) => {
  const newTournament = new Tournament({
    name: req.body.name
    , active: req.body.active
    , teams: req.body.teams
    , matches: req.body.matches
  });
  newTournament.save().then(tournament => res.json(tournament))
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