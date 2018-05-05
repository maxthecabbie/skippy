import React, { Component } from "react";
import { ActivityIndicator, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { authActions } from "../actions/auth";
import Login from "../components/Login";
import PlaceNavigator from "../navigators/PlaceNavigator";
import { authConstants } from "../actions/actions.constants";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(["idToken", "userId"]).then((storage) => {
      const idToken = storage[0][1];
      let userId = storage[1][1];
      this.setState({
        hasToken: idToken !== null,
        isLoaded: true
      });
      if (idToken && userId) {
        userId = parseInt(userId);
        this.props.saveUserData(idToken, userId);
      }
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
          <PlaceNavigator screenProps={{appNavigator: this.props.navigation}} />
        );
      } else {
        return (
          <Login navigation={this.props.navigation} />
        );
      }
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (idToken, userId) => { dispatch(authActions.saveUserData(idToken, userId)); }
});

export default connect(null, mapDispatchToProps)(Landing);