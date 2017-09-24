import React, {Component} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";

export class Place extends Component {
	constructor(props) {
		super(props);

		this.openQueue = this.openQueue.bind(this);
	}

	openQueue() {
		this.props.navigation.navigate("Queue");
	}

	render() {
		return (
			<View style={styles.placeContainer}>
				<FormLabel>Queue</FormLabel>
				<FormInput/>

				<Button
				raised
				onPress={this.openQueue}
				backgroundColor="#6ad447"
				title="Go"
				/>

		        <FlatList
		        	style={styles.queueList}
					data={[
						{key: "Queue 1"},
						{key: "Queue 2"},
						{key: "Queue 3"},
						{key: "Queue 4"},
						{key: "Queue 5"},
						{key: "Queue 6"},
						{key: "Queue 7"},
						{key: "Queue 8"},
					]}
		        	renderItem={({item}) => 
		        		<Text style={styles.queListItem} onPress={this.openQueue}>
		        			{item.key} 
		        		</Text>}
		        />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	placeContainer: {
		backgroundColor: "#FFFFFF",
		flex: 1
	},
	queueList: {
		marginTop: 15,
		marginLeft: 15
	},
	queListItem: {
		marginBottom: 10
	}
})