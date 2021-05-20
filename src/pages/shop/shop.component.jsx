import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';
// import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionStart } from '../../redux/shop/shop.action';
// import { selectCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
// import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';


const ShopPage = ({ fetchCollectionStart, match }) => {

  useEffect(() => {
    fetchCollectionStart();
  }, [fetchCollectionStart]);

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      {/* <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} /> */}
      {/* <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props} />} /> */}
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      {/* <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} /> */}
    </div >
  );

}

// const mapStateToProps = createStructuredSelector({
//   // isCollectionFetching: selectCollectionFetching,
//   // isCollectionsLoaded: selectIsCollectionsLoaded
// });
const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
})

export default connect(
  null,
  mapDispatchToProps)(ShopPage);
