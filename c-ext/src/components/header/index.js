import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import { withRouter } from 'react-router-dom';
import style from './style';

class Header extends Component {
  state = {};

  render() {
    const { history, auth } = this.props;
    return (
      <div style={style.headerContainer}>
        <Icon
          color="inherit"
          onClick={auth ? () => history.push('/profile') : null}
        >
          <Person />
        </Icon>

        <Icon
          color="inherit"
          onClick={auth ? () => history.push('/settings') : null}
        >
          <Settings />
        </Icon>
      </div>
    );
  }
}

export default withRouter(Header);
