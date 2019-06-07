import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class EnterCode extends Component {
  state = { codeText: null };

  enterCode = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitCode = () => this.props.submitCode(this.state.codeText);

  render() {
    const { enterCode, handleSubmitCode } = this;
    return (
      <div>
        <div>OR</div>
        <div>Enter the code from the email you received below</div>
        <div>
          <TextField name="codeText" onChange={enterCode} />
        </div>
        <div>
          <Button onClick={handleSubmitCode} />
        </div>
      </div>
    );
  }
}

export default withRouter(EnterCode);
