import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { InputWrapper } from '../../common-styles';

export const Wrapper = styled.div`
  margin: 8em auto 0;
  padding: 2.5em 2.5em 10em;
  box-sizing: border-box;
  width: 60em;
  height: 71em;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #888;
  color: #888;
  position: relative;
`;

export const Title = styled.div`
  font-size: 2.8em;
  color: #444;
  text-align: center;
  margin: 1.7em auto 1.2em auto;
`;

export const Description = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 1.9em;
  width: 17em;
  line-height: 1.5em;
`;

// placeholder
export const Graphic = styled.div`
  margin: 5em auto 1.5em;
  height: 6em;
  width: 6em;
  background: #DDD;
`;

export const InputsSection = styled.div`
  padding: 0 6em;
  margin-bottom: 3em;
`;

export const StyledInputWrapper = styled(InputWrapper)`
  height: 4em;
`;

export const Label = styled.div`
  margin-top: 1em;
  font-size: 2em;
`;

export const SkipLink = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2em;
  font-size: 1.6em;
  color: #888;
  cursor: pointer;
`;
