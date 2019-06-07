import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TimezonePicker from 'react-timezone';

import { Button } from '../../../common-styles';
import { TextButton } from '../styles';
import PaymentMethodForm from './PaymentMethodForm';

const Wrapper = styled.div`
  position: absolute;
  top: 2em;
  width: 50em;
  border: 2px solid #888;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  color: #888;
  background: #FFF;
`;

const ListHeader = styled.div`
  width: 100%;
  padding: 2em;
  box-sizing: border-box;
`;

const ListHeaderText = styled.div`
  font-size: 2em;
  font-size: 2.3em;
  line-height: 1.4em;
`;

const List = styled.div`
  width: 100%;
  padding: 0 2em 2em 2em;
  box-sizing: border-box;
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  height: 4em;
`;

const RowNumber = styled.div`
  color: #000;
  font-size: 3em;
  margin-right: .5em;
  &:after {
    content: '${({ text }) => text})';
  }
`;

const RowText = styled.div`
  cursor: ${({ isComplete }) => (isComplete ? 'default' : 'pointer')};
  color: ${({ isComplete }) => (isComplete ? '#888' : 'blue')};
  text-decoration: ${({ isComplete }) => (isComplete ? 'line-through' : 'none')};
  font-size: 2em;
`;

const SaveButton = styled(TextButton)`
  width: 4em;
  height: 2em;
  margin-left: 2em;
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em 0;
`;

const SuccessHeader = styled.div`
  font-size: 2.4em;
`;

const SuccessMessage = styled.div`
  font-size: 2em;
  color: #BBB;
  margin: 1em 0 2em;
`;

const OkButton = styled(Button)`
  font-size: 1em;
`;

const TimezonePickerWrapper = styled.div`
  position: relative;
  width: 50em;
  div {
    z-index: 1;
    width: 100%;
    input {
      border: 2px solid #888;
      border-radius: 0;
      height: 2em;
      cursor: pointer;
      color: #888;
    }
    ul {
      border: 2px solid #888;
      border-top: 1px solid #888;
      border-radius: 0;
      li {
        color: #888;
      }
    }
  }
`;

export default class Payment extends Component {
  state = {
    timeZone: '',
    isComplete: false,
    isAddingTimeZone: false,
    isAddingPaymentMethod: false,
  };

  handleAddPaymentClick = () => (
    this.setState({ isAddingPaymentMethod: true })
  );

  handleInputChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleTimeZoneSaveClick = () => {
    const {
      state: { timeZone },
      props: { handleTimeZoneSave },
    } = this;
    handleTimeZoneSave(timeZone)
      .then(() => this.setState({ isAddingTimeZone: false }));
  };

  handleTimeZoneRowClick = () => (
    this.setState({ isAddingTimeZone: true })
  );

  handlePaymentRowClick = () => (
    this.setState({ isAddingPaymentMethod: true })
  );

  handleTimeZoneSelect = timeZone => (
    this.setState({ timeZone })
  );

  renderList = () => {
    const {
      state: {
        isAddingTimeZone,
        timeZone,
      },
      props: {
        timeZoneComplete,
        paymentConfigured,
      },
      handleTimeZoneSaveClick,
      handleTimeZoneSelect,
      handleTimeZoneRowClick,
      handlePaymentRowClick,
    } = this;

    return (
      <Fragment>
        <ListHeader>
          <ListHeaderText>We ask everyone to confirm a few details before being able to book mentors.  You&#39;ll only have to do this once.</ListHeaderText>
        </ListHeader>
        <List>
          <ListRow>
            <RowNumber text="1" />
            <RowText isComplete>Confirm your email</RowText>
          </ListRow>
          <ListRow>
            <RowNumber text="2" />
            {isAddingTimeZone ? (
              <Fragment>
                <TimezonePickerWrapper>
                  <TimezonePicker
                    onChange={handleTimeZoneSelect}
                    value={timeZone}
                    inputProps={{
                      placeholder: 'Select Timezone...',
                      name: 'timezone',
                    }}
                  />
                </TimezonePickerWrapper>
                <SaveButton onClick={handleTimeZoneSaveClick} text="Save" />
              </Fragment>
            ) : (
              <RowText
                isComplete={timeZoneComplete}
                onClick={handleTimeZoneRowClick}
              >
                Set your time zone
              </RowText>
            )}
          </ListRow>
          <ListRow>
            <RowNumber text="3" />
            <RowText
              isComplete={paymentConfigured}
              onClick={handlePaymentRowClick}
            >
              Add payment method
            </RowText>
          </ListRow>
        </List>
      </Fragment>
    );
  };

  renderSuccess = () => {
    const { handlePaymentOkClick } = this.props;

    return (
      <SuccessWrapper>
        <SuccessHeader>Success</SuccessHeader>
        <SuccessMessage>You may now book mentors.</SuccessMessage>
        <OkButton
          onClick={handlePaymentOkClick}
          text="Ok"
          width="15"
          height="3.5"
          background="#FFF"
        />
      </SuccessWrapper>
    );
  };

  render() {
    const {
      state: { isComplete, isAddingPaymentMethod },
      renderSuccess,
      renderList,
    } = this;

    return (
      <Wrapper>
        {isComplete ? (
          renderSuccess()
        ) : (
          isAddingPaymentMethod ? (
            <PaymentMethodForm />
          ) : (
            renderList()
          )
        )}
      </Wrapper>
    );
  }
}
