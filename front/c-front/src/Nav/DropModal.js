import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Avatar } from '../common-styles';

const Wrapper = styled.div`
  border: 2px solid #888;
  background: #FFF;
  color: #888;
  width: 46em;
  position: absolute;
  z-index: 1;
  top: 5.5em;
  right: ${({ type }) => (type === 'messages' ? '15.5em' : '7.5em')};
`;

const Head = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 4em;
  border-bottom: 2px solid #888;
  padding: 0 3em;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 2em;
  color: #444;
  text-transform: capitalize;
  line-height: 2em;
`;

const List = styled.div`
  width: 100%;
  padding: 0 3em;
  box-sizing: border-box;
`;

const ListItem = styled.div`
  width: 100%;
  height: 13em;
  position: relative;
  display: flex;
`;

const MessageAvatar = styled(Avatar)`
  margin: 2em 2em 0 0;
`;

const MessageContent = styled.div`
  margin: 2em 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  line-height: 2.5em;
`;

const MessageUserName = styled.div`
  font-size: 1.9em;
  color: #444;
`;

const MessageText = styled.div`
  font-size: 1.8em;
`;

const MessageReceivedDate = styled.div`
  font-size: 1.6em;
  color: #BBB;
`;

const NotificationAvatar = styled(Avatar)`
  position: relative;
  align-self: center;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;;
  padding: 2em;
  align-self: center;
  width: 26em;
  height: 7em;
`;

const NotificationHeader = styled.div`
  font-size: 2.1em;
  color: #444;
`;

const NotificationSessionDate = styled.div`
  font-size: 1.7em;
  line-height: 1.4em;
`;

const NotificationReceivedDate = styled.div`
  font-size: 1.7em;
  line-height: 1.7em;
  align-self: center;
`;

const Empty = styled.div`
  font-size: 2em;
  margin: auto;
`;

const Foot = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 4em;
  border-top: 2px solid #888;
  padding-left: 3em;
`;

const MarkAllButton = styled.div`
  cursor: pointer;
  color: blue;
  font-size: 1.7em;
  align-self: center;
`;

const SeeAllLink = styled(Link)`
  font-size: 2em;
  line-height: 2em;
  text-decoration: none;
  color: blue;
  position: relative;
`;

const renderMessages = messages => (
  messages.map(({
    id,
    userName,
    avatar,
    content,
    receivedDate,
  }) => (
    <ListItem key={id}>
      <MessageAvatar size="4" avatar={avatar} disabled />
      <MessageContent>
        <MessageUserName>{userName}</MessageUserName>
        <MessageText>{content}</MessageText>
        <MessageReceivedDate>{receivedDate}</MessageReceivedDate>
      </MessageContent>
    </ListItem>
  ))
);

const renderNotifications = notifications => (
  notifications.map(({
    id,
    userName,
    avatar,
    content,
    sessionDate,
    receivedDate,
  }) => (
    <ListItem key={id}>
      <NotificationAvatar size="4" avatar={avatar} disabled />
      <NotificationContent>
        <NotificationHeader>{`${userName} - ${content}`}</NotificationHeader>
        <NotificationSessionDate>{sessionDate}</NotificationSessionDate>
      </NotificationContent>
      <NotificationReceivedDate>{receivedDate}</NotificationReceivedDate>
    </ListItem>
  ))
);

const renderContent = (type, content) => {
  if (!content.length) {
    return (
      <ListItem>
        <Empty>{`No new ${type}`}</Empty>
      </ListItem>
    );
  }
  return type === 'messages' ? renderMessages(content) : renderNotifications(content);
};

const maybeRenderMarkAllButton = (type, markNotificationsAsRead) => {
  if (type === 'notifications') {
    return (
      <MarkAllButton onClick={markNotificationsAsRead}>
        Mark all read
      </MarkAllButton>
    );
  }
  return null;
};

export default ({
  type,
  content,
  toggleDropModal,
  markNotificationsAsRead,
}) => (
  <Wrapper type={type}>
    <Head>
      <Title>{type}</Title>
      {maybeRenderMarkAllButton(type, markNotificationsAsRead)}
    </Head>
    <List>
      {renderContent(type, content)}
    </List>
    <Foot>
      <SeeAllLink
        onClick={() => toggleDropModal(type)}
        to={`/${type}`}
      >
        {`See all ${type} -->`}
      </SeeAllLink>
    </Foot>
  </Wrapper>
);
