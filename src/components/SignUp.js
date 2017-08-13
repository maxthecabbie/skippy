import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";


export class SignUp extends Component {
	render() {
		return (
			<View style={styles.signupContainer}>
				<View>
					<FormLabel>Name</FormLabel>
					<FormInput/>

					<FormLabel>Email</FormLabel>
					<FormInput/>

					<FormLabel>Password</FormLabel>
					<FormInput secureTextEntry={true}/>
					<Button title="Sign Up"/>
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
