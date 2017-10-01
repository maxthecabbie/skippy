import React from "react";
import {StackNavigator} from "react-navigation";
import {LogOut} from "../LogOut";
import {PlaceForm} from "../PlaceForm";
import {Place} from "../Place";
import {Queue} from "../Queue";

const navigationOptions = ({screenProps}) => ({
	headerRight: (
		<LogOut screenProps={screenProps} />
	),
	headerStyle: {
		backgroundColor: "#FFFFFF",
		shadowOpacity: 0, // iOS
		elevation: 0 // android
	}
});

const HomeNavigator = StackNavigator({
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

export default HomeNavigator;



