import React from 'react';
import styled from 'styled-components';

import { Avatar, Button } from '../../common-styles';

const Wrapper = styled.div`
  margin: 3em auto;
  width: 34em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin: 1em 0 .5em;
  font-size: 2.2em;
`;

const SessionDate = styled.div`
  font-size: 1.9em;
  color: #888;
`;

const DetailsCaption = styled.div`
  font-size: 1.7em;
  margin: 2em 0;
`;

const ExpenseList = styled.div`
  width: 100%;
  margin-bottom: 4em;
`;

const Expense = styled.div`
  color: #888;
  font-size: 1.7em;
  display: flex;
  margin-bottom: .5em;
  &:after {
    content: '${({ cost }) => cost}';
    text-align: right;
    color: #444;
    margin-left: auto;
  }
`;

const Total = styled.div`
  margin-top: 2em;
  border-top: 2px solid #888;
  font-size: 1.7em;
  padding-top: .4em;
  color: #888;
  display: flex;
  align-items: center;
  &:before {
    content: '';
    height: 2em;
    width: 2em;
    background: #FFF;
    border: 2px solid #888;
    box-sizing: border-box;
    margin-right: .5em;
  }
  &:after {
    content: '${({ cost }) => cost}';
    text-align: right;
    color: #444;
    margin-left: auto;
  }
`;

const ViewInvoiceButton = styled(Button).attrs(() => ({
  width: '12',
  color: '#444',
  text: 'View Invoice',
}))``;

const InvoiceCaption = styled.div`
  font-size: 1.7em;
  margin: 2em 0;
  color: #888;
`;

const FeedbackBox = styled.div`
  border: 2px solid #888;
  box-sizing: border-box;
  margin-top: 4em;
  padding: 2em 8em 2em 2em;
`;

const FeedbackTitle = styled.div`
  font-size: 2.2em;
`;

const FeedbackCaption = styled.div`
  color: #888;
  margin: 2em 0;
  font-size: 1.7em;
`;

const ShareFeedbackButton = styled(Button).attrs(() => ({
  width: '16',
  color: '#444',
  text: 'Share my feedback',
  fontSize: '1.4',
}))``;

const handleViewInvoiceClick = () => {
  // TODO
};

const handleShareFeedbackClick = () => {
  // TODO
};

const mockData = {
  name: 'George',
  date: 'August, 30 2018 at 5:02 PM PDT',
  sessionLength: '10m, 29',
  sessionLengthCost: '$1.50',
  serviceFee: '$0.50',
  card: 'Visa *4545',
  total: '$2.00',
};

export default () => (
  <Wrapper>
    <Avatar size="5" />
    <Title>{`Your session with ${mockData.name}`}</Title>
    <SessionDate>{mockData.date}</SessionDate>
    <DetailsCaption>Session Details</DetailsCaption>
    <ExpenseList>
      <Expense cost={mockData.sessionLengthCost}>
        {`Session Length (${mockData.sessionLength})`}
      </Expense>
      <Expense cost={mockData.serviceFee}>
        Service Fee
      </Expense>
      <Total cardIcon={null} cost={mockData.total}>
        {mockData.card}
      </Total>
    </ExpenseList>
    <ViewInvoiceButton onclick={handleViewInvoiceClick} />
    <InvoiceCaption>
      Payment for this invoice will be automatically processed in 10 minutes. If you have any questions about this invoice, please contact support.
    </InvoiceCaption>
    <FeedbackBox>
      <FeedbackTitle>We&#39;d Love You Feedback</FeedbackTitle>
      <FeedbackCaption>
        To help us improve, we&#39;d liek to ask you a few questions about your experience so far.
      </FeedbackCaption>
      <ShareFeedbackButton onClick={handleShareFeedbackClick} />
    </FeedbackBox>
  </Wrapper>
);
