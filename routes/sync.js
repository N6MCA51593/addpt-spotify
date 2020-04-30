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
  const user = req.user.id;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  req.app.on('update', toStream => {
    if (toStream.some(toStreamE => toStreamE.user === user)) {
      res.write('event: message\n');
      res.write(
        `data: ${JSON.stringify(
          toStream.find(toStreamE => toStreamE.user === user)
        )}\n`
      );
      res.write('\n\n');
    }
  });
});

module.exports = router;
