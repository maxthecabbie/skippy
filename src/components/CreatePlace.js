import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { FormLabel, FormInput, Button, Icon } from "react-native-elements";
import Config from "react-native-config";

export class CreatePlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeName: ""
    }
    this.createPlace = this.createPlace.bind(this);
  }

  createPlace() {
    const placeName = this.state.placeName;
    const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;
    const userId = this.props.userId;
    if (!placeName) {
      return;
    }

    fetch(backendAPIBaseURL + "/places", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          placeName: placeName,
          userId: userId
        })
      })
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((responseData) => {
        this.props.closeModal();
      })
  }

  render() {
    return (
      <View style={styles.createPlaceModalContainer}>
				<View style={styles.header}>
					<Icon name="keyboard-arrow-left"
					size={30}
					style={styles.backButton}
					onPress={this.props.closeModal}
					/>
				</View>
				<View style={styles.createPlaceForm}>
					<FormLabel>Name</FormLabel>
					<FormInput value={this.state.placeName}
					onChangeText={(placeName) => this.setState({placeName})}
					/>
					<Button
					raised
					onPress={this.createPlace}
					backgroundColor="#6ad447"
					title="Create"
					/>
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  createPlaceModalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  header: {
    flex: 0.5
  },
  createPlaceForm: {
    flex: 1
  },
  backButton: {
    position: "absolute",
    left: 0,
    marginTop: 10,
    marginLeft: 10
  }
});