import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import AdjustmentComponent from "./AdjustmentComponent";

function AdjustmentDisplay(props) {
  const renderFunc = () => {
    return Object.keys(props.adjustments).map(name => <AdjustmentComponent key={name} name={name} adjustmentDetails={props.adjustments[name]} />)
  }

  const [adjustments, setAdjustments] = useState(renderFunc());

  return (
    <View style={styles.background}>
        {adjustments}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#B6B9B7",
    marginLeft: '2%'
  },

});

export default AdjustmentDisplay;