import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Source from "./source";
import testData from "./test-data";

class Reading extends Component {
  state = { loading: true };

  calcAvg = (userVisits, total, width) => {
    const avg = userVisits / total;
    const result = parseInt(avg.toFixed(2) * 100, 10);
    return result;
  };

  render() {
    const { sources, totalUserVisits } = testData;
    const { calcAvg } = this;
    return (
      <div style={{ height: "412px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "1px solid #C4C4C4",
            paddingBottom: "5px"
          }}
        >
          <img src="" />
          <div
            style={{
              fontWeight: "bold",
              paddingLeft: "8px",
              justifyContent: "flex-start"
            }}
          >
            READER HISTORY
          </div>
        </div>
        {sources.map((x, i) => (
          <Source
            key={i}
            source={x.sourceName}
            percentVisits={calcAvg(x.userVisits, totalUserVisits)}
            sourceAvg={x.sourceAverageForUser}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(Reading);
