import React, { Component } from 'react';

import Measure from './Measure';

class MeasureList extends Component {
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
    const measures = this.props.measures.map((measure) => (
      <Measure
        key={measure.id}
        {...measure}
        handleIsCheckedToggle={this.props.handleMeasureIsCheckedToggle}
      />
    ));

    return (
      <div className="p-2">
        {this.props.measures.length <= 0 && (
          <div className="row p-1 border-bottom text-center"><h5><strong>Nije pronađena niti jedna mjera!</strong></h5></div>
        )}
        {this.props.measures.length > 0 && (
          <div className="row p-1 border-bottom">
            <div className="col-10 align-self-center">
              <h5><strong>Mjere</strong></h5>
            </div>
            <div className="col-2 align-self-center">
              <button onClick={this.onIsCheckedClick} className="btn btn-dark btn-sm float-right">
                <i className={'oi ' + (this.state.isChecked ? 'oi-check' : 'oi-minus')} />
              </button>
            </div>
          </div>)}
        {this.props.measures.length > 0 && this.state.isChecked && (
          measures
        )}
      </div>
    );
  }
}

export default MeasureList;
