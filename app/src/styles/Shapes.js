import { StyleSheet } from "react-native";
import { View } from "react-native";


export const Triangle = () => {
  return <View style={styles.triangle} />;
};

export const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 70,
    borderRightWidth: 70,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#C4C4C4",
    transform: [{ rotate: "90deg" }],
  },
});