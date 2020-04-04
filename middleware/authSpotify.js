const axios = require('axios');
const createToken = require('../functions/createToken');
const User = require('../models/User');
const querystring = require('querystring');
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

module.exports = async (req, res, next) => {
  const { id, accessToken } = req.user;
  const options = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: { Authorization: 'Bearer ' + accessToken }
  };

  axios(options)
    .then(response => {
      next();
    })
    .catch(async error => {
      if (error.response.status === 401) {
        const refreshToken = await User.findOne({ spID: id }).select({
          refreshToken: 1,
          _id: 0
        });
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
            grant_type: 'refresh_token',
            refresh_token: refreshToken.refreshToken
          }),
          url: 'https://accounts.spotify.com/api/token'
        };
        axios(options)
          .then(response => {
            req.user.accessToken = response.data.access_token;
            const newToken = createToken(id, response.data.access_token);
            res.cookie('token', newToken, { httpOnly: true });
            next();
          })
          .catch(async error => {
            console.error(error.response.status + ' ' + error.response.text);
            if (error.response.status === 400) {
              return res
                .status(error.response.status)
                .json({ msg: 'Token is not valid' });
            } else {
              return res
                .status(error.response.status)
                .send(error.response.status + ' ' + error.response.text);
            }
          });
      } else {
        console.error(error.response.status + ' ' + error.response.text);
        return res
          .status(error.response.status)
          .send(error.response.status + ' ' + error.response.text);
      }
    });
};
