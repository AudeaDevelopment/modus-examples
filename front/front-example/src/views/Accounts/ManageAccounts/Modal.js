import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #BFBFBF;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 .6em;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2.7em;
  right: 0em;
  background: #FFF;
`;

const Row = styled.div`
  border-bottom: 1px solid #E4E4E4;
  color: #79797B;
  text-align: right;
  width: 6em;
  line-height: 2em;
  &:last-child {
    border-bottom: none;
  }
`;

export default ({ onRemoveClick }) => (
  <Wrapper>
    <Row>Rename</Row>
    <Row>Deactivate</Row>
    <Row onClick={onRemoveClick}>Remove</Row>
  </Wrapper>
);
