const mongoose = require('mongoose');
const Album = require('./Album');
const ArtistSchema = mongoose.Schema({
  spID: String,
  name: String,
  albums: [Album],
  user: { type: Schema.ObjectId, ref: 'User' },
  isTracked: { type: Boolean, default: true },
  lastListen: { type: Date, default: null },
  img: Array
});

module.exports = mongoose.model('artist', ArtistSchema);
