import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Avatar } from './styles';

const Wrapper = styled.div`
  width: 100%;
  height: 3.4em;
  background: #233745;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: .5em 4.2em;
`;

const Logo = styled.div`
  height: 2.4em;
  width: 8em;
  background: #DDD;
`;

const LinksBox = styled.div`
  height: 2.4em;
  display: flex;
`;

const NavLinks = styled.div`
  height: 2.4em;
  display: flex;
  margin-right: 1em;
`;

const Link = styled.a`
  background: ${({ isActive }) => isActive ? '#314451' : 'rgba(0, 0, 0, 0)'};
  pointer-events: ${({ isActive }) => isActive ? 'none' : 'auto'};
  color: ${({ isActive }) => isActive ? '#fff' : '#8B959D'};
  height: 2.4em;
  padding: 0 1em;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 2px;
  line-height: 2.4em;
  margin-right: .5em;
`;

const links = ['Dashboard', 'Files', 'Accounts', 'Audit'];

export default withRouter(({
  history: {
    location: {
      pathname,
    },
  }
}) => (
  <Wrapper>
    <Logo />
    <LinksBox>
      <NavLinks>
        {links.map(link => {
          const href = `/${link.toLowerCase()}`;
          return (
            <Link
              key={link}
              href={href}
              isActive={pathname.includes(href)}
            >
              {link}
            </Link>
          );
        })}
      </NavLinks>
      <Avatar />
    </LinksBox>
  </Wrapper>
));
