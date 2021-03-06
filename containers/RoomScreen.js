import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import ShowLineButton from "../components/ShowLineButton";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";

export default function RoomScreen({ navigation, route }) {
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState("show more");
  const [showLines, setShowLines] = useState(true);

  let stars = [];
  for (let i = 0; i < Number(room.ratingValue); i++) {
    stars.push(<Entypo name="star" size={17} color="#FBB102" />);
  }

  for (let i = Number(room.ratingValue); i < 5; i++) {
    stars.push(<Entypo name="star" size={17} color="#BBBBBB" />);
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
      );

      // console.log("Room data : ", response.data);
      setRoom(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [route.params.id]);

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
            <View style={styles.rates}>
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

        {showLines ? (
          <Text style={styles.description} numberOfLines={3}>
            {room.description}
          </Text>
        ) : (
          <Text style={styles.description} numberOfLines={0}>
            {room.description}
          </Text>
        )}

        <ShowLineButton
          showLines={showLines}
          setShowLines={setShowLines}
          show={show}
          setShow={setShow}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: room.location[1],
            longitude: room.location[0],
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
            title={room.title}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  rates: {
    flexDirection: "row",
    marginTop: 15,
  },
  rating: {
    marginRight: 10,
  },
  reviews: {
    color: "#C4C4C4",
    fontSize: 12,
    marginTop: 3,
  },
  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  description: {
    marginTop: 5,
  },

  map: {
    marginTop: 20,
    width: width,
    height: 250,
  },
});
