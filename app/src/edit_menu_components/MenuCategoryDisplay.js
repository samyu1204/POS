import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Item from "./Item";

function MenuCategoryDisplay(props) {
  // Have a component that handles each category of menu
  // Read from the map of categories then add it to a useState
  const firstRender = () => {
    const categoryMap = props.categoryObject;
    return Object.keys(categoryMap).map(name => <Item key={name} itemName={name} itemAdjustObject={categoryMap[name]} />)
  }

  const [catItems, setCatItems] = useState(firstRender());
  const categoryMap = props.categoryObject;

  const renderCategoryItems = () => {
    setCatItems(Object.keys(categoryMap).map(name => <Item key={name} itemName={name} itemAdjustObject={categoryMap[name]} />));
  }

  useEffect(() => {
    renderCategoryItems()
  }, [])

  return (
    <View style={styles.background}>
        {/* Category Title */}
        <View style={{ marginLeft: '5%' }}>
          <Text style={{fontWeight: 'bold', fontSize: 28, textDecorationLine: 'underline', }}> {props.categoryName}: </Text>
        </View>

        <View style={{ marginLeft: '7%' }}>
          {catItems}
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#B6B9B7",
    borderRadius: 5,
  },

});

export default MenuCategoryDisplay;