import React, { Component } from 'react';
import ReactTable from 'react-table';

import ErrorBox from "../components/ErrorBox";
import Loader from "../components/Loader";

class QueryResultContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

  render() {
    const data = this.props.queryResults;

    let columns;
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      columns = keys.map(key => ({
        Header: key,
        accessor: key,
      }));
    }

    return (
      <div className="container bottom-container mb-2 p-2 border">
        <ErrorBox active={this.state.hasError} />
        <Loader active={this.state.isLoading} />
        {!this.state.isLoading && data && data.length > 0 && (
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={6}
          />
        )}
      </div>
    );
  }
}

export default QueryResultContainer;
