const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
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
  , role: {
    type: String
    , required: true 
  }
  , password: {
      type: String
      , required: true
  }
})

module.exports = UserSchema = mongoose.model('user', UserSchema);
