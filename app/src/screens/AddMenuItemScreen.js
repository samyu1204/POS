import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

function AddMenuItemScreen() {
    return(
        <View style={styles.background }>
            <Text>This is the Add Menu Item screen.</Text>
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
})

export default AddMenuItemScreen;