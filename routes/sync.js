const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSpotify = require('../middleware/authSpotify');
const axios = require('axios');
const Artist = require('../models/Artist');
const User = require('../models/User');
const History = require('../models/History');

// @route     POST api/sync
// @desc      Update listens and history
// @access    Private
router.post('/', [auth, authSpotify], async (req, res) => {
  const { accessToken, id } = req.user;
  try {
    const userID = await User.findOne({ spID: id }).then(res => res._id);
    const history = await History.exists({ user: userID }).then(async hist => {
      if (hist) {
        return await History.findOne({ user: userID });
      } else {
        const newHistory = new History({
          user: userID,
          date: '',
          tracks: []
        });
        await newHistory.save();
        return newHistory;
      }
    });

    const options = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me/player/recently-played',
      headers: { Authorization: 'Bearer ' + accessToken },
      params: { limit: 50, after: history.date ? history.date : 0 }
    };
    const spRes = await axios(options);
    const timestamp = spRes.data.cursors.after;
    const historyTracks = spRes.data.items.map(e => {
      return { spID: e.track.id, name: e.track.name, playedAt: e.played_at };
    });

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
                $and: ['$$album.isTracked']
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
                $and: ['$$track.isTracked', { $lte: ['$$track.listens', 100] }]
              }
            }
          }
        }
      },
      { $unwind: '$tracks' }
    ]);
    const updatedTracks = trackedTracks
      .filter(trackedTrack =>
        historyTracks.some(
          historyTrack => trackedTrack.tracks.spID === historyTrack.spID
        )
      )
      .map(trackedTrack => {
        return {
          ...trackedTrack,
          tracks: {
            ...trackedTrack.tracks,
            lastListen: historyTracks.find(
              historyTrack => historyTrack.spID === trackedTrack.tracks.spID
            ).playedAt,
            listens:
              trackedTrack.tracks.listens +
              historyTracks.filter(
                historyTrack => historyTrack.spID === trackedTrack.tracks.spID
              ).length
          }
        };
      });
    const generateUpdate = trackToUpdate => {
      return {
        updateOne: {
          filter: {
            _id: trackToUpdate._id
          },
          update: { $set: { 'album.$[album].tracks.$[track].listens': 100 } },
          arrayFilters: [
            { 'album._id': trackToUpdate.albums._id },
            { 'track._id': trackToUpdate.tracks._id }
          ]
        }
      };
    };
    const update = updatedTracks.map(generateUpdate);
    await Artist.bulkWrite(update);
    res.json(update);
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
