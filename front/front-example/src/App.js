import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './views/Auth';
import Main from './Main';
import CreatingAccount from './views/CreatingAccount';
import VerifyEmail from './views/VerifyEmail';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/auth/*" component={Auth} />
        <Route exact path="/creating-account" component={CreatingAccount} />
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route path="/" component={Main} />
      </Switch>
    );
  }
}
