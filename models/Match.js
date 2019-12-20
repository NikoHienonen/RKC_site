const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  homeId: {
    type: String,
    required: true
  }
  , visitorId: {
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