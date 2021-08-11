import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Input({
  setFunction,
  keyboardType,
  placeholder,
  secure,
}) {
  return (
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secure}
      onChangeText={(text) => {
        setFunction(text);
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#E5A2A2",
    borderBottomWidth: 2,
    paddingBottom: 7,
    marginBottom: 30,
  },
});
