import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [rooms, setRooms] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        // console.log("ROOMS DATA >>>> ", response.data)
        setRooms(response.data);
        setTimeout(() => setIsLoading(false), 3000);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.lottie}>
      <LottieView
        autoPlay
        loop
        style={styles.heartLottie}
        source={require("../assets/lottie/marker.json")}
      />
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

          for (let i = Number(item.ratingValue); i < 5; i++) {
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
  lottie: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heartLottie: {
    width: 100,
    height: 100,
  },
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
    marginTop: 2,
  },
  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
