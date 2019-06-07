import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  height: 4em;
  width: 34em;
  line-height: 4em;
`;

const StyledLink = styled(Link)`
  height: 4em;
  margin-right: 4em;
  display: inline-block;
  text-decoration: none;
  color: #999;
  font-size: 2em;
  pointer-events: ${({ isCurrent }) => isCurrent ? 'none' : 'auto'};
`;

const links = [
  { path: '/signup', text: 'Sign Up' },
  { path: '/login', text: 'Log In' },
];

const renderLinks = pathname => links.map(({ path, text }) => (
  <StyledLink
    to={path}
    key={path}
    isCurrent={path === pathname}
  >
    {text}
  </StyledLink>
));

const AuthButtons = ({ location: { pathname } }) => (
  <Wrapper>
    {renderLinks(pathname)}
  </Wrapper>
);

export default withRouter(AuthButtons);
