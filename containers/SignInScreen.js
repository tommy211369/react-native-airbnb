import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import logo from "../assets/img/logo-airbnb.png";
import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [fieldEmpty, setFieldsEmpty] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    try {
      setDisableSubmit(true);

      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        userData
      );

      console.log("Response data : ", response.data);
      setToken(response.data.token);
      setIsLoading(false);
      alert("Log in successfully !");
    } catch (error) {
      setIsLoading(false);
      setFieldsEmpty(false);
      setErrorPassword(false);

      if (error.response.data.error === "Unauthorized") {
      }
      setSignInError(
        "Unauthorized : this account does not exist / wrong password"
      );

      console.log("Error : ", error.response);
      console.log("Response error status : ", error.response.status);
      console.log("Response error message : ", error.response.data.error);
    }
  };

  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginHorizontal: 35, marginVertical: 20 }}
    >
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#E5A2A2" />
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Sign In</Text>
        </View>
      )}

      <View>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        {fieldEmpty && (
          <Text style={styles.error}>Please fill all fields </Text>
        )}

        {errorPassword && <Text style={styles.error}>Wrong password </Text>}

        {signInError && <Text style={styles.error}>{signInError}</Text>}

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={async () => {
            if (email && password) {
              setIsLoading(true);
              handleSubmit();
            } else {
              setFieldsEmpty(true);
              setErrorPassword(false);
              setSignInError(false);
            }
          }}
        >
          <Text style={styles.submit} disabled={disableSubmit}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.toSignIn}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Doesn't have an account yet ? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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
  input: {
    borderBottomColor: "#E5A2A2",
    borderBottomWidth: 2,
    paddingBottom: 7,
    marginBottom: 30,
  },
  multiline: {
    borderWidth: 2,
    borderColor: "#E5A2A2",
    paddingLeft: 10,
    paddingVertical: 5,
    marginBottom: 30,
    height: 100,
  },
  submit: {
    borderWidth: 2,
    borderColor: "#ED4E4E",
    borderRadius: Platform.OS === "android" ? 50 : 25,
    width: 140,
    textAlign: "center",
    padding: 15,
    fontSize: 15,
    color: "#7C7C7C",
    fontWeight: "bold",
  },
  toSignIn: {
    textAlign: "center",
    marginTop: 20,
    color: "#606060",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: 10,
  },
});
