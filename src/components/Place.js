import React, {Component} from "react";
import {View, Text, Modal, StyleSheet, FlatList} from "react-native";
import {CreateQueue} from "./CreateQueue"
import {FormLabel, FormInput, Button} from "react-native-elements";

export class Place extends Component {
	constructor(props) {
		super(props);

		this.state = {
			createQueueModalVisible: false
		}
		this.openQueue = this.openQueue.bind(this);
		this.openCreateQueueModal= this.openCreateQueueModal.bind(this);
		this.closeCreateQueueModal= this.closeCreateQueueModal.bind(this);
	}

	openQueue() {
		this.props.navigation.navigate("Queue");
	}

	openCreateQueueModal() {
		this.setState({createQueueModalVisible: true});
	}

	closeCreateQueueModal() {
		this.setState({createQueueModalVisible: false});
	}

	render() {
		const place = this.props.navigation.state.params.place[0];
		const queues = this.props.navigation.state.params.queues;

		return (
			<View style={styles.placeContainer}>
				<View style={styles.queueForm}>
					<FormLabel>{place.name}</FormLabel>
					<FormInput/>
				</View>
				<Button
				raised
				onPress={this.openQueue}
				backgroundColor="#6ad447"
				title="Go"
				/>

				<Text style={styles.queuesTitle}>
					Queues for {place.name}
				</Text>
		        <FlatList
		        	style={styles.queueList}
					data={queues}
		        	renderItem={({item}) => 
		        		<Text style={styles.queueListItem} onPress={this.openQueue}>
		        			Queue id: {item.id}{"\n"}
		        			{item.name} 
		        		</Text>}
		        	keyExtractor={(item, index) => index}
		        />

				<Button
				raised
				onPress={this.openCreateQueueModal}
				backgroundColor="#6ad447"
				title="Create Queue"
				/>

				<Modal
				animationType={"slide"}
				transparent={false}
				visible={this.state.createQueueModalVisible}
				onRequestClose={() => null}
				>
					<CreateQueue closeModal={this.closeCreateQueueModal} />
				</Modal>
			</View>
		);
	}	
}

const styles = StyleSheet.create({
	placeContainer: {
		backgroundColor: "#FFFFFF",
		flex: 1
	},
	queueForm: {
		marginBottom: 15
	},
	queuesTitle: {
		marginTop: 15,
		marginLeft: 15
	},
	queueList: {
		marginTop: 15,
		marginLeft: 15
	},
	queueListItem: {
		marginBottom: 10
	}
})