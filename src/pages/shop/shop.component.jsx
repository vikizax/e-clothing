import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.action';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

class ShopPage extends React.Component {

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snaphot => {
      const collectionsMap = convertCollectionSnapshotToMap(snaphot);
      updateCollections(collectionsMap);
    });

  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div >
    );
  }
}

const MapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, MapDispatchToProps)(ShopPage);
