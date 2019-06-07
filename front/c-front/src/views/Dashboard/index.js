import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { getUser, updateSessionStatus } from '../../util/db';

import Session from './Session';
import Sessions from './Sessions';
import Topics from './Topics';
import Checklist from './Checklist';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  padding-top: 3em;
  width: 74%;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  padding-top: 3em;
  width: 24%;
  display: flex;
  flex-direction: column;
`;

export default class Dashboard extends Component {
  state = {
    isLoaded: false,
    currentSession: null,
    sessions: [],
  };

  componentDidMount() {
    getUser()
      .then(({ timezone, isMentor, sessions }) =>
        this.setState({
          sessions: sessions ? Object.values(sessions) : [],
          timezone,
          isMentor,
          isLoaded: true,
        })
      )
      .catch(e => console.log('error loading user data', e));
  }

  handleSessionClick = sessionId => {
    const { sessions } = this.state;
    const currentSession = sessions.find(({ id }) => id === sessionId);
    this.setState({ currentSession });
  };

  handleBackClick = () => (
    this.setState({ currentSession: null })
  );

  handleSessionStatusUpdate = (status, confirmedDate = null) => {
    const {
      sessions: initialSessions,
      currentSession: initialCurrentSession,
      currentSession: {
        id: sessionId,
      },
    } = this.state;

    updateSessionStatus(initialCurrentSession, status, confirmedDate)
      .then(() => {
        const currentSession = { ...initialCurrentSession, status, confirmedDate };
        const sessions = initialSessions.map(session =>
          (session.id === sessionId ? currentSession : session)
        );
        this.setState({
          sessions,
          currentSession: null,
        });
      })
      .catch(e => console.log('error updating sessions status to confirmed:', e));
  };

  render() {
    const {
      state: {
        isLoaded,
        sessions,
        currentSession,
        timezone,
        isMentor,
      },
      handleSessionClick,
      handleBackClick,
      handleSessionStatusUpdate,
    } = this;

    // placeholder
    const paymentMethod = '';

    // TODO add loader
    if (!isLoaded) return null;

    return (
      <Wrapper>
        {currentSession ? (
          <Session
            isMentor={isMentor}
            session={currentSession}
            handleBackClick={handleBackClick}
            handleSessionStatusUpdate={handleSessionStatusUpdate}
          />
        ) : (
          <Fragment>
            <LeftColumn>
              <Sessions
                isMentor={isMentor}
                sessions={sessions}
                handleSessionClick={handleSessionClick}
              />
              <Topics />
            </LeftColumn>
            <RightColumn>
              <Checklist
                timeZoneComplete={!!timezone}
                paymentMethod={paymentMethod}
              />
            </RightColumn>
          </Fragment>
        )}
      </Wrapper>
    );
  }
}
