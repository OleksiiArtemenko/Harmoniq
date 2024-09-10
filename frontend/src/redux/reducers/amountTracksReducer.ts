import {SET_AMOUNTTRACKS} from '../actions/types';

const initialState: number = 10;

interface amountTracksAction {
    type: typeof SET_AMOUNTTRACKS;
    payload: number;
}

type amountTracksActionTypes = amountTracksAction;

const amountTracksReducer = (state: number = initialState, action: amountTracksActionTypes): number => {
    switch (action.type) {
        case SET_AMOUNTTRACKS:
            return action.payload;
        default:
            return state;
    }
};

export default amountTracksReducer;