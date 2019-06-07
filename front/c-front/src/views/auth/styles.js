import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  margin: 8em auto 0;
  padding: 2.5em;
  box-sizing: border-box;
  width: 50em;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #888;
`;

export const OrHR = styled.div`
  width: 100%;
  margin: 2.5em 0;
  border-bottom: 2px solid #888;
  position: relative;
  &:after {
    content: 'or';
    padding: 0 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
    background: #FFF;
    color: #888;
  }
`;

export const FullHR = styled.div`
  width: calc(100% + 5em);
  margin: 2.5em -2.5em;
  border-bottom: 2px solid #888;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BottomSectionText = styled.div`
  font-size: 2em;
  color: #888;
`;

export const StyledLink = styled(Link)`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
`;

export const Terms = styled.div`
  margin: 2.5em 0 1em;
  font-size: 1.6em;
  color: #888;
`;