const mongoose = require('mongoose');
const AlbumSchema = mongoose.Schema({
  spID: String,
  name: String,
  releaseType: String,
  isTracked: { type: Boolean, default: false },
  lastListen: { type: Date, default: null },
  progress: { type: Number, default: 0 },
  img: Array
});

module.exports = mongoose.model('album', AlbumSchema);
