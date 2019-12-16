/*
export default class Team {
  constructor(name){
    this.name = name;
    this.roundsPlayed = 0;
    this.roundsWon = 0;
    this.roundsLost = 0;
    this.pointsWon = 0;
    this.points = 0;
  }
}


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
})

mongoose.model('team', TeamSchema);
*/