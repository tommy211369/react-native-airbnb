import React from "react";
import { View, Text } from "react-native";

export default function RoomScreen({ navigation, route }) {
  console.log(route.params.id);
  return (
    <View>
      <Text>RoomScreen</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
}
