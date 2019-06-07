import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { LinkButton } from '../../../styles';
import Stepper from './Stepper';

import { getFolders } from '../../../api';

const Wrapper = styled.div`
  max-width: 39em;
  margin: 1em auto 0;
  display: flex;
  flex-direction: column;
`;

const DarkText = styled.p`
  color: #58585A;
  font-size: 1.2em;
  margin: 2em 0 .5em;
`;

const LightText = styled.p`
  color: #9B9B9B;
  font-size: 1em;
  margin-bottom: 1.5em;
`;

const StyledLinkButton = styled(LinkButton)`
  margin-top: 3em;
  align-self: flex-end;
`;

class StepThree extends Component {
  state = {
    classified: false,
  };

  componentDidMount() {
    getFolders()
      .then()
      .catch(e => console.log(e))
  }

  render() {
    const { classified } = this.state;
    const accountType = this.props.history.location.pathname.split('/').pop();

    return (
      <Wrapper>
        <Stepper mode="row" currentStep="3" />
        <DarkText>One-time Classification</DarkText>
        <LightText>
          Select which specific files or folders container files you would like to run a classification against
        </LightText>
        <StyledLinkButton
          href={`/accounts/connect-accounts/4/${accountType}`}
        >
          {classified ? 'Continue' : 'Skip this step'}
        </StyledLinkButton>
      </Wrapper>
    );
  }
}

export default withRouter(StepThree);
