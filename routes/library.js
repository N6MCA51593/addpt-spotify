const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Artist = require('../models/Artist');

// @route     GET api/library
// @desc      Get user's artists
// @access    Private (jwt)
router.get('/', [auth], async (req, res) => {
  const uSpID = req.user.id;
  try {
    const user = await User.findOne({ spID: uSpID });
    const artists = await Artist.find({ user: user._id });
    res.json(artists);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});

// @route     PUT api/library
// @desc      Toggle tracking or archive artist
// @access    Private (jwt)
router.put('/', [auth], async (req, res) => {
  const uSpID = req.user.id;
  const artistID = req.query.artistid;
  const albumID = req.query.albumid ? req.query.albumid : null;
  const trackID = req.query.trackid ? req.query.trackid : null;
  const listens = req.query.listens ? req.query.listens : null;
  try {
    const artist = await Artist.findOne({ _id: artistID });
    if (req.query.action === 'archive') {
      const {
        trackThresholds,
        albumThresholds,
        artistThresholds
      } = await User.findOne({ spID: uSpID });
      if (!artist.isArchived) {
        artist.isArchived = true;
        artist.settingsSnapshot = [
          trackThresholds,
          albumThresholds,
          artistThresholds
        ];
      } else {
        artist.isArchived = false;
        artist.settingsSnapshot = [];
      }
    } else {
      if (trackID) {
        console.log(albumID);
        console.log(artist.albums.id(albumID));
        const track = artist.albums.id(albumID).tracks.id(trackID);
        if (listens) {
          track.listens = listens;
        } else {
          track.isTracked = !track.isTracked;
        }
      } else if (albumID && !trackID) {
        const album = artist.albums.id(albumID);
        album.isTracked = !album.isTracked;
        album.tracks.map(track =>
          album.isTracked ? (track.isTracked = true) : (track.isTracked = false)
        );
      } else {
        artist.isTracked = !artist.isTracked;
        artist.albums.map(album => {
          if (!artist.isTracked) {
            album.isTracked = false;
            album.tracks.map(track => (track.isTracked = false));
          } else {
            if (album.releaseType === 'album') {
              album.isTracked = true;
              album.tracks.map(track => (track.isTracked = true));
            }
          }
          return album;
        });
      }
    }
    await artist.save();

    return res.json(artist);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});

// @route     DELETE api/library
// @desc      Delete album/artist
// @access    Private (jwt)
router.delete('/', [auth], async (req, res) => {
  const artistID = req.query.artistid;
  const albumID = req.query.albumid ? req.query.albumid : null;
  try {
    const artist = await Artist.findOne({ _id: artistID });
    if (!albumID) {
      await Artist.deleteOne({ _id: artistID });
    } else {
      if (artist.albums.length > 1) {
        await artist.albums.id(albumID).remove();
        await artist.save();
      } else {
        await Artist.deleteOne({ _id: artistID });
      }
    }
    res.json({ msg: 'Deleted' });
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response
      ? err.response.status + ' ' + err.response.text
      : err.message;
    console.error(err);
    return res.status(status).json({ msg: msg });
  }
});

router.use('/add', require('./add'));

router.use('/append', require('./append'));

module.exports = router;
