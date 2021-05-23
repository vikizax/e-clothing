import ShopActionTypes from './shop.types';

// import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'
// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// });

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START,
});


export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
});

// export const fetchCollectionStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionStart())

//         collectionRef.get()
//             .then(snaphot => {
//                 const collectionsMap = convertCollectionSnapshotToMap(snaphot);
//                 dispatch(fetchCollectionSuccess(collectionsMap));
//             }).catch(error => dispatch(fetchCollectionFailure(error.message)))
//     }
// };