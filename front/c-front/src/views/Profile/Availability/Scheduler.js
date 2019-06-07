import React from 'react';
import styled from 'styled-components';

import TimeInput from '../../../components/TimeInput';
import Dropdown from '../../../components/Dropdown';
import { Button } from '../../../common-styles';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Wrapper = styled.div`
  width: 90%;
  margin-top: 2em;
`;

const InputRow = styled.div`
  width: 100%;
  height: 4.4em;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button).attrs(() => ({
  height: '3.1',
  width: '6',
  color: '#000',
  fontSize: '1.2'
}))``;

export default ({
  day,
  startTime,
  endTime,
  onDayChange,
  onTimeChange,
  onAddClick,
}) => (
  <Wrapper>
    <InputRow>
      <Dropdown
        value={day}
        options={days}
        onSelect={onDayChange}
        width="10"
        fontSize="2"
        marginRight="1em"
      />
      <TimeInput
        value={startTime}
        onChange={value => onTimeChange('startTime', value)}
        width="13em"
        last
      />
      <TimeInput
        value={endTime}
        onChange={value => onTimeChange('endTime', value)}
        width="13em"
        last
      />
      <StyledButton
        text="Add"
        onClick={onAddClick}
      />
    </InputRow>
  </Wrapper>
);
