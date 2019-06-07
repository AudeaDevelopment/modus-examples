import React from 'react';
import styled from 'styled-components';

import { Button } from '../../../common-styles';

const Wrapper = styled.div`
  width: 100%;
  margin: 2em 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const StyledButton = styled(Button).attrs(() => ({
  circle: true,
  height: '2.5',
  width: '2.5',
  color: '#000',
  fontSize: '1.2',
  text: 'X'
}))``;

const ScheduleString = styled.span`
  
`;

const DarkText = styled.div`
  font-size: 2em;
  color: #444;
  display: inline-block;
`;

const LightText = styled.div`
  font-size: 2em;
  color: #BBB;
  display: inline-block;
`;

const formatTime = (value) => {
  const intValue = parseInt(value, 10);
  const meridiem = intValue >= 1200 ? 'PM' : 'AM';
  const baseTime = intValue >= 1300 ? intValue - 1200 : intValue;
  const timeArr = baseTime.toString().split('');
  const withColon = timeArr.reduce((acc, val, index) =>
    (index === timeArr.length - 2) ? acc.concat(':', val) : acc.concat(val), []);
  return `${withColon.join('')} ${meridiem}`;
};

export default ({ availability, onDeleteClick }) => (
  <Wrapper>
    {availability.map(({ id, day, startTime, endTime }) => (
      <Row key={id}>
        <ScheduleString>
          <DarkText>{`${day}`}&nbsp;</DarkText>
          <LightText>from&nbsp;</LightText>
          <DarkText>{`${formatTime(startTime)}`}&nbsp;</DarkText>
          <LightText>to&nbsp;</LightText>
          <DarkText>{formatTime(endTime)}</DarkText>
        </ScheduleString>
        <StyledButton
          onClick={() => onDeleteClick(id)}
        />
      </Row>
    ))}
  </Wrapper>
);
