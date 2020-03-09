const mongoose = require('mongoose');
const Album = require('./Album');
const ArtistSchema = mongoose.Schema({
  spID: String,
  name: String,
  albums: [Album],
  isTracked: { type: Boolean, default: true },
  lastListen: { type: Date, default: null },
  img: Array
});

module.exports = mongoose.model('artist', ArtistSchema);
