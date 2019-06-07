import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

export const FileInput = styled.input`
  font-size: 1.4em;
  height: 3.4em;
  width: 26em;
  margin: 0 auto;
  outline: none;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: 'Upload Photo';
    display: inline-block;
    border: 2px solid #888;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    height: 100%;
    width: 100%;
    font-size: 1.5em;
    background: #fff;
    box-sizing: border-box;
    text-align: center;
    line-height: 2em;
  }
  &:active::before {
    transform: translateY(1px);
    outline: none;
  }
`;

export const Button = styled.button`
  width: ${({ width, isSmall }) => width ? `${width}em` : isSmall ? '8em' : '100%'};
  color: ${({ background }) => background === '#FFF' ? '#888' : '#FFF'};
  background: ${({ background }) => background};
  height: ${({ height }) => height ? `${height}em` : '4em'};
  border: 2px solid #888;
  border-radius: ${({ circle }) => circle ? '50%' : 'unset'};
  outline: none;
  font-size: 1.4em;
  cursor: pointer;
  position: relative;
  margin: ${({ centered }) => centered ? 'auto' : '0'};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  &:active {
    transform: translateY(1px);
  }
  &:after {
    ${({ color }) => (color ? `color: ${color}` : '')};
    content: '${({ text }) => text}';
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${({ fontSize }) => fontSize ? `${fontSize}em` : '1.5em'};
    font-weight: 500;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 5.6em;
  border: 2px solid #888;
  outline: none;
  padding-left: 1em;
  box-sizing: border-box;
  margin: .5em 0;
  background: ${({ background }) => background || '#FFF'};
  input {
    background: ${({ background }) => background || '#FFF'};
    width: 100%;
    height: 100%;
    font-size: 2em;
    color: #888;
    outline: none;
    border: none;
    font-weight: 500;
  }
`;

export const Avatar = withRouter(styled.div.attrs(({ history, id }) => ({
  onClick: () => history.push(`/profile${id ? `/${id}` : ''}`),
}))`
  width: ${({ size }) => `${size}em`};
  height: ${({ size }) => `${size}em`};
  border: 2px solid #888;
  border-radius: 50%;
  background-size: cover;
  background-position: top center;
  background-image: url(${({ avatar }) => (avatar || '')});
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`);
