import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.4em;
  color: #58585A;
`;

const InnerWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export default () => (
  <OuterWrapper>
    <Title>Connect Accounts</Title>
    <InnerWrapper>
      <Switch>
        <Route path="/*/1" component={StepOne} />
        <Route path="/*/2" component={StepTwo} />
        <Route path="/*/3" component={StepThree} />
        <Route path="/*/4" component={StepFour} />
        <Route path="/*/5" component={StepFive} />
        <Route path="/" component={StepZero} />
      </Switch>
    </InnerWrapper>
  </OuterWrapper>
);
