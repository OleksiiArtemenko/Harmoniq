import {SET_ISPLAYING} from '../actions/types';

const initialState: boolean = false;

interface isPlayingAction {
    type: typeof SET_ISPLAYING;
    payload: boolean;
}

type isPlayingActionTypes = isPlayingAction;

const isPlayingReducer = (state: boolean = initialState, action: isPlayingActionTypes): boolean => {
    switch (action.type) {
        case SET_ISPLAYING:
            return action.payload;
        default:
            return state;
    }
};

export default isPlayingReducer;