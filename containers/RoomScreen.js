import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import LottieView from "lottie-react-native";

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
  Dimensions,
} from "react-native";
import axios from "axios";

const width = Dimensions.get("window").width;

export default function RoomScreen({ navigation, route }) {
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfLines, setNumberOfLines] = useState(3);
  const [showLines, setShowLines] = useState(true);

  let stars = [];
  for (let i = 0; i < Number(room.ratingValue); i++) {
    stars.push(<Entypo name="star" size={17} color="#FBB102" />);
  }

  if (Number(room.ratingValue) === 4) {
    stars.push(<Entypo name="star" size={17} color="#BBBBBB" />);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
      );

      console.log("Room data : ", response.data);
      setRoom(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#E5A2A2" />
    </View>
  ) : (
    <ScrollView>
      <View style={{ position: "relative" }}>
        <SwiperFlatList
          horizontal={true}
          index={0}
          showPagination
          data={room.photos}
          renderItem={({ item }) => (
            <Image style={styles.image} source={{ uri: item.url }} />
          )}
        />

        <View style={styles.price}>
          <Text style={{ color: "white" }}>{room.price} €</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {room.title}
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
              <Text style={styles.reviews}>{room.reviews} reviews</Text>
            </View>
          </View>
          <Image
            style={styles.userPicture}
            source={{ uri: room.user.account.photo.url }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowLines(!showLines);

            if (showLines) {
              setNumberOfLines(0);
            } else {
              setNumberOfLines(3);
            }
          }}
        >
          <Text style={styles.description} numberOfLines={numberOfLines}>
            {room.description}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: width,
    height: 280,
  },
  price: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 10,
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
  description: {
    marginTop: 5,
  },
});
