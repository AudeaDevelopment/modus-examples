import React from 'react';
import styled from 'styled-components';

// placeholder
const topics = [
  { name: 'MATLAB', category: 'Software' },
  { name: 'Python', category: 'Languages' },
  { name: 'RNA-Seq', category: 'Methods' },
  { name: 'C++', category: 'Languages' },
  { name: 'Sketch', category: 'Software' },
  { name: 'NGS', category: 'Technologies' },
];

const Wrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  border: 2px solid #888;
  box-sizing: border-box;
  border-bottom: none;
`;

const Head = styled.div`
  border-bottom: 2px solid #888;
  padding: 2em;
`;

const HeadText = styled.div`
  font-size: 2em;
  color: #444;
`;

const Main = styled.div`
  border-bottom: 2px solid #888;
  padding: 2em 2em 0;
  display: flex;
  flex-wrap: wrap;
`;

const Topic = styled.div`
  display: flex;
  align-items: center;
  height: 5em;
  width: 33%;
  margin-bottom: 2em;
`;

// palceholder
const TopicIcon = styled.div`
  box-sizing: border-box;
  border: 2px solid #888;
  width: 5em;
  height: 5em;
`;

const TopicTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 1em;
`;

const TopicTitle = styled.div`
  color: #444;
  font-size: 2em;
`;

const TopicCategory = styled.div`
  font-size: 1.9em;
  color: #888;
`;

const ButtonBox = styled.div`
  border-bottom: 2px solid #888;
  padding: 2em;
`;

const ViewLinkButton = styled.a`
  text-decoration: none;
  &:after {
    content: 'View popular topics -->';
    color: blue;
    font-size: 2em;
  }
`;

export default () => (
  <Wrapper>
    <Head>
      <HeadText>Popular topics we help with</HeadText>
    </Head>
    <Main>
      {topics.map(({ name, category }) => (
        <Topic key={name}>
          <TopicIcon />
          <TopicTextBox>
            <TopicTitle>{name}</TopicTitle>
            <TopicCategory>{category}</TopicCategory>
          </TopicTextBox>
        </Topic>
      ))}
    </Main>
    <ButtonBox>
      <ViewLinkButton />
    </ButtonBox>
  </Wrapper>
);
