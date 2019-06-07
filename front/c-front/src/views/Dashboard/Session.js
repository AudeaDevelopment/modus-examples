import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Dropdown from '../../components/Dropdown';
import { Avatar, Button } from '../../common-styles';

const Wrapper = styled.div`
  width: 100%;
`;

const BackButton = styled.div`
  margin: 2em 0;
  height: 2em;
  width: 9em;
  cursor: pointer;
  font-size: 1.2em;
  &:after {
    content: '<--Back';
    font-size: 2.2em;
    color: #444;
  }
`;

const InnerWrapper = styled.div`
  box-sizing: border-box;
  border: 2px solid #888;
  border-bottom: none;
  width: 100%;
`;

const Head = styled.div`
  height: 8em;
  width: 100%;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #888;
  box-sizing: border-box;
`;

const FirstBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ScheduleLink = styled.a`
  text-decoration: none;
  color: blue;
  font-size: 2.2em;
  margin-left: 1em;
  cursor: pointer;
`;

const Dot = styled.div`
  color: #888;
  line-height: 0.6em;
  height: 3em;
  margin: 0 1em;
  width: 1.6em;
  &:after {
    content: '.';
    font-size: 5em;
  }
`;

const DarkText = styled.div`
  color: #444;
  font-size: 2.2em;
`;

const LightText = styled.div`
  color: #888;
  font-size: 2.2em;
`;

const SecondBox = styled.div`
  display: flex;
  align-items: center;
`;

const DetailsBox = styled.div`
  padding: 2em;
  width: 100%;
  border-bottom: 2px solid #888;
  box-sizing: border-box;
`;

const Details = styled.div`
  color: #888;
  font-size: 2.2em;
`;

const ButtonBox = styled.div`
  padding: 2em;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #888;
  width: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled(Button).attrs(() => ({
  height: '5',
  width: '20',
  color: '#000',
  fontSize: '2',
}))`
  margin-right: 1em;
  box-sizing: border-box;
  font-size: 1em;
`;

const StyledDropdown = styled(Dropdown).attrs(() => ({
  fontSize: '1.6',
  width: '14',
  marginRight: '1em',
}))``;

// placeholder
const MessageIcon = styled.div.attrs(({ history }) => ({
  onClick: () => history.push('/messages'),
}))`
  border-radius: 50%;
  height: 5em;
  width: 5em;
  background: #888;
  cursor: pointer;
`;

const formatDateString = (date, time) => `${date} at ${time}`;

class Session extends Component {
  state = { isLoaded: false };

  componentDidMount() {
    const {
      session: {
        dateOne: date,
        timeOne: time,
      }
    } = this.props;
    this.setState({ date, time, isLoaded: true });
  }

  handleDropdownSelect = (selected) => {
    const [date, time] = selected.split(' at ');
    this.setState({ date, time });
  };

  maybeRenderMenteeDates = () => {
    const {
      isMentor,
      session: {
        dateOne, dateTwo, dateThree,
        timeOne, timeTwo, timeThree,
      },
    } = this.props;

    if (isMentor) return null;
    return (
      <Fragment>
        <DarkText>
          {formatDateString(dateOne, timeOne)}
        </DarkText>
        <Dot />
        <DarkText>
          {formatDateString(dateTwo, timeTwo)}
        </DarkText>
        <Dot />
        <DarkText>
          {formatDateString(dateThree, timeThree)}
        </DarkText>
      </Fragment>
    );
  };

  maybeRenderMentorDropdown = () => {
    const {
      state: {
        date, time,
      },
      props: {
        isMentor,
        session: {
          menteeTimezone,
          dateOne, dateTwo, dateThree,
          timeOne, timeTwo, timeThree,
        }
      },
      handleDropdownSelect,
    } = this;

    if (!isMentor) return null;
    return (
      <Fragment>
        <StyledDropdown
          value={formatDateString(date, time)}
          onSelect={handleDropdownSelect}
          options={[
            formatDateString(dateOne, timeOne),
            formatDateString(dateTwo, timeTwo),
            formatDateString(dateThree, timeThree),
          ]}
        />
        <DarkText>{`(${menteeTimezone})`}</DarkText>
      </Fragment>
    );
  };

  render() {
    const {
      state: {
        date, time, isLoaded,
      },
      props: {
        handleBackClick,
        handleSessionStatusUpdate,
        history,
        isMentor,
        session: {
          mentorId,
          menteeId,
          avatar,
          lengthOption,
          details,
          status,
          menteeName,
          mentorName,
        },
      },
      maybeRenderMenteeDates,
      maybeRenderMentorDropdown,
    } = this;

    if (!isLoaded) return null;

    const name = isMentor ? menteeName : mentorName;
    const userId = isMentor ? menteeId : mentorId;

    return (
      <Wrapper>
        <BackButton onClick={handleBackClick} />
        <InnerWrapper>
          <Head>
            <FirstBox>
              <Avatar
                size="3"
                history={history}
                id={userId}
                avatar={avatar}
              />
              <ScheduleLink>Schedule request</ScheduleLink>
              <Dot />
              <DarkText>{name}</DarkText>
            </FirstBox>
            <SecondBox>
              {maybeRenderMenteeDates()}
              {maybeRenderMentorDropdown()}
              <Dot />
              <LightText>{lengthOption}</LightText>
            </SecondBox>
            <LightText>{status}</LightText>
          </Head>
          {details ? (
            <DetailsBox>
              <Details>{details}</Details>
            </DetailsBox>
          ) : (
            null
          )}
          {(isMentor && (status === 'Awaiting Confirmation')) ? (
            <ButtonBox>
              <StyledButton
                onClick={() => handleSessionStatusUpdate('Confirmed', { date, time })}
                text="Confirm"
                background="#DDD"
              />
              <StyledButton
                onClick={() => handleSessionStatusUpdate('Declined')}
                text="Decline"
                background="#FFF"
              />
              <StyledButton
                // TODO: ?
                text="Send Message"
                background="#FFF"
              />
              <MessageIcon
                // TODO: ?
                history={history}
              />
            </ButtonBox>
          ) : (
            null
          )}
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default withRouter(Session);
