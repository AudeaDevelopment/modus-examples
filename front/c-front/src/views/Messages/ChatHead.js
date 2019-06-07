import React from 'react';
import styled from 'styled-components';

import Menu from './Menu';

import { Avatar } from '../../common-styles';

const Wrapper = styled.div`
  border-bottom: 2px solid #BBB;
  height: 10em;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 2em 4em;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 2.5em;
  margin-left: 1em;
`;

const StatusAndTime = styled.div`
  font-size: 1.8em;
  color: #BBB;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
`;

const EnterSessionButton = styled.a.attrs(({ id }) => ({
  href: `/session/${id}`,
}))`
  width: 19em;
  height: 4em;
  line-height: 4em;
  border: 2px solid #888;
  background: #000;
  color: #FFF;
  text-align: center;
  text-decoration: none;
  margin-right: 3em;
  &:after {
    content: 'Enter Session Room';
    font-size: 2em;
  }
`;

const Ellipses = styled.div`
  width: 4em;
  height: .5em;
  background: #888;
  cursor: pointer;
  padding: .5em 0;
  position: relative;
`;

const maybeRenderMenu = isRenderingMenu => (
  isRenderingMenu ? <Menu /> : null
);

export default ({
  avatar,
  userName,
  onlineStatus,
  localTime,
  userId,
  onEllipsesClick,
  isRenderingMenu,
}) => (
  <Wrapper>
    <LeftBox>
      <TopRow>
        <Avatar avatar={avatar} size="2.2" disabled />
        <UserName>{userName}</UserName>
      </TopRow>
      <StatusAndTime>
        {`${onlineStatus} | Local Time ${localTime}`}
      </StatusAndTime>
    </LeftBox>
    <RightBox>
      <EnterSessionButton id={userId} />
      <Ellipses onClick={() => onEllipsesClick(userId, 'right')}>
        {maybeRenderMenu(isRenderingMenu)}
      </Ellipses>
    </RightBox>
  </Wrapper>
);
