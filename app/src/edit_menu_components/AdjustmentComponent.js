import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AdjustmentElement from "./AdjustmentElement";

function AdjustmentComponent(props) {
    const [adjElement, setAdjElement] = useState();

    const renderElements = () => {
        setAdjElement(Object.keys(props.adjustmentDetails).map(name => <AdjustmentElement key={name} name={name} price={props.adjustmentDetails[name]} />));
      }
    
      useEffect(() => {
        renderElements()
      }, [])

    return (
        <View style={styles.background}>
            <Text style={{ fontSize: 20, color: 'white' }}> {props.name} </Text>
            {adjElement}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#9493EE",
        marginLeft: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '1%',
    },
});

export default AdjustmentComponent;