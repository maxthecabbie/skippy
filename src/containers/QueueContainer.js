import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { QueueUser } from "../components/QueueUser";
import { QueueAdmin } from "../components/QueueAdmin";

export class QueueContainer extends Component {
  constructor(props) {
    super(props);

    this.joinQueue = this.joinQueue.bind(this);
    this.dequeueUser = this.dequeueUser.bind(this);
  }

  joinQueue() {
    console.log("Joined");
  }

  dequeueUser() {
    console.log("Dequeued");
  }

  render() {
    const { queue, isAdmin } = this.props.navigation.state.params;

    if (!isAdmin) {
      return (
        <QueueUser queue={queue} joinQueue={this.joinQueue} />
      );
    } else {
      return (
        <QueueAdmin queue={queue} dequeueUser={this.dequeueUser} />
      );
    }

  }
}