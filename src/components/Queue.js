import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";

export class Queue extends Component {
	render() {
		const queue = this.props.navigation.state.params.queue;
		return (
			<View style={styles.queueContainer}>
				<View style={styles.queueTitle}>
					<Text>
						{queue.id} {queue.name}
			        </Text>
		        </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	queueContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF"
		
	},
	queueTitle: {
	}
})