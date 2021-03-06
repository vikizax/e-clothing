import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionType from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.action';


export function* getSnapshotFromUserAuth(userAuth, additionalData, signUp) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, { ...additionalData });
        const userSnapshot = yield userRef.get();
        if (signUp)
            yield put(signUpSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        else
            yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        if (signUp)
            yield put(signUpFailure(error));
        else
            yield put(signInFailure(error));
    }
}


export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user, { displayName });
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        yield getSnapshotFromUserAuth(userAuth);

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (err) {
        yield put(signOutFailure(err));
    }

}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionType.SIGN_UP_START, signUp);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOut() {
    yield takeLatest(UserActionType.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOut),
        call(onSignUpStart)
    ]);
}