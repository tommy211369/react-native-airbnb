import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import logo from "../assets/img/logo-airbnb.png";
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const [rooms, setRooms] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );

      console.log("Rooms data : ", response.data);
      setRooms(response.data);
      setIsLoading;
      false;
    };
    fetchData();
  }, []);

  const navigation = useNavigation();

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#E5A2A2" />
    </View>
  ) : (
    <View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Image source={logo} style={styles.logo} />
      </View>

      <ScrollView style={{ paddingHorizontal: 10 }}>
        {rooms.map((room) => {
          return (
            <View key={room._id} style={styles.room}>
              <Image style={styles.image} /> {/* room.photos[0].url */}
              <Text>Price : {/* room.price  absolute */}</Text>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text>Titre : {/* room.title */}</Text>
                  <Text>Rating : {/* room.ratingValue */}</Text>
                </View>
                <Image style={styles.userPicture} />{" "}
                {/* room.user.account.photo.url */}
              </View>
              <Button
                title="Go to Profile"
                onPress={() => {
                  navigation.navigate("Profile", { userId: 123 });
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  room: {
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  image: {
    flex: 1,
    height: 150,
  },
  userPicture: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
