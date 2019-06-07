import React, { Component } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Button } from '../../../common-styles';
import Scheduler from './Scheduler';
import ScheduleList from './ScheduleList';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Wrapper = styled.div`
  position: absolute;
  top: 2em;
  width: 70em;
  border: 2px solid #888;
  border-bottom: none;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  color: #444;
  background: #FFF;
`;

const Head = styled.div`
  border-bottom: 2px solid #888;
  padding: 2em;
`;

const Main = styled.div`
  border-bottom: 2px solid #888;
  padding: 2em;
`;

const VacationBox = styled.div`
  border-bottom: 2px solid #888;
  padding: 2em;
`;

const VacationModeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckBox = styled.div`
  border: 2px solid #888;
  box-sizing: border-box;
  height: 2em;
  width: 2em;
  background: ${({ isActive }) => (isActive ? '#888' : '#DDD')};
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  padding: 2em;
  border-bottom: 2px solid #888;
  box-sizing: border-box;
`;

const HeadTitle = styled.div`
  color: #444;
  font-size: 2.5em;
`;

const SectionTitle = styled.div`
  color: #444;
  font-size: 2em;
`;

const SectionText = styled.div`
  color: #888;
  font-size: 1.6em;
  margin-top: 1em;
`;

const StyledButton = styled(Button).attrs(() => ({
  height: '3',
  width: '6',
  color: '#000',
  fontSize: '1.2'
}))`
  margin-right: 1.5em;
`;

export default class Availability extends Component {
  state = {
    schedule: {
      day: 'Monday',
      startTime: '800',
      endTime: '1800',
    },
    isLoaded: false,
  };

  componentDidMount() {
    const availability = this.props.availability || [];
    const { vacationMode } = this.props;

    this.setState({ availability, vacationMode, isLoaded: true });
  }

  handleDayChange = value => {
    const { schedule } = this.state;

    this.setState({
      schedule: {
        ...schedule,
        day: value,
      },
    });
  };

  handleTimeChange = (key, value) => {
    const { schedule } = this.state;

    this.setState({
      schedule: {
        ...schedule,
        [key]: value,
      },
    });
  };

  handleAddClick = () => {
    const { availability, schedule } = this.state;
    schedule.id = uuid();
    const { day: newDay } = schedule;
    let updatedAvailability = availability.filter(({ day }) => day !== newDay);
    updatedAvailability = [...updatedAvailability, schedule];
    updatedAvailability = updatedAvailability
      .sort(({ day: day1 }, { day: day2 }) =>
        days.indexOf(day1) - days.indexOf(day2)
      );

    this.setState({ availability: updatedAvailability });
  };

  handleDeleteClick = (scheduleId) => {
    const { availability } = this.state;
    const updatedAvailability = availability.filter(({ id }) => id !== scheduleId);

    this.setState({ availability: updatedAvailability });
  };

  handleVacationModeClick = () => {
    const { vacationMode } = this.state;

    this.setState({ vacationMode: !vacationMode });
  };

  handleSaveClick = () => {
    const {
      props: { onSaveClick },
      state: { availability, vacationMode },
    } = this;

    onSaveClick(availability, vacationMode);
  };

  render() {
    const {
      state: {
        schedule,
        vacationMode,
        availability,
        isLoaded,
      },
      props: {
        onCancelClick,
      },
      handleDayChange,
      handleSaveClick,
      handleTimeChange,
      handleAddClick,
      handleDeleteClick,
      handleVacationModeClick,
    } = this;

    // TODO: add loader
    if (!isLoaded) return null;

    return (
      <Wrapper>
        <Head>
          <HeadTitle>
            Edit Availability
          </HeadTitle>
          <SectionText>
            Tell us when you&#39;re available to offer sessions
          </SectionText>
        </Head>
        <Main>
          <SectionTitle>
            Days I offer sessions:
          </SectionTitle>
          <Scheduler
            {...schedule}
            onDayChange={handleDayChange}
            onTimeChange={handleTimeChange}
            onAddClick={handleAddClick}
          />
          <ScheduleList
            availability={availability}
            onDeleteClick={handleDeleteClick}
          />
        </Main>
        <VacationBox>
          <VacationModeRow>
            <SectionTitle>
              Vacation mode
            </SectionTitle>
            <CheckBox
              isActive={vacationMode}
              onClick={handleVacationModeClick}
            />
          </VacationModeRow>
          <SectionText>
            Use vacation mode when you&#39;re not accepting new requests.  Your profile will be excluded from the marketplace, and closed from new requests.
          </SectionText>
        </VacationBox>
        <ButtonBox>
          <StyledButton
            text="Save"
            onClick={handleSaveClick}
          />
          <StyledButton
            text="Cancel"
            onClick={onCancelClick}
          />
        </ButtonBox>
      </Wrapper>
    );
  }
}
