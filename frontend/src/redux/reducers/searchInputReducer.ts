import { SET_SEARCHINPUT } from '../actions/types';

interface SearchInputAction {
    type: typeof SET_SEARCHINPUT;
    payload: string;
}

const initialState: string = '';

const searchInputReducer = (state = initialState, action: SearchInputAction): string => {
    switch (action.type) {
        case SET_SEARCHINPUT:
            return action.payload;
        default:
            return state;
    }
};

export default searchInputReducer;
