const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Admin Model
const Admin = require('../../models/Admin');

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username)
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
          jwt.sign({admin: admin}, 'secretKey', {expiresIn: '1h'}, (err, token) => {
            console.log(token)
            res.status(200).json({
              message: 'Kirjauduttu',
              token: token,
              id: admin._id
            })
          });
        }
      })
    }
  });
});

//Create new admin
router.post('/', verifyToken, (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      console.log(err)
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
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
    }
  });
});

router.get('/addNew', (req, res) => {
  bcrypt.hash('rkcvolley', 10, (err, hash) => {
    Admin.create({
      username: 'antti',
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

// Change admin password 
router.patch('/:adminId', verifyToken, (req, res) => {
  const { adminId } = req.params;
  const { password, newPassword } = req.body;
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      res.status(403).json({
        msg: 'Unauthorized'
      });
    } else {
      Admin.findById(adminId, (err, admin) => {
        if(err) console.log(err)
        if(!admin) {
          res.status(404).json({
            err: 'Adminia ei löytynyt'
          });
        } else {
          bcrypt.compare(password, admin.password, (err, result) => {
              if(!result) {
                res.status(400).json({
                  err: 'Väärä salasana'
                });
              } else {
                bcrypt.hash(newPassword, 10, (err, hash) => {
                  admin.password = hash;
                  admin.save();
                  res.status(200).json({
                    msg: 'Salasana vaihdettu'
                  });
                })
              }
          })
        }
      })
      .catch(err => console.log(err))
    }
  })
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