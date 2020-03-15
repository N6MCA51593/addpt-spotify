const mongoose = require('mongoose');
const Album = require('./Album').schema;
const ArtistSchema = mongoose.Schema({
  spID: String,
  name: String,
  albums: [Album],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  isTracked: { type: Boolean, default: true },
  lastListen: { type: Date, default: null },
  img: Array,
  isFullyCached: { type: Boolean, default: true }
});

module.exports = mongoose.model('artist', ArtistSchema);
