import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

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
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          let stars = [];
          for (let i = 0; i < Number(item.ratingValue); i++) {
            stars.push(<Entypo name="star" size={17} color="#FBB102" />);
          }

          if (Number(item.ratingValue) === 4) {
            stars.push(<Entypo name="star" size={17} color="#BBBBBB" />);
          }
          return (
            <TouchableOpacity
              style={styles.room}
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <Image
                style={styles.image}
                source={{ uri: item.photos[0].url }}
              />
              <View style={styles.price}>
                <Text style={{ color: "white" }}>{item.price} €</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                    }}
                  >
                    <Text style={styles.rating}>
                      {stars.map((star, index) => {
                        return <Text key={index}>{star}</Text>;
                      })}
                    </Text>
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
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
    flex: 1,
  },
  room: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    height: 200,
  },
  price: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  rating: {
    marginRight: 10,
  },
  reviews: {
    color: "#C4C4C4",
    fontSize: 12,
  },
  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
