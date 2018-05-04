import React, { Component } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CreatePlace } from "./CreatePlace"
import { FormLabel, FormInput, Button } from "react-native-elements";
import { ErrorText } from "./ErrorText";
import Config from "react-native-config"

class PlaceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeId: "",
      placeName: "",
      createPlaceModalVisible: false,
      errors: null
    }
    this.openPlace = this.openPlace.bind(this);
    this.openCreatePlaceModal = this.openCreatePlaceModal.bind(this);
    this.closeCreatePlaceModal = this.closeCreatePlaceModal.bind(this);
    this.handleError = this.handleError.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  openCreatePlaceModal() {
    this.setState({
      createPlaceModalVisible: true,
      errors: null
    });
  }

  closeCreatePlaceModal() {
    this.setState({ createPlaceModalVisible: false });
  }

  openPlace() {
    const placeId = this.state.placeId;
    const backendAPIBaseURL = Config.BACKEND_API_BASE_URL;
    fetch(backendAPIBaseURL + "/places/" + placeId, {
        method: "GET"
      })
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status
        }))
      )
      .then((responseData) => {
        const status = responseData.status;

        if (status === 200) {
          const place = responseData.data.placeRows;
          const queues = responseData.data.queueRows;
          const placeAdmins = responseData.data.adminRows;

          this.clearState();
          this.props.navigation.navigate("Place", {
            place: place,
            queues: queues,
            placeAdmins: placeAdmins,
            userId: this.props.userId
          });
        } else if (status === 400 || status === 401) {
          this.handleError(responseData.data.errorMsg);
        } else {
          throw "Unexpected server response"
        }
      })
      .catch((error) => {
        this.handleError("There was a problem retrieving the requested place. Please try again.");
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

  clearState() {
    this.setState({
      placeId: "",
      errors: null
    });
  }

  render() {
    return (
      <View style={styles.placeFormContainer}>
				<View style={styles.placeForm}>
					<FormLabel>Place</FormLabel>
					<FormInput value={this.state.placeId}
					onChangeText={(placeId) => this.setState({placeId})}
					/>
				<Button
				raised
				onPress={this.openPlace}
				backgroundColor="#6ad447"
				title="Go"
				/>

				{this.displayErrors()}
				</View>

				<Button
				raised
				onPress={this.openCreatePlaceModal}
				backgroundColor="#6ad447"
				title="Create Place"
				/>

				<Modal
				animationType={"slide"}
				transparent={false}
				visible={this.state.createPlaceModalVisible}
				onRequestClose={() => null}
				>
					<CreatePlace closeModal={this.closeCreatePlaceModal} userId={this.props.userId} />
				</Modal>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  placeFormContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  placeForm: {
    flex: 1,
    marginBottom: 20
  },
  createPlaceButton: {
    marginRight: 15,
    alignSelf: "flex-end"
  },
  createPlaceModalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center"
  }
})

const mapStateToProps = state => ({
  idToken: state.auth.idToken,
  userId: state.auth.userId
});

export default connect(mapStateToProps, null)(PlaceForm)