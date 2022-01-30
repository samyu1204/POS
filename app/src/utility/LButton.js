import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const LButton = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.loginButton}>
            <Text style={styles.buttonText}> {props.text} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
      borderRadius: 30,
      paddingVertical: 20,
      width: 400,
      backgroundColor: '#f01d71',
    },
    buttonText: {
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 20,
      textAlign: 'center',
    },
  });
