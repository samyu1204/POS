import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function AdjustmentElement(props) {
    return (
        <View style={styles.background}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}> {props.name}: {props.price} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#B6B9B7",
        marginLeft: '3%',
    },
});

export default AdjustmentElement;