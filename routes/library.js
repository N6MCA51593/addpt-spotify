const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');

router.get('/', [auth, authSpotify], (req, res) => {
  res.json(req.user);
});

// TODO: Placeholder images
// @route     POST api/library/search
// @desc      Search for an artist
// @access    Private
router.post('/add/search', [auth, authSpotify], async (req, res) => {
  const { accessToken } = req.user;
  const query = req.body.query;
  const options = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    headers: { Authorization: 'Bearer ' + accessToken },
    params: { q: query, type: 'artist', limit: 50 }
  };
  try {
    const spRes = await axios(options);
    if (spRes.data.artists.items.length > 0) {
      const artists = spRes.data.artists.items.map(e => {
        return { spID: e5.id, name: e.name, img: e.images };
      });
      return res.json(artists);
    } else {
      return res.json({ msg: 'Nothing found' });
    }
  } catch (err) {
    err.response
      ? console.error(err.response.status + ' ' + err.response.text)
      : console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
