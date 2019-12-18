const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//load routes
const tournaments = require('./routes/api/Tournaments');
const teams = require('./routes/api/Teams');
const admin = require('./routes/api/Admin');

//Map golbal promidr - get rid off deprication warning
mongoose.Promise = global.Promise;

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB configuration
const db = require('./conf/keys').mongoURI;

//connect Mongo
mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

  //connect mongoose
mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(result => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/tournaments', tournaments);
app.use('/api/teams', teams);
app.use('/api/admin', admin);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));

