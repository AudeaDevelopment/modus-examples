import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 25em;
  height: 10em;
  position: fixed;
`;

const Title = styled.div`
  font-size: 4em;
`;

const List = styled.div`
  border-right: 2px solid #888;
  width: 100%;
  box-sizing: border-box;
  padding: 2.6em 0;
`;

const ListItem = styled.a`
  display: block;text-decoration: none;
  color: #888;
  position: relative;
  font-size: 2.2em;
  line-height: 1.8em;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 2.3em;
    width: .9em;
    background: #888;
    display: ${({ isActive }) => isActive ? 'block' : 'none'};
  }
`;

export default ({ activeLink, onClick }) => (
  <Wrapper>
    <Title>Settings</Title>
    <List>
      {['Account', 'Payment', 'Notification', 'Rate & Availability'].map(link => (
        <ListItem
          href={`#${activeLink}`}
          key={link}
          isActive={activeLink === link}
          onClick={() => onClick(link)}
        >
          {link}
        </ListItem>
      ))}
    </List>
  </Wrapper>
);
