import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { setUserData, setUserAvatar } from '../../util/db';
import Stepper from './Stepper';

import {
  Wrapper,
  Title,
  Description,
  Graphic,
  SkipLink
} from './styles';

import { Button, FileInput } from '../../common-styles';

const StyledButton = styled(Button)`
  height: 3.4em;
  width: 26em;
  font-size: 1.4em;
  margin: 1em auto 1em auto;
`;

class StepThree extends Component {
  fileInput = createRef();

  handleSkipClick = () => {
    const { history } = this.props;
    setUserData({ skipOnboarding3: true })
      .then(() => history.push('/onboarding/4'))
      .catch(err =>
        console.log('error setting skipOnboarding3 to true', err)
      );
  };

  handleFileInputChange = () => {
    const { history } = this.props;
    const file = this.fileInput.current.files[0];
    setUserAvatar(file)
      .then(() => history.push('/onboarding/4'))
      .catch(err =>
        console.log('error setting user avatar', err)
      );
  };

  render() {
    const {
      fileInput,
      handleSkipClick,
      handleFileInputChange,
    } = this;

    return (
      <Wrapper>
        <Stepper step="3" />
        <Title>Add your profile photo</Title>
        <Description>
          We&#39;ll add this to your profile for members to see.
        </Description>
        <Graphic />
        <StyledButton text="Use LinkedIn Photo" background="darkblue" />
        <FileInput
          ref={fileInput}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileInputChange}
        />
        <SkipLink onClick={handleSkipClick}>
          Skip for now
        </SkipLink>
      </Wrapper>
    );
  }
}

export default withRouter(StepThree);
