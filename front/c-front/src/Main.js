import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import LogIn from './views/auth/LogIn';
import SignUp from './views/auth/SignUp';
import SignUpWithEmail from './views/auth/SignUpWithEmail';
import AccountActivation from './views/AccountActivation';
import Landing from './views/Landing';
import StepOne from './views/onboarding/StepOne';
import StepTwo from './views/onboarding/StepTwo';
import StepThree from './views/onboarding/StepThree';
import StepFour from './views/onboarding/StepFour';
import Dashboard from './views/Dashboard/index';
import Profile from './views/Profile/index';
import Messages from './views/Messages/index';
import Notifications from './views/Notifications/index';
import Search from './views/Search/index';
import Session from './views/Session/index';
import Payout from './views/Payout';
import Settings from './views/Settings/index';

import Chat from './views/chat';
import '@babel/polyfill';

const Wrapper = styled.div`
  margin-top: calc(8em + 2px);
  width: 100%;
  flex-grow: 1;
`;

export default ({
  user,
  handleLogin,
  handleSignUp,
}) => {

  let userId, firstName, timeZone, paymentConfigured, paymentMethod;
  
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/chat" component={Chat} />
        <Route
          path="/login"
          component={() => <LogIn handleLogin={handleLogin} />}
        />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/signup-with-email"
          component={() => <SignUpWithEmail handleSignUp={handleSignUp} />}
        />
        <Route path="/account-activation" component={AccountActivation} />
        <Route
          path="/onboarding/1"
          component={() => <StepOne user={user} />}
        />
        <Route path="/onboarding/2" component={StepTwo} />
        <Route path="/onboarding/3" component={StepThree} />
        <Route path="/onboarding/4" component={StepFour} />
        <Route
          path="/dashboard"
          component={() => (
            <Dashboard
              timeZone={timeZone}
              paymentMethod={paymentMethod}
            />
          )}
        />
        <Route
          path="/profile/:id"
          component={() => <Profile user={user} />}
        />
        <Route
          path="/messages"
          component={() => (
            <Messages
              userId={userId}
            />
          )}
        />
        <Route path="/notifications" component={Notifications} />
        <Route
          path="/search"
          component={() => <Search user={user} />}
        />
        <Route path="/session/*" component={Session} />
        <Route path="/payout" component={Payout} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Landing} />
      </Switch>
    </Wrapper>
  );
};
