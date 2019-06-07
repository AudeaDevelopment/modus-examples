import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../api';
import { HeadText, Label, Input, Anchor, LinkSpan, AccountText, Toast } from './styles';
import { Button } from '../../styles';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ResetPasswordLink = styled(Anchor)`
  margin: 1em 0;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: .5em;
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const {
      props: { history },
      state: { email, password },
    } = this;

    login(email, password)
      .then((v) => {
        console.log(v)
        history.push('/dashboard');
      })
      .catch((caught) => {
        console.log(caught);
        const { response, status } = caught;
        console.log(response, status)
        if (response) {
          const { error } = response.body;
          if ((error === 'INVALID_EMAIL') || (error === 'INVALID_PASSWORD')) {
            return this.setState({
              error: 'Please enter your username and password correctly',
            });
          }
        }
      });
  };

  handleChange = (name, value) =>
    this.setState({ [name]: value });

  maybeRenderNotification = () => {
    const { error } = this.state;
    if (!error) return null;
    return (
      <Toast>{error}</Toast>
    );
  };

  render() {
    const {
      state: { email, password },
      handleChange,
      handleSubmit,
      maybeRenderNotification,
    } = this;

    return (
      <Wrapper>
        <HeadText>Sign in to your account</HeadText>
        <Label>Email Address</Label>
        <Input
          type="text"
          value={email}
          onChange={({ target: { value } }) => handleChange('email', value)}
          placeholder="You Email Address"
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={({ target: { value } }) => handleChange('password', value)}
          placeholder="Your Password"
        />
        {maybeRenderNotification()}
        <StyledButton text="Sign in" onClick={handleSubmit} />
        <ResetPasswordLink
          fontSize="1.1em"
          href="/auth/reset-password"
        >
          Reset your password
        </ResetPasswordLink>
        <LinkSpan>
          <AccountText>No Account?</AccountText>
          <Anchor
            href="/auth/signup"
            fontSize="1.2em"
          >
            Create one here
          </Anchor>
        </LinkSpan>
      </Wrapper>
    );
  }
}

export default withRouter(Login);
