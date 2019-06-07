import React from 'react';
import styled from 'styled-components';

const navLinks = ['Code Editor', 'Audio/Visual', 'Screensharing'];

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #888;
  height: 10em;
  padding-left: 2em;
`;

const NavLink = styled.div`
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #888' : 'none')};
  color: #888;
  box-sizing: border-box;
  font-size: 2em;
  cursor: pointer;
  margin-right: 2em;
  height: 2em;
  padding: 0 .5em;
`;

export default ({ onClick, activeLink }) => (
  <Wrapper>
    {navLinks.map(link => (
      <NavLink
        key={link}
        isActive={activeLink === link}
        onClick={() => onClick(link)}
      >
        {link}
      </NavLink>
    ))}
  </Wrapper>
);
