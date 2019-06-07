import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 21em;
  background: #FFF;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 2px solid #888;
  position: absolute;
  right: 2em;
  top: 3.1em;
  z-index: 1;
`;

const TopRow = styled.a.attrs(({ userId }) => ({
  href: `/session/${userId}`,
}))`
  text-decoration: none;
  color: #888;
  font-size: 2em;
  padding: 1em;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 2px solid #888;
`;

const MiddleRow = styled.div`
  color: #888;
  font-size: 2em;
  margin: 1em 1em .3em 1em;
  cursor: pointer;
`;

const BottomRow = styled.div`
  color: #888;
  font-size: 2em;
  margin: .3em 1em 1em 1em;
  cursor: pointer;
`;

const handleBlockClick = (id) => {
  // TODO: block mentor
  console.log(`block click userId: ${id}`);
};

const handleReportClick = (id) => {
  // TODO: report mentor
  console.log(`report click userId: ${id}`);
};

export default ({ userId }) => (
  <Wrapper>
    <TopRow userId={userId}>
      Schedule a Session
    </TopRow>
    <MiddleRow onClick={() => handleBlockClick(userId)}>
      Block this mentor
    </MiddleRow>
    <BottomRow onClick={() => handleReportClick(userId)}>
      Report this mentor
    </BottomRow>
  </Wrapper>
);
