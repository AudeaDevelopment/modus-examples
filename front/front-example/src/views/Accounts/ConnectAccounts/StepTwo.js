import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';


import Stepper from './Stepper';

import { LinkButton } from '../../../styles';

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

const Card = styled.a`
  height: 3.8em;
  width: ${({ wide }) => (wide ? '100%' : '13em')};
  border-radius: 6px;
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.24);
  display: inline-flex;
  justify-content: ${({ wide }) => (wide ? 'space-between' : 'center')};
  align-items: center;
  flex-direction: row;
  cursor: ${({ wide }) => (wide ? 'default' : 'pointer')};
  text-decoration: none;
  ${({ wide }) => (wide ? `padding: 0 1em;
    box-sizing: border-box;` : '')}
`;

const BoxIcon = styled.div`
  height: 2em;
  width: 2em;
  background: #DDD;
`;

const CardText = styled.div`
  color: #58585A;
  margin-left: 1em;
`;

const Terms = styled.span`
  color: #9B9B9B;
  margin-top: 1.5em;
`;

const TermsText = styled.div`
  display: inline-block;
`;

const TermsLink = styled.a`
  display: inline-block;
  font-weight: bold;
  color: #9B9B9B;
  margin-left: .3em;
`;

const StyledLinkButton = styled(LinkButton)`
  margin-top: 3em;
  align-self: flex-end;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
`;

const YourAccountText = styled.div`
  color: #58585A;
  font-size: 1.2em;
  margin: 0 .5em;
`;

const EditIcon = styled.div`
  height: 1em;
  width: 1em;
  background: #CCCCCC;
`;

const CheckIcon = styled.div`
  background: #6BDC8D;
  height: 1em;
  width: 1em;
  margin-right: .5em;
`;

const ConnectedText = styled.div`
  color: #6BDC8D;
`;

class StepTwo extends Component {
  state = {
    connected: false,
  };

  render() {
    const { connected } = this.state;
    const accountType = this.props.history.location.pathname.split('/').pop();

    return (
      <Wrapper>
        <Stepper mode="row" currentStep="2" />
        <DarkText>{`Connect your ${accountType} account`}</DarkText>
        <LightText>
          {`You will be directed to the ${accountType} login and authentication screen where you will need to grant Sweep by Lattice Security permission to access your files and folders.`}
        </LightText>
        {connected ? (
          <Card wide>
            <LeftBox>
              <BoxIcon />
              <YourAccountText>
                My Box Account
              </YourAccountText>
              <EditIcon />
            </LeftBox>
            <RightBox>
              <CheckIcon />
              <ConnectedText>
                Connected
              </ConnectedText>
            </RightBox>
          </Card>
        ) : (
          <Card href="/box-authenticate">
            <BoxIcon />
            <CardText>Connect Account</CardText>
          </Card>
        )}
        <Terms>
          <TermsText>
            {`By connecting your ${accountType} account, you agree to our`}
          </TermsText>
          <TermsLink href="#">
            terms of use
          </TermsLink>
        </Terms>
        <StyledLinkButton disabled={!connected} href={`/accounts/connect-accounts/3/${accountType}`}>Continue</StyledLinkButton>
      </Wrapper>
    );
  }
}

export default withRouter(StepTwo);
