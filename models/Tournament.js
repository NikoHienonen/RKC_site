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
    , default: false
  }
  , teams: [{
    type: Schema.Types.ObjectId,
    ref: 'team'
  }]
  , matches: [{
    type: Schema.Types.ObjectId,
    ref: 'match'
  }]
})

mongoose.model('tournament', TournamentSchema);