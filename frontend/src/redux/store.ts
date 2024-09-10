import { createStore, combineReducers } from 'redux';
import tracksReducer from './reducers/tracksReducer';
import indexReducer from './reducers/indexReducer';
import searchInputReducer from './reducers/searchInputReducer';
import loginStatusReducer from "./reducers/loginStatusReducer.ts";
import logoutButtonActionReducer from "./reducers/logoutButtonActionReducer.ts";
import genreModeReducer from "./reducers/genreMode.ts";
import amountTracksReducer from "./reducers/amountTracksReducer.ts";
import isPlayingReducer from "./reducers/isPlayingReducer.ts";

const rootReducer = combineReducers({
    tracks: tracksReducer,
    trackIndex: indexReducer,
    searchInput: searchInputReducer,
    loginStatus: loginStatusReducer,
    logoutButtonAction: logoutButtonActionReducer,
    genreMode: genreModeReducer,
    amountTracks: amountTracksReducer,
    isPlaying: isPlayingReducer,

});

const store = createStore(rootReducer);

export default store;
