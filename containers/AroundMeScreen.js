import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function AroundMeScreen({ navigation }) {
  const [around, setAround] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );

        console.log(response.data);
        setAround(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  });

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
    <View style={styles.around}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 46.232192999999995,
          longitude: 2.209666999999996,
          latitudeDelta: 12,
          longitudeDelta: 12,
        }}
      >
        {/* <MapView.Marker
          coordinate={{
            latitude: room.location[1],
            longitude: room.location[0],
          }}
          title={room.title}
        />*/}
      </MapView>
    </View>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
  map: {
    width: width,
    height: height,
  },
});
