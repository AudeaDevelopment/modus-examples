import React from 'react';
import styled from 'styled-components';

import ManageFiles from './ListAudits';
import GetStarted from '../GetStarted';

const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #58585A;
  font-size: 1.5em;
`;

const InnerWrapper = styled.div`
  margin-top: 2em;
  width: 100%;
  flex-grow: 1;
`;

export default ({ accounts }) => (
  <OuterWrapper>
    <Title>
      Audits
    </Title>
    <InnerWrapper>
      {accounts ? (
        <ManageFiles />
      ) : (
        <GetStarted caption="No Audits to show" />
      )}
    </InnerWrapper>
  </OuterWrapper>
);
