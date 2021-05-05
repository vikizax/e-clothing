import UserActionType from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionType.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionType.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }

}

export default userReducer;