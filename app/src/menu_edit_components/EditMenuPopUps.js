import React, {useState, useEffect} from "react";
import { 
  View, 
  Text, 
  Dimensions,
  Alert,
  Modal,
  Pressable,
  Button
} from "react-native";
import { editMenuStyles, modalStyles } from "../styles/EditMenuStyleSheet";
import { Kohana } from "react-native-textinput-effects";
import { addNewAdjustmentElement, addNewAdjustmentField } from "../database/firebase-utility";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AdjustmentDisplay from "./AdjustmentDisplay";
import { AdjustmentDisplayElement } from "./EditMenuComponents";
import global from "../global_information/global";
// =============================================================================================================================
//                =================================== Pop - Ups =======================================
// =============================================================================================================================

// Pop up to add an adjustment element:
export const AddAdjustmentElementPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [cost, setCost] = useState(null);

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute'
    }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.newVariantModalView}>

            <View style={modalStyles.modalHeading}>
              <Text style={modalStyles.modalText}>New Variant</Text>
            </View>

            <View style={{flexDirection: 'row', width: 300}}>
              <Kohana
                  style={{ 
                    backgroundColor: '#f9f5ed', 
                    top: '-20%',
                    borderRadius: 15,
                    right: '2%'
                  }}
                  label={'Name:'}
                  iconClass={Ionicons}
                  iconName={'pencil'}
                  iconColor={'#f4d29a'}
                  inputPadding={16}
                  labelStyle={{ color: '#BEB38B' }}
                  inputStyle={{ color: '#BEB38B' }}
                  labelContainerStyle={{ padding: 2 }}
                  iconContainerStyle={{ padding: 16 }}
                  useNativeDriver
                  onChangeText={(text) => setName(text)}
                />

                <Kohana
                  style={{ 
                    backgroundColor: '#f9f5ed', 
                    top: '-20%',
                    borderRadius: 15,
                    left: '2%',
                  }}
                  keyboardType = 'numeric'
                  label={'Price:'}
                  iconClass={FontAwesome5}
                  iconName={'money-bill-wave'}
                  iconColor={'#f4d29a'}
                  inputPadding={16}
                  labelStyle={{ color: '#BEB38B' }}
                  inputStyle={{ color: '#BEB38B' }}
                  labelContainerStyle={{ padding: 2 }}
                  iconContainerStyle={{ padding: 8 }}
                  useNativeDriver
                  onChangeText={(text) => setCost(text)}
                />
              
            </View>
            <Button title="Map" onPress={() => console.log(global.menuMap)} />
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => {
                if (name !== null && cost !== null) {
                  const newObj = {name: name, cost: cost};
                  addNewAdjustmentElement(props.menuName, props.itemName, props.category, props.adjName, newObj);
                  props.addElementToView((prev) => [...prev, <AdjustmentDisplayElement 
                                                      key={name} 
                                                      adjustmentName={name} 
                                                      adjustmentCost={cost}
                                                    />])
                  setModalVisible(!modalVisible);
                } else {
                  alert('Something went wrong!')
                }
              }}
            >
              <Text style={modalStyles.textStyle}>Add</Text>
            </Pressable>

            <Ionicons style={modalStyles.cancelButton} name='close' size={40} onPress={() => {
              setModalVisible(!modalVisible);
            }} /> 
          </View>
        </View>
      </Modal>

      <Pressable
        style={{
          backgroundColor: '#47B7F4',
          width: '200%',
          height: '85%',
          borderRadius: 15,
          left: Dimensions.get('screen').width/1.9
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={editMenuStyles.addElementButton}>+</Text>
      </Pressable>
    </View>
  );
};

// Pop up to add an adjustment field:
export const AddAdjustmentPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [adjName, setAdjName] = useState(null);
  return (
    <View style={modalStyles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalHeading}>
              <Text style={modalStyles.modalText}>New Adjustment</Text>
            </View>

            <Kohana
                style={{ 
                  backgroundColor: '#f9f5ed', 
                  position: 'absolute', 
                  width: '25%',
                  top: Dimensions.get('screen').height/8,
                  borderRadius: 15
                }}
                label={'Enter:'}
                iconClass={Ionicons}
                iconName={'pencil'}
                iconColor={'#f4d29a'}
                inputPadding={16}
                labelStyle={{ color: '#BEB38B' }}
                inputStyle={{ color: '#BEB38B' }}
                labelContainerStyle={{ padding: 2 }}
                iconContainerStyle={{ padding: 16 }}
                useNativeDriver
                onChangeText={(text) => setAdjName(text)}
              />

            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => {
                if (adjName !== null) {
                  addNewAdjustmentField(props.menuName, props.itemName, props.category, adjName);
                  props.addToAdjView((prev) => [...prev, <AdjustmentDisplay 
                                                            key={adjName} 
                                                            adjustmentName={adjName} 
                                                            adjustmentFields={{}} 
                                                            itemName={props.itemName}
                                                            category={props.category}
                                                            menuName={props.menuName}

                                                          />])
                  setModalVisible(!modalVisible);
                } else {
                  alert('Something went wrong!')
                }
              }}
            >
              <Text style={modalStyles.textStyle}>Add</Text>
            </Pressable>

            <Ionicons style={modalStyles.cancelButton} name='close' size={40} onPress={() => {
              setModalVisible(!modalVisible);
            }} /> 
          </View>
        </View>
      </Modal>
      <Pressable
        style={[modalStyles.button, modalStyles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={modalStyles.textStyle}>+ New Adjustment</Text>
      </Pressable>
    </View>
  );
};