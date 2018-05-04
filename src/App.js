import React, { Component } from "react";
import { LandingNavigator } from "./navigators/LandingNavigator";
import { Provider } from "react-redux";
import { store } from "./store.js";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LandingNavigator/>
      </Provider>
    )
  }
}