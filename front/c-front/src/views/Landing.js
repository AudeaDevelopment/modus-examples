import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 8em;
  h1 {
    text-align: center;
    font-size: 4em;
  }
`;

export default () => (
  <Wrapper>
    <h1>(Landing Page Headline)</h1>
  </Wrapper>
);
