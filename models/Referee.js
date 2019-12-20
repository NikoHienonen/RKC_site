const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    ref: 'Match'
  }]
});

module.exports = RefereeSchema;
