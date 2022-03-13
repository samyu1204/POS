import React, {useState, useEffect, useLayoutEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import AdjustmentDisplay from "./AdjustmentDisplay";
import { AddAdjustmentPopUp } from "./EditMenuPopUps";
import { getItemData } from "../database/menu-data-utility";
import global from "../global_information/global";

function ItemDisplay(props) {
  // Sets the adjustment views - showing all user's adjustments:
  const [adjustmentView, setAdjustmentView] = useState(null);

  const renderAdjustmentDisplay = () => {
    // List of adjustment ids:
    const adjIdList = Object.keys(global.items[props.itemId]['adjustments']);
    setAdjustmentView(
      adjIdList.map(name =>
        <AdjustmentDisplay 
          key={name} 
          name={name} // name - adjustment field id's
          itemId={props.itemId}
          updateAdjustmentDisplay={renderAdjustmentDisplay}
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
            <Text style={editMenuStyles.itemNameText}>{global.items[props.itemId]['name']}</Text>
            <Text style={editMenuStyles.itemBasePriceText}>Base Price: ${global.items[props.itemId]['base_price']}</Text>
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
        itemId={props.itemId}
        addToAdjView={setAdjustmentView}
        updateAdjustmentDisplay={renderAdjustmentDisplay}
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