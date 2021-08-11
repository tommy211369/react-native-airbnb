import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ConnectionButton({ handleConnection, disableSubmit }) {
  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => {
        handleConnection();
      }}
    >
      <Text style={styles.submit} disabled={disableSubmit}>
        Sign Up
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submit: {
    borderWidth: 2,
    borderColor: "#ED4E4E",
    borderRadius: Platform.OS === "android" ? 50 : 25,
    width: 140,
    textAlign: "center",
    padding: 15,
    fontSize: 15,
    color: "#7C7C7C",
    fontWeight: "bold",
  },
});
