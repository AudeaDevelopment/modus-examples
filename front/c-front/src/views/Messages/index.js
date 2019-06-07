import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Inbox from './Inbox';
import Chat from './Chat'; // will be reused inside the session - need to figure otu a good place to keep this later

import { conversations as mockConversations } from '../../mockData';
import ChatHead from './ChatHead';

const Wrapper = styled.div`
  margin-top: 3em;
  width: 100%;
  display: flex;
`;

const ChatWrapper = styled.div`
  flex-grow: 1;
  border: 2px solid #888;
  border-left: none;
  box-sizing: border-box;
`;

const EmptyWrapper = styled.div`
  box-sizing: border-box;
  border: 2px solid #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30em 0;
`;

const EmptyIcon = styled.div`
  width: 4em;
  height: 4em;
  border: 2px solid #888;
  background: #DDD;
  border-radius: 4px;
`;

const EmptyDesription = styled.div`
  font-size: 2.4em;
  margin: 1em 0;
`;

const FindMentorLink = styled.a.attrs(() => ({
  href: '/search',
}))`
  text-decoration: none;
  position: relative;
  height: 4.5em;
  width: 15em;
  &:after {
    content: 'Find a Mentor';
    position: absolute;
    color: blue;
    width: 100%;
    font-size: 2.4em;
    text-align: center;
  }
`;

export default class Messages extends Component {
  state = {
    isLoaded: false,
    conversations: [],
    currentConversation: null,
    isRenderingMenu: {
      id: null,
      side: null, // left or right
    }
  };

  componentDidMount() {
    // TODO get conversations

    // placeholder
    const conversations = mockConversations;
    const currentConversation = localStorage.getItem('currentConversation');
    this.setState({
      currentConversation,
      conversations,
      isLoaded: true,
    });
  }

  // TODO: handle menu close when clicking outside

  handleEllipsesClick = (id, side) => (
    this.setState({ isRenderingMenu: { id, side } })
  );

  handleInboxClick = (currentConversation) => {
    localStorage.setItem('currentConversation', currentConversation);
    this.setState({ currentConversation });
  };

  maybeRenderChat = () => {
    const {
      state: {
        currentConversation,
        conversations,
        isRenderingMenu: { side: menuSide }
      },
      handleEllipsesClick,
    } = this;

    if (!currentConversation) return null;

    const {
      avatar,
      userName,
      onlineStatus,
      localTime,
      userId: otherUserId,
      messages,
    } = conversations
      .find(({ id: conversationId }) => conversationId === currentConversation);

    const shouldRenderMenu = menuSide === 'right';

    return (
      <ChatWrapper>
        <ChatHead
          avatar={avatar}
          userName={userName}
          onlineStatus={onlineStatus}
          localTime={localTime}
          userId={otherUserId}
          isRenderingMenu={shouldRenderMenu}
          onEllipsesClick={handleEllipsesClick}
        />
        <Chat messages={messages} />
      </ChatWrapper>
    );
  };

  renderMessages = () => {
    const {
      state: {
        conversations,
        isRenderingMenu,
      },
      props: { userId },
      handleInboxClick,
      maybeRenderChat,
      handleEllipsesClick,
    } = this;

    return (
      <Fragment>
        <Inbox
          conversations={conversations}
          userId={userId}
          onInboxClick={handleInboxClick}
          isRenderingMenu={isRenderingMenu}
          onEllipsesClick={handleEllipsesClick}
        />
        {maybeRenderChat()}
      </Fragment>
    );
  };

  renderEmpty = () => (
    <EmptyWrapper>
      <EmptyIcon />
      <EmptyDesription>Messages with mentors will appear here.</EmptyDesription>
      <FindMentorLink />
    </EmptyWrapper>
  );

  render() {
    const {
      state: {
        conversations: {
          length: hasConversations,
        },
        isLoaded,
      },
      renderMessages,
      renderEmpty,
    } = this;

    // TODO: add loader
    if (!isLoaded) return null;

    return (
      <Wrapper>
        {hasConversations
          ? renderMessages()
          : renderEmpty()
        }
      </Wrapper>
    );
  }
}
