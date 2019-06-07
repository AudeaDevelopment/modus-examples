import styled from 'styled-components';

export const Anchor = styled.a`
  font-size: ${({ fontSize }) => fontSize || '1em'};
  text-decoration: ${({ underline }) => underline ? 'underline' : 'none'};
  color: rgb(87, 194, 50);
  display: block;
  cursor: pointer;
`;

export const HeadText = styled.h3`
  color: rgb(87, 194, 50);
  font-size: 1.7em;
  margin-bottom: .7em;
`;

export const Label = styled.p`
  color: #ccc;
  font-size: 1em;
  margin-bottom: .6em;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  margin-bottom: .5em;
  font-size: 1.2em;
  padding-bottom: .4em;
  color: #444;
  &::placeholder {
    color: #eee;
  }
`;

export const LinkSpan = styled.span`
  display: block;
  margin: auto;
  margin-top: 1.3em;
  display: flex;
  justify-content: center;
`;

export const AccountText = styled.h4`
  color: #888;
  margin-right: .2em;
  font-size: 1.2em;
`;

export const Toast = styled.div`
  background: #EBC8C5;
  border: 1px solid #B4322F;
  color: #B4322F;
  width: 100%;
  height: 1.6em;
  line-height: 1.5em;
  text-align: center;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: .8em;
`;