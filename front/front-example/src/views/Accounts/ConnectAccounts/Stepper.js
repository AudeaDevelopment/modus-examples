import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ mode }) => mode};
  position: relative;
`;

const Step = styled.div`
  margin-top: ${({ mode }) => (mode === 'row' ? '0' : '1.3em')};
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 1.6em;
`;

const Text = styled.div`
  margin-left: 1em;
  display: ${({ mode }) => (mode === 'column' ? 'block' : 'none')};
  color: #58585A;
  font-size: 1.2em;
`;

const HorizontalLine = styled.div`
  height: 2px;
  z-index: 1;
  position: absolute;
  width: 2em;
  background: ${({ isActive }) => (isActive ? '#6CDB8D' : '#F2F2F2')};
  right: 2.8em;
`;

const VerticalLine = styled.div`
  height: 2em;
  z-index: 1;
  position: absolute;
  width: 2px;
  background: ${({ isActive }) => (isActive ? '#6CDB8D' : '#F2F2F2')};
  left: calc(1.5em - 1px);
  bottom: 2.6em;
`;

const Circle = styled.div`
  z-index: 2;
  border-radius: 50%;
  height: 3em;
  width: 3em;
  background: ${({ mode, isActive }) => (mode === 'column' ? '#6CDB8D' : isActive ? '#6CDB8D' : '#F2F2F2')};
  position: relative;
  &:after {
    content: '${({ index }) => index}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ mode, isActive }) => (mode === 'column' ? '#FFF' : isActive ? '#FFF' : '#CACACA')};
    font-size: 1.3em;
  }
`;

const renderLine = (index, mode, currentStep) => (
  <Fragment>
    {index === 0 ? (
      null
    ) : (
      mode === 'row' ? (
        <HorizontalLine isActive={(index < currentStep) && (mode !== 'column')} />
      ) : (
        <VerticalLine isActive={(index < currentStep) && (mode !== 'column')} />
      )
    )}
  </Fragment>
);

export default ({ mode, currentStep }) => (
  <Wrapper mode={mode}>
    {[
      'Select Cloud Account',
      'Connect Account',
      'One-time Classification',
      'Automatically Classify New Files'
    ].map((step, index) => (
      <Step key={step} mode={mode}>
        {renderLine(index, mode, currentStep)}
        <Circle mode={mode} index={index + 1} isActive={index < currentStep} />
        <Text mode={mode}>{step}</Text>
      </Step>
    ))}
  </Wrapper>
);
