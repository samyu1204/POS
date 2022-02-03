import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Kaede } from "react-native-textinput-effects";

export function AdjElementField(props) {
    const [price, setPrice] = useState();

    return (
        <View style={styles.background}>
          
          <Kaede
            label={props.name}
            labelStyle={{color: '#03A9F4', backgroundColor: '#BBDEFB'}}
            inputPadding={16}
            style={{width: '60%', top: '2%'}}
            onChange={(num) => {setPrice(num)}}
          />

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#DCEDC8",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fieldText: {
      fontSize: 20,
      color: 'black'
    }
});
