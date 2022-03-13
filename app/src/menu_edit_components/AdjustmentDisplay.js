import React, {useState, useEffect, useLayoutEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import { AddAdjustmentElementPopUp,EditElementPopUp, EditAdjustmentFieldPopUp  } from "./EditMenuPopUps.js" 
import { getItemData } from "../database/menu-data-utility";
import global from "../global_information/global";

// This displays the extra's prices and names in a scroll view manner:

// props.name -> adjustment id passed into this component:

function AdjustmentDisplay(props) {
  // Sets the adjustment views - showing all user's adjustments:
  // Adjustment state:
  const [adjustmentElements, setAdjustmentElements] = useState(null);

  const renderAdjustmentElement = () => {
    const adjustmentIdList = Object.keys(global.adjustments[props.name]['factors']);
    // Mapping a list of adjustment ids to components:
    setAdjustmentElements(
      adjustmentIdList.map(name =>
        <EditElementPopUp 
          key={name} 
          name={name}
          adjName={props.name}
          updateScreen={setAdjustmentElements}
        />
      )
    )
  }

  useLayoutEffect(() => {
    renderAdjustmentElement();
  }, [])


  return (
    <View style={styles.background}>
      <EditAdjustmentFieldPopUp 
        name={props.name}
        updateAdjustmentDisplay={props.updateAdjustmentDisplay}
        />
      
      {/* Scroll view for adjustments: */}
      <View style={{
        justifyContent: 'center',
        marginTop: '1%',
        height: '60%',
        marginBottom: '8%',
      }}>
        {/* Scroll box that displays all the adjustments */}
        <ScrollView
          horizontal={true}
          style={{
            alignSelf: 'center',
            backgroundColor: '#E6F3E6',
            width: '65%',
            right: '45%',
          }}
        >
          {adjustmentElements}

        </ScrollView>
        {/* Add element button: */}
        <AddAdjustmentElementPopUp
          // Pass in the adjustment id
          name={props.name}
          updateScreen={setAdjustmentElements}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginBottom: '2.2%'
  },
});

export default AdjustmentDisplay;