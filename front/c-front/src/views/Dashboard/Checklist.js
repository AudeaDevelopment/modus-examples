import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  border: 2px solid #888;
  color: #444;
  box-sizing: border-box;
`;

const Head = styled.div`
  padding: 2em;
  border-bottom: 2px solid #888;
`;

const HeadText = styled.div`
  font-size: 2em;
`;

const Main = styled.div`
  padding: 2em;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: .7em 0;
`;

// placeholder
const CheckIcon = styled.div`
  height: 1.8em;
  width: 1.8em;
  border: 2px solid #BBB;
  border-radius: 50%;
  background: ${({ checked }) => (checked ? '#888' : '#FFF')};
  margin-right: 1.4em;
`;

// placeholder
const MethodIcon = styled.div`
  height: 3.5em;
  width: 6em;
  box-sizing: border-box;
  border: 2px solid #888;
  position: relative;
  margin-right: 1.4em;
  &:after {
    content: '${({ text }) => text}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
  }
`;

const Text = styled.div`
  color: ${({ isComplete }) => (isComplete ? '#888' : 'blue')};
  font-size: 2em;
`;

const LastFour = styled.div`
  color: #888;
  font-size: 1.8em;
  &:before {
    content: '*';
  }
`;

const TextLink = styled.div`
  color: blue;
  font-size: 1.8em;
`;

const renderHeadText = (timeZoneComplete, paymentMethod) => (
  timeZoneComplete && paymentMethod ? 'Payment Method' : 'Checklist'
);

const renderMainContent = (timeZoneComplete, paymentMethod) => {
  // const { type, lastFour } = paymentMethod;
  // placeholders
  const type = '';
  const lastFour = '';

  if (timeZoneComplete && paymentMethod) {
    return (
      <Fragment>
        <Row>
          <MethodIcon text={type} />
          <LastFour>{lastFour}</LastFour>
        </Row>
        <Row>
          <TextLink>Change card</TextLink>
        </Row>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Row>
        <CheckIcon checked />
        <Text isComplete>Confirm your email</Text>
      </Row>
      <Row>
        <CheckIcon checked={timeZoneComplete} />
        <Text isComplete={timeZoneComplete}>Set your time zone</Text>
      </Row>
      <Row>
        <CheckIcon checked={paymentMethod} />
        <Text isComplete={paymentMethod}>Add payment method</Text>
      </Row>
    </Fragment>
  );
};

export default ({ timeZoneComplete, paymentMethod }) => (
  <Wrapper>
    <Head>
      <HeadText>
        {renderHeadText(timeZoneComplete, paymentMethod)}
      </HeadText>
    </Head>
    <Main>
      {renderMainContent(timeZoneComplete, paymentMethod)}
    </Main>
  </Wrapper>
);
