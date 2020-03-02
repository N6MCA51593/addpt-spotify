const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
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
   //console.log(authCode);
   const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
         'Basic ' +
         new Buffer.from(clientID + ':' + clientSecret).toString('base64')
   };
   try {
      const res = await axios.post(
         tokenEndpoint,
         { grant_type: grantType, code: authCode, redirect_uri: redirectUri },
         { headers: headers }
      );
      console.log(res);
   } catch (err) {
      return res.json({ err });
   }

   res.json({ msg: 'Hi' });
});

module.exports = router;
