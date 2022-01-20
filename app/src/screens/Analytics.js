import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getUserData, addData } from '../database/firebase-utility';
import { addUser } from '../database/firebase-utility';
import { getMenuData } from '../database/firebase-utility';

function Analytics() {

    const getSomething = () => {
        alert(global.session_user);
    }

    return(
        <View style={styles.background}>
            <Text> {global.session_user} </Text>
            <Button title='Get menu' onPress={getMenuData} />
            <Button title='Get User DATA' onPress={() => getUserData(global.session_user)} />
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

export default Analytics;