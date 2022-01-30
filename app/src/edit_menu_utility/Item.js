import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function Item(props) {
  const renderItems = () => {
    //setCatItems(categoryArray.map(name => <MenuCategoryDisplay categoryName={name} key={name} />));
  }

  useEffect(() => {
    renderItems()
  }, [])

  return (
    <View style={styles.background}>
        <Text> Item Name: {props.itemName} </Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#B6B9B7",
  },

});

export default Item;