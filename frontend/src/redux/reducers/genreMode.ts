import {SET_GENREMODE} from '../actions/types';

const initialState: string = '';

interface genreModeAction {
    type: typeof SET_GENREMODE;
    payload: string;
}

type genreModeActionTypes = genreModeAction;

const genreModeReducer = (state: string = initialState, action: genreModeActionTypes): string => {
    switch (action.type) {
        case SET_GENREMODE:
            return action.payload;
        default:
            return state;
    }
};

export default genreModeReducer;