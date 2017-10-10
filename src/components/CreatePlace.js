import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button, Icon} from "react-native-elements";

export class CreatePlace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			placeName: ""
		}
	}

	createPlace() {
		const placeName = this.state.placeName;
		const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;
		if (!placeName) {
			return;
		}
		fetch(backendAPIBaseURL + "/places", {
			method: "POST",
			headers: {"Accept": "application/json", "Content-Type": "application/json"},
			body: JSON.stringify({
				placeName: placeName
			})
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.props.closeModal;
		})
		.done();
	}

	render() {
		return (
			<View style={styles.createPlaceModalContainer}>
				<View style={styles.header}>
				<Icon name="keyboard-arrow-left"
				size={30}
				style={styles.backButton}
				onPress={this.props.closeModal}
				/>
				</View>
				<View style={styles.createPlaceForm}>
				<FormLabel>Name</FormLabel>
				<FormInput value={this.state.placeName}
				onChangeText={(placeId) => this.setState({placeId})}
				/>
				<Button
				raised
				onPress={this.openPlace}
				backgroundColor="#6ad447"
				title="Create"
				/>
				</View>
			</View>
		);
	}	
}

const styles = StyleSheet.create({
	createPlaceModalContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	},
	header: {
		flex: 0.5
	},
	createPlaceForm: {
		flex: 1
	},
	backButton: {
		position: "absolute",
		left: 0,
		marginTop: 10,
		marginLeft: 10
	}
})