import React, { Component } from 'react';
import DimensionTable from './DimensionTable';
import Atribute from "./Atribute";

class DimensionTableList extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
    };
  }

  onIsCheckedClick = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    const dimensionTables = this.props.dimensionTables.map((dimensionTable) => (
      <DimensionTable
        key={dimensionTable.tableID}
        {...dimensionTable}
        handleIsCheckedToggle={this.props.handleDimensionTableIsCheckedToggle}
        handleDimensionAtributeIsCheckedToggle={this.props.handleDimensionAtributeIsCheckedToggle}
      />
    ));

    return (
      <div className="p-2">
        {this.props.dimensionTables.length <= 0 && (
          <div className="row p-1 text-center"><h5><strong>Nije pronađena niti jedna dimenzijska tablica!</strong></h5></div>
        )}
        {this.props.dimensionTables.length > 0 && (
          <div className="row p-1">
            <div className="col-10 align-self-center">
              <h5><strong>Dimenzijske tablice</strong></h5>
            </div>
            <div className="col-2 align-self-center">
              <button onClick={this.onIsCheckedClick} className="btn btn-dark btn-sm float-right">
                <i className={'oi ' + (this.state.isChecked ? 'oi-check' : 'oi-minus')} />
              </button>
            </div>
          </div>)}
        {this.props.dimensionTables.length > 0 && this.state.isChecked && (
          dimensionTables
        )}
      </div>
    );
  }
}

export default DimensionTableList;
