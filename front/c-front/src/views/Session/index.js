import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { createEditor, convertLangToMode } from './util';
import Modal from './Modal';
import Timer from './Timer';
import Nav from './Nav';
import AudioVisual from './AudioVisual';
import ScreenSharing from './ScreenSharing';
import SessionEnded from './SessionEnded';
import { db } from '../../util/firebase-init';
import LangSelector from './LangSelector';
import { defaultText } from './assets';

// const socket = require('socket.io-client')('http://localhost:4321');

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 3em;
  position: relative;
`;

const LeftColumn = styled.div`
  width: 52%;
  box-sizing: border-box;
  border: 2px solid #888;
`;

const RightColumn = styled.div`
  width: 46%;
  box-sizing: border-box;
  border: 2px solid #888;
`;

class Session extends Component {
  state = {
    selectedLanguage: 'Python',
    time: '00:00', // TODO
    mode: 'Code Editor', // Code Editor, Audio/Visual, Screensharing
    status: 'inactive', // inactive, active, paused, ended
    user: {
      name: 'George', // TODO
      inRoom: false
    },
    options: {},
    value: '',
    isRenderingModal: false
  };

  componentDidMount() {
    createEditor(this.props.history.location.hash).then(x => {
      const { firepad, editor } = x;
      this.setState({ editor, firepad });
      firepad.setUserId('cats');
    });
  }

  handleNavClick = mode => this.setState({ mode });

  handlePreStartClick = () => this.setState({ isRenderingModal: true });

  handlePreEndClick = () => this.setState({ isRenderingModal: true });

  handleStartClick = () => {
    // TODO: start session
    this.setState({ status: 'active', isRenderingModal: false });
  };

  handlePauseClick = () => {
    // TODO: pause session
    this.setState({ status: 'paused' });
  };

  handleCancelClick = () => {
    this.setState({ isRenderingModal: false });
  };

  handleEndClick = () => {
    // TODO: end session
    this.setState({ status: 'ended', isRenderingModal: false });
  };

  // handleBeforeChange = value => this.setState({ value });

  // handleChange = e => console.log('CHANGE', e);

  handleSelectLanguage = lang => {
    const { editor, selectedLanguage, firepad } = this.state;
    if (selectedLanguage === lang) return;

    this.setState({ selectedLanguage: lang });
    convertLangToMode(lang).then(x => {
      const text = defaultText[lang];

      editor.getSession().setMode(x);
      firepad.setText(text);
    });
  };

  maybeRenderModal = () => {
    const {
      state: { isRenderingModal, status },
      handleStartClick,
      handleCancelClick,
      handleEndClick
    } = this;

    if (isRenderingModal) {
      return (
        <Modal
          status={status}
          onStartClick={handleStartClick}
          onCancelClick={handleCancelClick}
          onEndClick={handleEndClick}
        />
      );
    }
    return null;
  };

  renderInteractiveContent = () => {
    const { mode } = this.state;
    switch (mode) {
      case 'Code Editor':
        return <div id="firepad" style={{ height: '100%', width: '100%' }} />;
      case 'Audio/Visual':
        return <AudioVisual />;
      case 'Screensharing':
        return <ScreenSharing />;
      default:
        return null;
    }
  };

  render() {
    // console.log('the state', this.state);

    const {
      state: { status, user, mode, time },
      handleNavClick,
      handlePreStartClick,
      handlePreEndClick,
      handlePauseClick,
      maybeRenderModal,
      renderInteractiveContent,
      handleSelectLanguage
    } = this;

    if (status === 'ended') {
      return <SessionEnded />;
    }

    return (
      <Wrapper>
        {maybeRenderModal()}
        <LeftColumn>
          <LangSelector handleSelectLanguage={handleSelectLanguage} />
          <button type="button" onClick={this.click}>
            VLCIKFGKGJGJFJGNDSFGJKN
          </button>

          <Timer
            onStartClick={handlePreStartClick}
            onPauseClick={handlePauseClick}
            onEndClick={handlePreEndClick}
            status={status}
            user={user}
            time={time}
          />
          {/* chat */}
        </LeftColumn>
        <RightColumn>
          <Nav onClick={handleNavClick} activeLink={mode} />
          {renderInteractiveContent()}
        </RightColumn>
      </Wrapper>
    );
  }
}

export default withRouter(Session);
