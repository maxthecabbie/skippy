import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";

export const QueueAdmin = (props) => {
  const { queue, queueUsers, dequeueUser } = props;

  return (
    <View style={styles.queueContainer}>
      <View style={styles.queueTitleContainer}>
        <Text style={styles.queueTitle}>
          {queue.name} Queue Management
        </Text>
      </View>

      <View style={styles.queueInfoContainer}>
        <Text style={styles.queueInfo}>
          Users in queue: {"\n"}
          {queueUsers.length}
        </Text>
      </View>
      {
        queueUsers.length > 0 ?
        <Button
        raised
        onPress={dequeueUser}
        backgroundColor="#6ad447"
        title="Dequeue User"
        />
        :
        null
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
    marginTop: 30,
    marginBottom: 20
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