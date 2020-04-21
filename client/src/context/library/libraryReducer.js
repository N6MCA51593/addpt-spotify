import {
  GET_LIBRARY,
  CLEAR_ERRORS,
  LOAD_FAIL,
  ADD_ARTIST,
  ADD_ALBUM,
  SET_CURRENT_ARTIST,
  SET_CURRENT_ALBUM,
  CLEAR_CURRENT,
  TOGGLE_ARTIST,
  DELETE_ARTIST
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LIBRARY:
      return {
        ...state,
        loading: false,
        artists: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        message: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case ADD_ARTIST:
      return {
        ...state,
        artists: [...state.artists, action.payload],
        message: `${action.payload.name} added to your library`
      };
    case ADD_ALBUM:
      return {
        ...state,
        artists: [
          ...state.artists.filter(
            artistsE => artistsE._id !== action.payload._id
          ),
          action.payload
        ],
        currentArtist: action.payload,
        message: `${
          action.payload.albums[action.payload.albums.length - 1].name
        } by ${action.payload.name} added to your library`
      };
    case SET_CURRENT_ARTIST:
      return {
        ...state,
        currentArtist: action.payload
      };
    case SET_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentArtist: null,
        currentAlbum: null
      };
    case TOGGLE_ARTIST:
      return {
        ...state,
        artists: [
          ...state.artists.filter(
            artistsE => artistsE._id !== action.payload._id
          ),
          action.payload
        ]
      };
    case DELETE_ARTIST:
      return {
        ...state,
        artists: [
          ...state.artists.filter(artistsE => artistsE._id !== action.payload)
        ],
        message: `${
          state.artists.filter(artistsE => artistsE._id === action.payload)[0]
            .name
        } has been removed from your library`
      };

    default:
      return state;
  }
};
