import React from 'react';
import style from './style';

export default (props) => {
  const { source, percentVisits, sourceAvg } = props;
  const topWidth = `${percentVisits.toString()}%`;
  const bottomWidth = `${sourceAvg.toString()}%`;
  const {
    container,
    sourceContainer,
    barContainer,
    topBar,
    bottomBar,
    numContainer,
    num1,
    num2,
  } = style;

  return (
    <div style={container}>
      <div style={sourceContainer}>{source}</div>
      <div style={barContainer}>
        <div style={{ width: topWidth, ...topBar }} />
        <div style={{ width: bottomWidth, ...bottomBar }} />
      </div>
      <div style={numContainer}>
        <div style={num1}>{percentVisits.toString()}%</div>
        <div style={num2}>{sourceAvg}</div>
      </div>
    </div>
  );
};
