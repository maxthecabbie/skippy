import React from "react";
import {DrawerNavigator} from "react-navigation";
import {Landing} from "./components/Landing";
import HomeNavigator from "./components/HomeNavigator"
import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";


const App = DrawerNavigator({
	Landing: {screen: Landing},
	Home: {screen: ({navigation}) => 
		<HomeNavigator screenProps={{appNavigator: navigation}} /> 
	},
	Login: {screen: Login},
	SignUp: {screen: SignUp}
}, {
	initialRouteName: "Landing"
});

export default () => <App/>;
