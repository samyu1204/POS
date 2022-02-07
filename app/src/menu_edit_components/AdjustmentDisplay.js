import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import { AdjustmentDisplayElement } from "./EditMenuComponents";
import { AddAdjustmentElementPopUp } from "./EditMenuPopUps.js" 

// This displays the extra's prices and names in a scroll view manner:

// Props will take in the adjustment object and if it is null then just produce 
// a normal adjustment field:

function AdjustmentDisplay(props) {
  // Render function:
  const renderFunc = () => {
    return Object.keys(props.adjustmentFields).map(name =>
     <AdjustmentDisplayElement 
        key={name} 
        adjustmentName={name} 
        adjustmentCost={props.adjustmentFields[name]}
      />
    )
  }

  // Sets the adjustment views - showing all user's adjustments:
  // Adjustment state:
  const [adjustmentElements, setAdjustmentElements] = useState(renderFunc());

  return (
    <View style={styles.background}>
      <TouchableOpacity 
          style={editMenuStyles.adjustmentNameBox}
          onPress={() => console.log('HELLO')}
        >
          <Text style={{
            alignSelf: 'center',
            fontSize: 23,
            fontWeight: 'bold'
          }}>
            {props.adjustmentName}
          </Text>
      </TouchableOpacity>

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
            right: '50%',
          }}
        >
          {adjustmentElements}
        </ScrollView>
        {/* Add element button: */}
        <AddAdjustmentElementPopUp
          itemName={props.itemName}
          category={props.category}
          menuName={props.menuName}
          adjName={props.adjustmentName}
          addElementToView={setAdjustmentElements}
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