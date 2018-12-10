import React, { Component } from 'react';

import ErrorBox from "../components/ErrorBox";
import Loader from "../components/Loader";
import DimensionTableList from "../components/DimensionTable/DimensionTableList";
import MeasureList from "../components/Measure/MeasureList";

class AtributesContainer extends Component {
  render() {
    return (
      <div className="bottom-container left-container p-2 border">
        <ErrorBox active={this.props.isError} />
        <Loader active={this.props.isLoading} />
        {!this.props.isLoading && (
          <div>
            <MeasureList
              measures={this.props.measures}
              handleMeasureIsCheckedToggle={this.props.handleMeasureIsCheckedToggle}
            />
            <DimensionTableList
              dimensionTables={this.props.dimensionTables}
              handleDimensionTableIsCheckedToggle={this.props.handleDimensionTableIsCheckedToggle}
              handleDimensionAtributeIsCheckedToggle={this.props.handleDimensionAtributeIsCheckedToggle}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AtributesContainer;
