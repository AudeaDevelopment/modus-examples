import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from './Modal';

const Wrapper = styled.div`
  height: 100%;
  width: calc(76% - 1em);
`;

const Main = styled.div`
  width: 100%;
`;

const Accounts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24%;
  height: 100%;
  border-left: 1px dashed #DDD;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  padding-top: 3.5em;
  align-items: center;
`;

const Icon = styled.div`
  height: 2.3em;
  width: 3.3em;
  background: #0080CA;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeadLeft = styled.div`
  display: flex;
  align-items: center;
`;

const AccountName = styled.div`
  font-size: 1.2em;
  margin-left: 1em;
`;

const Options = styled.div`
  height: 2.3em;
  width: 2.3em;
  background: #EAEAEA;
  position: relative;
  cursor: pointer;
`;

const AccountCard = styled.div`
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.24);
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  box-sizing: border-box;
`;

const BigIcon = styled.div`
  height: 5em;
  width: 6em;
  margin-bottom: 1em;
  background: #CCC;
`;

const AddAccountsText = styled.div`
  font-size: 1.5em;
`;

const AddAccountsSubText = styled.div`
  font-size: .9em;
  margin-top: .5em;
  text-align: center;
  color: #9B9B9B;
`;

const AddAccountsButton = styled.div`
  display: inline-block;
  height: 2.5em;
  border-radius: 3px;
  background-color: #6CDB8D;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.13);
  color: #FFF;
  font-size: 1.1em;
  text-decoration: none;
  line-height: 2.5em;
  padding: 0 1.3em;
  margin-top: 1em;
  &:active {
    transform: translateY(2px);
  }
`;

const CardContents = styled.div`
  background: #F5F5F5;
  border-radius: 6px;
  margin-top: 1em;
  padding: 1em;
  box-sizing: border-box;
`;

const AutoToggle = styled.div`
  width: 2.5em;
  height: 1.8em;
  background: ${({ toggled }) => (toggled ? '#43A742' : '#E4E4E4')};
  cursor: pointer;
  position: relative;
  &:after {
    content: 'Automatically Classify New Files';
    margin-left: 1em;
    position: absolute;
    left: 2em;
    font-size: 1.1em;
    transform: translateY(-50%);
    top: 50%;
    white-space: nowrap;
  }
`;

export default class ManageAccounts extends Component {
  state = {
    auto: true,
    isShowingOptions: false,
  }

  handleToggleClick = () =>
    this.setState({ auto: !this.state.auto });

  handleOptionsClick = () =>
    this.setState({ isShowingOptions: true });

  handleRemoveClick = () =>
    console.log('asdasdasd')
  
  render() {
    const {
      state: { auto, isShowingOptions },
      props: { accounts },
      handleToggleClick,
      handleOptionsClick,
      handleRemoveClick,
    } = this;
    
    //TODO use prop isShowingModal, passed down from main, to trigger hiding this current modal on prop update

    return (
      <Wrapper>
        <Main>
          <Accounts>
            {accounts.map(({ name }) => (
              <AccountCard>
                <CardHeader>
                  <HeadLeft>
                    <Icon />
                    <AccountName>{name}</AccountName>
                  </HeadLeft>
                  <Options onClick={handleOptionsClick}>
                    {isShowingOptions ? (
                      <Modal onRemoveClick={handleRemoveClick} />
                    ) : (
                      null
                    )}
                  </Options>
                </CardHeader>
                <CardContents>
                  <AutoToggle onClick={handleToggleClick} toggled={auto} />
                </CardContents>
              </AccountCard>
            ))}
          </Accounts>
          <AddAccountsButton>
            Add Accounts
          </AddAccountsButton>
        </Main>
        <RightColumn>
          <BigIcon />
          <AddAccountsText>
            Add accounts
          </AddAccountsText>
          <AddAccountsSubText>
            Connect more cloud storage accounts
          </AddAccountsSubText>
          <AddAccountsButton>
            Add Accounts
          </AddAccountsButton>
        </RightColumn>
      </Wrapper>
    );
  }
}
