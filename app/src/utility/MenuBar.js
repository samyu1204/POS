import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

export const MenuBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menuStyle}>
        <Text style={styles.menuName}> Lunch </Text>
        <Text style={styles.menuCategories}> Menu Categories: 1 </Text>
        <Text style={styles.menuItems}> Menu Items: 1 </Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("CustomiseMenu")} >
          <Ionicons name="pencil" size={22} />
        </TouchableOpacity>
    </View>
  );
};

  const styles = StyleSheet.create({
    menuStyle: {
        backgroundColor: '#F28E0C',
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
      top: '30%'
    }
  });