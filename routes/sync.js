const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const updateHistory = require('../functions/updateHistory');

// @route     POST api/sync
// @desc      Update listens and history
// @access    Private
router.post('/', [auth, authSpotify], async (req, res) => {
  const { accessToken, id } = req.user;
  try {
    const result = await updateHistory(accessToken, id);
    res.json(result);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});

router.get('/stream', [auth], (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  req.app.on('update', toStream => {
    res.write('event: message\n');
    res.write('data: hello\n');
    res.write('\n\n');
  });
});

module.exports = router;
