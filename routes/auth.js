const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const User = require('../models/User');

const scopes = process.env.SCOPES;
const redirectUri = process.env.REDIRECT_URI;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const grantType = 'authorization_code';

router.get('/', (req, res) => {
   res.redirect(
      'https://accounts.spotify.com/authorize' +
         '?response_type=code' +
         '&client_id=' +
         clientID +
         (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
         '&redirect_uri=' +
         encodeURIComponent(redirectUri)
   );
});

router.get('/redirect', async (req, res) => {
   if (req.query.error) {
      return res.status(401).json({ msg: 'User turned down auth request' });
   }

   const authCode = req.query.code;

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
      const accessToken = spRes.data.access_token;
      const tokenType = spRes.data.token_type;
      const refreshToken = spRes.data.refresh_token;
      try {
         const options = {
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: { Authorization: tokenType + ' ' + accessToken }
         };
         const spRes = await axios(options);
         console.log(spRes);
         const spID = spRes.data.id;
         const filter = { spID: spID };
         const update = { refreshToken: refreshToken };
         let doc = await User.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
         });
         console.log(doc);
         res.json({ doc });
      } catch (err) {
         console.log(err);
      }
   } catch (err) {
      console.log(err);
   }
});

module.exports = router;
