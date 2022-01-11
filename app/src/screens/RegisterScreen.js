import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Logo } from "../utility/Logo.js";

function RegisterScreen() {
  const navigation = useNavigation();

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
 
  const registerUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      setIsRegistered(true);
    })
    .catch((re) => {
      console.log(re);
    })
  }

  const changeEmail = (value) => {
    setEmail(value);
  }

  const changePassword = (value) => {
    setPassword(value);
  }
  
  return (
    <ImageBackground style={styles.background}>
      <Logo />

      <View style={{ position: "absolute", top: 30, left: 20 }}>
        <TouchableHighlight onPress={() => navigation.navigate("Home")}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/icons/back_button.png")}
          />
        </TouchableHighlight>
      </View>

      <View style={styles.enterForm}>
        <TextInput onChangeText={changeEmail} value={email} placeholder="Email" />
        <TextInput onChangeText={changePassword} value={password} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity style={{backgroundColor: 'white'}} onPress={registerUser} >
          <Text> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#D1E3DA",
  },
  textSize: {
    fontSize: 40,
    flex: 1,
  },
  noAccount: {
    fontSize: 20,
    color: "#0040ff",
    textAlign: "center",
  },
  enterForm: {
    fontSize: 400,
    borderRadius: 6,
    alignItems: "center",
    top: 400,
    position: "absolute",
  },
  regText: {
    fontSize: 20,
    color: "black",
  },
  backButton: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "grey",
    left: 5,
    top: 30,
    position: "absolute",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 150,
    backgroundColor: "#f01d71",
  },
  textInput: {
    textAlign: "left",
    fontSize: 20,
    borderRadius: 30,
    paddingVertical: 14,
    paddingRight: 150,
    paddingLeft: 25,
    backgroundColor: "#4c58ab",
    margin: 8,
    color: "white",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RegisterScreen;
