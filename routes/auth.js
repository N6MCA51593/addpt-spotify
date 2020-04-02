const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

const User = require('../models/User');

const createToken = require('../functions/createToken');
const auth = require('../middleware/auth');

const scopes = process.env.SCOPES;
const redirectUri = process.env.REDIRECT_URI;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const grantType = 'authorization_code';

const state = crypto.randomBytes(10).toString('hex');
const stateKey = 'spotify_auth_state';

// @route     GET api/auth
// @desc      Step 1 oAuth 2.0
// @access    Public
router.post('/', (req, res) => {
  res.cookie(stateKey, state);
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      clientID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri) +
      '&state=' +
      state
  );
});
// TODO Change redirect URL
// @route     GET api/auth/redirect
// @desc      Step 2 oAuth 2.0
// @access    Private
router.get('/redirect', async (req, res) => {
  const state = req.query.state;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  const authCode = req.query.code;
  if (req.query.error) {
    return res.status(401).json({ msg: 'User turned down auth request' });
  }

  if (state === null || state !== storedState) {
    return res.status(401).json({ msg: 'State mismatch' });
  }

  res.clearCookie(stateKey);
  try {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization:
        'Basic ' +
        new Buffer.from(clientID + ':' + clientSecret).toString('base64')
    };
    const options = {
      method: 'post',
      headers: headers,
      data: querystring.stringify({
        grant_type: grantType,
        code: authCode,
        redirect_uri: redirectUri
      }),
      url: tokenEndpoint
    };
    const spRes = await axios(options);

    const { access_token, token_type, refresh_token } = spRes.data;
    try {
      const options = {
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { Authorization: token_type + ' ' + access_token }
      };
      const spRes = await axios(options);

      const spID = spRes.data.id;
      const filter = { spID: spID };
      // sets the date of inactivity in 12 weeks
      const update = {
        refreshToken: refresh_token,
        inactiveAt: Date.now() + 6.04e8 * 12
      };
      await User.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      });
      const token = createToken(spID, access_token);
      res.cookie('token', token);
      res.redirect('http://localhost:3000');
    } catch (err) {
      const status = err.response ? err.response.status : 500;
      const msg = err.response
        ? err.response.status + ' ' + err.response.text
        : err.message;
      console.error(err);
      return res.status(status).json({ msg: msg });
    }
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});

// @route     GET api/auth/load
// @desc      Get logged in user
// @access    Private
router.get('/load', auth, async (req, res) => {
  try {
    const user = await User.find({ spID: req.user.id }).select('spID');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
