import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 2px solid #888;
  background: #DDD;
  box-sizing: border-box;
  padding: .2em;
`;

const Tag = styled.div`
  height: 3.5em;
  display: flex;
  align-items: center;
  border: 2px solid #888;
  box-sizing: border-box;
  padding: 0 .8em;
  margin: .4em;
  background: #FFF;
  cursor: pointer;
  &:before {
    content: '${({ text }) => text}';
    font-size: 1.8em;
  }
  &:after {
    content: 'x';
    margin: 0 .4em 0 .5em;
    font-size: 1.8em;
  }
`;

export default ({ tags, handleClick }) => (
  <Wrapper>
    {tags.map(tag => (
      <Tag
        key={tag}
        onClick={() => handleClick(tag)}
        text={tag}
      />
    ))}
  </Wrapper>
);
