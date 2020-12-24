import React from 'react';

import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';

import CardDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selector';

import { selectCartHidden } from '../../redux/cart/cart.selector';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>

      <OptionLink to='/contact'>
        CONTACT
      </OptionLink>

      {currentUser ? (
        <OptionDiv onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionDiv>

      ) : (

          <OptionLink to='/signin'>
            SIGN IN
          </OptionLink>
        )}
      <CartIcon />
    </OptionsContainer>
    {
      hidden ? null :
        <CardDropdown />
    }
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
