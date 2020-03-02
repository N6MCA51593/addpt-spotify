const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   spID: {
      type: String,
      required: true,
      unique: true
   },
   refreshToken: {
      type: String,
      required: true,
      unique: true
   }
});

module.exports = mongoose.model('user', UserSchema);
