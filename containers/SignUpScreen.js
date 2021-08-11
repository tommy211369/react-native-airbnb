import React, { useState } from "react";
import logo from "../assets/img/logo-airbnb.png";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Input from "../components/Input";
import ConnectionButton from "../components/ConnectionButton";
import ToSignInScreen from "../components/ToSignInScreen";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldEmpty, setFieldsEmpty] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [seePassConfirm, setSeePassConfirm] = useState(true);

  const userData = {
    email: email,
    username: username,
    password: password,
    description: description,
  };

  const handleSubmit = async (e) => {
    try {
      setDisableSubmit(true);

      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        userData
      );

      console.log("Response data : ", response.data);
      setToken(response.data.token);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        setFieldsEmpty(false);
        setPasswordError(false);
        setSignUpError(error.response.data.error);
      }
      console.log("Response error status : ", error.response.status);
      console.log("Response error message : ", error.response.data.error);
    }
  };

  const handleConnection = () => {
    if (email && username && password && confirmPassword && description) {
      if (password !== confirmPassword) {
        setPasswordError(true);
        setFieldsEmpty(false);
      } else {
        setIsLoading(true);
        handleSubmit();
      }
    } else {
      setFieldsEmpty(true);
      setPasswordError(false);
    }
  };

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#E5A2A2" />
    </View>
  ) : (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginHorizontal: 35, marginVertical: 20 }}
    >
      <View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      {fieldEmpty && <Text style={styles.error}>Please fill all fields </Text>}

      {errorPassword && (
        <Text style={styles.error}>
          Password and confirmation are different{" "}
        </Text>
      )}

      {signUpError && <Text style={styles.error}>{signUpError}</Text>}

      <View>
        <Input
          keyboardType="email-address"
          placeholder="Email"
          setFunction={setEmail}
          secure={false}
        />

        <Input
          keyboardType="default"
          placeholder="Username"
          setFunction={setUsername}
          secure={false}
        />

        <TextInput
          multiline
          textAlignVertical="top"
          style={styles.multiline}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />

        <Input
          keyboardType="default"
          placeholder="Password"
          setFunction={setPassword}
          secure={seePass}
        />

        {seePass ? (
          <View style={styles.eye}>
            <AntDesign
              name="eye"
              size={24}
              color="#606060"
              onPress={() => {
                setSeePass(false);
              }}
            />
          </View>
        ) : (
          <View style={styles.eye}>
            <Entypo
              name="eye-with-line"
              size={24}
              color="#606060"
              onPress={() => {
                setSeePass(true);
              }}
            />
          </View>
        )}

        <Input
          keyboardType="default"
          placeholder="Confirm Password"
          setFunction={setConfirmPassword}
          secure={seePassConfirm}
        />

        {seePassConfirm ? (
          <View style={styles.eyeConfirm}>
            <AntDesign
              name="eye"
              size={24}
              color="#606060"
              onPress={() => {
                setSeePassConfirm(false);
              }}
            />
          </View>
        ) : (
          <View style={styles.eyeConfirm}>
            <Entypo
              name="eye-with-line"
              size={24}
              color="#606060"
              onPress={() => {
                setSeePassConfirm(true);
              }}
            />
          </View>
        )}

        <ConnectionButton
          handleConnection={handleConnection}
          disableSubmit={disableSubmit}
        />
        <ToSignInScreen />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    color: "#7C7C7C",
    fontWeight: "bold",
  },
  multiline: {
    borderWidth: 2,
    borderColor: "#E5A2A2",
    paddingLeft: 10,
    paddingVertical: 5,
    marginBottom: 30,
    height: 100,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: 10,
  },
  eye: {
    width: 25,
    position: "absolute",
    bottom: Platform.OS === "android" ? 190 : 176,
    right: 0,
  },
  eyeConfirm: {
    width: 25,
    position: "absolute",
    bottom: Platform.OS === "android" ? 123 : 120,
    right: 0,
  },
});
