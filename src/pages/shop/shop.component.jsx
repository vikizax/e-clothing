import React from 'react';

import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { fetchCollectionStartAsync } from '../../redux/shop/shop.action';
// import { selectCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  // state = {
  //   loading: true
  // }

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    /**
     * native fetch method 
     * with promise pattern
     * componentDidMount() -> async componentDidMount()
     */
    // https://firestore.googleapis.com/v1/projects/e-clothing-c64b2/databases/(default)/documents/
    // const response = await fetch('https://firestore.googleapis.com/v1/projects/e-clothing-c64b2/databases/(default)/documents/collections')
    // const collections = await response.json()
    // console.log(collections);

    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snaphot => {
    //   const collectionsMap = convertCollectionSnapshotToMap(snaphot);
    //   updateCollections(collectionsMap);

    //   this.setState({ loading: false });
    // });

    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  componentWillUnmount() {
    // this.unsubscribeFromSnapshot();
  }

  render() {
    // const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    const { match, isCollectionsLoaded } = this.props;
    // const { loading } = this.state;
    return (
      <div className='shop-page'>
        {/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
        {/* <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} /> */}
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
        {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
      </div >
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // isCollectionFetching: selectCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});
const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShopPage);
