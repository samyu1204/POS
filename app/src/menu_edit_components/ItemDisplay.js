import React, {useState, useEffect, useLayoutEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import AdjustmentDisplay from "./AdjustmentDisplay";
import { AddAdjustmentPopUp } from "./EditMenuPopUps";
import { getItemData } from "../database/menu-data-utility";

function ItemDisplay(props) {
  // Sets the adjustment views - showing all user's adjustments:
  const [adjustmentView, setAdjustmentView] = useState(null);

  const renderAdjustmentDisplay = () => {
    const itemData = getItemData(props.menuName, props.category, props.itemName);
    setAdjustmentView(
      Object.keys(itemData['adjustment']).map(name =>
        <AdjustmentDisplay 
          key={name} 
          adjustmentField={name} 
          itemName={props.itemName}
          category={props.category}
          menuName={props.menuName}
        />
      )
    )
  }
  
  useLayoutEffect(() => {
    renderAdjustmentDisplay();
    
  }, [])

  return (
    <View style={styles.background}>
      <View>
        <TouchableOpacity 
          style={editMenuStyles.item}
          onPress={() => console.log('HELLO')}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={editMenuStyles.itemNameText}>{props.itemName}</Text>
            <Text style={editMenuStyles.itemBasePriceText}>Base Price: ${props.price}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Adjustments display: */}
      <View>
        {/* Array of adjustment views */}
        {adjustmentView}
      </View>
      
      {/* Add adjustment button: */}
      <AddAdjustmentPopUp 
        addToAdjView={setAdjustmentView} 
        itemName={props.itemName}
        category={props.category}
        menuName={props.menuName}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginBottom: '6%'
  },
});

export default ItemDisplay;