const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
    , index: true
    , required: true
    , auto: true
  }
  , homeId: Number
  , visitorId: Number
  , homeRoundsWon: {
    type: Number
    , default: 0 
  }
  , visitorRoundsWon: {
    type: Number
    , default: 0 
  }
});

module.exports = MatchSchema;