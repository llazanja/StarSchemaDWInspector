import React, { Component } from 'react';

class Loader extends Component {
	render() {
		if (!this.props.active) {
			return null;
		}
		return <div className="loader mx-auto" />;
	}
}

export default Loader;
