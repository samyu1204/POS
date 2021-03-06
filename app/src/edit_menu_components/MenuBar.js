import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

import global from "../global_information/global";


export const MenuBar = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.menuStyle}>
        <Text style={styles.menuName}> {global.menu_info[props.name]['name']} </Text>
        <Text style={styles.menuCategories}> Menu Categories: 1 </Text>
        <Text style={styles.menuItems}> Menu Items: 1 </Text>
        <TouchableOpacity style={styles.editButton} onPress={() => {
          navigation.navigate("EditMenuScreen")
          // Set global focus menu:
          global.focusedMenu = props.name;
        }}>
          <Ionicons name="pencil" size={22} />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuStyle: {
      backgroundColor: '#5CDC9C',
      borderWidth: 1,
      borderColor: '#FCBB66',
      borderRadius: 5,
      flex: 1,
      height: 60,
  },
  menuName: {
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'black',
    left: '5%',
    top: '25%',
    position: 'absolute',
  },
  menuCategories: {
    textAlign: 'right',
    right: '5%',
  },
  menuItems: {
    textAlign: 'right',
    right: '5%',
  },
  editButton: {
    position: 'absolute',
    left: '96%',
    top: '30%',
  }
});