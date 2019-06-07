import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import BarChart from '@material-ui/icons/BarChart';
import Home from '@material-ui/icons/Home';
import Public from '@material-ui/icons/Public';
import { withRouter } from 'react-router-dom';
import style from './style';

class Footer extends Component {
  state = {};

  click = (path) => {
    const { history, auth } = this.props;
    auth ? () => history.push(`/${path}`) : null;
  };

  render() {
    const { click } = this;
    return (
      <div style={style.footerContainer}>
        <Icon color="inherit" onClick={() => click('landing')}>
          <Home />
        </Icon>

        <Icon color="inherit" onClick={() => click('reading')}>
          <BarChart />
        </Icon>
        <Icon color="inherit" onClick={() => click('pre-release')}>
          <Public />
        </Icon>
      </div>
    );
  }
}

export default withRouter(Footer);
