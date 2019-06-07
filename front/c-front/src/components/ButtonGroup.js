import React from 'react';
import styled from 'styled-components';

import { Button } from '../common-styles';

const Wrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  background: ${({ isActive }) => (isActive ? '#BBB' : '#FFF')};
  color: ${({ isActive }) => (isActive ? '#FFF' : '#BBB')};
  font-size: 1em;
  &:first-child {
    border-right: none;
  }
  &:last-child {
    border-left: none;
  }
`;

export default ({ activeOption, options, handleClick, width, height, color, fontSize }) => (
  <Wrapper>
    {options.map(option => (
      <StyledButton
        key={option}
        isActive={option === activeOption}
        onClick={() => handleClick(option)}
        text={option}
        height={height || '3.5'}
        width={width || '11'}
        color={color}
        fontSize={fontSize}
      />
    ))}
  </Wrapper>
);
