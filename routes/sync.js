const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const updateHistory = require('../functions/updateHistory');
const emitterObj = require('../emitter');

// @route     POST api/sync
// @desc      Update listens and history
// @access    Private
router.post('/', [auth, authSpotify], async (req, res) => {
  const { accessToken, id } = req.user;
  try {
    const result = await updateHistory(accessToken, id);
    emitterObj.emitFunc('update', [result]);
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

// @route     GET api/sync
// @desc      Subscribe to the update stream
// @access    Private
router.get('/stream', [auth], (req, res) => {
  emitterObj.addCon(res);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'none',
    Connection: 'keep-alive'
  });
  res.write('\n');
  const intervalID = setInterval(() => {
    res.write(`event: ping\n`);
    res.write(`data: keep connection alive\n\n`);
  }, 40 * 1000);
  req.on('close', () => {
    clearInterval(intervalID);
    emitterObj.deleteCon(req);
  });
  emitterObj.listenFunc;
});

module.exports = router;
