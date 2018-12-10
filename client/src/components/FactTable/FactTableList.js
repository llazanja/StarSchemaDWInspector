import React, { Component } from 'react';
import FactTable from './FactTable';

class FactTableList extends Component {
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
		const factTables = this.props.factTables.map((factTable) => (
      <FactTable
        key={factTable.tableID}
        {...factTable}
        handleFactTableIsCheckedToggle={this.props.handleFactTableIsCheckedToggle}
      />
    ));

		return (
			<div className="p-2">
        {this.props.factTables.length <= 0 && (
          <div className="row p-1"><strong>Nije pronađena niti jedna činjenična tablica!</strong></div>
        )}
        {this.props.factTables.length > 0 && (
          <div className="row p-1">
            <div className="col-10 align-self-center">
              <h5><strong>Činjenične tablice</strong></h5>
            </div>
            <div className="col-2 align-self-center">
              <button onClick={this.onIsCheckedClick} className="btn btn-dark btn-sm float-right">
                <i className={'oi ' + (this.state.isChecked ? 'oi-check' : 'oi-minus')} />
              </button>
            </div>
          </div>)}
        {this.props.factTables.length > 0 && this.state.isChecked && (
          factTables
        )}
			</div>
		);
	}
}

export default FactTableList;
