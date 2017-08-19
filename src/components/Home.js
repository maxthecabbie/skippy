import React, {Component} from "react";
import {View, Modal, Text, StyleSheet, AsyncStorage} from "react-native";
import {FormLabel, FormInput, Icon, Button} from "react-native-elements";


export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
    		modalVisible: false
		};
		this.logOut = this.logOut.bind(this);
		this.openLogOutModal = this.openLogOutModal.bind(this);
		this.closeLogOutModal = this.closeLogOutModal.bind(this);
	}

	closeLogOutModal() {
		this.setState({modalVisible: false})
	}

	openLogOutModal() {
		this.setState({modalVisible: true});
	}

	async logOut() {
		try {
			await AsyncStorage.removeItem('id_token');
			this.props.navigation.navigate("Login");
		} 
		catch (error) {
			console.error("Log out error: " + error.message);
		}
	}

	render() {
		return (
			<View>

				<Icon name="power-settings-new"
				size={30}
				style={styles.logOutButton}
				onPress={this.openLogOutModal}
				/>
				<FormLabel>Place</FormLabel>
				<FormInput/>

				<Modal
				animationType={"slide"}
				transparent={true}
				visible={this.state.modalVisible}
				>
				<View style={styles.logOutModalContainer}>
					<View style={styles.logOutModal}>
					<View>
					<Text style={styles.modalTitle}>Are you sure you want to log out?</Text>

					<Button
					raised
					onPress={this.logOut}
					backgroundColor="#6ad447"
					title="Log Out"
					/>

					<Button
					raised
					backgroundColor="#6ad447"
					title="Cancel"
					onPress={this.closeLogOutModal}
					/>


					</View>
					</View>
				</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  logOutButton: {
  	marginTop: 10,
  	marginRight: 10,
    alignSelf: "flex-end"
  },
  logOutModalContainer: {
  	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	justifyContent: "center", 
	alignItems: "center",

  },
  logOutModal: {
  	width: 250,
  	height: 150,
  	backgroundColor: "#9d9d9d",
  	alignItems: "center",
  	borderRadius: 10
  },
  modalTitle: {
  	textAlign: "center",
  	marginBottom: 15
  }
});
