import React from 'react';
import styled from 'styled-components';

import { Button } from './styles';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 9;
`;

const Container = styled.div`
  background: #FFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 2em;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const DangerIcon = styled.div`
  background: #F83149;
  border-radius: 50%;
  height: 1.3em;
  width: 1.3em;
`;

const TitleText = styled.div`
  color: #58585A;
  font-size: 1.3em;
`;

const SmallText = styled.div`
  font-size: .9em;
  color: #9B9B9B;
  padding: 1em 0;
`;

const ButtonBox = styled.div`
  display: flex;

`;

const StyledButton = styled(Button)`

`;

const handleConfirm = (accountId, handleAction) => {
  // TODO remove account
  console.log('remove account', accountId)
  // .then:
  handleAction();
};

export default ({ accountId, handleAction }) => (
  <Wrapper>
    <Container>
      <Header>
        <DangerIcon />
        <TitleText>
          Confirm Removing Account
        </TitleText>
        <SmallText>
          by removing this account you understand that all classification output data will be removed
        </SmallText>
        <ButtonBox>
          <StyledButton
            text="Yes, Remove"
            onClick={() => handleConfirm(accountId, handleAction)}
          />
          <StyledButton
            text="No, Cancel"
            onClick={handleAction}
          />
        </ButtonBox>
      </Header>
    </Container>
  </Wrapper>
);
