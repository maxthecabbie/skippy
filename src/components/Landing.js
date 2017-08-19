import React, {Component} from "react";
import {ActivityIndicator, AsyncStorage} from "react-native";
import {Home} from "./Home"
import {Login} from "./Login"

export class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasToken: false, 
			isLoaded: false
		};
	}

	componentDidMount() {
		AsyncStorage.getItem("id_token").then((token) => {
			this.setState({
				hasToken: token !== null, 
				isLoaded: true 
			})
		});
	}

	render() {
		if (!this.state.isLoaded) {
			return (
				<ActivityIndicator />
			);
		}
		else {
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
}