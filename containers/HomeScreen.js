import React, { useState, useEffect } from "react";

import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [rooms, setRooms] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );

      // console.log("Rooms data : ", response.data);
      setRooms(response.data);
      setIsLoading;
      false;
    };
    fetchData();
  }, []);
  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#E5A2A2" />
    </View>
  ) : (
    <View style={styles.home}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <TouchableOpacity
              style={styles.room}
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <Text>{item.price} €</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: "red",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginRight: 10 }}>{item.ratingValue}</Text>
                    <Text>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  style={styles.userPicture}
                  source={{
                    uri: item.user.account.photo.url,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Button
        title="To Room Screen"
        onPress={() => navigation.navigate("Room")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  home: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  room: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    height: 150,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
