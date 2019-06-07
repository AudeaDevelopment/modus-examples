import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${({ half, single }) => single ? '4em' : half ? '48%' : '100%'};
  height: ${({ height }) => height ? `${height}em` : '100%'};
  border: 2px solid #888;
  outline: none;
  padding-left: 1em;
  box-sizing: border-box;
  margin: ${({ single }) => single ? '0 1em 0 0' : '.5em 0'};
  background: ${({ background }) => background || '#FFF'};
`;

const Input = styled.input`
  background: ${({ background }) => background || '#FFF'};
  width: 100%;
  height: 100%;
  color: #888;
  outline: none;
  border: none;
  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize ? `${fontSize}em` : '1.6em'};
  &::placeholder {
    color: #BBB;
  }
`;

export default ({ background, value, onChange, placeholder, half, single, fontSize, innerRef, onKeyPress, password, height }) => (
  <Wrapper background={background} half={half} single={single} height={height}>
    <Input
      type={password ? 'password' : 'text'}
      placeholder={placeholder}
      background={background}
      onChange={onChange}
      value={value}
      fontSize={fontSize}
      ref={innerRef}
      onKeyPress={onKeyPress}
    />
  </Wrapper>
);
