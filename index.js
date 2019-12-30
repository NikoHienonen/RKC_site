const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//load routes
const tournaments = require('./routes/api/Tournaments');
const admin = require('./routes/api/Admin');

//Map golbal promidr - get rid off deprication warning
mongoose.Promise = global.Promise;

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Avoid mongoose deprecation
mongoose.set('useFindAndModify', false);

//DB configuration
const db = require('./conf/keys').mongoURI;

// connect Mongo
mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

// connect mongoose
mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(result => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/tournaments', tournaments);
app.use('/api/admin', admin);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));

