import styled from 'styled-components';

import { Button, InputWrapper } from '../../common-styles';

export const TextButton = styled(Button)`
  color: blue;
  border: none;
`;

export const StyledInputWrapper = styled(InputWrapper)`
  height: 4em;
  width: 50em;
  input {
    font-size: 1.6em;
  }
`;

export const StyledTextArea = styled.textarea`
  resize: none;
  border: 2px solid #888;
  box-sizing: border-box;
  height: 4em;
  width: 31.3em;
  font-size: 1.6em;
  font-weight: 500;
  padding: .5em .8em;
  color: #888;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

export const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 1em;
`;

export const Form = styled.div`
  border-bottom: 2px solid #BBB;
  display: flex;
  flex-direction: column;
  padding: 4em 0;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin: .5em 0;
`;

export const RowLabel = styled.div`
  width: 25em;
  text-align: right;
  &:after {
    content: '${({ text }) => text}';
    font-size: 1.8em;
    line-height: 3em;
    margin-right: 1em;
  }
`;

export const FormButtonBox = styled.div`
  padding: 3em 0 3em 25em;
  display: flex;
  border-bottom: 2px solid #888;
`;

export const FormButton = styled(Button).attrs(() => ({
  width: '7',
  height: '4',
  fontSize: '1.2'
}))`
  color: #444;
  margin-right: 1em;
`;
