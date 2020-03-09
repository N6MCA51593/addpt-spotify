const mongoose = require('mongoose');
const SongSchema = mongoose.Schema({
  spID: String,
  name: String,
  isTracked: { type: Boolean, default: false },
  lastListen: { type: Date, default: null },
  listens: { type: Number, default: 0 }
});

module.exports = mongoose.model('song', AlbumSchema);
