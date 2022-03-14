import React, {useState, useLayoutEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from "react-native";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import AdjustmentDisplay from "./AdjustmentDisplay";
import { AddAdjustmentPopUp, EditItemPopUp } from "./EditMenuPopUps";

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
      <View style={styles.item}>
        <EditItemPopUp 
          itemId={props.itemId}
          catId={props.catId}
          updateScreen={props.updateScreen}
        />
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
    marginBottom: '6%',
  },
  item: {
    marginBottom: (Dimensions.get('screen').height) / 25,
    marginTop: (Dimensions.get('screen').height) / 40,
  }
});

export default ItemDisplay;