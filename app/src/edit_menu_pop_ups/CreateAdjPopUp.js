import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMenuCategoryId } from "../database/firebase-utility";
import DropDownPicker from "react-native-dropdown-picker";
import { Triangle } from "./Triangle";

// This is the pop up for adding new adjustment factors onto a menu item:

export const CreateAdjPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemObj, setItemObj] = useState({});

  // New menu information:
  const [itemName, setItemName] = useState('');

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.triangleCustom}>
            <Triangle />
          </View>
          {/* Modal view: */}
          <View style={styles.modalView}>
            <Text style={
              { color: '#8BC34A', 
              fontSize: 20, 
              fontWeight: 'bold' 
              }}
            >New Adjustment</Text>
            <Ionicons style={styles.cancelButton} name='close' size={50} onPress={() => {
              setModalVisible(!modalVisible)
              props.moveBack()
            }} /> 
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.openPopUpButton}
        onPress={() => {
          setModalVisible(true) 
          props.moveFunc()
        }}
      >
        <Text style={styles.textStyle}> + New </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#DCEDC8",
    padding: 35,
    alignItems: "center",
    position: 'absolute',
    height: Dimensions.get('screen').height/1.4,
    width: 350,
    position: 'absolute',
    right: '2%',
    top: Dimensions.get('screen').height/8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  cancelButton: {
    color: 'red', 
    position: 'absolute',
     alignSelf: 'flex-end', 
     marginRight: '5%', 
     marginTop: '3%'
  },
  nameInput: {
    fontSize: 25,
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
  },
  formElement: {
    marginTop: '4%',
    marginLeft: '4%', 
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  openPopUpButton: {
    backgroundColor: '#D9E3F0', 
    width: 500,
    height: 20, 
    alignSelf: 'center',
    borderRadius: 20,
  },
  triangleCustom: {
    position: 'absolute',
    right: '7%',
  }
});