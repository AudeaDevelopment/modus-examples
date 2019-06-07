import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LoginSignup from "./login-signup";
import EnterCode from "./enter-code";
import { submit } from "./util";
import style from "./style";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    message: null,
    messageColor: "#fff",
    value: 0,
    confirmLink: false
  };

  componentDidMount() {
    chrome.storage.sync.get(data => {
      const { userName, password, idToken } = data;
      console.log("CDU DATA", data)(
        idToken
          ? this.props.history.push("/results")
          : this.setState({ userName, password })
      );
    });
  }

  click = () => {
    const { email, password, userName, value, confirmationCode } = this.state;

    submit(email, password, userName, value, confirmationCode).then(res => {
      const { error, message, idToken, userConfirmed } = res;

      error
        ? this.setState({ message, messageColor: "red" })
        : userConfirmed === false
        ? this.setState({
            message: "Please check your email for confirmation link",
            messageColor: "green"
          })
        : this.props.history.push("/results");
    });
  };

  toggleForm = (e, value) => this.setState({ value, message: null });

  changeText = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { changeText, click, toggleForm } = this;
    const { value, messageColor, message } = this.state;

    return (
      <div style={{ height: "100%" }}>
        <div>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={toggleForm}
              indicatorColor="primary"
              variant="fullWidth"
            >
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>
          </AppBar>
        </div>

        <div style={style.container}>
          {value === 0 || value === 1 ? (
            <LoginSignup changeText={changeText} display={value} />
          ) : null}

          <div style={{ color: messageColor }}>{message}</div>
          <div>
            <EnterCode onChange={changeText} />
          </div>
          <Button
            className="main-button"
            label="Sign In"
            onClick={click}
            color="primary"
            variant="outlined"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
