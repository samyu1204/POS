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
        <Text>{i + 1}.</Text>
        <TextInput
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="placeholder"
        />
        <Pressable onPress={() => removeInput(i)}>
          <AntDesign name="minuscircleo" size={20} color="red" />
        </Pressable>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {inputs}
      <Pressable onPress={addInput}>
        <Text>+ Add a new input</Text>
      </Pressable>
      <View>
        <Text>You have answered:</Text>
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
});
export default DynamicScreen;
