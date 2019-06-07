import React from 'react';
import styled from 'styled-components';

import DateInput from '../../../components/DateInput';
import TimeInput from '../../../components/TimeInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  height: 4em;
  width: 100%;
  display: flex;
`;

export default ({
  dateOne,
  dateTwo,
  dateThree,
  timeOne,
  timeTwo,
  timeThree,
  handleChange,
}) => (
  <Wrapper>
    <Row>
      <DateInput
        value={dateOne}
        onChange={
          value => handleChange('dateOne', value)
        }
      />
      <TimeInput
        value={timeOne}
        onChange={
          value => handleChange('timeOne', value)
        }
      />
    </Row>
    <Row>
      <DateInput
        value={dateTwo}
        onChange={
          value => handleChange('dateTwo', value)
        }
      />
      <TimeInput
        value={timeTwo}
        onChange={
          value => handleChange('timeTwo', value)
        }
      />
    </Row>
    <Row>
      <DateInput
        last
        value={dateThree}
        onChange={
          value => handleChange('dateThree', value)
        }
      />
      <TimeInput
        last
        value={timeThree}
        onChange={
          value => handleChange('timeThree', value)
        }
      />
    </Row>
  </Wrapper>
);
