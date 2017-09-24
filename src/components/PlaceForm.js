import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";
import Config from "react-native-config"

export class PlaceForm extends Component {
	constructor(props) {
		super(props);

		this.openPlace = this.openPlace.bind(this);
	}

	openPlace() {
		this.props.navigation.navigate("Place");
	}

	render() {
		return (
			<View style={styles.placeFormContainer}>
				<FormLabel>Place</FormLabel>
				<FormInput/>
				<Button
				raised
				onPress={this.openPlace}
				backgroundColor="#6ad447"
				title="Go"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	placeFormContainer: {
		backgroundColor: "#FFFFFF",
		flex: 1
	}
})