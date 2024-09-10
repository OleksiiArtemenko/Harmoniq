import {SET_LOGINSTATUS} from '../actions/types';

const initialState: boolean = false;

interface loginStatusAction {
    type: typeof SET_LOGINSTATUS;
    payload: boolean;
}

type loginStatusActionTypes = loginStatusAction;

const loginStatusReducer = (state: boolean = initialState, action: loginStatusActionTypes): boolean => {
    switch (action.type) {
        case SET_LOGINSTATUS:
            return action.payload;
        default:
            return state;
    }
};

export default loginStatusReducer;