import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { authActions } from "../actions/auth";
import { View, Text, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { ErrorText } from "./ErrorText";
import Config from "react-native-config";
import { signupValidator } from "../helpers/SignupLoginValidation";


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passConfirm: "",
      errors: null
    };
    this.userSignup = this.userSignup.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  async saveItem(data) {
    try {
      await AsyncStorage.multiSet([
        ["idToken", data.id_token],
        ["userId", data.user.id.toString()]
      ]);
      this.props.saveUserData(data.id_token, data.user.id);
      this.props.navigation.navigate("Place");
    } catch (error) {
      this.handleError("There was a problem signing up. Please try again.");
    }
  }

  userSignup() {
    const username = this.state.username;
    const password = this.state.password;
    const passConfirm = this.state.passConfirm;
    const validateSignup = signupValidator(username, password, passConfirm);
    const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;

    if (!validateSignup.validSignup) {
      this.setState({
        errors: validateSignup.errors
      });
      return;
    }
    fetch(backendAPIBaseURL + "/users", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          passConfirm: passConfirm
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
        } else if (status === 400) {
          this.handleError(data.errorMsg);
        } else {
          throw "Unexpected server response";
        }

      })
      .catch((error) => {
        this.handleError("There was a problem signing up. Please try again.");
        return;
      });
  }

  handleError(errorMsg) {
    let errors = [errorMsg];
    this.setState({
      errors: errors
    });
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

        <ErrorText errors={this.state.errors} />

        <ErrorText/>
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

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (idToken, userId) => { dispatch(authActions.saveUserData(idToken, userId)); }
});

export default connect(null, mapDispatchToProps)(Signup);