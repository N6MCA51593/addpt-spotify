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

const frontEndURI = process.env.FRONT_END_URI;

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

// @route     GET api/auth/redirect
// @desc      Step 2 oAuth 2.0
// @access    Private
router.get('/redirect', async (req, res) => {
  const state = req.query.state;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  const authCode = req.query.code;
  if (req.query.error || state === null || state !== storedState) {
    res.clearCookie(stateKey);
    res.cookie('login', 'error');
    return res.redirect(frontEndURI);
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
      headers,
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
      const filter = { spID };
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
      res
        .cookie('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 6.04e8 * 2
        })
        .cookie('login', 'success', { sameSite: 'lax', maxAge: 6.04e8 * 2 });
      res.redirect(frontEndURI);
    } catch (err) {
      console.error(err);
      res.cookie('login', 'error', { sameSite: 'lax' });
      return res.redirect(frontEndURI);
    }
  } catch (err) {
    console.error(err);
    res.cookie('login', 'error');
    return res.redirect(frontEndURI);
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

// @route     GET api/auth/logout
// @desc      Log the user out
// @access    Public
router.get('/logout', async (req, res) => {
  res.clearCookie('token').clearCookie('login');
  res.redirect(frontEndURI);
});

module.exports = router;
