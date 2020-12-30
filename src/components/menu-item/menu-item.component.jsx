import React from 'react';
import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroungImage, ContentContainer, Title, SubTitle } from './menu-item.style';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer
    className={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroungImage
      className='background-image'
      url={imageUrl}
    />
    <ContentContainer>
      <Title>{title.toUpperCase()}</Title>
      <SubTitle>SHOP NOW</SubTitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
