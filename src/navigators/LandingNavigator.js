import React from "react";
import PlaceNavigator from "./PlaceNavigator";
import { DrawerNavigator } from "react-navigation";
import Landing from "../containers/Landing";
import Login from "../components/Login";
import Signup from "../components/Signup";

export const LandingNavigator = DrawerNavigator({
  Landing: { screen: Landing },
  Place: {
    screen: ({ navigation }) =>
      <PlaceNavigator screenProps={{appNavigator: navigation}} />
  },
  Login: { screen: Login },
  Signup: { screen: Signup }
}, {
  initialRouteName: "Landing"
});