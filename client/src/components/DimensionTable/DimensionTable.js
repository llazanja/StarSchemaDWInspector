import React, { Component } from 'react';
import Atribute from "./Atribute";

class DimensionTable extends Component {
  onIsCheckedClick = () => {
    this.props.handleIsCheckedToggle(this.props.tableID, !this.props.isChecked);
  };

  render() {
    const { tableID, name, isChecked, atributes } = this.props;
    const atributesJSX = atributes.map(atribute => (
      <Atribute
        key={atribute.atributeNumber}
        tableID={tableID}
        {...atribute}
        handleIsCheckedToggle={this.props.handleDimensionAtributeIsCheckedToggle}
      />
    ));

    return (
      <div className="p-2">
        <div className="row mx-2 p-1 border-bottom">
          <div className="col-10 align-self-center">
            {isChecked && (
              <h5><strong>{name}</strong></h5>
            )}
            {!isChecked && (
              <h6>{name}</h6>
            )}
          </div>
          <div className="col-2 align-self-center">
            <button onClick={this.onIsCheckedClick} className="btn btn-dark btn-sm float-right">
              <i className={'oi ' + (isChecked ? 'oi-check' : 'oi-minus')} />
            </button>
          </div>
        </div>
        {isChecked && (
          atributesJSX
        )}
      </div>
    );
  }
}

export default DimensionTable;
