import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

// placeholder
const Icon = styled.div`
  background: #fff;
  border-radius: 50%;
  height: 6em;
  width: 6em;
  margin-bottom: 1em;
`;

const Text = styled.p`
  color: #fff;
  font-size: 1.5em;
`;

class CreatingAccount extends Component {
  componentDidMount() {
    window.setTimeout(() => this.props.history.push('/verify-email'), 3000);
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Icon />
          <Text>We&#39;re creating your account</Text>
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(CreatingAccount);
