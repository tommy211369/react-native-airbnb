import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ConnectionButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <Text
        style={styles.toSignIn}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        Already have an account ? Sign In
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toSignIn: {
    textAlign: "center",
    marginTop: 20,
    color: "#606060",
  },
});
