import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionType from '../user/user.types';
import { clearCart } from './cart.action';


export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionType.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSaga() {
    yield (
        all([
            call(onSignOutSuccess)
        ])
    );
}