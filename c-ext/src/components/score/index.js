import React, { Component } from 'react';
import './style.css';

export default class Score extends Component {
  state = {};
  render() {
    return (
      <div>
        <img id="title-logo" src="" />
        <div id="scoreWrap">
          <div id="scoreLabel">TITLE SCORE:</div>
          <span id="score">00</span>/100
        </div>
        <div id="compare">
          <div className="compare-score">
            <div className="score-label">SITE AVG</div>
            <div id="siteAvg" className="score">
              88
            </div>
          </div>
          <div className="compare-score">
            <div className="score-label">TITLE AVG</div>
            <div id="titleAvg" className="score">
              76
            </div>
          </div>
        </div>
      </div>
    );
  }
}
