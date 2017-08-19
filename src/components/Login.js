import React, {Component} from "react";
import {View, Text, StyleSheet, AsyncStorage} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
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
		const email = this.state.email;
		const password = this.state.password;
		const backendAPIBaseURL = process.env.BACKEND_API_BASE_URL;
		if (!email || !password) {
			return;
		}
		fetch(backendAPIBaseURL + "/sessions/create", {
			method: "POST",
			headers: { "Accept": "application/json", "Content-Type": "application/json"},
			body: JSON.stringify({
				username: email,
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
				<View>
					<FormLabel>Email</FormLabel>
					<FormInput value={this.state.email}
					onChangeText={(email) => this.setState({email})}
					/>

					<FormLabel>Password</FormLabel>
					<FormInput value={this.state.password}
					onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
					/>
					<Button onPress={this.userLogin} title="Login"/>
				</View>

				<View style={styles.linkText}>
					<Text onPress={() => this.props.navigation.navigate("SignUp")}>
						Sign Up
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: "center"
  },
  linkText: {
  	marginTop: 50
  }
});
