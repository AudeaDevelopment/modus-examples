import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import style from "./style";

class Profile extends Component {
  state = {};

  logOut = () => {
    chrome.storage.sync.clear();
    window.close();
  };
  render() {
    console.log("state in profile", this.state);

    return (
      <div style={style.container}>
        <div>Click below to log out.</div>
        <Button onClick={() => this.logOut()}>Log Out</Button>
      </div>
    );
  }
}

export default withRouter(Profile);
