import React from 'react';
import styled from 'styled-components';

import Stepper from './Stepper';
import { LinkButton } from '../../../styles';

const OuterWrapper = styled.div`
  width: 39em;
  margin: 4em auto 0;
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  width: 33em;
  margin: 0 auto;
`;

const Text = styled.p`
  color: #9B9B9B;
  font-size: 1.1em;
  margin-bottom: 2em;
`;

const StyledLinkButton = styled(LinkButton)`
  margin-top: 3em;
  align-self: flex-end;
`;

export default () => (
  <OuterWrapper>
    <InnerWrapper>
      <Text>
        You will be guided through the process of connecting your cloud storage accounts in 4 easy steps…
      </Text>
      <Stepper mode="column" />
    </InnerWrapper>
    <StyledLinkButton href="/accounts/connect-accounts/1">Let&#39;s go!</StyledLinkButton>
  </OuterWrapper>
);
