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

const MatchSchema = new Schema({
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
  , visitorTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
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

const RefereeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match',
    default: []
  }]
});

var TournamentSchema = new Schema({
  name : {
    type: String
    , required: true
  },
  date: {
    type: Date
    , default: Date.now,
    required: true
  },
  location : {
    type: String
    , required: true
  },
  defaultMatch: {
    maxRounds: Number
    , maxPoints: Number
    , bestOfMaxRounds: Boolean
    , winByTwo: Boolean
  },
  teams: [TeamSchema],
  referees: [RefereeSchema],
  matches: [MatchSchema]
})

module.exports = mongoose.model('Tournament', TournamentSchema);