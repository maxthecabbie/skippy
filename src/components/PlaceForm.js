import React, {Component} from "react";
import {View, Text, Modal, StyleSheet} from "react-native";
import {CreatePlace} from "./CreatePlace"
import {FormLabel, FormInput, Button} from "react-native-elements";
import Config from "react-native-config"

export class PlaceForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			placeId: "",
			placeName: "",
			createPlaceModalVisible: false
		}
		this.openPlace = this.openPlace.bind(this);
		this.openCreatePlaceModal= this.openCreatePlaceModal.bind(this);
		this.closeCreatePlaceModal= this.closeCreatePlaceModal.bind(this);
	}

	openCreatePlaceModal() {
		this.setState({createPlaceModalVisible: true});
	}

	closeCreatePlaceModal() {
		this.setState({createPlaceModalVisible: false});
	}

	openPlace() {
		const placeId = this.state.placeId;
		const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;
		fetch(backendAPIBaseURL + "/places/" + placeId, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((responseData) => {
			const place = responseData.placeRows;
			const queues = responseData.queueRows;

			this.props.navigation.navigate("Place", {
				place: place,
				queues: queues
			});				
		})
		.done();
	}

	render() {
		return (
			<View style={styles.placeFormContainer}>
				<View style={styles.placeForm}>
					<FormLabel>Place</FormLabel>
					<FormInput value={this.state.placeId}
					onChangeText={(placeId) => this.setState({placeId})}
					/>
				<Button
				raised
				onPress={this.openPlace}
				backgroundColor="#6ad447"
				title="Go"
				/>
				</View>

				<Button
				raised
				onPress={this.openCreatePlaceModal}
				backgroundColor="#6ad447"
				title="Create Place"
				/>

				<Modal
				animationType={"slide"}
				transparent={false}
				visible={this.state.createPlaceModalVisible}
				onRequestClose={() => null}
				>
					<CreatePlace closeModal={this.closeCreatePlaceModal}/>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	placeFormContainer: {
		backgroundColor: "#FFFFFF",
		flex: 1
	},
	placeForm:{
		flex: 1,
		marginBottom: 20
	},
	createPlaceButton: {
		marginRight: 15,
		alignSelf: "flex-end"
	},
	createPlaceModalContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: "center"
	}
})