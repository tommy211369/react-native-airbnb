import React from "react";
import logo from "../../assets/img/logo-airbnb.png";
import { View, StyleSheet, Image } from "react-native";

const Logo = () => {
  return <Image source={logo} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});

export default Logo;
