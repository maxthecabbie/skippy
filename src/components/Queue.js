import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";

export class Queue extends Component {
	render() {
		return (
			<View style={styles.queueContainer}>
				<View style={styles.queueTitle}>
					<Text>
						Queue
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