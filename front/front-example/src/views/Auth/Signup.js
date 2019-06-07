import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '../../api';
import { HeadText, Label, Input, Anchor, LinkSpan, AccountText, Toast } from './styles';
import { Button } from '../../styles';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TermsSpan = styled.span`
  display: block;
  margin: auto;
  margin-top: .8em;
  width: 16em;
  text-align: center;
`;

const TermsText = styled.h4`
  color: #888;
  display: inline;
`;

const TermsLink = styled(Anchor)`
  margin-left: .3em;
  color: #888;
  display: inline;
`;

const StyledButton = styled(Button)`
  margin-top: 1em;
`;

class Signup extends Component {
  state = {
    email: '',
    company: '',
    password: '',
    error: '',
  };

  handleSubmit = () => {
    const {
      props: { history },
      state: { email, password },
    } = this;

    signup(email, password)
      .then(() =>
        history.push('/creating-account')
      )
      .catch(({ response: { body } }) => {
        const { error } = body;
        if (error === 'EMAIL_EXISTS') {
          return this.setState({
            error: 'You are already registered, please login or reset password',
          });
        }
        // eslint-disable-next-line
        alert('unhandled error');
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
      state: { email, password, company },
      handleChange,
      handleSubmit,
      maybeRenderNotification,
    } = this;

    return (
      <Wrapper>
        <HeadText>Sign up to Get Started</HeadText>
        <Label>Email Address</Label>
        <Input
          type="text"
          value={email}
          onChange={({ target: { value } }) => handleChange('email', value)}
          placeholder="Your Email Address"
        />
        <Label>Company Name</Label>
        <Input
          type="text"
          value={company}
          onChange={({ target: { value } }) => handleChange('company', value)}
          placeholder="Your Company Name"
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={({ target: { value } }) => handleChange('password', value)}
          placeholder="Your Password"
        />
        {maybeRenderNotification()}
        <StyledButton text="Get Started" onClick={handleSubmit} />
        <TermsSpan>
          <TermsText>
            By signing up to this service you agree to our
          </TermsText>
          <TermsLink
            underline
          >
            terms of use
          </TermsLink>
        </TermsSpan>
        <LinkSpan>
          <AccountText>Already have an account?</AccountText>
          <Anchor
            href="/auth/login"
            fontSize="1.2em"
          >
            Sign in
          </Anchor>
        </LinkSpan>
      </Wrapper>
    );
  }
}

export default withRouter(Signup);
