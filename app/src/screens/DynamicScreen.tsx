import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox, Icon } from "react-native-elements";

function DynamicScreen() {
  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = useState(""); // our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = useState(1); // all our input fields are tracked with this array
  const refInputs = useRef<string[]>([textValue]);
  const [shouldShow, setShouldShow] = useState(true);

  const setInputValue = (index: number, value: string) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  };
  const addInput = () => {
    refInputs.current.push("");
    setNumInputs((value) => value + 1);
  };

  const removeInput = (i: number) => {
    refInputs.current.splice(i, 1)[0];
    setNumInputs((value) => value - 1);
  };

  const inputs: JSX.Element[] = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={styles.row}>
        <Text style={{ fontSize: 25, padding: 15 }}>{i + 1}.</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="Type"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="Price"
        />
        <Pressable onPress={() => removeInput(i)} style={styles.button}>
          <AntDesign name="minuscircleo" size={35} color="red" />
        </Pressable>
      </View>
    );
  }
  console.log(refInputs);
  return (
    <ScrollView style={styles.container}>
      {inputs}
      <Pressable onPress={addInput} style={styles.addButton}>
        <Text>+ Add another option</Text>
      </Pressable>
      <View style={{ marginTop: 25 }}>
        <Text>Entered options: </Text>
        {refInputs.current.map((value, i) => {
          return <Text key={i}>{`${i + 1} - ${value}`}</Text>;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    textAlign: "left",
    fontSize: 20,
    borderRadius: 10,
    paddingVertical: 14,
    paddingRight: 150,
    paddingLeft: 25,
    backgroundColor: "white",
    margin: 8,
    color: "black",
  },
  addButton: {
    textAlign: "left",
    fontSize: 20,
    width: "13.5%",
    borderRadius: 5,
    paddingVertical: 14,
    paddingLeft: 20,
    paddingRight: 0,
    backgroundColor: "white",
    margin: 8,
    color: "black",
  },
  button: {
    position: "absolute",
    paddingTop: 17,
    right: 400,
  },
});
export default DynamicScreen;
