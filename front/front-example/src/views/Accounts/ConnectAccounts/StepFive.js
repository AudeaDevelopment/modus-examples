import React from 'react';
import styled from 'styled-components';

import { LinkButton } from '../../../styles';
import Stepper from './Stepper';

const Wrapper = styled.div`
  width: 39em;
  margin: 1em auto 0;
  display: flex;
  flex-direction: column;
`;

const DarkText = styled.p`
  color: #58585A;
  font-size: 1.2em;
  margin: 2em 0 .5em;
  align-self: center;
`;

const LightText = styled.p`
  color: #9B9B9B;
  font-size: 1em;
  margin-bottom: 1.5em;
  align-self: center;
`;

const StyledLinkButton = styled(LinkButton)`
  align-self: center;
`;

const BigIcon = styled.div`
  height: 6em;
  width: 6em;
  margin-top: 6em;
  background: #CCC;
  align-self: center;
`;

export default () => (
  <Wrapper>
    <Stepper mode="row" currentStep="4" />
    <BigIcon />
    <DarkText>All done!</DarkText>
    <LightText>
      It may take some time for the selcted files to be processed
    </LightText>
    <StyledLinkButton href="/dashboard">
      Go to Dashboard
    </StyledLinkButton>
  </Wrapper>
);
