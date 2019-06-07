import React from 'react';
import styled from 'styled-components';

import { LinkButton } from '../styles';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7em;
`;

// placeholder
const Icon = styled.div`
  width: 5.5em;
  height: 5.5em;
  background: #DDD;
  margin-bottom: 1em;
`;

const DarkText = styled.h2`
  color: #58585A;
  font-size: 1.6em;
`;

const LightText = styled.h3`
  color: #9B9B9B;
  font-size: 1em;
  margin-bottom: 1em;
`;

export default ({ caption }) => (
  <Wrapper>
    <Icon />
    <DarkText>
      {caption}
    </DarkText>
    <LightText>
      Connect your cloud storage accounts to get started
    </LightText>
    <LinkButton href="/accounts/connect-accounts">Get Started</LinkButton>
  </Wrapper>
);
