import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

export const Triangle = () => {
  return <View style={styles.triangle} />;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: Dimensions.get('screen').height/3.3,
    borderRightWidth: Dimensions.get('screen').height/2.7,
    borderBottomWidth: 35,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#DCEDC8",
    transform: [{ rotate: '-90deg' }],

  },
});