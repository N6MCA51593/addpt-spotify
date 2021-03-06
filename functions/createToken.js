const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
module.exports = (spID, accessToken) => {
  const payload = {
    user: {
      id: spID,
      accessToken
    }
  };
  return jwt.sign(payload, jwtSecret, {
    expiresIn: '14d'
  });
};
