import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 1em;
  width: 100%;
  padding: 1em;
  border: 2px solid #888;
`;

const Content = styled.div`
  font-size: 2em;
  text-align: center;
`;

export default () => (
  <Wrapper>
    <Content>
      Welcome! We are currently reviewing your account. Once approved,
      you&#39;ll have full access. Until then you can start creating your
      profile.
    </Content>
  </Wrapper>
);
