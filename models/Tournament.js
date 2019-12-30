const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String
    , required: true
  }
  , gamesPlayed: {
    type: Number
    , default: 0 
  }
  , gamesWon: {
    type: Number
    , default: 0 
  }
  , gamesLost: {
    type: Number
    , default: 0 
  }
  , gamesDraw: {
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
  },
  gamesPlayed: {
    type: Number
    , default: 0
  }
});

const MatchSchema = new Schema({
  startingTime: {
    type: 'String',
    required: true
  },
  homeTeam: {
    type: 'String',
    required: true
  }
  , visitorTeam: {
    type: 'String',
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
  , refereeName: {
    type: String,
    required: true
  },
  defaultMatch: {
    required: true,
    type: {
      maxRounds: Number
      , maxPoints: Number
      , timeOuts: Number
      , bestOfMaxRounds: Boolean
      , winByTwo: Boolean
    },
  }
});

const RefereeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
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
    , timeOuts: Number
    , bestOfMaxRounds: Boolean
    , winByTwo: Boolean
  },
  teams: [TeamSchema],
  referees: [RefereeSchema],
  matches: [MatchSchema]
})

module.exports = mongoose.model('Tournament', TournamentSchema);