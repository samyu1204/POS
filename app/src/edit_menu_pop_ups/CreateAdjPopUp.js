import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, TouchableOpacity, Dimensions, ScrollView, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AdjElementField } from "./AdjElementField";

// This is the pop up for adding new adjustment factors onto a menu item:

export const CreateAdjPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Store AdjElementFields:
  const [element, setElement] = useState(null);

  // Adjustment field name:
  const [adjName, setAdjName] = useState(null);

  // Price key value tags:
  const [keys, setKeys] = useState([]);
  const [keyValue, setKeyValue] = useState([]); // array of objects 

  // This is for resetting the text input field:
  const [holder, setHolder] = useState();

  const reset = () => {
    setElement(null);
    setAdjName(null);
    setKeys([]);
    setKeyValue([]);
    setHolder()
  }

  const checkNameRep = () => {
    for (let i = 0; i < props.adjustmentFields.length; i++) {
      for (const value of Object.keys(props.adjustmentFields[i])) {
        const str1 = String(value).toLowerCase();
        const str2 = String(adjName).toLowerCase();
        if (str1 === str2) return true;
      }
    }
    return false;
  }

  const arrayToAdjObj = () => {
    const adjObject = {};
    const content = {};
    if (keyValue.length === 0 || adjName === null) return null;
    for (let i = 0; i < keyValue.length; i++) {
      for (const [key, value] of Object.entries(keyValue[i])) {
        if (typeof value !== 'number') {
          return null;
        }
        content[key] = value;
      }
    }
    adjObject[adjName] = content;
    return adjObject;
  }

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
                style={{fontSize: 18, alignSelf: "center"}} 
                placeholder="Enter Adjustment Name" 
                width={200} 
                value={adjName}
                onChangeText={newText => setAdjName(newText)}
              />
            </View>

            <View style={styles.displayView}>
              <Text style={styles.displayText}>Fields:</Text>
              <TextInput 
                style={{
                  fontSize: 16
                }} 
                placeholder="Enter keys separated with commas." 
                value={holder}
                width={280} 
                onChangeText={newText => {
                  setKeys(newText.split(',').map((tmp) => { return tmp.trim() }));
                  setHolder(newText)
                }}
              />
              <Button title="Set Field Values" onPress={() => {
                setElement(keys.map(name => {
                  if (name) { return <AdjElementField name={name} key={name} func={setKeyValue} keyValues={keyValue} /> };
                }))
              }} />
            </View>

            <Text style={{ marginTop: '15%', fontSize: 25, fontWeight: 'bold' }}>Field Values:</Text>

            <ScrollView style={{
              marginTop: '5%'
            }}>
              {element}
            </ScrollView>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity 
                onPress={() => {
                  if (checkNameRep() === true) {
                    alert('Already exists!')
                  } else if (arrayToAdjObj() === null) {
                    alert('Something went wrong!')
                  } else {
                    props.addAdjustmentField((prev) => [...prev, arrayToAdjObj()]);
                    props.renderScreen();
                    reset()
                  }
                }}
                style={{
                  backgroundColor: '#E91E63', 
                  paddingHorizontal: 20, 
                  borderRadius: 10
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  backgroundColor: '#FFB74D', 
                  paddingHorizontal: 20, 
                  borderRadius: 10,
                  left: '40%'
                }}
                onPress={() => {props.renderScreen()}}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Update</Text>
              </TouchableOpacity>
            </View>

            <Ionicons style={styles.cancelButton} name='close' size={40} onPress={() => {
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
    height: 50
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
    borderRadius: 25,
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