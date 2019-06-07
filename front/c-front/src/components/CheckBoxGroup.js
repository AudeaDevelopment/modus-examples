import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ row }) => row ? 'row' : 'column'};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: .5em 2em .5em 0;
`;

const CheckBox = styled.div`
  border: 2px solid #888;
  box-sizing: border-box;
  height: 2em;
  width: 2em;
  background: ${({ isActive }) => (isActive ? '#888' : '#DDD')};
  cursor: pointer;
`;

const Label = styled.div`
  margin-left: .5em;
  color: #444;
  font-size: ${({ fontSize }) => fontSize || '1.8'}em;
`;

export default ({ activeOption, options, handleClick, row, fontSize }) => (
  <Wrapper row={row}>
    {options.map(option => (
      <Row key={option} onClick={() => handleClick(option)}>
        <CheckBox isActive={option === activeOption} />
        <Label fontSize={fontSize}>{option}</Label>
      </Row>
    ))}
  </Wrapper>
);
