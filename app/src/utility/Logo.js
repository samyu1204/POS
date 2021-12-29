import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";

export const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require("../../assets/register_page/posSUM.png")}
      />
      <Text style={styles.logoText}>POSsum</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logoText: {
    fontSize: 50,
  },
});
