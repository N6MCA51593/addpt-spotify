const mongoose = require('mongoose');
const HistorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: String,
  tracks: Array
});

module.exports = mongoose.model('history', HistorySchema);
