import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  outline: none;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '4.4em'};
  background: rgb(87, 194, 50);
  border-radius: .5em;
  position: relative;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:after {
    content: '${({ text }) => text || ''}';
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    font-size: 1.7em;
    transform: translate(-50%, -50%);
  }
`;

export const LinkButton = styled.a`
  display: inline-block;
  height: 2.5em;
  border-radius: 3px;
  background-color: #6CDB8D;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.13);
  color: #FFF;
  font-size: 1.1em;
  text-decoration: none;
  line-height: 2.5em;
  padding: 0 1.3em;
  &:active {
    transform: translateY(2px);
  }
`;

export const Avatar = styled.div`
  border-radius: 50%;
  background: grey;
  height: 2.4em;
  width: 2.4em;
`;
