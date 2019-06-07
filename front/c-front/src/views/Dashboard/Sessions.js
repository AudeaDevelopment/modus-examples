import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Avatar, Button } from '../../common-styles';

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 2px solid #888;
  width: 100%;
`;

const Head = styled.div`
  padding: 2em 2em 0;
  border-bottom: 2px solid #888;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1em;
`;

// placeholder
const TitleIcon = styled.div`
  height: 2em;
  width: 2em;
  background: #888;
`;

const TitleText = styled.div`
  font-size: 2.2em;
  color: #444;
  margin-left: 1em;
`;

const Nav = styled.div`
  display: flex;
  margin: 2em 0 0.5em;
`;

const NavItem = styled.div`
  color: #444;
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'none' : 'auto')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #888' : 'none')};
  color: ${({ isActive }) => (isActive ? '#444' : '#888')};
  font-size: 1.7em;
  padding: 0 0.5em 1em;
`;

const EmptySessionsWrapper = styled.div`
  padding: 2em;
  display: flex;
`;

const EmptySessionsText = styled.div`
  font-size: 2em;
  color: #888;
`;

const FindMentorLink = styled.a`
  text-decoration: none;
  color: blue;
  font-size: 2em;
  margin-left: 0.5em;
`;

const SessionsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
`;

const Session = styled.div`
  width: 100%;
  margin: 1em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const NameDateBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  justify-content: center;
  height: 5em;
`;

const NameOrDate = styled.div`
  font-size: 2em;
  color: #444;
`;

const StatusText = styled.div`
  color: #bbb;
  font-size: 2em;
  margin-left: 3em;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button).attrs(() => ({
  height: '3',
  width: '14',
  color: '#000',
  background: '#DDD',
  fontSize: '1.2'
}))``;

// placeholder
const MessageIcon = styled.div.attrs(({ history }) => ({
  onClick: () => history.push('/messages')
}))`
  height: 3em;
  width: 3em;
  background: #888;
  cursor: pointer;
  margin-left: 3em;
`;

const NoSessions = styled.div`
  font-size: 2em;
  text-align: center;
  height: 4em;
  line-height: 4em;
`;

class Sessions extends Component {
  state = {
    mode: 'Upcoming' // Upcoming or Past
  };

  handleNavClick = mode => this.setState({ mode });

  renderNav = () => {
    const {
      state: { mode },
      handleNavClick
    } = this;
    return (
      <Nav>
        <NavItem
          onClick={() => handleNavClick('Upcoming')}
          isActive={mode === 'Upcoming'}
        >
          Upcoming
        </NavItem>
        <NavItem
          onClick={() => handleNavClick('Past')}
          isActive={mode === 'Past'}
        >
          Past
        </NavItem>
      </Nav>
    );
  };

  maybeRenderDate = (status, confirmedDate, menteeTimezone) => {
    if (status !== 'Confirmed') return null;
    const { date, time } = confirmedDate;
    return <NameOrDate>{`${date} at ${time} (${menteeTimezone})`}</NameOrDate>;
  };

  renderSessions = () => {
    const {
      props: {
        sessions,
        sessions: { length },
        history,
        handleSessionClick,
        isMentor
      },
      state: { mode },
      maybeRenderDate
    } = this;

    const buttonText = status =>
      status === 'Confirmed' ? 'Enter Session Room' : 'View Session';
    const buttonMethod = (status, id) =>
      status === 'Confirmed'
        ? () => history.push(`/session/#${id}`)
        : () => handleSessionClick(id);

    if (!length) {
      return (
        <EmptySessionsWrapper>
          <EmptySessionsText>Your sessions with appear here.</EmptySessionsText>
          <FindMentorLink href="/search">Find a Mentor</FindMentorLink>
        </EmptySessionsWrapper>
      );
    }

    const filteredSessions = sessions.filter(({ status }) => {
      if (mode === 'Upcoming') {
        return status === 'Awaiting Confirmation' || status === 'Confirmed';
      }
      return status === 'Past';
    });

    if (!filteredSessions.length) {
      return <NoSessions>{`No ${mode.toLowerCase()} sessions`}</NoSessions>;
    }

    return (
      <SessionsList>
        {filteredSessions.map(
          ({
            mentorName,
            menteeName,
            status,
            confirmedDate,
            menteeTimezone,
            menteeAvatar,
            mentorAvatar,
            menteeId,
            mentorId,
            id
          }) => {
            const name = isMentor ? menteeName : mentorName;
            const avatar = isMentor ? menteeAvatar : mentorAvatar;
            const userId = isMentor ? menteeId : mentorId;

            return (
              <Session key={id}>
                <LeftBox>
                  <Avatar
                    size="3"
                    avatar={avatar}
                    history={history}
                    id={userId}
                  />
                  <NameDateBox>
                    <NameOrDate>{name}</NameOrDate>
                    {maybeRenderDate(status, confirmedDate, menteeTimezone)}
                  </NameDateBox>
                </LeftBox>
                <StatusText>{status}</StatusText>
                <ButtonBox>
                  <StyledButton
                    onClick={buttonMethod(status, id)}
                    text={buttonText(status)}
                  />
                  <MessageIcon />
                </ButtonBox>
              </Session>
            );
          }
        )}
      </SessionsList>
    );
  };

  render() {
    const { renderNav, renderSessions } = this;

    return (
      <Wrapper>
        <Head>
          <TitleRow>
            <TitleIcon />
            <TitleText>Sessions</TitleText>
          </TitleRow>
          {renderNav()}
        </Head>
        {renderSessions()}
      </Wrapper>
    );
  }
}

export default withRouter(Sessions);
