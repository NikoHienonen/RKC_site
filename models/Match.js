const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
    , index: true
    , required: true
    , auto: true
  }
  , homeId: String
  , visitorId: String
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