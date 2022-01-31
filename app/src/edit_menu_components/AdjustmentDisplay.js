import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AdjustmentComponent from "./AdjustmentComponent";

function AdjustmentDisplay(props) {
  const [adjustments, setAdjustments] = useState();

  const renderAdjustments = () => {
    setAdjustments(Object.keys(props.adjustments).map(name => <AdjustmentComponent name={name} adjustmentDetails={props.adjustments[name]} />));
  }

  useEffect(() => {
    renderAdjustments()
  }, [])

  return (
    <View style={styles.background}>
        {adjustments}
        {/* <Button title="Helo" onPress={() => console.log(Object.keys(props.adjustments))} /> */}
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