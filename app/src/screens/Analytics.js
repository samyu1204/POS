import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { authentication } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from './firebase-config';

function Analytics() {
    const getData = async () => {
        const citiesCol = collection(db, 'cities');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log(cityList);
    }   

    return(
        <View style={styles.background}>
            <Button title='Get Data' onPress={getData} />
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