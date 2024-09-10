import { SET_INDEX } from '../actions/types';

const initialState: number = 99;

interface SetIndexAction {
    type: typeof SET_INDEX;
    payload: number;
}

type IndexActionTypes = SetIndexAction;

const indexReducer = (state: number = initialState, action: IndexActionTypes): number => {
    switch (action.type) {
        case SET_INDEX:
            return action.payload;
        default:
            return state;
    }
};

export default indexReducer;
