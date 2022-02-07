import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, View, Text, Button } from "react-native";
import { Logo } from "../utility/Logo.js";
import { LButton } from "../utility/LButton.js";
import { setGlobalMenuList } from "../database/firebase-utility.js";
import { LogBox } from "react-native";

function HomeScreen() {
  // Hook function:
  const navigation = useNavigation();

  return (
    <ImageBackground style={styles.background}>
      {/*Display Logo*/}
      <Logo />
      <Text>{"\n"}</Text>
      <View style={styles.loginButton}>
        <LButton text="LOG IN" onPress={() => navigation.navigate("Login")} />
      </View>

      <View style={styles.signupButton}>
        <LButton
          text="SIGN UP"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: "#D1E3DA",
  },
  loginButton: {
    borderRadius: 50,
    alignItems: 'center',
    top: '13%'
  },
  signupButton: {
    borderRadius: 50,
    alignItems: 'center',
    top: '17%'
  },
});

export default HomeScreen;
