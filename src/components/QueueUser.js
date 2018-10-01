import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";

export const QueueUser = (props) => {
  const { queue, queueUsers, userId, joinQueue } = props;

  let pos = null;
  for (let i = 0; i < queueUsers.length; i++) {
    if (userId === queueUsers[i].user_id) {
      pos = i + 1;
      break;
    }
  }

  return (
    <View style={styles.queueContainer}>
      <View style={styles.queueTitleContainer}>
        <Text style={styles.queueTitle}>
          {queue.name} Queue
        </Text>
      </View>

      {
        pos !== null ? 
          <View style={styles.queueInfoContainer}>
            <Text style={styles.queueInfo}>
              Position in queue: {"\n"}
              {pos}
            </Text>
          </View>
          :
          <Button
          raised
          onPress={joinQueue}
          backgroundColor="#6ad447"
          title="Join Queue"
          />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  queueContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  queueTitleContainer: {
    marginBottom: 30,
    alignItems: "center"
  },
  queueInfoContainer: {
    alignItems: "center",
    marginTop: 100
  },
  queueTitle: {
    fontSize: 25,
    fontWeight: "500"
  },
  queueInfo: {
    fontSize: 20,
    textAlign: "center"
  }
})