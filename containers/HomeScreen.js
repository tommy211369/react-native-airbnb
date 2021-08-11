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
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const [rooms, setRooms] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <Text>Home</Text>
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
