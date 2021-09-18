import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import LoginInput from "../components/LoginInput";
import LoginButton from "../components/LoginButton";
import OAuthButton from "../components/OAuthButton";
import firebase from "firebase";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <LoginInput
        labelValue={username}
        onChangeText={(userName) => setUsername(userName)}
        placeholderText="Username"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <LoginInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <LoginInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <LoginInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <LoginButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (!username) {
            Alert.alert("Must fill in username!");
          } else if (!email) {
            Alert.alert("Must fill in email!");
          } else if (!password) {
            Alert.alert("Must fill in password!");
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((user) => {
                const userCreds = user;
                userCreds.user.displayName = username;
                console.log(userCreds);
              })
              .catch((err) => {
                console.log(err);
                Alert.alert(err.message);
              });
          }
        }}
      />

      {Platform.OS === "android" ? (
        <View>
          <OAuthButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <OAuthButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
});
