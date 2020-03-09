const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  spID: {
    type: String,
    unique: true
  },
  refreshToken: {
    type: String,
    unique: true
  },
  lastLogin: Date
});

module.exports = mongoose.model('user', UserSchema);
