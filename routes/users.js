const express = require('express');
const router = express.Router();

// User login route
router.get('/login', (req, res) => {
    res.send('login');
});

//User register route
router.get('/register', (req, res) => {
    res.send('register');
});

//Register user
router.post('/register', (req, res) => {
    res.json(req.body);
})

module.exports = router;