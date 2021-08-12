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

      setIsLoading(false);
    };

    askPermission();

    //    const fetchData = async () => {
    //      try {
    //        const response = await axios.get(
    //          "https://express-airbnb-api.herokuapp.com/rooms/around"
    //        );

    //        console.log(response.data);
    //        setAround(response.data);
    //      } catch (error) {
    //        console.log(error.response);
    //      }
    //    };

    // fetchData();
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
    <Text>Permission de géolocalisation refusée</Text>
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
      >
        <MapView.Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="Votre position"
        />
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
