const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Admin Model
const Admin = require('../../models/Admin');

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({username: username}, (err, admin) => {
    if(err) res.status(500).json({
      err: err
    });
    if(!admin) {
      res.status(404).json({
        err: 'Ei käyttäjää'
      })
    } else {
      bcrypt.compare(password, admin.password, (err, response) => {
        if(err) {
          console.log(err)
          res.status(500).json({
            err: 'Network error'
          });
        } else if(!response) {
          res.status(401).json({
            err: 'Väärä salasana'
          });
        } else {
          res.status(200).json({
            message: 'Kirjauduttu'
          })
        }
      })
    }
  });
});

//Create new admin
router.post('/', (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    Admin.create({
      username: username,
      password: hash
    })
      .then(admin => {
        res.status(201).json({
          message: "Admin created",
          admin: admin.username
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  })
})

// Update a admin by ID
router.patch('/:adminId', (req ,res) => {
    const { adminId } = req.params;
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        console.log(key, value)
        updateFields[key] = value;
    }
    Admin.update({_id: adminId}, {
        $set: updateFields
    })
    .exec()
    .then(result => {
        res.status(200).json({
        admin: result
        });
    })
    .catch(err => {
        res.status(500).json({
        error: err
        });
    });
})

// Delete a admin by ID
router.delete('/adminId', (req, res) => {
  const { adminId } = req.params;
  Admin.remove({_id: adminId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Admin deleted"
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;