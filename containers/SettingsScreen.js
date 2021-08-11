import React from "react";
import { useRoute } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken }) {
  const { params } = useRoute();
  return (
    <View>
      <Text>My Profile</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
