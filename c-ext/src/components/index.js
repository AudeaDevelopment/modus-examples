import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./header";
import Landing from "./landing";
import SignIn from "./sign-in";
import Profile from "./profile";
import Footer from "./footer";
import PreRelease from "./pre-release";
import Score from "./score";
import Reading from "./reading-history";

export default class App extends Component {
  state = { key: null };

  componentDidMount() {
    chrome.storage.sync.get(data => {
      const { idToken } = data;
      this.setState({ idToken });
    });
  }

  render() {
    const { idToken } = this.state;
    return (
      <BrowserRouter>
        <div style={{ height: "100%" }}>
          <Header auth={idToken} />
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/score" component={Score} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/pre-release" component={PreRelease} />
            <Route exact path="/reading" component={Reading} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer auth={idToken} />
        </div>
      </BrowserRouter>
    );
  }
}
