import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {FormLabel, FormInput, Button} from "react-native-elements";


export class Login extends Component {
	render() {
		return (
			<View style={styles.loginContainer}>
				<View>
					<FormLabel>Email</FormLabel>
					<FormInput/>

					<FormLabel>Password</FormLabel>
					<FormInput secureTextEntry={true}/>
					<Button title="Login"/>
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
