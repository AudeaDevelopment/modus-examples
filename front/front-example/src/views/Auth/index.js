import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: linear-gradient(135deg, #4B697A, #243744);
  font-size: 2vh;
  @media screen and (min-height: 810px) {
    font-size: 1em;
  }
`;

const Container = styled.div`
  width: 64em;
  height: 44.5em;
  min-width: 990px;
  min-height: 720px;
  background: center / cover no-repeat url('../graphics/BackgroundFill.png');
  border-radius: .8em;
  display: flex;
  justify-content: space-between;
  padding: 6.2em 3.3em 0;
  position: relative;
  box-sizing: border-box;
  &:after {
    content: 'Lattice Security Ltd. 2018';
    position: absolute;
    color: #788289;
    text-align: center;
    width: 100%;
    top: calc(100% + .5em);
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Caption = styled.h2`
  font-size: 3.2em;
  width: 6em;
  text-align: right;
  line-height: 1.1em;
  color: #FFF;
  z-index: 3;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.1em;
`;

const Logo = styled.img.attrs(() => ({
  src: '../graphics/logo.png',
}))`
  width: auto;
  height: 7em;
  object-fit: contain;
  margin-bottom: 3em;
`;

export default () => (
  <Wrapper>
    <Container>
      <ContentBox>
        <Logo />
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/auth/reset-password" component={ResetPassword} />
        </Switch>
      </ContentBox>
      <Caption>Effortless classification of files across your team</Caption>
    </Container>
  </Wrapper>
);
