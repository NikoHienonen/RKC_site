const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crudAdmin = require('./crud/crud-admin');

//body-parser middleware
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Get Admin usernames
router.get('/all', (req, res) => {
    crudAdmin.getAdmins((admins, message) => {
        admins
        ? res.status(302).send(admins)
        : res.status(404).send(message);
    })
});

// Create new Admin
router.post('/newAdmin', (req, res) => {
    const { username, password } = req.body;
    crudAdmin.createNewAdmin(username, password, (user, message) => {
        user
        ? res.status(201).send(user)
        : res.status(400).send(message);
    });
});

// Admin login 
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    crudAdmin.authenticateAdmin(username, password, (user, message) => {
        user 
        ? res.status(200).send(user)
        : res.status(404).send(message);
    });
});

// Modify Admin account
router.put('/edit', (req, res) => {
    const { oldUsername, username, password } = req.body;
    crudAdmin.modifyAdmin(oldUsername, username, password, (user, message) => {
        user
        ? res.status(200).send(user)
        : res.status(400).send(message);
    });
});

module.exports = router;