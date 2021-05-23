import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectDirectorySection } from '../../redux/directory/directory.selector';

import { DirectoryMenuContainer } from './directory.style';

const Directory = ({ sections }) =>
(
  <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);


const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection
});

export default connect(mapStateToProps)(Directory);
