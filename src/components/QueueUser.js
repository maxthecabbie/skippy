import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";

export const QueueUser = (props) => {
  const { queue, joinQueue } = props;

  return (
    <View style={styles.queueContainer}>
      <View style={styles.queueTitleContainer}>
        <Text style={styles.queueTitle}>
          {queue.name} Queue
        </Text>
      </View>

      <Button
      raised
      onPress={joinQueue}
      backgroundColor="#6ad447"
      title="Join Queue"
      />

      <View style={styles.queueInfoContainer}>
        <Text style={styles.queueInfo}>
          Position in queue: {"\n"}
          100
        </Text>
      </View>
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