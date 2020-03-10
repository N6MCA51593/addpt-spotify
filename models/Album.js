const mongoose = require('mongoose');
const AlbumSchema = mongoose.Schema({
  spID: String,
  name: String,
  releaseType: String,
  isTracked: { type: Boolean, default: false },
  img: Array
});

module.exports = mongoose.model('album', AlbumSchema);
