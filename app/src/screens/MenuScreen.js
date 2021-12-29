import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

function MenuScreen() {
    const navigation = useNavigation();
    return(
        <View style={styles.background}>
            <View style={styles.addMenu}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                    <Text style={styles.text}>Add Menu</Text>
                </TouchableOpacity>
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
        top: 40, 
        width: 200, 
        height: 30
    },
    text: {
        textAlign: 'center',
        marginTop: 5,
    }
})

export default MenuScreen;