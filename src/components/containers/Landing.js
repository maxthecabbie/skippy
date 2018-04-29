import React, { Component } from "react";
import { ActivityIndicator, Text, AsyncStorage } from "react-native";
import { Login } from "../Login"
import HomeNavigator from "../navigators/HomeNavigator"

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("idToken").then((token) => {
      this.setState({
        hasToken: token !== null,
        isLoaded: true
      })
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      );
    } else {
      if (this.state.hasToken) {
        return (
          <HomeNavigator screenProps={{appNavigator: this.props.navigation}}/>
        );
      } else {
        return (
          <Login navigation={this.props.navigation} />
        );
      }
    }
  }
}