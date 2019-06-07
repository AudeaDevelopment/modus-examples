import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 2px solid #888;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  width: 30em;
  border-bottom: ${({ last }) => (last ? '2px solid #888' : 'none')};
  border-right: none;
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

export default class DateInput extends Component {
  handleChange = (direction) => {
    const { value, onChange } = this.props;
    const ONE_DAY = 86400000;
    const dateArr = new Date(Date.parse(value) + (direction * ONE_DAY)).toString().split(' ');
    const date = `${dateArr[1]} ${parseInt(dateArr[2], 10)} ${dateArr[3]}`;
    onChange(date);
  };

  renderValue = () => {
    const { value } = this.props;
    const dateArr = new Date(value).toString().split(' ');
    return `${dateArr[0]}, ${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

  render() {
    const {
      props: { last },
      renderValue,
      handleChange,
    } = this;

    return (
      <Wrapper last={last}>
        <Display>{renderValue()}</Display>
        <UpButton onClick={() => handleChange(1)} />
        <DownButton onClick={() => handleChange(-1)} />
      </Wrapper>
    );
  }
}
