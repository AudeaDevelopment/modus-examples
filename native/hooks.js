import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { View, Text } from 'react-native';

import { Image } from 'react-native-elements';
import Button from '../../components/button';
import { auth } from '../../util/firebase-init';

import { showSignupForm } from './nav';

import Input from '../../components/input';
import { loginStyles as styles } from './styles';

const style = { text: { color: '#fff' } };

const AuthMain = () => {
  const [user, initialising, error] = useAuthState(auth);
  const [loginError, setLoginError] = useState(null);
  const [email, changeEmail] = useState(null);
  const [pass, changePass] = useState(null);

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .catch(err => setLoginError(err.message));
  };

  const logout = () => auth.signOut();

  return (
    <View style={styles.loginContainer}>
      <Image
        style={styles.backgroundImage}
        source={require('./assets/login-splash.webp')}
      />
      {initialising ? (
        <View>
          <Text style={style.text}>Initialising User...</Text>
        </View>
      ) : null}
      {error || loginError ? (
        <View>
          <Text style={style.text}>Error: {error || loginError}</Text>
        </View>
      ) : null}
      {user ? (
        <View>
          <Text style={style.text}>Current User: {user.email}</Text>
          <Button press={logout} label="Log out" />
        </View>
      ) : null}
      <View style={styles.overlay} />
      <View style={styles.loginInputContainer}>
        <Input placeholder="email" change={val => changeEmail(val)} />
        <Input
          placeholder="password"
          change={val => changePass(val)}
          password
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Button label="login" press={login} />
        <Button label="create account" press={showSignupForm} />
      </View>
    </View>
  );
};

export default AuthMain;
