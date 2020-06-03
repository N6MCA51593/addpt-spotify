const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');
const User = require('../models/User');
const Artist = require('../models/Artist');

// @route     GET api/library/add/search
// @desc      Search for an artist
// @access    Private
router.get('/search', [auth, authSpotify], async (req, res) => {
  const uSpID = req.user.id;
  const { accessToken } = req.user;
  const query = req.query.query;
  const options = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    market: 'from_token',
    headers: { Authorization: 'Bearer ' + accessToken },
    params: { q: query, type: 'artist', limit: 50 }
  };
  try {
    const user = await User.findOne({ spID: uSpID }).lean();
    const spRes = await axios(options);
    if (spRes.data.artists.items.length > 0) {
      const savedArtists = await Artist.find(
        { user: user._id },
        'spID -_id'
      ).lean();
      const artists = spRes.data.artists.items
        .map(e => {
          return { spID: e.id, name: e.name, img: e.images };
        })
        .filter(
          e => !savedArtists.some(savedArtist => savedArtist.spID === e.spID)
        );
      return res.json(artists);
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

// @route     POST api/library/add/new
// @desc      Add an artist
// @access    Private
router.post('/new', [auth, authSpotify], async (req, res) => {
  const uSpID = req.user.id;
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

    const isNoAlbums = albumsResponse[0].data.items.length === 0;

    const albums = albumsResponse
      .map(e => {
        return e.data.items.map(e => {
          return {
            spID: e.id,
            name: e.name,
            releaseType: e.album_type,
            releaseDate:
              e.release_date.length == 4
                ? e.release_date
                : e.release_date.slice(0, 4),
            isTracked: e.album_type === 'album' || isNoAlbums ? true : false,
            img: e.images
          };
        });
      })
      .flat();

    const artistResponse = await axios(artistOptions);
    const artist = {
      spID: artistResponse.data.id,
      name: artistResponse.data.name,
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
                  isTracked:
                    e.album_type === 'album' || isNoAlbums ? true : false
                };
              })
          )
          .flat();
        return tracks;
      };
      return tracks(spRes);
    };

    const user = await User.findOne({ spID: uSpID });
    const songs = await trackResponse(albums);
    const newArtist = new Artist({
      ...artist,
      user: user._id,
      albums: artist.albums.map(e => {
        return {
          ...e,
          tracks: songs.filter(song => song.albumSpID === e.spID)
        };
      })
    });
    await newArtist.save();
    return res.json(newArtist);
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
