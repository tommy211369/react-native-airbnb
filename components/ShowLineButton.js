import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const ShowLineButton = ({ showLines, setShowLines, show, setShow }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setShowLines(!showLines);

        if (showLines) {
          setShow("show less");
        } else {
          setShow("show more");
        }
      }}
    >
      {showLines && (
        <Text style={{ color: "#C4C4C4", marginTop: 10, fontWeight: "bold" }}>
          {show} <AntDesign name="caretdown" size={12} color="#C4C4C4" />
        </Text>
      )}

      {!showLines && (
        <Text style={{ color: "#C4C4C4", marginTop: 10, fontWeight: "bold" }}>
          {show} <AntDesign name="caretup" size={12} color="#C4C4C4" />
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ShowLineButton;
