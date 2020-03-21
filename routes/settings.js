const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route     PUT api/settings
// @desc      Change user settings
// @access    Private (jwt)
router.put('/', [auth], async (req, res) => {
  const update = ({
    doNotTrack,
    trackThresholds,
    albumThresholds,
    artistThresholds
  } = req.body);
  try {
    await User.findOneAndUpdate({ spID: req.user.id }, update, {
      new: true
    });
    res.json({ msg: 'Updated' });
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(msg);
    return res.status(status).json({ msg: msg });
  }
});

module.exports = router;
