import React, { Component } from 'react';
import styled from 'styled-components';

import {
  Wrapper,
  OrHR,
  FullHR,
  BottomSection,
  BottomSectionText,
  StyledLink
} from './styles';

import { Button, InputWrapper } from '../../common-styles';

const CheckAndLinkRow = styled.div`
  margin: 2em 0 3em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckBox = styled.div`
  border: 2px solid #888;
  background: ${({ checked }) => (checked ? 'green' : '#EEE')};
  height: 1.5em;
  width: 1.5em;
  position: relative;
  cursor: pointer;
  &:after {
    content: 'Remember me';
    position: absolute;
    top: 50%;
    left: 1.5em;
    transform: translateY(-50%);
    font-size: 1.5em;
    color: #888;
    width: 6em;
  }
`;

const ForgotLink = styled.a`
  color: blue;
  text-decoration: none;
  font-size: 1.5em;
`;

export default class LogIn extends Component {
  state = {
    email: '',
    password: '',
    remembered: false
  };

  componentDidMount() {
    const email = localStorage.getItem('remembered-email');
    if (email) {
      this.setState({ email, remembered: true });
    }
  }

  handleInputChange = (name, value) => this.setState({ [name]: value });

  handleCheckBoxClick = () => {
    const { remembered } = this.state;
    this.setState({ remembered: !remembered });
  };

  handleSubmit = () => {
    const user = { ...this.state };
    this.props.handleLogin(user);
  };

  render() {
    const {
      state: { email, password, remembered },
      handleInputChange,
      handleCheckBoxClick,
      handleSubmit
    } = this;

    return (
      <Wrapper>
        <Button
          onClick={() => console.log('linkedIn oAuth goes here')}
          background="darkblue"
          text="Login with LinkedIn"
        />
        {/* <LinkedIn /> */}
        <OrHR />
        <InputWrapper>
          <input
            value={email}
            onChange={({ target: { value } }) =>
              handleInputChange('email', value)
            }
            placeholder="Email Address"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="password"
            value={password}
            onChange={({ target: { value } }) =>
              handleInputChange('password', value)
            }
            placeholder="Password"
          />
        </InputWrapper>
        <CheckAndLinkRow>
          <CheckBox checked={remembered} onClick={handleCheckBoxClick} />
          <ForgotLink href="#">Forgot Password?</ForgotLink>
        </CheckAndLinkRow>
        <Button background="#000" text="Log In" onClick={handleSubmit} />
        <FullHR />
        <BottomSection>
          <BottomSectionText>Don&#39;t have an account?</BottomSectionText>
          <Button isSmall background="#FFF" text="Sign Up">
            <StyledLink to="/signup" />
          </Button>
        </BottomSection>
      </Wrapper>
    );
  }
}
