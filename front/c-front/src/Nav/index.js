import React from 'react';
import styled from 'styled-components';
import AuthButtons from './AuthButtons';
import NavButtons from './NavButtons';

// placeholder
const Logo = styled.div`
  height: 4em;
  width: 14em;
  background: #555;
`;

const Wrapper = styled.div`
  z-index: 1;
  position: fixed;
  width: calc(100% - 20em);
  height: 8em;
  min-height: 8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFF;
`;

const maybeRenderContent = (user) => {
  if (!user) return <AuthButtons />;
  const { emailVerified, avatar, uid } = user;
  if (emailVerified) return <NavButtons avatar={avatar} uid={uid} />;
  return null;
};

export default ({ user }) => (
  <Wrapper>
    <Logo />
    {maybeRenderContent(user)}
  </Wrapper>
);
