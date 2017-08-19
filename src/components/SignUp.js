import React, {Component} from "react";
import {AsyncStorage} from "react-native";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";


export class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			password: ""
		};
		this.userSignup = this.userSignup.bind(this);
	}

	async saveItem(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} 
		catch (error) {
			console.error("AsyncStorage error: " + error.message);
		}
	}

	userSignup() {
		const name = this.state.name;
		const password = this.state.password;
		const backendAPIBaseURL = process.env.BACKEND_API_BASE_URL;
		if (!name || !password) {
			return;
		}
		fetch(backendAPIBaseURL + "/users", {
			method: "POST",
			headers: {"Accept": "application/json", "Content-Type": "application/json"},
			body: JSON.stringify({
				username: name,
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
			<View style={styles.signupContainer}>
				<View>
					<FormLabel>Name</FormLabel>
					<FormInput value={this.state.name}
					onChangeText={(name) => this.setState({name})}
					/>

					<FormLabel>Email</FormLabel>
					<FormInput value={this.state.email}
					onChangeText={(email) => this.setState({email})}
					/>

					<FormLabel>Password</FormLabel>
					<FormInput value={this.state.password}
					onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
					/>

					<Button onPress={this.userSignup} title="Sign Up"/>
				</View>

				<View style={styles.linkText}>
					<Text onPress={() => this.props.navigation.navigate("Login")}>
						Log In
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  signupContainer: {
    alignItems: "center"
  },
  linkText: {
  	marginTop: 50
  }
});
