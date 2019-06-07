import React, { Component, createContext } from 'react';
import firebase from 'firebase/app';

import {
  withFire, Fire, FireAuthProvider, FirebaseContext,
} from './comps';

const FireContext = createContext({});
const { Provider } = FireContext;

class FirebaseProvider extends Component {
  state = {
    ...this.props.config,
  };

  componentDidMount = () =>
    !firebase.apps.length ? firebase.initializeApp(this.state) : null;

  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

export {
  FireContext,
  FireAuthProvider,
  withFire,
  Fire,
  FirebaseContext,
  FirebaseProvider,
};
