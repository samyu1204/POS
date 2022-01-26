import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getUserData, addData } from "../database/firebase-utility";
import { addUser } from "../database/firebase-utility";
import { getMenuData } from "../database/firebase-utility";
import global from "../global_information/global";

function CustomiseMenuPage() {
  return (
    <View style={styles.background}>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#D1E3DA",
  },
});

export default CustomiseMenuPage;
