import React, {Component} from "react";
import {DrawerNavigator} from 'react-navigation';
import {Landing} from "./components/Landing";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";

const App = DrawerNavigator({
	Landing: {screen: Landing},
	Home: {screen: Home},
	Login: {screen: Login},
	SignUp: {screen: SignUp}
}, {
	initialRouteName: "Landing"
});

export default () => <App/>;
