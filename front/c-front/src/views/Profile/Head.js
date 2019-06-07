import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { Avatar, InputWrapper, Button } from '../../common-styles';
import { TextButton } from './styles';

const Wrapper = styled.div`
  padding: 2em 0;
  width: 100%;
  border-bottom: 2px solid #EEE;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  margin: 0 auto;
  position: relative;
  &:after {
    content: '${({ online }) => online ? 'Online' : ''}';
    position: absolute;
    bottom: 0;
    font-size: 1.5em;
    left: 4.5em;
    color: #BBB;
  }
`;

const Name = styled.div`
  font-size: 2.7em;
  margin: .4em 0;
  text-align: center;
`;

const HeadlineWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.div`
  font-size: 2em;
  color: #888;
`;

const HeadlineInputWrapper = styled(InputWrapper)`
  width: 40em;
  height: 3.6em;
`;

const HeadlineTextButton = styled(TextButton).attrs(() => ({
  fontSize: '1.1',
  width: '5',
  height: '2',
}))``;

const HeadlineTextButton2 = styled(TextButton).attrs(() => ({
  fontSize: '1.1',
  width: '9.5',
  height: '2',
}))``;

const AvailabilityWrapper = styled.div`
  margin: 1em auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// placeholder
const AvailabilityIcon = styled.div`
  height: 2em;
  width: 2em;
  background: #BBB;
`;

const Availability = styled.div`
  margin-left: 1em;
  font-size: 1.7em;
  color: #BBB;
`;

const ButtonBox = styled.div`
  display: flex;
  margin: 2em auto 0;
  width: 26em;
  justify-content: space-between;
`;

const AvailabilityButton = styled(Button).attrs(() => ({
  fontSize: '1.2',
  width: '9',
  height: '3',
}))``;

const EditAvailabilityButton = styled(Button).attrs(() => ({
  fontSize: '1.2',
  width: '12',
  height: '3',
  background: '#000',
}))`
  margin-top: 1.5em;
`;

export default class Head extends Component {
  state = {
    headline: this.props.headline,
  };

  handleHeadlineChange = ({ target: { value: headline } }) => (
    this.setState({ headline })
  );

  handleCancelClick = () => {
    const { headline, handleHeadlineCancelClick } = this.props;
    this.setState({ headline });
    handleHeadlineCancelClick();
  };

  renderHeadline = () => {
    const {
      state: {
        headline,
      },
      props: {
        isOwner,
        isEditingHeadline,
        handleHeadlineSaveClick,
        handleHeadlineEditClick,
      },
      handleCancelClick,
      handleHeadlineChange,
    } = this;

    return (
      <HeadlineWrapper>
        {isEditingHeadline ? (
          <Fragment>
            <HeadlineInputWrapper>
              <input
                value={headline}
                onChange={handleHeadlineChange}
              />
            </HeadlineInputWrapper>
            <HeadlineTextButton
              onClick={() => handleHeadlineSaveClick(headline)}
              text="Save"
            />
            <HeadlineTextButton
              onClick={handleCancelClick}
              text="Cancel"
            />
          </Fragment>
        ) : (
          (isOwner && !headline) ? (
            <HeadlineTextButton2
              onClick={handleHeadlineEditClick}
              text="Add a headline"
            />
          ) : (
            (isOwner && headline) ? (
              <Fragment>
                <Headline>{headline}</Headline>
                <HeadlineTextButton2
                  onClick={handleHeadlineEditClick}
                  text="Edit headline"
                />
              </Fragment>
            ) : (
              <Headline>{headline}</Headline>
            )
          )
        )}
      </HeadlineWrapper>
    );
  };

  maybeRenderMentorBooking = () => {
    const {
      isOwner, isMentor, availability, vacationMode, handleBookClick,
    } = this.props;

    if (isOwner || (!isMentor)) return;

    const formatTime = (value) => {
      const intValue = parseInt(value, 10);
      const meridiem = intValue >= 1200 ? 'PM' : 'AM';
      const baseTime = intValue >= 1300 ? intValue - 1200 : intValue;
      const timeArr = baseTime.toString().split('');
      const withColon = timeArr.reduce((acc, val, index) =>
        (index === timeArr.length - 2) ? acc.concat(':', val) : acc.concat(val), []);
      return `${withColon.join('')} ${meridiem}`;
    };

    const findNextAvailable = () => {
      const date = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = days[date.getDay()];
      const currentHour = date.getHours();
      let nextAvailable = '';
      for (let i = 0; i < availability.length; i++) {
        const { day, startTime, endTime } = availability[i];
        const start = parseInt(startTime, 10) / 100;
        const end = parseInt(endTime, 10) / 100;
        const index = days.indexOf(day);
        if (currentDay === day) {
          if (currentHour < start) {
            nextAvailable = `Available in about ${Math.floor(start - currentHour)} hours`;
            break;
          }
          if ((currentHour > start) && (currentHour < end)) {
            nextAvailable = 'Available now';
            break;
          }
        }
        if ((currentDay === 'Saturday') || (date.getDay() < index)) {
          nextAvailable = `Available on ${day} at ${formatTime(startTime)}`;
          break;
        }
      }
      return nextAvailable;
    };

    const availabilityStatus = vacationMode ? 'Unavailable for scheduling' : findNextAvailable();

    console.log(availability)

    return (
      <Fragment>
        <AvailabilityWrapper>
          <AvailabilityIcon />
          <Availability>{availabilityStatus}</Availability>
        </AvailabilityWrapper>
        <ButtonBox>
          <AvailabilityButton
            onClick={handleBookClick}
            background="#000"
            text="Book"
            disabled={vacationMode}
          />
          <AvailabilityButton
            background="#DDD"
            text="Message"
          />
        </ButtonBox>
      </Fragment>
    );
  };

  maybeRenderMentorOwnAvailability = () => {
    const {
      isOwner,
      isMentor,
      handleAvailabilityClick,
    } = this.props;

    if (isOwner && isMentor) {
      return (
        <EditAvailabilityButton
          onClick={handleAvailabilityClick}
          text="Edit Availability"
        />
      );
    }
    return null;
  };

  render() {
    const {
      props: {
        avatar,
        name,
        onlineStatus,
        isOwner,
      },
      renderHeadline,
      maybeRenderMentorBooking,
      maybeRenderMentorOwnAvailability,
    } = this;

    return (
      <Wrapper>
        <StyledAvatar
          disabled
          size="5.5"
          avatar={avatar}
          online={onlineStatus && !isOwner}
        />
        <Name>{name}</Name>
        {renderHeadline()}
        {maybeRenderMentorBooking()}
        {maybeRenderMentorOwnAvailability()}
      </Wrapper>
    );
  }
}
