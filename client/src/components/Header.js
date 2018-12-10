import React, { Component } from 'react';

class Header extends Component {
	render() {
		return <h2 className="p-4 text-center">{this.props.text}</h2>;
	}
}

export default Header;
