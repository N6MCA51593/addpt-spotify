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

   try {
      const res = await axios(options);
      console.log(res.data);
   } catch (err) {
      return res.json({ err });
   }

   res.json({ msg: 'Hi' });
});

module.exports = router;
