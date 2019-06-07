import React from 'react';
import styled from 'styled-components';

import CheckBoxGroup from '../../components/CheckBoxGroup';
import ButtonGroup from '../../components/ButtonGroup';

const Wrapper = styled.div`
  width: 24%;
  display: inline-flex;
  flex-direction: column;
  border: 2px solid #888;
  box-sizing: border-box;
  padding: 6em 3.5em;
`;

const SectionTitle = styled.div`
  color: #444;
  font-size: 2em;
  margin: 3em 0 .5em -.5em;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: .5em 0;
`;

const CheckBox = styled.div`
  border: 2px solid #888;
  box-sizing: border-box;
  height: 2em;
  width: 2em;
  background: ${({ isActive }) => (isActive ? '#888' : '#DDD')};
  cursor: pointer;
`;

const Label = styled.div`
  margin-left: .5em;
  color: #444;
  font-size: 1.8em;
`;

const RateLabels = styled.div`
  display: flex;
  margin-top: .3em;
`;

const RateLabel = styled.div`
  width: 6em;
  text-align: center;
  &:after {
    content: '${({ text }) => text}';
    font-size: 1.8em;
    color: #888;
  }
`;

const renderLanguageCheckBoxes = (handleClick, languages) => (
  Object.entries(languages).map(([language, value]) => (
    <Row key={language} onClick={() => handleClick(language)}>
      <CheckBox isActive={value} />
      <Label>{language}</Label>
    </Row>
  ))
);

const timeZones = [
  'Only in my time zone',
  '± 4 hrs of my time zone',
  '± 8 hrs of my time zone',
];

const rates = ['$', '$$', '$$$'];

const rateToMoney = rate => !rate ? rate : rate === '0-30' ? '$' : rate === '30-60' ? '$$' : '$$$';
const moneyToRate = money => money === '$' ? '0-30' : money === '$$' ? '30-60' : '60-90';

const renderRateLabels = () => (
  <RateLabels>
    {rates.map(rate => (
      <RateLabel key={rate} text={moneyToRate(rate)} />
    ))}
  </RateLabels>
);

export default ({
  handleTimeZoneClick,
  timeZone,
  handleLanguageClick,
  languages,
  handleRateClick,
  rate,
}) => (
  <Wrapper>
    <SectionTitle>Time zone</SectionTitle>
    <CheckBoxGroup
      handleClick={handleTimeZoneClick}
      activeOption={timeZone}
      options={timeZones}
    />
    <SectionTitle>Language</SectionTitle>
    {renderLanguageCheckBoxes(handleLanguageClick, languages)}
    <SectionTitle>Rate</SectionTitle>
    <ButtonGroup
      activeOption={rateToMoney(rate)}
      options={rates}
      handleClick={value => handleRateClick(moneyToRate(value))}
      width="6"
      height="5"
      color="#000"
      fontSize="1.5"
    />
    <RateLabels>
      {renderRateLabels()}
    </RateLabels>
  </Wrapper>
);
