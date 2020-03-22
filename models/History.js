const mongoose = require('mongoose');
const Track = require('./Track').schema;
const HistorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  tracks: [Track]
});

module.exports = mongoose.model('history', HistorySchema);
