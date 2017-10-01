import React, {Component} from "react";
import {Text, View, StyleSheet, AsyncStorage} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";
import Config from "react-native-config";
import {loginValidator} from "../helpers/LoginValidation"

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		};
		this.userLogin = this.userLogin.bind(this);
	}

	async saveItem(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} 
		catch (error) {
			console.error("AsyncStorage error: " + error.message);
		}
	}

	userLogin() {
		const username = this.state.username;
		const password = this.state.password;
		const validLogin = loginValidator(username, password);
		const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;

		if (!validLogin) {
			return;
		}
		fetch(backendAPIBaseURL + "/sessions/create", {
			method: "POST",
			headers: { "Accept": "application/json", "Content-Type": "application/json"},
			body: JSON.stringify({
				username: username,
				password: password,
			})
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.saveItem("id_token", responseData.id_token),
			this.props.navigation.navigate("Home");
		})
		.done();
	}

	render() {
		return (
			<View style={styles.loginContainer}>
				<Text style={styles.title}>Login</Text>
				<View style={styles.loginForm}>
					<FormLabel>username</FormLabel>
					<FormInput value={this.state.username}
					onChangeText={(username) => this.setState({username})}
					/>

					<FormLabel>Password</FormLabel>
					<FormInput value={this.state.password}
					onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
					/>
					
				</View>

				<View style={styles.linkText}>
					<Text>
						Don't have an account yet?&nbsp;
						<Text onPress={() => this.props.navigation.navigate("SignUp")}>
							Sign Up!
						</Text>
					</Text>

				</View>

				<Button
				backgroundColor="#6ad447"
				onPress={this.userLogin} title="Login"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: "center",
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
