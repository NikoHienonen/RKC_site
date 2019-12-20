const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String
    , required: true
  }
  , roundsPlayed: {
    type: Number
    , default: 0 
  }
  , roundsWon: {
    type: Number
    , default: 0 
  }
  , roundsLost: {
    type: Number
    , default: 0 
  }
  , pointsWon: {
    type: Number
    , default: 0 
  }
  , pointsLost: {
    type: Number
    , default: 0 
  }
});

module.exports = TeamSchema;
