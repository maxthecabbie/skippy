import React from "react";
import { StackNavigator } from "react-navigation";
import Logout from "../components/Logout";
import PlaceForm from "../components/PlaceForm";
import { Place } from "../components/Place";
import { QueueContainer } from "../containers/QueueContainer";

const navigationOptions = ({ screenProps }) => ({
  headerRight: (
    <Logout screenProps={screenProps} />
  ),
  headerStyle: {
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0, // iOS
    elevation: 0 // android
  }
});

const PlaceNavigator = StackNavigator({
  PlaceForm: {
    screen: PlaceForm,
    navigationOptions: navigationOptions
  },
  Place: {
    screen: Place,
    navigationOptions: navigationOptions
  },
  QueueContainer: {
    screen: QueueContainer,
    navigationOptions: navigationOptions
  }
}, {
  initialRouteName: "PlaceForm",
});

export default PlaceNavigator;