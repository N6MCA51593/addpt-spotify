const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');
const Artist = require('../models/Artist');
const User = require('../models/User');

// @route     POST api/sync
// @desc      Update listens and history
// @access    Private
router.post('/', [auth, authSpotify], async (req, res) => {
  const { accessToken, id } = req.user;
  const options = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player/recently-played',
    headers: { Authorization: 'Bearer ' + accessToken },
    params: { limit: 50 }
  };
  try {
    const spRes = await axios(options);
    const userID = await User.findOne({ spID: id }).then(res => res._id);
    const trackedTracks = await Artist.aggregate([
      {
        $match: {
          user: userID,
          isTracked: true,
          isArchived: false
        }
      },
      {
        $project: {
          name: 1,
          albums: 1,
          albums: {
            $filter: {
              input: '$albums',
              as: 'album',
              cond: {
                $eq: ['$$album.isTracked', true]
              }
            }
          }
        }
      },
      { $unwind: '$albums' },
      {
        $project: {
          name: 1,
          tracks: 1,
          'albums.name': 1,
          'albums._id': 1,
          tracks: {
            $filter: {
              input: '$albums.tracks',
              as: 'track',
              cond: {
                $eq: ['$$track.isTracked', true]
              }
            }
          }
        }
      },
      { $unwind: '$tracks' }
    ]);
    res.json(trackedTracks);
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
