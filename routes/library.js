const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');
const User = require('../models/User');
const Artist = require('../models/Artist');
const Track = require('../models/Track');
const Album = require('../models/Album');

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
// TODO: npm array.prototype.flat
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

    // Breaking up the request as per Spotify API limitation of 20 albums per call
    const trackResponse = async albums => {
      const ids = albums.map(e => e.spID);
      let counter = 0;
      let optionsArray = [];
      const trackOptions = ids => ({
        method: 'get',
        url: `https://api.spotify.com/v1/albums`,
        params: { ids: ids.join(), country: 'from_token' },
        headers: { Authorization: 'Bearer ' + accessToken }
      });
      while (counter < ids.length) {
        optionsArray.push(trackOptions(ids.slice(counter, counter + 20)));
        counter += 20;
      }
      const spRes = await axios.all(optionsArray.map(e => axios(e)));
      const tracks = spRes => {
        const albums = spRes.map(e => e.data.albums).flat();
        const tracks = albums
          .map(e =>
            e.tracks.items
              .map(e => {
                return {
                  spID: e.id,
                  name: e.name,
                  number: e.track_number,
                  discNumber: e.disc_number
                };
              })
              .map(item => {
                return {
                  ...item,
                  albumSpID: e.id,
                  isTracked: e.album_type === 'album' ? true : false
                };
              })
          )
          .flat();
        return tracks;
      };
      return tracks(spRes);
    };

    return res.json(await trackResponse(albums));
  } catch (err) {
    err.response
      ? console.error(err.response.status + ' ' + err.response.text)
      : console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
