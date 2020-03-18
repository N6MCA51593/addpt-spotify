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
  lastLogin: Date,
  doNotTrack: { type: Boolean, default: false },
  trackThresholds: { type: Array, default: [3, 6, 8, 10] },
  albumThresholds: { type: Array, default: [30, 60, 80, 100] },
  artistThresholds: { type: Array, default: [30, 60, 80, 100] }
});

module.exports = mongoose.model('user', UserSchema);
