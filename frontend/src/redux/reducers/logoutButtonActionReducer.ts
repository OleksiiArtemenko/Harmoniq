import {SET_LOGOUTBUTTONACTION} from '../actions/types';

const initialState: boolean = false;

interface logoutButtonAction {
    type: typeof SET_LOGOUTBUTTONACTION;
    payload: boolean;
}

type logoutButtonActionTypes = logoutButtonAction;

const logoutButtonActionReducer = (state: boolean = initialState, action: logoutButtonActionTypes): boolean => {
    switch (action.type) {
        case SET_LOGOUTBUTTONACTION:
            return action.payload;
        default:
            return state;
    }
};

export default logoutButtonActionReducer;