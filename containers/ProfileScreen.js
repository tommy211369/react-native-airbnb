import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Input from "../components/Input";
import logo from "../assets/img/logo-airbnb.png";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import { getPermissionsAsync } from "expo-location";

export default function ProfileScreen({ setToken, userId, userToken, setId }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);

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

        console.log("UserData Profile >>>> ", response.data);
        setUserData(response.data);
        setPicture(response.data.photo[0].url);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  const getPermissionsAndGetPicture = async () => {
    // demande permission accès à galerie photo
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      // ouvrir  la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync();
      console.log(result);

      if (!result.cancelled) {
        // on stocke la photo dans un state
        setPicture(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  // CAMERA
  const getPermissionsAndTakePicture = async () => {
    // demande permission accès à la caméra
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      // ouvrir  l'appareil photo'
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        // on stocke la photo dans un state
        setPicture(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  // SEND PHOTO
  const sendPicture = async () => {
    try {
      const tab = picture.split(".");

      const formData = new FormData();
      formData.append("photo", {
        uri: picture ? picture : logo,
        name: `my-pictur.${tab[1]}`,
        type: `image/${tab[1]}`,
      });

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response.data);
      // setPicture(response.data.photo);
    } catch (error) {
      console.log(error);
    }
  };

  // SEND USER INFOS
  const sendInfos = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email ? email : userData.email);
      formData.append("username", username ? username : userData.username);
      formData.append(
        "description",
        description ? description : userData.description
      );

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("User infos update response >>>> ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#E5A2A2" />
    </View>
  ) : (
    <ScrollView style={styles.profile}>
      <View style={{ alignItems: "center" }}>
        <View style={{ position: "relative" }}>
          {picture ? (
            <Image
              source={{
                uri: picture,
              }}
              style={[styles.picture, { height: 100, width: 100 }]}
            />
          ) : (
            <AntDesign
              name="user"
              size={90}
              color="black"
              style={styles.picture}
            />
          )}

          <View style={styles.addPicture}>
            <TouchableOpacity>
              <MaterialIcons
                name="add-photo-alternate"
                size={27}
                color="grey"
                onPress={() => {
                  getPermissionsAndGetPicture();
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                getPermissionsAndTakePicture();
              }}
            >
              <MaterialIcons name="add-a-photo" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TextInput
        value={!username ? userData.username : username}
        style={styles.input}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        value={!email ? userData.email : email}
        style={styles.input}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        value={!description ? userData.description : description}
        style={styles.largeInput}
        multiline
        textAlignVertical="top"
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (picture) {
            sendPicture();
          } else {
            alert("Pas de photo");
          }
        }}
        style={styles.update}
      >
        <Text style={{ color: "tomato", textAlign: "center" }}>
          Update picture
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (email || username || description) {
            sendInfos();
          } else {
            alert("Pas de changement");
          }
        }}
        style={styles.update}
      >
        <Text style={{ color: "tomato", textAlign: "center" }}>
          Update infos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
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
    padding: 3,
  },
  input: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "tomato",
    paddingHorizontal: 10,
  },
  largeInput: {
    marginVertical: 40,
    borderWidth: 1,
    borderColor: "tomato",
    padding: 10,
    height: 100,
  },
  addPicture: {
    position: "absolute",
    right: -32,
    top: 10,
    height: 80,
    justifyContent: "space-between",
  },
  logOutButton: {
    backgroundColor: "tomato",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 100,
    marginBottom: 20,
  },
  update: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "tomato",
    padding: 10,
    marginHorizontal: 100,
    marginBottom: 20,
  },
  logOut: {
    color: "white",
    textAlign: "center",
  },
});
