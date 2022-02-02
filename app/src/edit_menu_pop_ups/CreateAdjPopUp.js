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

  // Input fields:
  const [adjName, setAdjName] = useState();

  // Price key value tags:
  const [keys, setKeys] = useState();
  const [keyValue, setKeyValue] = useState();

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

          {/* Modal view: */}
          <View style={styles.modalView}>
            <Triangle />
            <Text style={{
              fontSize: 30,
              color: '#81C784',
              fontWeight: 'bold'
            }}>
              New Adjustment
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center', top: '8%'}}>
              <View style={{flex: 1, height: 1, backgroundColor: '#194D33'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center', color: '#194D33'}}>XXXXX</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: '#194D33'}} />
            </View>

            <View style={styles.displayView}>
              <Text style={styles.displayText}>Adjustment Name:</Text>
              <TextInput 
                style={styles.displayText} 
                placeholder="Enter Adjustment Name" 
                width={200} 
                value={adjName}
                onChangeText={newText => setAdjName(newText)}
              />
            </View>

            <View style={styles.displayView}>
              <Text style={styles.displayText}>Fields :</Text>
              <TextInput 
                style={styles.displayText} 
                placeholder="Enter Keys Separated With Spaces" 
                width={200} 
                value={adjName}
                onChangeText={newText => setAdjName(newText)}
              />

            </View>

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
    borderRadius: 25
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
  displayView: {
    marginTop: '15%',
    alignSelf: 'flex-start',
    alignSelf: 'center'
  },
  displayText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});