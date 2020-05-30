const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');
const Artist = require('../models/Artist');

// @route     GET api/library/append/search
// @desc      Search for an album
// @access    Private
router.get('/search', [auth, authSpotify], async (req, res) => {
  const { accessToken } = req.user;
  const id = req.query.id;
  const query = req.query.query;
  const artistName = req.query.artistname;
  const options = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    market: 'from_token',
    headers: { Authorization: 'Bearer ' + accessToken },
    params: {
      q: `album:${query} artist:${artistName}`,
      type: 'album',
      limit: 20
    }
  };
  try {
    const spRes = await axios(options);
    if (spRes.data.albums.items.length > 0) {
      const artist = await Artist.findOne({ _id: id }).lean();
      const savedAlbums = artist.albums;
      const aSpID = artist.spID;
      const albums = spRes.data.albums.items
        .map(e => {
          return {
            spID: e.id,
            name: e.name,
            img: e.images,
            releaseType: e.album_type,
            releaseDate:
              e.release_date.length == 4
                ? e.release_date
                : e.release_date.slice(0, 4),
            artists: e.artists,
            artistID: id
          };
        })
        .filter(
          e =>
            e.artists.some(artist => {
              return artist.id === aSpID;
            }) && !savedAlbums.some(savedAlbum => savedAlbum.spID === e.spID)
        );

      return res.json(albums.length > 0 ? albums : { msg: 'Nothing found' });
    } else {
      return res.json({ msg: 'Nothing found' });
    }
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});

// @route     POST api/library/append/new
// @desc      Add an album
// @access    Private
router.post('/new', [auth, authSpotify], async (req, res) => {
  const { accessToken } = req.user;
  const artistID = req.query.artistid;
  const albumSpID = req.query.albumid;
  const options = {
    method: 'get',
    url: `https://api.spotify.com/v1/albums/${albumSpID}`,
    params: { country: 'from_token' },
    headers: { Authorization: 'Bearer ' + accessToken }
  };
  try {
    const spRes = await axios(options);
    const tracks = spRes.data.tracks.items.map(e => {
      return {
        spID: e.id,
        name: e.name,
        number: e.track_number,
        discNumber: e.disc_number,
        isTracked: true
      };
    });
    const album = {
      spID: spRes.data.id,
      name: spRes.data.name,
      releaseType: spRes.data.album_type,
      releaseDate:
        spRes.data.release_date.length == 4
          ? spRes.data.release_date
          : spRes.data.release_date.slice(0, 4),
      isTracked: true,
      img: spRes.data.images,
      tracks: tracks
    };
    const artist = await Artist.findOne({ _id: artistID });
    artist.albums.push(album);
    if (!artist.isTracked) {
      artist.isTracked = true;
    }
    await artist.save();
    res.json(artist);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});
module.exports = router;
