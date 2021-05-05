import UserActionType from './user.types'

export const googleSignInStart = () => ({
    type: UserActionType.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
    type: UserActionType.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const signInSuccess = user => ({
    type: UserActionType.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionType.SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type: UserActionType.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionType.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionType.SIGN_OUT_SUCCESS,
    payload: null
});