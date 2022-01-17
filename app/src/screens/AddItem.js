import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox, Icon } from "react-native-elements";

function AddItemScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View>
            <Text style={styles.buttonText}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Heading */}
      <View style={styles.heading}>
        <Text style={styles.headingText}>Add Menu Item</Text>
      </View>

      {/* Create new Product + Price */}
      {/* Going to need some way to store this, onChangeText? */}

      <View style={styles.newProduct}>
        <TextInput style={styles.textInput} placeholder="Menu Item"></TextInput>

        <TextInput
          style={styles.numberInput}
          placeholder="$0.00"
          keyboardType="numeric"
        ></TextInput>
      </View>

      <View flexDirection="row">
        <CheckBox
          type="checkbox"
          name="variantCheck"
          id="variantCheck"
          className="filled-in"
          title="This product has multiple options (e.g, sizes, flavours, colours)"
          onPress={() => setShouldShow(!shouldShow)}
        />
      </View>
      {shouldShow ? (
        <View>
          <Text>OPTIONS</Text>

          <View flexDirection="row">
            <TextInput placeholder="Description " />
            <TextInput placeholder="Price " />
            <TouchableOpacity>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <View>
                <Text>Add another option</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* Modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
  },
  logo: {
    marginTop: 25,
  },
  newProduct: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
  },
  textPos: {
    alignItems: "flex-start",
  },
  textInput: {
    fontSize: 25,
    backgroundColor: "#EBEEEC",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  numberInput: {
    fontSize: 25,
    backgroundColor: "#EBEEEC",
    textAlign: "center",
    marginLeft: 50,
  },
  backButton: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "grey",
    left: 5,
    top: 30,
    position: "absolute",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    marginTop: 50,
  },
  headingText: {
    color: "black",
    fontSize: 50,
    fontWeight: "400",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddItemScreen;
