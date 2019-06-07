import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { LinkButton } from '../../../styles';
import Stepper from './Stepper';

const Wrapper = styled.div`
  width: 39em;
  margin: 1em auto 0;
  display: flex;
  flex-direction: column;
`;

const DarkText = styled.p`
  color: #58585A;
  font-size: 1.2em;
  margin: 2em 0 .5em;
`;

const LightText = styled.p`
  color: #9B9B9B;
  font-size: 1em;
  margin-bottom: 1.5em;
`;

const StyledLinkButton = styled(LinkButton)`
  margin-top: 3em;
  align-self: flex-end;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;

const Toggle = styled.div`
  width: 3em;
  height: 2em;
  background: ${({ toggled }) => (toggled ? '#43A742' : '#E4E4E4')};
  cursor: pointer;
  position: relative;
  &:after {
    content: '${({ toggled }) => (toggled ? 'Enabled' : 'Disabled')}';
    margin-left: 1em;
    position: absolute;
    left: 3em;
    font-size: 1.1em;
    transform: translateY(-50%);
    top: 50%;
  }
`;

class StepFour extends Component {
  state = {
    enabled: false,
    selected: false,
  };

  handleEnableToggle = () =>
    this.setState({ enabled: !this.state.enabled });

  render() {
    const {
      state: { enabled, selected },
      handleEnableToggle,
    } = this;

    const accountType = this.props.history.location.pathname.split('/').pop();

    return (
      <Wrapper>
        <Stepper mode="row" currentStep="4" />
        <DarkText>Automatically Classify New Files</DarkText>
        <LightText>
          Choose whether to automatically classify new files that are added by you or your team
        </LightText>
        <Toggle onClick={handleEnableToggle} toggled={enabled} />
        <StyledLinkButton
          href={`/accounts/connect-accounts/5/${accountType}`}
          disabled={enabled && !selected}
        >
          {enabled ? 'Finish' : 'Skip and Finish'}
        </StyledLinkButton>
      </Wrapper>
    );
  }
}

export default withRouter(StepFour);
