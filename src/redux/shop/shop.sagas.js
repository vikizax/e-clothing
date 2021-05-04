import { takeLatest, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import {
    firestore,
    convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';

import {
    fetchCollectionSuccess,
    fetchCollectionFailure
} from './shop.action';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();

        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);

        yield put(fetchCollectionSuccess(collectionsMap));

    } catch (error) {

        yield put(fetchCollectionFailure(error.message()));
    
    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionsAsync
    );
}