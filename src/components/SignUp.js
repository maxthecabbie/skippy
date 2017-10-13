import React, {Component} from "react";
import {AsyncStorage} from "react-native";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";
import Config from "react-native-config"
import {signupValidator} from "../helpers/SignupValidation"


export class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			passConfirm: ""
		};
		this.userSignup = this.userSignup.bind(this);
	}

	async saveItem(responseData) {
		try {
			await AsyncStorage.multiSet([
				["idToken", responseData.id_token],
				["userId", responseData.user.id.toString()]
				]);
		} 
		catch (error) {
			console.error("AsyncStorage error: " + error.message);
		}
	}

	userSignup() {
		const username = this.state.username;
		const password = this.state.password;
		const passConfirm = this.state.passConfirm;
		const validateSignup = signupValidator(username, password, passConfirm);
		const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;

		if (!validateSignup.validSignup) {
			return;
		}
		fetch(backendAPIBaseURL + "/users", {
			method: "POST",
			headers: {"Accept": "application/json", "Content-Type": "application/json"},
			body: JSON.stringify({
				username: username,
				password: password,
				passConfirm: passConfirm
			})
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.saveItem(responseData),
			this.props.navigation.navigate("Home");
		})
		.done();
	}

	render() {
		return (
			<View style={styles.signupContainer}>
				<Text style={styles.title}>Signup</Text>
				<View>
					<FormLabel>Username</FormLabel>
					<FormInput value={this.state.username}
					onChangeText={(username) => this.setState({username})}
					/>

					<FormLabel>Password</FormLabel>
					<FormInput value={this.state.password}
					onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
					/>

					<FormLabel>Confirm Password</FormLabel>
					<FormInput value={this.state.passConfirm}
					onChangeText={(passConfirm) => this.setState({passConfirm})}
					secureTextEntry={true}
					/>
				</View>

				<View style={styles.linkText}>
					<Text>
						Already have an account?&nbsp;
						<Text onPress={() => this.props.navigation.navigate("Login")}>
							Log In here.
						</Text>
					</Text>
				</View>

				<Button
				backgroundColor="#6ad447"
				onPress={this.userSignup} title="Sign Up"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	signupContainer: {
		flex: 1,
		justifyContent: "center"
	},
	title: {
		textAlign: "center"
	},
	linkText: {
		marginTop: 10,
		marginLeft: 15,
		marginBottom: 20
	}
});
