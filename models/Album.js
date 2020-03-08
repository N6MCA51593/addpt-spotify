const mongoose = require('mongoose');
const Song = require('./Song');
const User = require('./User');
const AlbumSchema = mongoose.Schema({
   spID: String,
   user: { type: Schema.ObjectId, ref: 'User' },
   releaseType: String,
   isTracked: { type: Boolean, default: false },
   songs: [Song]
});

module.exports = mongoose.model('album', AlbumSchema);
