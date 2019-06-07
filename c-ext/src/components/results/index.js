import React, { Component } from "react";

export default class Results extends Component {
  state = { loading: true, scraping: true, data: [] };

  componentDidMount() {
    console.log("results loaded");

    // TODO: begin scraping page on click or display results
    // this.setState({ data: results });
  }

  shouldComponentUpdate(prevProps, prevState) {
    // TODO: if component receives props that are different
    // const { data } = this.state;
    // const { results } = this.props;
    // than the current state of the emails, re-render
    // results !== data ? this.setState({ data: results }) : null;
  }

  render() {
    return <div>Results go here</div>;
  }
}
