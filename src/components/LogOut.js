import React, {Component} from "react";
import {View, Modal, Text, StyleSheet, AsyncStorage} from "react-native";
import {Icon, Button} from "react-native-elements";

export class LogOut extends Component {
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
			await AsyncStorage.removeItem("id_token");
            this.props.screenProps.appNavigator.navigate("Login")
		} 
		catch (error) {
			console.error("Log out error: " + error.message);
		}
	}

	render() {
		return (
			<View>
				<Icon name="menu"
				size={30}
				style={styles.logOutButton}
				onPress={this.openLogOutModal}
				/>

				<Modal
				animationType={"slide"}
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => null}
				>
					<View style={styles.logOutModalContainer}>
						<View style={styles.logOutModal}>
							<View style={styles.buttonContainer}>
								<Button
								raised
								onPress={this.logOut}
								backgroundColor="#6ad447"
								title="Log Out"
								buttonStyle={{
									marginBottom: 1
								}}
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
		marginRight: 15,
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
		width: 300,
		height: 175,
		backgroundColor: "rgba(220, 220, 220, 0.75)",
		alignItems: "center",
		justifyContent: "center"
	},
	buttonContainer: {
		width: 300
	}
});
