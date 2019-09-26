const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Load routes
const tournaments = require('./routes/api/Tournaments');
const users = require('./routes/users');

//Bodyparser middleware
app.use(bodyParser.json());

//DB configuration
const db = require('./conf/keys').mongoURI;

//connect Mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/tournaments', tournaments);
app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));

