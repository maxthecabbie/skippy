import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const ErrorText = (props) => {
  return (
    <Text style={styles.errorText}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 10,
    textAlign: "center",
    color: "red"
  }
});