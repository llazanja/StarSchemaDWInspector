import React, { Component } from 'react';

class Measure extends Component {
  onIsCheckedClick = () => {
    this.props.handleIsCheckedToggle(this.props.id, !this.props.isChecked);
  };

  render() {
    const { name, isChecked } = this.props;
    return (
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
    );
  }
}

export default Measure;
