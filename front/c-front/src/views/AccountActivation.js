import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { user } from '../util/db';
import { Button, InputWrapper } from '../common-styles';

// placeholder
const Graphic = styled.div`
  background: #ddd;
  width: 30em;
  height: 30em;
  display: inline-block;
`;

const Wrapper = styled.div`
  margin: 8em auto 0;
  width: 100em;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
`;

const InnerWrapper = styled.div`
  width: 60%;
  margin-left: 6em;
  display: inline-block;
  color: #444;
`;

const Title = styled.div`
  font-size: 5em;
  line-height: 0.8em;
`;

const Caption = styled.div`
  font-size: 2.2em;
  margin: 1.4em 0;
  color: #888;
`;

const InputButtonColumn = styled.div`
  width: 28em;
  height: 11.4em;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
`;

const ChangeEmailLink = styled.a`
  position: absolute;
  left: 18.5em;
  top: 1.2em;
  font-size: 1.6em;
  text-decoration: none;
  width: 6.1em;
`;

const DetailsToggle = styled.div`
  height: 2.5em;
  width: 19.5em;
  margin: 3.5em 0;
  cursor: pointer;
  color: blue;
  position: relative;
  &:before {
    content: '^';
    transform: rotate(${({ toggled }) => (toggled ? '180' : '90')}deg);
    font-size: 2em;
    font-weight: 600;
    position: absolute;
    bottom: ${({ toggled }) => (toggled ? '.2' : '.1')}em;
  }
  &:after {
    content: "Didn't get an email?";
    padding-left: 1.5em;
    font-size: 2em;
  }
`;

const DetailsCaption = styled.div`
  font-size: 2.2em;
`;

const DetailsList = styled.ul`
  padding-left: 0.5em;
  margin: 3.5em 0 0 1.5em;
`;

const Detail = styled.li`
  font-size: 1.9em;
  color: #888;
  margin-bottom: 0.5em;
`;

export default class AccountActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isToggled: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.maybeRenderDetails = this.maybeRenderDetails.bind(this);
  }

  handleInputChange({ target: { value: email } }) {
    this.setState({ email });
  }

  handleSubmit() {
    const { email } = this.state;
    console.log('resending confimation to: ', email);
    user.sendEmailVerification().then(() =>
      this.setState({
        email: ''
        // TODO some sort of user feedback
      })
    );
  }

  handleToggleClick() {
    const { isToggled } = this.state;
    this.setState({ isToggled: !isToggled });
  }

  maybeRenderDetails() {
    const { isToggled } = this.state;
    if (isToggled) {
      return (
        <Fragment>
          <DetailsCaption>
            If you don&#39;t see an email from us within a few minutes, a few
            things could have happened:
          </DetailsCaption>
          <DetailsList>
            <Detail>The email is in your spam folder.</Detail>
            <Detail>
              The email address you entered had a mistake or typo.
            </Detail>
            <Detail>
              We can&#39;t deliver the email to this address.(Usually because of
              corporate firewalls or filtering.)
            </Detail>
          </DetailsList>
        </Fragment>
      );
    }
  }

  render() {
    const {
      state: { email, isToggled },
      handleInputChange,
      handleSubmit,
      handleToggleClick,
      maybeRenderDetails
    } = this;

    return (
      <Wrapper>
        <Graphic />
        <InnerWrapper>
          <Title>Check your email</Title>
          <Caption>
            We&#39;ve sent an email to you with a link to activate your account.
          </Caption>
          <InputButtonColumn>
            <InputWrapper height="4.5" background="#DDD">
              <input
                onChange={handleInputChange}
                value={email}
                placeholder="john@email.com"
              />
            </InputWrapper>
            <Button
              onClick={handleSubmit}
              background="#000"
              text="Resend Email"
              height="3.4"
              fontSize="1.4"
            />
            <ChangeEmailLink href="#">Change Email</ChangeEmailLink>
          </InputButtonColumn>
          <DetailsToggle onClick={handleToggleClick} toggled={isToggled} />
          {maybeRenderDetails()}
        </InnerWrapper>
      </Wrapper>
    );
  }
}
