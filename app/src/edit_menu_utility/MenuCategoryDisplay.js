import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Item from "./Item";

function MenuCategoryDisplay(props) {
  // Have a component that handles each category of menu
  // Read from the map of categories then add it to a useState
  const [catItems, setCatItems] = useState();
  const categoryMap = props.categoryObject;

  const renderCategoryItems = () => {
    setCatItems(Object.keys(categoryMap).map(name => <Item key={name} itemName={name} />));
  }

  useEffect(() => {
    renderCategoryItems()
  }, [])

  return (
    <View style={styles.background}>
        {/* Category Title */}
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}> {props.categoryName}: </Text>
        </View>

        <View>
          {catItems}
        </View>

        <Button title="Example" onPress={() => console.log(categoryMap)} />

    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#B6B9B7",
    borderRadius: 5
  },

});

export default MenuCategoryDisplay;