import {
  GET_LIBRARY,
  CLEAR_ERRORS,
  LOAD_FAIL,
  ADD_ARTIST,
  SET_CURRENT_ARTIST,
  SET_CURRENT_ALBUM,
  CLEAR_CURRENT,
  TOGGLE_TRACKING
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
        error: null
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
        error: `${action.payload.name} added to your library`
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
    case TOGGLE_TRACKING:
      return {
        ...state,
        artists: [...state.artists, action.payload],
        currentArtist: state.currentArtist ? action.payload : null,
        currentAlbum: null
      };

    default:
      return state;
  }
};
