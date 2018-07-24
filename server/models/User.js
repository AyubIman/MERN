const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  fistName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: ''
  }
});

UserSchema.methods.generateHash = function(password){
  return bycrypt.hashSync(password, bcrypt.getSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', UserSchema);
