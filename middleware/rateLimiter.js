const rateLimit = require('express-rate-limit');
// app.set('trust proxy', 1);

module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});
