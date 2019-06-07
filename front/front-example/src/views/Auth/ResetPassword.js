import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { HeadText, Label, Input, Toast } from './styles';
import { Button } from '../../styles';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: .5em;
`;

class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleSubmit = () => {
    const {
      state: { email, password },
    } = this;
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
        <HeadText>Reset your password</HeadText>
        <Label>Email Address</Label>
        <Input
          type="text"
          value={email}
          onChange={({ target: { value } }) => handleChange('email', value)}
          placeholder="You Email Address"
        />
        <Label>New Password</Label>
        <Input
          type="password"
          value={password}
          onChange={({ target: { value } }) => handleChange('password', value)}
          placeholder="Your new Password"
        />
        {maybeRenderNotification()}
        <StyledButton text="Reset" onClick={handleSubmit} />
      </Wrapper>
    );
  }
}

export default withRouter(ResetPassword);
