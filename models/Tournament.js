const mongoose = require('mongoose');
const Schema = mongoose.Schema;


require('./Match');

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
    , default: false
  }
  , location : {
    type: String
    , required: true
  }
  , teams: [{
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
  }]
  , matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }]
})

mongoose.model('tournament', TournamentSchema);