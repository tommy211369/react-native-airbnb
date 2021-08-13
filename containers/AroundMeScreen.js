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
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUseruserLongitude] = useState(null);

  useEffect(() => {
    const askPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("Result >>> ", status);

        // Demande de permission d'accès aux coordonnées GPS :
        if (status === "granted") {
          // 1 - récupérer les coordonnées GPS
          let location = await Location.getCurrentPositionAsync({});
          console.log("location => ", location);
          setUserLatitude(location.coords.latitude);
          setUseruserLongitude(location.coords.longitude);

          // 2 - requête pour récupérer les annonces aux alentours du user (envoyer les coordonnées GPS en query)

          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setAround(response.data);
        }
        // si accès refusé :
        else {
          // 1 - requête pour récupérer les annonces (pas d'envoi de coordonnées GPS)
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
          setAround(response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    askPermission();
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
    <View style={styles.around}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLatitude ? userLatitude : 48.866667,
          longitude: userLongitude ? userLongitude : 2.333333,
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
