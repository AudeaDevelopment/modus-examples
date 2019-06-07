import React, { Component } from 'react';
import styled from 'styled-components';

// TODO: close dropdown when clicking away, filter options by ones already selected

const Wrapper = styled.div`
  font-size: ${({ fontSize }) => fontSize || 1}em;
  height: 100%;
  width: ${({ width }) => width ? `${width}em` : '100%'};
  border: 2px solid #888;
  box-sizing: border-box;
  position: relative;
  color: #888;
  cursor: pointer;
  margin-right: ${({ marginRight }) => marginRight || '0'};
`;

const Button = styled.div`
  position: absolute;
  right: 1em;
  width: 1em;
  height: 1em;
  bottom: ${({ isToggled }) => isToggled ? '25' : '50'}%;
  &:after {
    content: '^';
    transform: rotate(${({ isToggled }) => isToggled ? '0' : '180'}deg);
    position: absolute;
    font-size: 1.5em;
  }
`;

const Select = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: ${({ fontSize }) => fontSize ? 1 / fontSize : 1}em;
  line-height: 2em;
`;

const Options = styled.div`
  width: 15em;
  max-width: 100%;
  position: absolute;
  border: 2px solid #888;
  box-sizing: border-box;
  z-index: 1;
  top: 100%;
  left: -2px;
`;

const Option = styled.div`
  background: #FFF;
  height: 2em;
  width: 100%;
  cursor: pointer;
  line-height: 2em;
  padding: 0 1em;
  color: #444;
  box-sizing: border-box;
  &:hover {
    background: #DDD;
  }
`;

export default class Dropdown extends Component {
  state = {
    isToggled: false,
    value: '',
  };

  componentDidMount() {
    const { isLanguageSelect, value } = this.props;
    if (isLanguageSelect) {
      return this.setState({ value: value.join(' ') });
    }
    this.setState({ value });
  }

  handleToggle = () => this.setState({ isToggled: !this.state.isToggled });

  handleSelect = newValue => {
    const {
      state: { value },
      props: { isLanguageSelect, onSelect },
    } = this;
    if (isLanguageSelect) {
      this.setState({
        value: `${value} ${newValue}`,
        isToggled: false,
      });
    } else {
      this.setState({
        value: newValue,
        isToggled: false,
      });
    }
    onSelect(newValue);
  };

  maybeRenderOptions = () => {
    const {
      state: { isToggled },
      props: { options },
      handleSelect,
    } = this;

    if (isToggled) {
      return (
        <Options>
          {options.map(option => (
            <Option
              onClick={() => handleSelect(option)}
              key={option}
            >
              {option}
            </Option>
          ))}
        </Options>
      );
    }
  };

  render() {
    const {
      state: { value, isToggled },
      props: { fontSize, width },
      maybeRenderOptions,
      handleToggle,
    } = this;

    return (
      <Wrapper onClick={handleToggle} fontSize={fontSize} width={width}>
        <Button isToggled={isToggled} />
        <Select fontSize={fontSize}>{value}</Select>
        {maybeRenderOptions()}
      </Wrapper>
    );
  }
}
