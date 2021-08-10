import React, { useState } from "react";
import logo from "../assets/img/logo-airbnb.png";
import axios from "axios";
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

export default function SignUpScreen({ setToken, navigation }) {
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
      alert("Log in successfully !");
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
          <Text style={styles.title}>Sign Up</Text>
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
          placeholder="Username"
          value={username}
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          multiline
          style={styles.multiline}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />
        {fieldEmpty && (
          <Text style={styles.error}>Please fill all fields </Text>
        )}

        {errorPassword && (
          <Text style={styles.error}>
            Password and confirm must be the same{" "}
          </Text>
        )}

        {signUpError && <Text style={styles.error}>{signUpError}</Text>}

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={async () => {
            // const userToken = "secret-token";

            if (
              email &&
              username &&
              password &&
              confirmPassword &&
              description
            ) {
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
          }}
        >
          <Text style={styles.submit} disabled={disableSubmit}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.toSignIn}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Already have an account ? Sign In
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
