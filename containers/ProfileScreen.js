import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function ProfileScreen({ setToken, userId, userToken, setId }) {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("Profile Response : ", response.data);
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#E5A2A2" />
    </View>
  ) : (
    <ScrollView style={styles.profile}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text>{userData.username}</Text>

        {userData.photo !== null ? (
          <View style={{ position: "relative" }}>
            <Image source={userData.photo} style={[styles.picture, {}]} />
            <View style={styles.addPicture}>
              <TouchableOpacity>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={27}
                  color="tomato"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="add-a-photo" size={24} color="tomato" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ position: "relative" }}>
            <AntDesign
              name="user"
              size={90}
              color="black"
              style={styles.picture}
            />
            <View style={styles.addPicture}>
              <TouchableOpacity>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={30}
                  color="tomato"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="add-a-photo" size={24} color="tomato" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Text>{userData.description}</Text>
      <Text>email : {userData.email}</Text>

      <TouchableOpacity
        title="Log Out"
        onPress={() => {
          setToken(null);
          setId(null);
        }}
        style={styles.logOutButton}
      >
        <Text style={styles.logOut}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    padding: 20,
    flex: 1,
  },
  picture: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
    padding: 3,
  },
  addPicture: {
    position: "absolute",
    right: -32,
    top: 10,
    height: 80,
    justifyContent: "space-around",
  },
  logOutButton: {
    backgroundColor: "tomato",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 100,
  },
  logOut: {
    color: "white",
    textAlign: "center",
  },
});
