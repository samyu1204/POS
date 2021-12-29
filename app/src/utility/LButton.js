import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const LButton = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.loginButton}>
                <Text style={styles.buttonText}> {props.text} </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
      borderRadius: 30,
      paddingVertical: 14,
      paddingHorizontal: 150,
      backgroundColor: '#f01d71',
    },
    buttonText: {
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 20,
      textAlign: 'center',
    },
  });
