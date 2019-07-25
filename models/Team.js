const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
    , index: true
    , required: true
    , auto: true
  }
  , name: {
    type: String
    , required: true
  }
  , winner: {
    type: Boolean
    , default: false 
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
})

module.exports = TeamSchema = mongoose.model('team', TeamSchema);
