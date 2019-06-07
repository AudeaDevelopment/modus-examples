import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { setUserData } from '../../util/db';
import Stepper from './Stepper';

import {
  Wrapper,
  Title,
  Description,
  Graphic,
  InputsSection,
  StyledInputWrapper,
  Label
} from './styles';

import { Button } from '../../common-styles';

const StyledButton = styled(Button)`
  height: 3.4em;
  width: 24em;
  font-size: 1.4em;
  margin: 0 auto;
  pointer-events: ${({ isSubmittable }) => isSubmittable ? 'auto' : 'none'};
`;

class StepOne extends Component {
  state = {
    company: '',
    jobTitle: ''
  };

  handleInputChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleSubmit = () => {
    const {
      state: { company, jobTitle },
      props: { history }
    } = this;

    setUserData({ company, jobTitle })
      .then(history.push('/onboarding/2'))
      .catch(err => console.log('error setting user data', err));
  };

  render() {
    const {
      state: { company, jobTitle },
      props: { user: { firstName } },
      handleInputChange,
      handleSubmit
    } = this;

    return (
      <Wrapper>
        <Stepper step="1" />
        <Title>{`Hello ${firstName}! Let's verify your identity.`}</Title>
        <Description>
          Your information will be sent to our review team to verify your
          idenntity.
        </Description>
        <Graphic />
        <InputsSection>
          <Label>Company/Institution (not displayed publicly)</Label>
          <StyledInputWrapper>
            <input
              placeholder="e.g. UC Berkeley"
              value={company}
              onChange={({ target: { value } }) =>
                handleInputChange('company', value)
              }
            />
          </StyledInputWrapper>
          <Label>Job Title (not displayed publicly)</Label>
          <StyledInputWrapper>
            <input
              placeholder="e.g. Postdoc"
              value={jobTitle}
              onChange={({ target: { value } }) =>
                handleInputChange('jobTitle', value)
              }
            />
          </StyledInputWrapper>
        </InputsSection>
        <StyledButton
          isSubmittable={!!company.length && !!jobTitle.length}
          onClick={handleSubmit}
          text="Save"
          background="#000"
        />
      </Wrapper>
    );
  }
}

export default withRouter(StepOne);
