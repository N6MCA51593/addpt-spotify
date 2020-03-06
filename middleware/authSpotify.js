const axios = require('axios');
const createToken = require('../functions/createToken');
const User = require('../models/User');
const querystring = require('querystring');
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

module.exports = async (req, res, next) => {
   const { id, accessToken } = req.user;
   axios.interceptors.response.use(
      response => {
         return response;
      },
      async error => {
         console.log(error.response.status);
         if (error.response.status === 401) {
            try {
               const refreshToken = await User.findOne({ spID: id }).select({
                  refreshToken: 1,
                  _id: 0
               });
               const headers = {
                  'content-type':
                     'application/x-www-form-urlencoded;charset=utf-8',
                  Authorization:
                     'Basic ' +
                     new Buffer.from(clientID + ':' + clientSecret).toString(
                        'base64'
                     )
               };
               const options = {
                  method: 'post',
                  headers: headers,
                  data: querystring.stringify({
                     grant_type: 'refresh_token',
                     refresh_token: refreshToken.refreshToken
                  }),
                  url: 'https://accounts.spotify.com/api/token'
               };

               const spRes = await axios(options);
               spRes
                  ? (req.user.accessToken = spRes.data.access_token)
                  : (req.error = 'Invalid refresh token');
            } catch (err) {
               console.error(err.message);
            }
         }
         if (error.response.status === 400) {
            req.error = 'Invalid refresh token';
         }
      }
   );
   try {
      const options = {
         method: 'get',
         url: 'https://api.spotify.com/v1/me',
         headers: { Authorization: 'Bearer ' + accessToken }
      };
      const spRes = await axios(options);
      console.log(spRes);
      if (req.error === 'Invalid refresh token') {
         return res.status(401).json({ msg: 'Refresh token is not valid' });
      }
      next();
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
