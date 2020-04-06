const rateLimit = require('express-rate-limit');
// app.set('trust proxy', 1);

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 800
});
