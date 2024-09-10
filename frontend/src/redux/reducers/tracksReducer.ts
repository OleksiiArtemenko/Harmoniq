import { SET_TRACKS } from '../actions/types';

const initialState: any[] = [];

const tracksReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TRACKS:
            return action.payload;
        default:
            return state;
    }
};

export default tracksReducer;
