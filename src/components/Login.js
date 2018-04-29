import React, { Component } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { ErrorText } from "./ErrorText";
import Config from "react-native-config";
import { loginValidator } from "../helpers/SignupLoginValidation"

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: null
    };
    this.userLogin = this.userLogin.bind(this);
    this.handleError = this.handleError.bind(this);
    this.dispalyErrors = this.displayErrors.bind(this);
  }

  async saveItem(data) {
    try {
      await AsyncStorage.multiSet([
        ["idToken", data.id_token],
        ["userId", data.user.id.toString()]
      ]);
      this.props.navigation.navigate("Home");
    } catch (error) {
      this.handleError("There was a problem logging in. Please try again.");
      return;
    }
  }

  userLogin() {
    const username = this.state.username;
    const password = this.state.password;
    const validateLogin = loginValidator(username, password);
    const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;

    if (!validateLogin.validLogin) {
      this.setState({
        errors: validateLogin.errors
      });
      return;
    }
    fetch(backendAPIBaseURL + "/sessions/create", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status
        }))
      )
      .then((responseData) => {
        const status = responseData.status;
        const data = responseData.data;

        if (status === 201) {
          this.saveItem(data);
        } else if (status === 401) {
          this.handleError(data.errorMsg);
        } else {
          throw "Unexpected server response";
        }

      })
      .catch((error) => {
        this.handleError("There was a problem logging in. Please try again.");
        return;
      });
  }

  handleError(errorMsg) {
    let errors = [errorMsg];
    this.setState({
      errors: errors
    });
  }

  displayErrors() {
    const errors = this.state.errors;
    if (errors !== null && errors.length > 0) {
      return (
        <ErrorText text={errors[0]}/>
      )
    }
  }

  render() {
    return (
      <View style={styles.loginContainer}>
				<Text style={styles.title}>Login</Text>
				<View style={styles.loginForm}>
					<FormLabel>Username</FormLabel>
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

        {this.displayErrors()}

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