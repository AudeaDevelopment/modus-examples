import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Button } from '../../common-styles';

const Wrapper = styled.div`
  position: absolute;
  top: 20em;
  border: 2px solid #888;
  transform: translateX(-50%);
  left: 50%;
  top: 30em;
  width: 50em;
  background: #DDD;
`;

const TitleBox = styled.div`
  padding: 1.5em;
  border-bottom: 2px solid #888;
  font-size: 2.5em;
  text-align: center;
`;

const ButtonBox = styled.div`
  display: flex;
  height: 8em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const renderTitleContent = (status) => (
  status === 'active' ? 'End paid session?' : 'Start paid session?'
);

const renderButtons = (status, onStartClick, onCancelClick, onEndClick) => {
  if (status === 'active') {
    return (
      <Fragment>
        <Button
          text="Cancel"
          onClick={onCancelClick}
          background="#DDD"
          color="#888"
          width="10"
        />
        <Button
          text="End"
          onClick={onEndClick}
          width="16"
          background="#000"
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Button
        text="Cancel"
        onClick={onCancelClick}
        background="#DDD"
        color="#888"
        width="10"
      />
      <Button
        text="Start"
        onClick={onStartClick}
        background="#000"
        width="10"
      />
    </Fragment>
  );
};

export default ({ status, onStartClick, onCancelClick, onEndClick }) => (
  <Wrapper>
    <TitleBox>
      {renderTitleContent(status)}
    </TitleBox>
    <ButtonBox>
      {renderButtons(status, onStartClick, onCancelClick, onEndClick)}
    </ButtonBox>
  </Wrapper>
);
