const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TournamentSchema = new Schema({
  name : {
    type: String
    , required: true
  }
  , date: {
    type: Date
    , default: Date.now
    , required: true
  }
  , active:  {
    type: Boolean
    , required: true
  }
  , teams: [{
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
  }]
  , matches: [{
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
  }]
})

module.exports = TournamentSchema = mongoose.model('tournament', TournamentSchema);