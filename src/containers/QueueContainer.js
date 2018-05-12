import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { QueueUser } from "../components/QueueUser";
import { QueueAdmin } from "../components/QueueAdmin";

class QueueContainer extends Component {
  constructor(props) {
    super(props);

    this.joinQueue = this.joinQueue.bind(this);
    this.dequeueUser = this.dequeueUser.bind(this);
  }

  joinQueue() {
    const { queue } = this.props.navigation.state.params;
    const userId = this.props.userId;

    fetch(backendAPIBaseURL + "/queues", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          requestAction: constants.queueUser,
          queueId: queue.id,
          userId: userId
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("queued");
      })
      .done();
  }

  dequeueUser() {
    const { queue } = this.props.navigation.state.params;
    const userId = this.props.userId;

    fetch(backendAPIBaseURL + "/queues", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          requestAction: constants.dequeueUser,
          queueId: queue.id,
          userId: userId
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("dequeued");
      })
      .done();
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

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps, null)(QueueContainer)