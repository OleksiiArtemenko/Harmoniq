import {
    SET_TRACKS,
    SET_INDEX,
    SET_SEARCHINPUT,
    SET_LOGINSTATUS,
    SET_LOGOUTBUTTONACTION,
    SET_GENREMODE,
    SET_AMOUNTTRACKS, SET_ISPLAYING
} from './types';

export const setTracks = (tracks: any[]) => ({
    type: SET_TRACKS,
    payload: tracks,
});

export const setIndex = (trackIndex: number) => ({
    type: SET_INDEX,
    payload: trackIndex,
});

export const setSearchInput = (searchInput: string) => ({
    type: SET_SEARCHINPUT,
    payload: searchInput,
});

export const setLoginStatus = (loginStatus: boolean) => ({
    type: SET_LOGINSTATUS,
    payload: loginStatus,
});

export const setLogoutButtonAction = (logoutButtonAction: boolean) => ({
    type: SET_LOGOUTBUTTONACTION,
    payload: logoutButtonAction,
});

export const setGenreMode = (genreMode: string) => ({
    type: SET_GENREMODE,
    payload: genreMode,
});

export const setAmountTracks = (amountTracks: number) => ({
    type: SET_AMOUNTTRACKS,
    payload: amountTracks,
});

export const setIsPlaying = (isPlaying: boolean) => ({
    type: SET_ISPLAYING,
    payload: isPlaying,
});