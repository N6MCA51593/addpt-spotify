const mongoose = require('mongoose');
const Album = require('./Album');
const ArtistSchema = mongoose.Schema({
   spID: String,
   albums: [Album],
   isTracked: { type: Boolean, default: true },
   lastListen: { type: Date, default: null }
});

module.exports = mongoose.model('artist', ArtistSchema);
