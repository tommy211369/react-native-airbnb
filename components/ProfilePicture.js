import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfilePicture = ({
  picture,
  getPermissionsAndGetPicture,
  getPermissionsAndTakePicture,
}) => {
  return (
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
              onPress={getPermissionsAndGetPicture}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={getPermissionsAndTakePicture}>
            <MaterialIcons name="add-a-photo" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 3,
  },
  addPicture: {
    position: "absolute",
    right: -32,
    top: 10,
    height: 80,
    justifyContent: "space-between",
  },
});

export default ProfilePicture;
