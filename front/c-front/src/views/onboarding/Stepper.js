import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 9.7em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Step = styled.div`
  box-sizing: border-box;
  border: 2px solid #888;
  background: ${({ active }) => active ? '#DDD' : '#FFF'};
  border-radius: 50%;
  height: 2.5em;
  width: 2.5em;
`;

export default ({ step }) => (
  <Wrapper>
    <Step active={step == 1} />
    <Step active={step == 2} />
    <Step active={step == 3} />
  </Wrapper>
);
