import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Button } from '../../common-styles';

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid #888;
  box-sizing: border-box;
  padding: 3em 6em;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 2.4em;
  color: #888;
  text-align: center;
  margin-bottom: 1.5em;
`;

const Time = styled.div`
  font-size: 3em;
  color: #888;
  margin: 0 1em;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const renderTitleContent = (status, { name, inRoom }) => {
  switch (status) {
    case 'inactive':
      return inRoom ? `${name} is in the session room` : `Waiting for ${name} to enter the session room`;
    case 'active':
      return 'Session is in progress';
    case 'paused':
      return 'Session is paused';
    default:
      return null;
  }
};

const renderButtonText = (status) => {
  switch (status) {
    case 'inactive':
      return 'Start Paid Session';
    case 'active':
      return 'Pause';
    case 'paused':
      return 'Resume';
    default:
      return null;
  }
};

const handleButtonClick = (status, onStartClick, onPauseClick, onResumeClick) => {
  switch (status) {
    case 'inactive':
      return onStartClick;
    case 'active':
      return onPauseClick;
    case 'paused':
      return onResumeClick;
    default:
      return null;
  }
};

const maybeRenderEndButton = (time, status, onEndClick, isRenderingModal) => {
  if (status !== 'inactive') {
    return (
      <Fragment>
        <Time>{time}</Time>
        <Button
          width="16"
          text="End"
          onClick={onEndClick}
          background="#FFF"
          disabled={isRenderingModal}
        />
      </Fragment>
    );
  }
  return null;
};

export default ({
  isRenderingModal, status, time, onStartClick, onPauseClick, onResumeClick, onEndClick, user,
}) => (
  <Wrapper>
    <Title>{renderTitleContent(status, user)}</Title>
    <ButtonBox>
      <Button
        width="16"
        text={renderButtonText(status)}
        onClick={handleButtonClick(status, onStartClick, onPauseClick, onResumeClick)}
        background={status === 'active' ? '#DDD' : '#000'}
        color={status === 'active' ? '#000' : '#FFF'}
        disabled={isRenderingModal}
      />
      {maybeRenderEndButton(time, status, onEndClick, isRenderingModal)}
    </ButtonBox>
  </Wrapper>
);
