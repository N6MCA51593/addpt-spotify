const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');

router.get('/', [auth, authSpotify], (req, res) => {
  res.json(req.user);
});

// @route     POST api/library/add/search
// @desc      Search for an artist
// @access    Private
// TODO: Placeholder images
// TODO: Exclude saved artists
router.post('/add/search', [auth, authSpotify], async (req, res) => {
  const { accessToken } = req.user;
  const query = req.body.query;
  const options = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    market: 'from_token',
    headers: { Authorization: 'Bearer ' + accessToken },
    params: { q: query, type: 'artist', limit: 50 }
  };
  try {
    const spRes = await axios(options);
    if (spRes.data.artists.items.length > 0) {
      const artists = spRes.data.artists.items.map(e => {
        return { spID: e.id, name: e.name, img: e.images };
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

// @route     GET api/library/add/new
// @desc      Add an artist
// @access    Private
router.get('/add/new', [auth, authSpotify], async (req, res) => {
  const { accessToken } = req.user;
  const id = req.query.id;
  const artistOptions = {
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${id}`,
    headers: { Authorization: 'Bearer ' + accessToken }
  };
  const albumOptions = group => ({
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${id}/albums`,
    params: { include_groups: group, country: 'from_token' },
    headers: { Authorization: 'Bearer ' + accessToken }
  });
  try {
    const albumsResponse = await axios.all([
      axios(albumOptions('album')),
      axios(albumOptions('single')),
      axios(albumOptions('compilation'))
    ]);
    const isFullyCached = albumsResponse.some(e => e.data.next);
    const albums = albumsResponse
      .map(e => {
        return e.data.items.map(e => {
          return {
            spID: e.id,
            name: e.name,
            releaseType: e.album_type,
            isTracked: e.album_type === 'album' ? true : false,
            img: e.images
          };
        });
      })
      .flat();
    const artistResponse = await axios(artistOptions);
    const artist = {
      spID: artistResponse.data.id,
      name: artistResponse.data.name,
      isFullyCached: !isFullyCached,
      img: artistResponse.data.images,
      albums: albums
    };
    return res.json(artist);
  } catch (err) {
    err.response
      ? console.error(err.response.status + ' ' + err.response.text)
      : console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
