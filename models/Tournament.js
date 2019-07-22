const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MatchSchema = require('./Match');
const TeamSchema = require('./Team');

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
  , teams: [{TeamSchema}]
  , matches: [{MatchSchema}]
})

module.exports = TournamentSchema = mongoose.model('tournament', TournamentSchema);