import React from 'react';

import { connect } from 'react-redux';

// import { auth } from '../../firebase/firebase.utils';

import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';

import CardDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selector';

import { selectCartHidden } from '../../redux/cart/cart.selector';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import { signOutStart } from '../../redux/user/user.action';

const Header = ({ currentUser, hidden, signOutStart }) => (
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
        // <OptionLink as='div' onClick={() => auth.signOut()}>
        <OptionLink as='div' onClick={() => signOutStart()}>
          SIGN OUT
        </OptionLink>

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

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
