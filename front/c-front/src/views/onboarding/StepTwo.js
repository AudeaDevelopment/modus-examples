import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import TimezonePicker, { timezones } from 'react-timezone';
import { setUserData } from '../../util/db';
import Stepper from './Stepper';

import {
  Wrapper,
  Title,
  Description,
  Graphic,
  InputsSection,
  Label,
  SkipLink
} from './styles';

import { Button } from '../../common-styles';

const StyledButton = styled(Button)`
  height: 3.4em;
  width: 24em;
  font-size: 1.4em;
  margin: 0 auto;
`;

const TimezonePickerWrapper = styled.div`
  position: relative;
  div {
    z-index: 1;
    width: 100%;
    input {
      border: 2px solid #888;
      border-radius: 0;
      height: 2em;
      cursor: pointer;
    }
    ul {
      border: 2px solid #888;
      border-top: 1px solid #888;
      border-radius: 0;
    }

  }
`;

class StepTwo extends Component {
  state = {
    timeZone: '',
  };

  handleSelectChange = (timeZone) => (
    this.setState({ timeZone })
  );

  handleSubmit = () => {
    const {
      state: { timeZone },
      props: { history }
    } = this;

    const timezone = timezones.find(({ name }) => name === timeZone);

    setUserData({ timezone })
      .then(() => history.push('/onboarding/3'))
      .catch(err =>
        console.log('Error setting user timezone', err)
      );
  };

  handleSkipClick = () => {
    const {
      props: { history }
    } = this;

    setUserData({ skipOnboarding2: true })
      .then(() => history.push('/onboarding/3'))
      .catch(err =>
        console.log('Error setting user skipOnboarding2 to true', err)
      );
  };

  render() {
    const {
      state: { timeZone },
      handleSelectChange,
      handleSubmit,
      handleSkipClick,
    } = this;

    return (
      <Wrapper>
        <Stepper step="2" />
        <Title>Set your time zone</Title>
        <Description>
          We&#39;ll use this to display any dates &amp; times in your local time
          zone.
        </Description>
        <Graphic />
        <InputsSection>
          <Label>Time zone</Label>
          <TimezonePickerWrapper>
            <TimezonePicker
              onChange={handleSelectChange}
              value={timeZone}
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone',
              }}
            />
          </TimezonePickerWrapper>
        </InputsSection>
        <StyledButton
          onClick={handleSubmit}
          text="Set time zone"
          background="#000"
        />
        <SkipLink onClick={handleSkipClick}>Skip for now</SkipLink>
      </Wrapper>
    );
  }
}

export default withRouter(StepTwo);
