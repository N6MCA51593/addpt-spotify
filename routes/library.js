const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');

router.get('/', [auth, authSpotify], (req, res) => {
   res.json(req.user);
});
module.exports = router;
