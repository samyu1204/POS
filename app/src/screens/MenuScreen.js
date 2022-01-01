import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function MenuScreen() {
    const [name, setName] = useState();

    return(
        <View style={styles.background}>
            <View style={styles.addMenu}>
                <Text>{name}</Text>
                <TextInput onChangeText={(text) => setName(text)} placeholder='Enter' ></TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "#D1E3DA",
    },
    addMenu: {
        backgroundColor: 'white', 
        borderRadius: 30, 
        position: 'absolute', 
        top: 6,
    },
    text: {
        textAlign: 'center',
        marginTop: 5,
    }
})

export default MenuScreen;