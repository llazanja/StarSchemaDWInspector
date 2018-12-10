import React, { Component } from 'react';

import API from '../API';

import ErrorBox from "../components/ErrorBox";
import Loader from "../components/Loader";
import FactTableList from "../components/FactTable/FactTableList";

class FactTableContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

	async componentDidMount() {
    this.setState({ isLoading: true });
		try {
      const resp = await API.get('/fact-tables');

			this.props.initializeFactTables(resp.data);
		} catch (err) {
			this.setState({ hasError: true });
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		return (
      <div className="top-container left-container p-2 border">
				<ErrorBox active={this.state.hasError} />
				<Loader active={this.state.isLoading} />
				{!this.state.isLoading && (
					<div>
						<FactTableList
							factTables={this.props.factTables}
							handleFactTableIsCheckedToggle={this.props.handleFactTableIsCheckedToggle}
						/>
					</div>
				)}
      </div>
		);
	}
}

export default FactTableContainer;
