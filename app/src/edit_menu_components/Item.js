import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AdjustmentDisplay from "./AdjustmentDisplay";

function Item(props) {
  const adjustmentObj = props.itemAdjustObject['adjustment'];
  return (
    <View style={styles.background}>
        <Text style={{ fontSize: 25 }}> {props.itemName} </Text>
        <Text style={{ color: 'white', left: '2%', fontSize: 20 }}> Base Price: {props.itemAdjustObject['basePrice']}</Text>
        <AdjustmentDisplay adjustments={adjustmentObj} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#B6B9B7",
    marginBottom: 5,
  },

});

export default Item;