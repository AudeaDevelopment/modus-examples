import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 2px solid #888;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  width: ${({ width }) => width || '17em'};
  border-bottom: ${({ last }) => (last ? '2px solid #888' : 'none')};
`;

const Display = styled.div`
  font-size: 2em;
  line-height: 2em;
  padding-left: .6em;
  color: #BBB;
`;

const Caret = styled.div`
  height: 2em;
  position: absolute;
  cursor: pointer;
  right: .5em;
  width: 4em;
  right: 0;
  &:after {
    content: '^';
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #DDD;
    font-size: 1.6em;
  }
`;

const UpButton = styled(Caret)`
  top: 0;
  &:after {
    top: 60%;
  }
`;

const DownButton = styled(Caret)`
  top: 1.6em;
  transform: rotate(-180deg);
  &:after {
    top: 65%;
  }
`;

export default class TimeInput extends Component {
  handleChange = (direction) => {
    const { value, onChange } = this.props;
    const intValue = parseInt(value, 10);
    const isBaseHundred = !(intValue % 100);
    const isPositive = direction === 1;
    const incriment = isBaseHundred ? isPositive ? 30 : -70 : isPositive ? 70 : -30;
    const newIntValue = intValue + incriment;
    const time = newIntValue >= 2500 ? 100 : newIntValue < 100 ? 2430 : newIntValue;
    onChange(time);
  };

  renderValue = () => {
    const { value } = this.props;
    const intValue = parseInt(value, 10);
    const meridiem = intValue >= 1200 ? 'PM' : 'AM';
    const baseTime = intValue >= 1300 ? intValue - 1200 : intValue;
    const timeArr = baseTime.toString().split('');
    const withColon = timeArr.reduce((acc, val, index) =>
      (index === timeArr.length - 2) ? acc.concat(':', val) : acc.concat(val), []);
    return `${withColon.join('')} ${meridiem}`;
  };

  render() {
    const {
      props: { last, width },
      renderValue,
      handleChange,
    } = this;

    return (
      <Wrapper last={last} width={width}>
        <Display>{renderValue()}</Display>
        <UpButton onClick={() => handleChange(1)} />
        <DownButton onClick={() => handleChange(-1)} />
      </Wrapper>
    );
  }
}
