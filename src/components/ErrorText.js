import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const ErrorText = (props) => {

  const errors = props.errors;

  if (errors !== null) {
    return (
      <Text style={styles.errorText}>
        {errors[0]}
      </Text>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 10,
    textAlign: "center",
    color: "red"
  }
});