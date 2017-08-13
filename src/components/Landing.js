import React, {Component} from "react";
import {Home} from "./Home"
import {Login} from "./Login"

export class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasToken: false
		}
	}

	componentWillMount() {
	}

	render() {
		if (this.state.hasToken) {
			return (
				<Home/>
			);
		}
		else {
			return (
				<Login navigation={this.props.navigation} />

			);
		}

	}
}