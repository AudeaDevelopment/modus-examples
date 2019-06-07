import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Input from '../../../components/Input';
import { Button } from '../../../common-styles';

const PaymentFormHeader = styled.div`
  width: 100%;
  height: 4em;
  border-bottom: 2px solid #888;
  font-size: 2.2em;
  text-align: center;
  line-height: 4em;
`;

const OptionHeader = styled.div`
  padding: 0 5em;
  margin: 3em 0;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'none' : 'auto')};
  box-sizing: border-box;
`;

// placeholder
const OptionRadial = styled.div`
  border-radius: 50%;
  background: ${({ isActive }) => (isActive ? '#888' : '#BBB')};
  border: 2px solid #888;
  height: 2.5em;
  width: 2.5em;
  box-sizing: border-box;
`;

const OptionText = styled.div`
  padding-left: .4em;
  font-size: 2.2em;
  color: ${({ isActive }) => (isActive ? '#444' : '#BBB')};
`;

const CardForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 5em;
  box-sizing: border-box;
`;

const FormRow = styled.div`
  margin: .5em 0;
  width: 100%;
  height: 3.5em;
  display: flex;
  justify-content: space-between;
`;

const PayPalHeader = styled.div`
  padding: 0 5em;
`;

const PayPalHeaderText = styled.div`
  font-size: 2em;
`;

const LinkPayPalButton = styled(Button)`
  margin: 2em 5em;
  font-size: 1em;
`;

export default class PaymentMethodForm extends Component {
  state = {
    isAddingCardInfo: true,
    cardNumber: '',
    firstName: '',
    lastName: '',
    mmyy: '',
    code: '',
  };

  handleInputChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleModeToggle = () => (
    this.setState({ isAddingCardInfo: !this.state.isAddingCardInfo })
  );

  handleLinkPayPalClick = () => {
    // TODO: payPal oauth flow then redirect back to this url
    // may need to encode some state to parse in the redirect url params to reopen this modal
  };

  maybeRenderCardForm = () => {
    const {
      state: {
        isAddingCardInfo,
        cardNumber, firstName, lastName, mmyy, code,
      },
      handleInputChange,
    } = this;

    if (isAddingCardInfo) {
      return (
        <CardForm>
          <FormRow>
            <Input
              placeholder="Card Number"
              value={cardNumber}
              onChange={({ target: { value } }) =>
                handleInputChange('cardNumber', value)
              }
            />
          </FormRow>
          <FormRow>
            <Input
              half
              placeholder="First Name"
              value={firstName}
              onChange={({ target: { value } }) =>
                handleInputChange('firstName', value)
              }
            />
            <Input
              half
              placeholder="Last Name"
              value={lastName}
              onChange={({ target: { value } }) =>
                handleInputChange('lastName', value)
              }
            />
          </FormRow>
          <FormRow>
            <Input
              half
              placeholder="MM/YY"
              value={mmyy}
              onChange={({ target: { value } }) =>
                handleInputChange('mmyy', value)
              }
            />
            <Input
              half
              placeholder="Security Code"
              value={code}
              onChange={({ target: { value } }) =>
                handleInputChange('code', value)
              }
            />
          </FormRow>
        </CardForm>
      );
    }
    return null;
  };

  maybeRenderPayPalLink = () => {
    const {
      state: {
        isAddingCardInfo,
      },
      handleLinkPayPalClick,
    } = this;

    if (!isAddingCardInfo) {
      return (
        <Fragment>
          <PayPalHeader>
            <PayPalHeaderText>
              You&#39;ll be redirected to PayPal to link a verified account
            </PayPalHeaderText>
          </PayPalHeader>
          <LinkPayPalButton
            fontSize="1.6"
            width="18"
            height="4"
            background="#FFF"
            text="Link PayPal account"
            onClick={handleLinkPayPalClick}
          />
        </Fragment>
      );
    }
    return null;
  };

  render() {
    const {
      state: { isAddingCardInfo },
      handleModeToggle,
      maybeRenderCardForm,
      maybeRenderPayPalLink,
    } = this;

    return (
      <Fragment>
        <PaymentFormHeader>
          Add a payment method
        </PaymentFormHeader>
        <OptionHeader isActive={isAddingCardInfo} onClick={handleModeToggle}>
          <OptionRadial isActive={isAddingCardInfo} />
          <OptionText isActive={isAddingCardInfo}>
            Credit or debit card
          </OptionText>
        </OptionHeader>
        {maybeRenderCardForm()}
        <OptionHeader isActive={!isAddingCardInfo} onClick={handleModeToggle}>
          <OptionRadial isActive={!isAddingCardInfo} />
          <OptionText isActive={!isAddingCardInfo}>
            PayPal
          </OptionText>
        </OptionHeader>
        {maybeRenderPayPalLink()}
      </Fragment>
    );
  }
}
