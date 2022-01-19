import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const ItemButton = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress}>

      <View style={styles.Button}>
          <Text style={styles.buttonText}> {props.text} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 150,
    backgroundColor: '#c0c0c0',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});