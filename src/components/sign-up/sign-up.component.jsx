import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { SignUpContainer, Title } from './sign-up.style';

import { signUpStart } from '../../redux/user/user.action';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    // try {
    // const { user } = await auth.createUserWithEmailAndPassword(
    //   email,
    //   password
    // );

    // await createUserProfileDocument(user, { displayName });
    signUpStart(email, password, displayName);

    this.setState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    // } catch (error) {
    // console.error(error);
    // }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
        <SignUpContainer className='sign-up'>
          <Title>I do not have a account</Title>
          <span>Sign up with your email and password</span>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              onChange={this.handleChange}
              label='Display Name'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              label='Email'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={this.handleChange}
              label='Confirm Password'
              required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </form>
        </SignUpContainer>
      );
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart:
    (email, password, displayName) =>
      dispatch(signUpStart({ email, password, displayName }))
});

export default connect(null, mapDispatchToProps)(SignUp);
