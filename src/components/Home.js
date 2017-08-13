import React, {Component} from "react";
import {View} from "react-native";
import {FormLabel, FormInput} from "react-native-elements";


export class Home extends Component {
	render() {
		return (
			<View>
				<FormLabel>Place</FormLabel>
				<FormInput/>
			</View>
		);
	}
}

