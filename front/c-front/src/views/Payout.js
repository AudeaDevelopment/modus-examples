import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import CheckBoxGroup from '../components/CheckBoxGroup';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';

import { Button } from '../common-styles';

// TODO: how is this information submitted?

// TODO: get these from somewhere
const countryOptions = [
  'United States',
  'Canada',
  'Mexico',
];

// TODO: ??
const phoneCountryOptions = [
  'US (+1)',
];

const Wrapper = styled.div`
  width: 80em;
  margin: 3em auto;
`;

const Title = styled.div`
  font-size: 3em;
`;

const SectionTitle = styled.div`
  font-size: 2em;
  color: #888;
  margin: 3em 0 1.5em;
`;

const Card = styled.div`
  border: 2px solid #888;
  background: #FFF;
  box-sizing: border-box;
  padding: 3em;
`;

const CardRow = styled.div`
  padding-left: ${({ padding }) => `${padding}em`};
  margin-right: ${({ margin }) => margin ? `${margin}em` : '0'};
  margin-bottom: 1.5em;
  height: 4.5em;
  position: relative;
  display: flex;
  align-items: center;
  &:before {
    content: "${({ label }) => label}";
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    font-size: 2em;
    left: 0;
    color: ${({ light }) => light ? '#BBB' : '#888'};
  }
`;

const PhoneLabels = styled.div`
  display: flex;
  flex-direction: column;
  width: 40em;
  position: absolute;
  left: 0;
`;

const PhoneLabel = styled.div`
  font-size: 2em;
  line-height: 1.5em;
  color: ${({ dark }) => dark ? '#888' : '#BBB'};
`;

const MultiInputs = styled.div`
  display: flex;
  align-items: center;
`;

const HR = styled.div`
  background: #DDD;
  height: 2px;
  margin: 3em -3em;
`;

export default class Payout extends Component {
  code2 = createRef();

  code3 = createRef();

  code4 = createRef();

  state = {
    entity: 'Individual', // Individual or Company
    firstName: '',
    lastName: '',
    dob: '',
    zip: '',
    city: '',
    country: 'United States',

    phoneCountry: 'US (+1)',
    phone: '',
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    email: '',

    sendTo: 'Debit card', // Debit card or Bank account
    cardNumber: '',
    expiration: '',
  };

  componentDidMount() {

  }

  handleChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleCodeChange = (name, value) => {
    this.setState({ [name]: value });
    const next = parseInt(name[4], 10) + 1;
    if (next !== 5) {
      this[`code${next}`].current.focus();
    }
  };

  handleGetCodeClick = () => {
    // TODO: send verification code
  };

  render() {
    const {
      state: {
        entity,
        firstName,
        lastName,
        dob,
        city,
        country,
        phoneCountry,
        phone,
        code1,
        code2,
        code3,
        code4,
        email,
        sendTo,
        cardNumber,
        expiration,
      },
      handleChange,
      handleCodeChange,
      handleGetCodeClick,
    } = this;

    return (
      <Wrapper>
        <Title>Payout information</Title>
        <SectionTitle>The basics</SectionTitle>
        <Card>
          <CardRow>
            <CheckBoxGroup
              row
              fontSize="2"
              activeOption={entity}
              options={['Individual', 'Company']}
              handleClick={value => handleChange('entity', value)}
            />
          </CardRow>
          <CardRow label="Legal name" padding="20" margin="20">
            <Input
              value={firstName}
              onChange={({ target: { value } }) => handleChange('firstName', value)}
              placeholder="First name"
            />
          </CardRow>
          <CardRow padding="20" margin="20">
            <Input
              value={lastName}
              onChange={({ target: { value } }) => handleChange('lastName', value)}
              placeholder="Last name"
            />
          </CardRow>
          <CardRow label="Date of birth" padding="20" margin="40">
            <Input
              value={dob}
              onChange={({ target: { value } }) => handleChange('dob', value)}
              placeholder="MM / DD / YY"
            />
          </CardRow>
          <CardRow label="City" padding="20" margin="20">
            <Input
              value={city}
              onChange={({ target: { value } }) => handleChange('city', value)}
              placeholder="San Francisco"
            />
          </CardRow>
          <CardRow label="Country" padding="20" margin="20">
            <Dropdown
              fontSize="2"
              value={country}
              onSelect={value => handleChange('country', value)}
              options={countryOptions}
            />
          </CardRow>
        </Card>
        <SectionTitle>Your contact information</SectionTitle>
        <Card>
          <CardRow padding="34.5">
            <PhoneLabels>
              <PhoneLabel dark>Mobile phone</PhoneLabel>
              <PhoneLabel>We&#39;ll text login codes to this number</PhoneLabel>
            </PhoneLabels>
            <MultiInputs>
              <Dropdown
                width="12"
                fontSize="2"
                marginRight="1em"
                value={phoneCountry}
                onSelect={value => handleChange('phoneCountry', value)}
                options={phoneCountryOptions}
              />
              <Input
                value={phone}
                onChange={({ target: { value } }) => handleChange('phone', value)}
                placeholder="(555) 678-1212"
              />
            </MultiInputs>
          </CardRow>
          <CardRow label="Verification code" padding="34.5">
            <MultiInputs>
              <Input
                single
                value={code1}
                fontSize="2"
                onKeyPress={({ key }) => handleCodeChange('code1', key)}
              />
              <Input
                single
                value={code2}
                fontSize="2"
                innerRef={this.code2}
                onKeyPress={({ key }) => handleCodeChange('code2', key)}
              />
              <Input
                single
                value={code3}
                fontSize="2"
                innerRef={this.code3}
                onKeyPress={({ key }) => handleCodeChange('code3', key)}
              />
              <Input
                single
                value={code4}
                fontSize="2"
                innerRef={this.code4}
                onKeyPress={({ key }) => handleCodeChange('code4', key)}
              />
              <Button
                text="Get code"
                background="#BBB"
                height="3.2"
                width="13.4"
                color="#444"
                onClick={handleGetCodeClick}
              />
            </MultiInputs>
          </CardRow>
          <HR />
          <CardRow label="Email" />
          <CardRow label="We'll send important alerts to this email" light padding="34.5">
            <Input
              value={email}
              onChange={({ target: { value } }) => handleChange('email', value)}
              placeholder="you@example.com"
            />
          </CardRow>
        </Card>
        <SectionTitle>Where should we send your payouts?</SectionTitle>
        <Card>
          <CardRow label="Send to" padding="34.5">
            <CheckBoxGroup
              row
              fontSize="2"
              activeOption={sendTo}
              options={['Debit card', 'Bank account']}
              handleClick={value => handleChange('sendTo', value)}
            />
          </CardRow>
          <HR />
          <CardRow label="Card number" padding="34.5">
            <Input
              value={cardNumber}
              onChange={({ target: { value } }) => handleChange('cardNumber', value)}
              placeholder="1234-1234-1234-1234"
            />
          </CardRow>
          <HR />
          <CardRow label="Expiration date" padding="34.5" margin="29">
            <Input
              value={expiration}
              onChange={({ target: { value } }) => handleChange('expiration', value)}
              placeholder="MM / YY"
            />
          </CardRow>
        </Card>
      </Wrapper>
    );
  }
}
