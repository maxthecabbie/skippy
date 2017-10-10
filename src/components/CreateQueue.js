import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button, Icon} from "react-native-elements";

export class CreateQueue extends Component {
	constructor(props) {
		super(props);

		this.state = {
			queueName: ""
		}
	}

	createQueue() {
		const queueName = this.state.queueName;
		const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;
		if (!queueName) {
			return;
		}
		fetch(backendAPIBaseURL + "/queues", {
			method: "POST",
			headers: {"Accept": "application/json", "Content-Type": "application/json"},
			body: JSON.stringify({
				queueName: queueName
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
			<View style={styles.createQueueModalContainer}>
				<View style={styles.header}>
					<Icon name="keyboard-arrow-left"
					size={30}
					style={styles.backButton}
					onPress={this.props.closeModal}
					/>
				</View>
				<View style={styles.createQueueForm}>
					<FormLabel>Name</FormLabel>
					<FormInput value={this.state.queueName}
					onChangeText={(queueName) => this.setState({queueName})}
					/>
					<Button
					raised
					onPress={this.createQueue}
					backgroundColor="#6ad447"
					title="Create"
					/>
				</View>
			</View>
		);
	}	
}

const styles = StyleSheet.create({
	createQueueModalContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	},
	header: {
		flex: 0.5
	},
	createQueueForm: {
		flex: 1
	},
	backButton: {
		position: "absolute",
		left: 0,
		marginTop: 10,
		marginLeft: 10
	}
})