import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Logo } from "../utility/Logo.js";
import { LButton } from "../utility/LButton.js";

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
          onPress={() => navigation.navigate("Start")}
        />
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
  loginButton: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#f01d71",
    top: -350,
  },
  signupButton: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#f01d71",
    top: -330,
  },
});

export default HomeScreen;
