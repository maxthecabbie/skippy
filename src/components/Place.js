import React, { Component } from "react";
import { View, Text, Modal, StyleSheet, FlatList, Keyboard } from "react-native";
import { CreateQueue } from "./CreateQueue"
import { FormLabel, FormInput, Button } from "react-native-elements";

export class Place extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createQueueModalVisible: false,
      queues: props.navigation.state.params.queues
    }
    this.openQueue = this.openQueue.bind(this);
    this.openCreateQueueModal = this.openCreateQueueModal.bind(this);
    this.closeCreateQueueModal = this.closeCreateQueueModal.bind(this);
    this.updateQueues = this.updateQueues.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.renderAdminFeatures = this.renderAdminFeatures.bind(this);
  }

  openQueue(queue) {
    this.props.navigation.navigate("Queue", {
      queue: queue
    });
  }

  openCreateQueueModal() {
    this.setState({ createQueueModalVisible: true });
  }

  closeCreateQueueModal() {
    this.setState({ createQueueModalVisible: false });
  }

  updateQueues(newQueue) {
    this.setState({
      queues: this.state.queues.concat([newQueue])
    });
  }

  sortQueues(a, b) {
    const queueNameA = a.name.toUpperCase();
    const queueNameB = b.name.toUpperCase();
    let comparison = 0;

    if (queueNameA > queueNameB) {
      comparison = 1;
    } else if (queueNameA < queueNameB) {
      comparison = -1;
    }
    return comparison;
  }

  isAdmin() {
    const userId = this.props.navigation.state.params.userId;
    const admins = this.props.navigation.state.params.placeAdmins;
    if (userId !== null) {
      for (var i = 0; i < admins.length; i++) {
        if (admins[i].user_id === Number(userId)) {
          return true;
        }
      }
    }
    return false;
  }

  renderAdminFeatures() {
    const place = this.props.navigation.state.params.place[0];

    if (this.isAdmin()) {
      return (
        <View>
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
						<CreateQueue placeId={place.id} closeModal={this.closeCreateQueueModal} updateQueues={this.updateQueues} />
					</Modal>
				</View>
      );
    }
  }

  render() {
    const place = this.props.navigation.state.params.place[0];
    const queues = this.state.queues.sort(this.sortQueues);

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
					keyExtractor={(item, index) => index}
        	renderItem={({item}) => 
        		<Text style={styles.queueListItem} 
        			onPress={() => this.openQueue(item)}>
        			Queue name: {item.name} 
        		</Text>}
        />

	      {this.renderAdminFeatures()}
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