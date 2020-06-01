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
    const user = await User.findOne({ spID: uSpID }).lean();
    const artists = await Artist.find({ user: user._id }).lean();
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
// @desc      Toggle tracking, change track listens, or archive artist
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
      const track = trackID
        ? artist.albums.id(albumID).tracks.id(trackID)
        : null;
      const album = albumID ? artist.albums.id(albumID) : null;
      if (trackID) {
        if (listens) {
          track.listens = listens;
        } else {
          track.isTracked = !track.isTracked;
          if (
            (album.tracks.filter(trackE => trackE.isTracked === true).length ===
              1 &&
              track.isTracked === true) ||
            album.tracks.every(trackE => trackE.isTracked === false)
          ) {
            album.isTracked = track.isTracked;
            if (
              (artist.albums.filter(albumE => albumE.isTracked === true)
                .length === 1 &&
                album.isTracked === true) ||
              artist.albums.every(albumE => albumE.isTracked === false)
            ) {
              artist.isTracked = album.isTracked;
            }
          }
        }
      } else if (albumID && !trackID) {
        album.isTracked = !album.isTracked;
        album.tracks.map(trackE =>
          album.isTracked
            ? (trackE.isTracked = true)
            : (trackE.isTracked = false)
        );
        if (
          (artist.albums.filter(albumE => albumE.isTracked === true).length ===
            1 &&
            album.isTracked === true) ||
          artist.albums.every(albumE => albumE.isTracked === false)
        ) {
          artist.isTracked = album.isTracked;
        }
      } else {
        artist.isTracked = !artist.isTracked;
        artist.albums.map(albumE => {
          if (!artist.isTracked) {
            albumE.isTracked = false;
            albumE.tracks.map(track => (track.isTracked = false));
          } else {
            if (albumE.releaseType === 'album') {
              albumE.isTracked = true;
              albumE.tracks.map(track => (track.isTracked = true));
            }
          }
          return albumE;
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
