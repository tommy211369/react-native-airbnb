import React from "react";
import logo from "../../assets/img/logo-airbnb.png";
import { Text, View, StyleSheet, Image } from "react-native";

const ArrowLeft = () => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});

export default ArrowLeft;
