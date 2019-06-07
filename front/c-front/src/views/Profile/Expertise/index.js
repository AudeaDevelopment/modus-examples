import React, { Component } from 'react';
import styled from 'styled-components';

import Software from './Software';

import { Title } from '../styles';

const Wrapper = styled.div`
  width: 100em;
  max-width: 100%;
  margin: 6em auto 0;
`;

const Tabs = styled.div`
  display: flex;
  padding-left: .5em;
`;

const Tab = styled.div`
  width: 6.2em;
  font-size: 1.9em;
  height: 1.8em;
  line-height: 1.8em;
  text-align: center;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border: 2px solid #888;
  border-bottom: none;
  text-transform: capitalize;
  background: ${({ isCurrent }) => (isCurrent ? '#DDD' : '#FFF')};
  cursor: pointer;
  pointer-events: ${({ isCurrent }) => (isCurrent ? 'none' : 'auto')};
`;

export default class Expertise extends Component {
  state = {
    current: 'software',
  };

  renderTabs = () => {
    const {
      props,
      state: { current },
    } = this;
    const tabs = ['software'];
    const tabContent = tab => {
      const count = props[tab].length;
      return count ? `${tab} (${count})` : tab;
    };

    return (
      <Tabs>
        {tabs.map(tab => (
          <Tab
            onClick={() => console.log(`clicked on ${tab} tab`)} // TODO handle tab navigation
            isCurrent={current === tab}
            key={tab}
          >
            {tabContent(tab)}
          </Tab>
        ))}
      </Tabs>
    );
  };

  renderCurrent = () => {
    const {
      props,
      props: { software },
      state: { current },
    } = this;

    switch (current) {
      case 'software':
        return <Software content={software} {...props} />;
      default: return null;
    }
  };

  render() {
    const {
      renderTabs,
      renderCurrent,
    } = this;

    return (
      <Wrapper>
        <Title>Expertise</Title>
        {renderTabs()}
        {renderCurrent()}
      </Wrapper>
    );
  }
}
