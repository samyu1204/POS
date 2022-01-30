import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";

export const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require("../../assets/register_page/posSUM.png")}
      />
      <View>
        <Text style={styles.logoText}>pos<Text style={{ color: '#7CCEE7' }}>sibilities</Text> </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    top: 70,
    alignItems: "center",
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 50,
  },
});
