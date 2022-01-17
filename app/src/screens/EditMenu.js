import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

function EditMenu() {
  return (
    <View>
      <View>
        <Text>Add Menu Item</Text>
      </View>
      <View>
        <TextInput placeholder="Item name:"></TextInput>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#E2E2E2",
  },
  itemName: {
    marginRight: 325,
    left: 60,
    backgroundColor: "white",
    height: 30,
    width: 400,
  },
  price: {
    right: 225,
    backgroundColor: "white",
    height: 30,
    width: 150,
  },
  headerView: {
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    height: 1000,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  inputField: {
    left: 50,
    padding: 20,
    flexDirection: "row",
    height: 800,
    justifyContent: "center",
    position: "absolute",
  },
});

export default EditMenu;
