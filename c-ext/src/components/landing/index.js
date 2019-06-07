import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
  state = { msg: null };

  componentDidMount() {
    chrome.storage.sync.get(user =>
      (user.idToken
        ? this.props.history.push('/score')
        : this.props.history.push('/sign-in')),
    );
  }
  render() {
    return <div />;
  }
}

export default withRouter(Landing);
