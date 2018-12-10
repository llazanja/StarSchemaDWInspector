import React, { Component } from 'react';

import ErrorBox from "../components/ErrorBox";
import Loader from "../components/Loader";

class QueryContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

  onExecuteQueryClick = () => {
    this.props.handleExecuteQueryClicked();
  };

  render() {
    return (
      <div className="container top-container mb-2 p-2 border">
        <ErrorBox active={this.state.hasError} />
        <Loader active={this.state.isLoading} />
        {!this.state.isLoading && (
          <div className="container">
            <div className="row row-query">
              <button onClick={this.onExecuteQueryClick} className="btn btn-primary btn-lg btn-query">Execute query</button>
            </div>
            <div className="row">
              <textarea className="query" disabled value={this.props.queryString} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QueryContainer;
