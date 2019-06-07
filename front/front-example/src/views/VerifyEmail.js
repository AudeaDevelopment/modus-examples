import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: linear-gradient(135deg, #4B697A, #243744);
  font-size: 2vh;
  @media screen and (min-height: 810px) {
    font-size: 1em;
  }
`;

const Container = styled.div`
  width: 64em;
  height: 44.5em;
  /* max-width: 990px;
  max-height: 740px; */
  border-radius: .8em;
  background: linear-gradient(180deg, #4BDB9C, #4FCE5A);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

// placeholder
const Icon = styled.div`
  background: #fff;
  border-radius: 50%;
  height: 7em;
  width: 7em;
  margin-bottom: 2em;
`;

const LargeText = styled.p`
  color: #fff;
  font-size: 1.7em;
`;

const MediumText = styled.p`
  color: #fff;
  font-size: 1em;
  margin: .5em 0 .8em 0;
`;

const LinkSpan = styled.span`
  p {
    display: inline;
  }
`;

const LinkButton = styled.p`
  color: #fff;
  font-size: 1em;
  margin-left: .3em;
  text-decoration: underline;
  cursor: pointer;
`;

export default () => (
  <Wrapper>
    <Container>
      <Icon />
      <LargeText>Now verify your email</LargeText>
      <MediumText>Check your email, we&#39;ve sent a verification link to you</MediumText>
      <LinkSpan>
        <MediumText>
          Don&#39;t see it?
        </MediumText>
        <LinkButton>Send it again</LinkButton>
      </LinkSpan>
    </Container>
  </Wrapper>
);
