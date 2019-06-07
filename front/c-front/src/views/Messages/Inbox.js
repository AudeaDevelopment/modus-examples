import React, { Component } from 'react';
import styled from 'styled-components';

import Menu from './Menu';

import { Avatar } from '../../common-styles';

const Wrapper = styled.div`
  width: 35em;
  height: 50em;
  border: 2px solid #888;
  box-sizing: border-box;
`;

const Nav = styled.div`
  display: flex;
  height: 10em;
  border-bottom: 2px solid #BBB;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled.div`
  color: #444;
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'none' : 'auto')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #888' : 'none')};
  box-sizing: border-box;
  color: ${({ isActive }) => (isActive ? '#444' : '#888')};
  font-size: 2.2em;
  padding: 0 .5em;
  margin: 0 1em;
  height: 1.8em;
`;

const List = styled.div`

`;

const ListItem = styled.div`
  border-bottom: 2px solid #BBB;
  padding: 1em;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: .5em 0;
  width: 26.5em;
`;

const NameAndTime = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  color: #444;
  font-size: 1.6em;
`;

const Time = styled.div`
  color: #BBB;
  font-size: 1.5em;
`;

const PreviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessagePreview = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.6em;
  color: #888;
`;

const Count = styled.div`
  background: #888;
  border-radius: 50%;
  height: 2.2em;
  width: 2.2em;
  min-width: 2.2em;
  text-align: center;
  line-height: 2.3em;
  margin-left: 1em;
  &:after {
    content: '${({ count }) => count}';
    color: #FFF;
    font-size: 1.5em;
  }
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: .5em 0;
`;

// placeholder
const Ellipses = styled.div`
  width: 4em;
  height: .5em;
  background: #888;
  cursor: pointer;
  padding: .5em 0;
  position: relative;
`;

export default class Inbox extends Component {
  state = {
    mode: 'Recent', // Recent or Favorite
  };

  handleNavClick = mode => (
    this.setState({ mode })
  );

  renderNav = () => {
    const {
      state: { mode },
      handleNavClick,
    } = this;

    return (
      <Nav>
        {['Recent', 'Favorite'].map(link => (
          <NavItem
            key={link}
            onClick={() => handleNavClick(link)}
            isActive={mode === link}
          >
            {link}
          </NavItem>
        ))}
      </Nav>
    );
  };

  maybeRenderCount = unreadCount => (
    unreadCount ? <Count count={unreadCount} /> : null
  );

  maybeRenderMenu = (messageUserId) => {
    const {
      isRenderingMenu: { id, side }
    } = this.props;
    const shouldRenderMenu = (side === 'left') && (messageUserId === id);

    return shouldRenderMenu ? <Menu /> : null;
  };

  renderList = () => {
    const {
      props: {
        conversations,
        conversations: { length: hasConversations },
        userId,
        onInboxClick,
        onEllipsesClick,
      },
      maybeRenderCount,
      maybeRenderMenu,
    } = this;

    if (!hasConversations) return null;

    const formatPreview = (messageUserId, content) => {
      const prefix = messageUserId === userId ? 'You: ' : '';
      return `${prefix}${content}`;
    };

    return (
      <List>
        {conversations.map(({ id, avatar, userName, messages }) => {
          const {
            userId: messageUserId,
            received,
            content,
          } = messages[messages.length - 1];

          const unreadCount = messages.reduce((acc, { viewed }) => viewed ? acc : acc + 1, 0);

          return (
            <ListItem key={id}>
              <TopRow onClick={() => onInboxClick(id)}>
                <Avatar disabled size="4.5" avatar={avatar} />
                <RightColumn>
                  <NameAndTime>
                    <Name>{userName}</Name>
                    <Time>{received}</Time>
                  </NameAndTime>
                  <PreviewRow>
                    <MessagePreview>{formatPreview(messageUserId, content)}</MessagePreview>
                    {maybeRenderCount(unreadCount)}
                  </PreviewRow>
                </RightColumn>
              </TopRow>
              <BottomRow>
                <Ellipses onClick={() => onEllipsesClick(messageUserId, 'left')}>
                  {maybeRenderMenu(messageUserId)}
                </Ellipses>
              </BottomRow>
            </ListItem>
          );
        })}
      </List>
    );
  };

  render() {
    const {
      renderNav,
      renderList,
    } = this;

    return (
      <Wrapper>
        {renderNav()}
        {renderList()}
      </Wrapper>
    );
  }
}
