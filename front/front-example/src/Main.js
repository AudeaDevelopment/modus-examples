import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { getAccounts } from './api';

import Nav from './Nav';
import Dashboard from './views/Dashboard/index';
import Files from './views/Files/index';
import ConnectAccounts from './views/Accounts/ConnectAccounts/index';
import Accounts from './views/Accounts/index';
import Audit from './views/Audit/index';
import Modal from './Modal';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GreyWrapper = styled.div`
  width: 100%;
  height: calc(100% - 3.4em);
  background-color: #F5F5F5;
  padding: 3.4em 4.2em;
  box-sizing: border-box;
  position: relative;
`;

const PathTitle = styled.p`
  position: absolute;
  top: 1.5em;
  left: 4.2em;
  color: #58585A;
`;

const WhiteWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 2em;
  box-sizing: border-box;
  position: relative;
`;

class Main extends Component {
  state = {
    isLoaded: false,
    accounts: null,
    isShowingModal: false,
    modalContents: null,
  };

  componentDidMount() {
    const { history } = this.props;
    const session = Cookies.get('session');
    if (!session) history.push('/auth/login');
    getAccounts()
      .then(() => this.setState({ accounts: null, isLoaded: true }))
      .catch(e => console.log('get accounts err', e));
  }

  formatPathname = pathname =>
    pathname.split('/').reduce((a, v, i) => {
      const upperCased = `${v.slice(0, 1).toUpperCase()}${v.slice(1, v.length)}`;
      if (i === 1) return upperCased;
      if (v === 'connect-accounts') return `${a} > Connect Accounts`;
      return a;
    }, '');

  maybeRenderModal = () => {
    const {
      state: { isShowingModal, modalContents },
      closeModal,
    } = this;

    return isShowingModal ? (
      <Modal {...modalContents} handleAction={closeModal} />
    ) : null;
  };

  showModal = modalContents =>
    this.setState({ isShowingModal: true, modalContents });

  closeModal = () =>
    this.setState({ isShowingModal: false });

  render() {
    const {
      props: {
        history: {
          location: {
            pathname,
          }
        },
      },
      state: {
        accounts,
        isLoaded,
        isShowingModal,
      },
      formatPathname,
      maybeRenderModal,
    } = this;

    // TODO: add loader
    if (!isLoaded) return null;

    return (
      <Wrapper>
        {maybeRenderModal()}
        <Nav />
        <GreyWrapper>
          <PathTitle>{formatPathname(pathname)}</PathTitle>
          <WhiteWrapper>
            <Switch>
              <Route path="/dashboard" component={() => <Dashboard accounts={accounts} />} />
              <Route path="/files" component={Files} />
              <Route path="/accounts/connect-accounts/*" component={ConnectAccounts} />
              <Route path="/accounts/connect-accounts" component={ConnectAccounts} />
              <Route path="/accounts" component={() => <Accounts accounts={accounts} isShowingModal={isShowingModal} />} />
              <Route path="/audit" component={Audit} />
            </Switch>
          </WhiteWrapper>
        </GreyWrapper>
      </Wrapper>
    );
  }
}

export default withRouter(Main);
