import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { getUser } from "./util/db";
import { signUp, signIn } from "./util";
import Nav from "./Nav/index";
import Main from "./Main";
import { storage } from "./util/firebase-init";

const Wrapper = styled.div`
  font-size: 0.6vw;
  height: 100%;
  width: 1600px;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1600px) {
    width: 100%;
    padding: 0 10em;
  }
`;

class App extends Component {
  state = {
    isLoaded: false,
    user: null
  };

  componentDidMount() {
    this.setUserAndRedirect();
  }

  setUserAndRedirect = () => {
    const { history } = this.props;

    getUser()
      .then(user => {
        this.setState({ user, isLoaded: true });

        // if (!user) return history.push('/');

        const {
          emailVerified,
          company,
          jobTitle,
          timezone,
          skipOnboarding2,
          avatar,
          skipOnboarding3,
          accountVerified
        } = user;

        // if (!emailVerified) return history.push('/account-activation');
        // if (!company && !jobTitle) return history.push('/onboarding/1');
        // if (!timezone && !skipOnboarding2) return history.push('/onboarding/2');
        // if (!avatar && !skipOnboarding3) return history.push('/onboarding/3');
        // if (!accountVerified) return history.push('/onboarding/4');
        // history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoaded: true });
        // history.push('/');
      });
  };

  handleSignUp = user =>
    signUp(user)
      .then(() => this.handleLogin(user))
      .catch(err => console.log("Error signing up", err));

  handleLogin = ({ email, password, remembered }) =>
    signIn(email, password)
      .then(() => {
        this.setUserAndRedirect();
        remembered && localStorage.setItem("remembered-email", email);
      })
      .catch(err => console.log("Error logging in", err));

  render() {
    const {
      state: { isLoaded, user },
      handleSignUp,
      handleLogin
    } = this;

    if (!isLoaded) return null;

    return (
      <Wrapper>
        <Nav user={user} />
        <Main
          user={user}
          handleSignUp={handleSignUp}
          handleLogin={handleLogin}
        />
      </Wrapper>
    );
  }
}

export default withRouter(App);
