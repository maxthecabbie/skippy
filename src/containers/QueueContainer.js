import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { QueueUser } from "../components/QueueUser";
import { QueueAdmin } from "../components/QueueAdmin";
import { constants } from "../constants";
import Config from "react-native-config";

class QueueContainer extends Component {
  constructor(props) {
    super(props);

    this.joinQueue = this.joinQueue.bind(this);
    this.dequeueUser = this.dequeueUser.bind(this);
  }

  joinQueue() {
    const { queue } = this.props.navigation.state.params;
    const userId = this.props.userId;

    fetch(Config.BACKEND_API_BASE_URL + "/queues", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          requestAction: constants.queueUser,
          queueId: queue.id,
          userId: userId
        })
      })
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status
        }))
      )
      .then((response) => {
        const status = response.status;
        const queueId = response.data.queueId;
        const queueName = response.data.queueName;

        if (status === 200) {
          this.props.updateQueues({ id: queueId, name: queueName });
          this.props.closeModal();
        } else if (status === 400) {
          this.handleError("There was a problem creating the queue. Please try again.");
        } else {
          throw "Unexpected server response";
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  dequeueUser() {
    const { queue } = this.props.navigation.state.params;

    fetch(Config.BACKEND_API_BASE_URL + "/queues", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          requestAction: constants.dequeueUser,
          queueId: queue.id
        })
      })
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status
        }))
      )
      .then((responseData) => {
        const status = responseData.status;
        const queueId = responseData.data.queueId;
        const queueName = responseData.data.queueName;

        if (status === 200) {
          this.props.updateQueues({ id: queueId, name: queueName });
          this.props.closeModal();
        } else if (status === 400) {
          this.handleError("There was a problem creating the queue. Please try again.");
        } else {
          throw "Unexpected server response";
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  render() {
    const { queue, queueUsers, isAdmin } = this.props.navigation.state.params;
    queueUsers.sort(function(a, b) {
      if (a.position < b.position) {
        return -1;
      }
      return 1;
    });

    if (!isAdmin) {
      return (
        <QueueUser queue={queue} queueUsers={queueUsers} userId={this.props.userId} joinQueue={this.joinQueue} />
      );
    } else {
      return (
        <QueueAdmin queue={queue} queueUsers={queueUsers} dequeueUser={this.dequeueUser} />
      );
    }

  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps, null)(QueueContainer)