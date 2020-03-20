const mongoose = require('mongoose');
const Track = require('./Track').schema;
const AlbumSchema = mongoose.Schema({
  spID: String,
  name: String,
  releaseType: String,
  releaseDate: String,
  isTracked: { type: Boolean, default: false },
  tracks: [Track],
  img: Array
});

module.exports = mongoose.model('album', AlbumSchema);
