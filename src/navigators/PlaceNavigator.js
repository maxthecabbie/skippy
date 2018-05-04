import React from "react";
import { StackNavigator } from "react-navigation";
import Logout from "../components/Logout";
import PlaceForm from "../components/PlaceForm";
import { Place } from "../components/Place";
import { Queue } from "../components/Queue";

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
  Queue: {
    screen: Queue,
    navigationOptions: navigationOptions
  }
}, {
  initialRouteName: "PlaceForm",
});

export default PlaceNavigator;