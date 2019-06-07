import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const FirebaseContext = React.createContext();
const { Provider, Consumer } = FirebaseContext;

const withFire = LitComponent =>
  class WithFire extends Component {
    render() {
      return (
        <Consumer>
          {value => <LitComponent auth={value} {...this.props} />}
        </Consumer>
      );
    }
  };

class Fire extends Component {
  render() {
    return <Consumer>{this.props.children}</Consumer>;
  }
}

class FireAuthProvider extends Component {
  state = { user: firebase.auth().currentUser, ready: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      user !== this.state.user ? this.setState({ user, ready: true }) : null;
    });
  }

  loginWithProvider(provider) {
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope(
      'https://www.googleapis.com/auth/contacts.readonly',
    );
    return this.loginWithProvider(googleProvider);
  }

  logout() {
    return firebase.auth().signOut();
  }

  render() {
    const { loginWithProvider, loginWithGoogle, logout } = this;
    const { children } = this.props;
    return (
      <Provider
        value={{
          ...this.state,
          loginWithProvider,
          loginWithGoogle,
          logout,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export default {
  withFire,
  Fire,
  FireAuthProvider,
  FirebaseContext,
};
