const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const History = require('../models/History');

// @route     GET api/history
// @desc      Get user's history
// @access    Private (jwt)
router.get('/', [auth], async (req, res) => {
  try {
    const user = await User.findOne({ spID: req.user.id }).lean();
    const history = await History.findOne({ user: user._id }).lean();
    res.send(history);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
