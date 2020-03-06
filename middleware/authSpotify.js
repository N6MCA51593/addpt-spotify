const axios = require('axios');
const createToken = require('../functions/createToken');
const User = require('../models/User');
module.exports = async (req, res, next) => {
   const { id, accessToken } = req.user;
   axios.interceptors.response.use(
      response => {
         return response;
      },
      async error => {
         if (error.response.status === 401) {
            try {
               const refreshToken = await User.findOne({ spID: id }).select({
                  refreshToken: 1,
                  _id: 0
               });
               req.user.refreshToken = refreshToken.refreshToken;
               console.log(refreshToken);
            } catch (err) {
               console.error(err.message);
               res.status(500).send('Server Error');
            }
         }
      }
   );
   const options = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: 'Bearer ' + accessToken }
   };
   await axios(options);
   next();
};
