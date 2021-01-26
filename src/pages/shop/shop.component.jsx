import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.action';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snaphot => {
      const collectionsMap = convertCollectionSnapshotToMap(snaphot);
      updateCollections(collectionsMap);

      this.setState({ loading: false });
    });

  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        {/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div >
    );
  }
}

const MapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, MapDispatchToProps)(ShopPage);
