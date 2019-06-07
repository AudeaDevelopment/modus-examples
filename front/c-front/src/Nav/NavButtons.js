import React, { Component } from 'react';
import styled from 'styled-components';
import { getNotificationsAndMessages, setNoticationsToRead } from '../util/db';
import DropModal from './DropModal';
import { Avatar } from '../common-styles';

const Wrapper = styled.div`
  height: 4em;
  width: 22em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const NavButton = styled.div`
  height: 4em;
  width: 4em;
  border: 2px solid #888;
  cursor: pointer;
  position: relative;
  &:after {
    content: '${({ count }) => count}';
    display: ${({ count }) => (parseInt(count, 10) ? 'block' : 'none')};
    position: absolute;
    font-size: 1.8em;
    left: 2.6em;
    bottom: 1.1em;
  }
`;

export default class NavButtons extends Component {
  state = {
    messages: [],
    notifications: [],
    dropModalShown: ''
  };

  componentDidMount() {
    // getNotificationsAndMessages()
    //   .then(x => {
    //     const { messages, notifications } = x;
    //     this.setState({ messages, notifications });
    //   })
    //   .catch(err => console.log('error getting messages/notifications', err));
  }

  toggleDropModal = type => {
    const { dropModalShown } = this.state;
    const newState = dropModalShown === type ? '' : type;
    this.setState({ dropModalShown: newState });
  };

  maybeRenderDropModal = () => {
    const {
      state: { dropModalShown },
      toggleDropModal,
      markNotificationsAsRead
    } = this;

    const content = this.state[dropModalShown];

    if (dropModalShown) {
      return (
        <DropModal
          type={dropModalShown}
          content={content}
          toggleDropModal={toggleDropModal}
          markNotificationsAsRead={markNotificationsAsRead}
        />
      );
    }
    return null;
  };

  markNotificationsAsRead() {
    setNoticationsToRead()
      .then(() => this.setState({ notifications: [], dropModalShown: '' }))
      .catch(err => console.log('erroring marking notifications read', err));
  }

  render() {
    const {
      state: {
        messages: { length: messageCount },
        notifications: { length: notificationCount }
      },
      props: { avatar, uid },
      toggleDropModal,
      maybeRenderDropModal
    } = this;

    return (
      <Wrapper>
        <NavButton
          onClick={() => toggleDropModal('messages')}
          count={messageCount}
        />
        <NavButton
          onClick={() => toggleDropModal('notifications')}
          count={notificationCount}
        />
        <Avatar size="5" avatar={avatar} id={uid} />
        {maybeRenderDropModal()}
      </Wrapper>
    );
  }
}
