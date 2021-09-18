import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import LoginInput from "../components/LoginInput";
import FormButton from "../components/LoginButton";
import SocialButton from "../components/OAuthButton";
import firebase from "firebase";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const logInEmail = () => {
    if (!email) {
      Alert.alert("Must fill in email!");
    } else if (!password) {
      Alert.alert("Must fill in password!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          const userCreds = user;
          // console.log(userCreds);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(err.message);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/sprintr.png")} style={styles.logo} />
      <Text style={styles.text}>Sprintr</Text>

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

      <FormButton buttonTitle="Sign In" onPress={logInEmail} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === "android" ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "cover",
  },
  text: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
