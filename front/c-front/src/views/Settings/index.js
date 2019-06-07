import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Nav from './Nav';

import Input from '../../components/Input';
import CheckBoxGroup from '../../components/CheckBoxGroup';
import Dropdown from '../../components/Dropdown';

// placeholder
import { settings as mockSettings } from '../../mockData';

// placeholder
const timeZoneOptions = ['Pacific Standard', 'Something', 'Something else'];

const Wrapper = styled.div`
  width: 80em;
  margin: 3em auto;
  position: relative;
`;

const Anchor = styled.div`
  top: ${({ offset }) => `${offset}%`};
  position: absolute;
`;

const Main = styled.div`
  margin-left: 36em;
  width: 44em;
  color: #444;
`;

const SectionTitle = styled.div`
  font-size: 2.8em;
  margin-bottom: 1em;
  padding-top: 2.7em;
`;

const Card = styled.div`
  border: 2px solid #888;
  padding: 2em 2em 2em 4em;
  margin: 1em 0 0 2em;
  box-sizing: border-box;
`;

const CardLabel = styled.div`
  font-size: 2em;
  margin: 0 0 .5em -1em;
`;

const TextButton = styled.button`
  outline: none;
  border: none;
  color: blue;
  padding: 0;
  margin: 0;
  font-size: 1.7em;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  height: 4em;
  width: 24em;
  margin-bottom: 1em;
`;

const UsernameInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4em;
  &:before {
    content: 'www.domain.com/user/';
    font-size: 2em;
    margin-right: .5em;
  }
`;

const PaymentHistory = styled.div`
  width: 80em;
  padding: 2em 2em 2em 4em;
  border: 2px solid #888;
  box-sizing: border-box;
  margin: 1em 0 0 2em;
`;

const RateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4em;
  color: #888;
  &:before {
    content: '$';
    font-size: 1.8em;
    margin-right: .5em;
  }
  &:after {
    content: 'USD for 15 minutes';
    font-size: 1.8em;
    width: 130em;
    margin-left: .5em;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleCell = styled.div`
  color: #444;
  font-size: 1.7em;
  margin-top: 1.5em;
`;

const Cell = styled.div`
  color: #888;
  font-size: 1.6em;
  margin-top: 1.5em;
`;

export default class Settings extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    // TODO: fetch user settings

    // placeholder
    const settings = mockSettings;
    this.setState({ ...settings, activeLink: 'Account', isLoaded: true });
  }

  handleNavClick = activeLink => (
    this.setState({ activeLink })
  );

  handleChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleEmailClick = () => {
    // const { email } = this.state;

    // TODO: post request to update email
  };

  handlePasswordClick = () => {
    // const { password } = this.state;

    // TODO: post request to update password
  };

  handleChangeAndUpdate = (name, value) => {
    // const oldValue = this.state[name];
    this.setState({ [name]: value });
    // TODO: post to update profile[name] = value;
    // .catch(() => this.setState({ [name]: oldValue }))
  };

  renderAnchors = () => (
    // TODO: figure out why these are different at different resolutions

    <Fragment>
      <Anchor id="Account" offset="-5" />
      <Anchor id="Payment" offset="29.3" />
    </Fragment>
  );

  renderPaymentHistory = () => {
    const { paymentHistory } = this.state;
    if (!paymentHistory) return null;
    const headers = Object.keys(paymentHistory[0]);
    const columns = headers.reduce((acc, header) => {
      const column = [];
      paymentHistory.forEach(obj => (
        column.push(obj[header])
      ));
      acc.push(column);
      return acc;
    }, []);

    return (
      <List>
        {headers.map((header, x) => (
          <Column key={header}>
            <TitleCell>{header}</TitleCell>
            {columns[x].map(value => (
              <Cell>{value}</Cell>
            ))}
          </Column>
        ))}
      </List>
    );
  };

  render() {
    const {
      state: {
        isLoaded,
        activeLink,
        email,
        password,
        timeZone,
        userName,
        profileVisibility,
        rate,
      },
      renderAnchors,
      renderPaymentHistory,
      handleNavClick,
      handleChange,
      handleEmailClick,
      handlePasswordClick,
      handleChangeAndUpdate,
    } = this;

    // TODO: add loader
    if (!isLoaded) return null;

    return (
      <Wrapper>
        <Nav
          activeLink={activeLink}
          onClick={handleNavClick}
        />
        <Main>
          {renderAnchors()}
          <SectionTitle>Account</SectionTitle>
          <Card>
            <CardLabel>Email</CardLabel>
            <InputWrapper>
              <Input
                value={email}
                onChange={({ target: { value } }) => handleChange('email', value)}
              />
            </InputWrapper>
            <TextButton onClick={handleEmailClick}>Update</TextButton>
          </Card>
          <Card>
            <CardLabel>Password</CardLabel>
            <InputWrapper>
              <Input
                password
                value={password}
                onChange={({ target: { value } }) => handleChange('password', value)}
              />
            </InputWrapper>
            <TextButton onClick={handlePasswordClick}>Change Password</TextButton>
          </Card>
          <Card>
            <CardLabel>Time zone</CardLabel>
            <InputWrapper>
              <Dropdown
                fontSize="1.8"
                value={timeZone}
                options={timeZoneOptions}
                onSelect={value => handleChangeAndUpdate('timeZone', value)}
              />
            </InputWrapper>
          </Card>
          <Card>
            <CardLabel>Your username</CardLabel>
            <UsernameInputWrapper>
              <Input
                value={userName}
                onChange={({ target: { value } }) => handleChange('userName', value)}
              />
            </UsernameInputWrapper>
          </Card>
          <Card>
            <CardLabel>Connected Accounts</CardLabel>
            {/* {TODO: handle the connected accounts in general} */}
          </Card>
          <Card>
            <CardLabel>Profile Visibility</CardLabel>
            <CheckBoxGroup
              activeOption={profileVisibility}
              options={['Public', 'Only Logged-In Users', 'Private']}
              handleClick={value => handleChangeAndUpdate('profileVisibility', value)}
            />
          </Card>
          <Card>
            <CardLabel>Deactivate my account</CardLabel>
            <CardLabel>Delete my account</CardLabel>
          </Card>
          <SectionTitle>Payment</SectionTitle>
          <Card>
            <CardLabel>Payment method</CardLabel>
            {/* {TODO} */}
          </Card>
          <Card>
            <CardLabel>Payout information</CardLabel>
            {/* {TODO} */}
          </Card>
          <PaymentHistory>
            <CardLabel>Payment history</CardLabel>
            {renderPaymentHistory()}
          </PaymentHistory>
          <SectionTitle>Rate</SectionTitle>
          <Card>
            <CardLabel>Mentorship Rate</CardLabel>
            <RateInputWrapper>
              <Input
                value={rate}
                onChange={({ target: { value } }) => handleChange('rate', value)}
              />
            </RateInputWrapper>
          </Card>
        </Main>
      </Wrapper>
    );
  }
}
