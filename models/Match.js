const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  startingTime: {
    type: 'String',
    required: true
  },
  homeId: {
    type: String,
    required: true
  }
  , homeName: {
    type: String,
    required: true
  }
  , visitorId: {
    type: String,
    required: true
  }
  , visitorName: {
    type: String,
    required: true
  }
  , homeRoundsWon: {
    type: Number
    , default: 0 
  }
  , visitorRoundsWon: {
    type: Number
    , default: 0 
  }
  , homePointsWon: {
    type: Number
    , default: 0 
  }
  , visitorPointsWon: {
    type: Number
    , default: 0 
  }
});

module.exports = MatchSchema;