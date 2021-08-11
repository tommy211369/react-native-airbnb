import React from "react";
import logo from "../../assets/img/logo-airbnb.png";
import { View, StyleSheet, Image } from "react-native";

const Logo = () => {
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

export default Logo;
