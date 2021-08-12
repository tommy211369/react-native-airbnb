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
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [errorCoords, setErrorCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        console.log("location => ", location); //
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        setErrorCoords(true);
      }
      setTimeout(() => setIsLoading(false), 3000);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );

        console.log("AROUND ROOMS DATA >>>>> ", response.data);
        setAround(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    askPermission();
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
  ) : errorCoords ? (
    <View style={styles.around}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      >
        {around.map((roomLocation, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: roomLocation.location[1],
                longitude: roomLocation.location[0],
              }}
              title={roomLocation.title}
            />
          );
        })}
      </MapView>
    </View>
  ) : (
    <View style={styles.around}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {around.map((room) => {
          return (
            <MapView.Marker
              key={room._id}
              coordinate={{
                latitude: room.location[1],
                longitude: room.location[0],
              }}
              title={room.title}
              onPress={() => {
                navigation.navigate("Room", { id: room._id });
              }}
            />
          );
        })}
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
