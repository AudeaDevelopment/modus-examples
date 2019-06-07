import React from 'react';
import styled from 'styled-components';

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
`;

const LightText = styled.p`
  color: #9B9B9B;
  font-size: 1em;
  margin-bottom: 2em;
`;

const Cards = styled.div`
  display: flex;
`;

const Card = styled.a`
  height: 9em;
  width: 10.2em;
  border-radius: 6px;
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.24);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
`;

const Icon = styled.div`
  height: 2.5em;
  width: 2.5em;
  background: #DDD;
`;

const CardText = styled.div`
  margin-top: 1em;
  color: #58585A;
`;

export default () => (
  <Wrapper>
    <Stepper mode="row" currentStep="1" />
    <DarkText>Select Cloud Account</DarkText>
    <LightText>First choose which cloud account you would like to connect</LightText>
    <Cards>
      <Card href="/accounts/connect-accounts/2/Box">
        <Icon />
        <CardText>Box</CardText>
      </Card>
    </Cards>
  </Wrapper>
);
