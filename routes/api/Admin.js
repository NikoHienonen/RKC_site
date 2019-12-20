const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Admin Model
const Admin = require('../../models/Admin');

// Get all Admins
router.get('/', (req, res) => {
  Admin.find()
    .exec()
    .then(documents => {
      res.status(200).json({
        count: documents.length,
        admins: documents.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            matches: doc.matches,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/api/admins/'+doc._id
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

// Get admin by id
router.get('/:adminId', (req, res) => {
  const { adminId } = req.params;
  Admin.findById(adminId)
    .exec()
    .then(admin => {
      if (!admin) {
        return res.status(404).json({
          message: "Admin not found"
        });
      }
      res.status(200).json({
        admin: admin
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

//Create new admin
router.post('/', (req, res) => {
  const { name, location, date } = req.body;
  Admin.create({
    name: name,
    location: location,
    date: date,
  })
    .then(admin => {
      res.status(201).json({
        message: "Admin created",
        admin: admin
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
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