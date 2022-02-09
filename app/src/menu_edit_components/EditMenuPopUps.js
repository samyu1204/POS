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
import { 
  addNewAdjustmentElement, 
  addNewAdjustmentField,
  editAdjustmentElement,
  deleteAdjustmentElement,
  editAdjustmentField
} from "../database/firebase-utility";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AdjustmentDisplay from "./AdjustmentDisplay";
import global from "../global_information/global";
import { getItemData } from "../database/menu-data-utility";

// =============================================================================================================================
//                =================================== Pop - Ups =======================================
// =============================================================================================================================

// EditElementPopout is the displayed addon elements!!!!
export const EditElementPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(props.adjName);
  const [cost, setCost] = useState(props.adjCost);

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
              <Text style={modalStyles.modalText}>Edit Variant</Text>
            </View>
            
            <View style={{ flexDirection: 'row', width: 330, position: 'absolute' }}>
              <Kohana
                  style={{ 
                    backgroundColor: '#f9f5ed', 
                    top: Dimensions.get('screen').height/8,
                    borderRadius: 15,
                    marginRight: '2%'
                  }}
                  value={name}
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
                    top: Dimensions.get('screen').height/8,
                    borderRadius: 15,
                    marginLeft: '2%'
                  }}
                  keyboardType = 'numeric'
                  value={cost.toString()}
                  iconClass={FontAwesome5}
                  iconName={'money-bill-wave'}
                  iconColor={'#f4d29a'}
                  inputPadding={16}
                  labelStyle={{ color: '#BEB38B' }}
                  inputStyle={{ color: '#BEB38B' }}
                  labelContainerStyle={{ padding: 2 }}
                  iconContainerStyle={{ padding: 16 }}
                  useNativeDriver
                  onChangeText={(text) => setCost(text)}
                />
              </View>

            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => {
                if (props.adjName !== name || Number(props.adjCost) !== cost) {
                  // Usually here would rerender:
                  const newObj = {name: name, cost: cost}
                  editAdjustmentElement(props.menuName, props.itemName, props.category, props.adjField, props.adjName, newObj);
                  // Updating screen:
                  const itemData = getItemData(props.menuName, props.category, props.itemName);
                  const adjustmentArray = itemData['adjustment'][props.adjField];
                  props.updateScreen(() => {
                    return Object.keys(adjustmentArray).map(name =>
                      <EditElementPopUp 
                        key={name} 
                        adjField={props.adjField}
                        adjName={name} 
                        adjCost={adjustmentArray[name]}
                        itemName={props.itemName}
                        category={props.category}
                        menuName={props.menuName}
                        updateScreen={props.updateScreen}
                      />)
                  });
                  setModalVisible(false);
                } else {
                  alert('Fields have not been changed!')
                }
              }}
            >
              <Text style={modalStyles.textStyle}>Apply</Text>
            </Pressable>
            
            <View 
            style={{
              position: 'absolute',
              backgroundColor: '#F8474A',
              borderRadius: 10,
              bottom: 18,
              left: '3%',
              padding: 3
            }}>
              <Ionicons 
                name='trash'
                size={30}
                color='white'
                onPress={() => {
                  deleteAdjustmentElement(props.menuName, props.itemName, props.category, props.adjField, props.adjName)
                  // Updating screen:
                  const itemData = getItemData(props.menuName, props.category, props.itemName);
                  const adjustmentArray = itemData['adjustment'][props.adjField];
                  props.updateScreen(() => {
                    return Object.keys(adjustmentArray).map(name =>
                      <EditElementPopUp 
                        key={name} 
                        adjField={props.adjField}
                        adjName={name} 
                        adjCost={adjustmentArray[name]}
                        itemName={props.itemName}
                        category={props.category}
                        menuName={props.menuName}
                        updateScreen={props.updateScreen}
                      />)
                  });
                }}
                />
            </View>

            <Ionicons 
              style={{
                color: 'red', 
                position: 'absolute',
                alignSelf: 'flex-end', 
                marginRight: '1%', 
                marginTop: '1%'
              }} 
              name='close' 
              size={40} 
              onPress={() => {
              setModalVisible(!modalVisible);
            }} /> 
          </View>
        </View>
      </Modal>

      <View style={{
        justifyContent: 'center',
        marginLeft: Dimensions.get('screen').width/20,
        marginRight: Dimensions.get('screen').width/17
      }}>
        <Pressable
          style={editMenuStyles.adjustmentElement}
          onPress={() => setModalVisible(true)}
          
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={editMenuStyles.adjustmentElementText}>
              {props.adjName}
            </Text>
            <Text style={editMenuStyles.adjustmentElementCost}>
              + {Number(props.adjCost).toFixed(2)}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

// For editing adjustment fields:
export const EditAdjustmentFieldPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(props.adjField)

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
          <View style={modalStyles.editAdjustmentFieldModalView}>
            
            <View style={{
              bottom: '30%'
            }}>
              <Text style={modalStyles.modalText}>Edit Adjustment</Text>
            </View>
          
            <Kohana
                style={{ 
                  backgroundColor: '#f9f5ed', 
                  bottom: '10%',
                  borderRadius: 15,
                  marginRight: '2%'
                }}
                value={name}
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

            <Pressable
              style={[modalStyles.editAdjustmentFieldApplyButton]}
              onPress={() => {
                if (props.adjField !== name) {
                  editAdjustmentField(props.menuName, props.itemName, props.category, props.adjField, name);
                  // Rerender to apply update:
                  const itemData = getItemData(props.menuName, props.category, props.itemName);
                  props.updateAdjustmentDisplay(
                    Object.keys(itemData['adjustment']).map(name =>
                      <AdjustmentDisplay 
                        key={name} 
                        adjustmentField={name} 
                        itemName={props.itemName}
                        category={props.category}
                        menuName={props.menuName}
                        updateAdjustmentDisplay={props.updateAdjustmentDisplay}
                      />
                    )
                  )
                } else {
                  alert('Something went wrong!')
                }
              }}
            >
              <Text style={modalStyles.textStyle}>Apply</Text>
            </Pressable>
            
            <View 
            style={{
              position: 'absolute',
              backgroundColor: '#F8474A',
              borderRadius: 10,
              bottom: '25%',
              left: '15%',
              padding: 3
            }}>
              <Ionicons 
                name='trash'
                size={30}
                color='white'
                onPress={() => console.log('hi')}
                />
            </View>

            <Ionicons 
              style={{
                color: 'red', 
                position: 'absolute',
                alignSelf: 'flex-end', 
                marginRight: '1%', 
                marginTop: '1%'
              }} 
              name='close' 
              size={40} 
              onPress={() => {
              setModalVisible(!modalVisible);
            }} /> 
          </View>
        </View>
      </Modal>

      <Pressable
        style={editMenuStyles.editAdjustmentNameBox}
        onPress={() => setModalVisible(true)}
        
      >
        <Text style={{
          fontSize: 25,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
          {props.adjField}
        </Text>
      </Pressable>

    </View>
  );
}

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
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => {
                if (name !== null && cost !== null) {
                  const newObj = {name: name, cost: cost};
                  // Adjust firebase
                  addNewAdjustmentElement(props.menuName, props.itemName, props.category, props.adjField, newObj);
                  props.updateScreen((prev) => [...prev, <EditElementPopUp 
                                                      key={name} 
                                                      adjField={props.adjField}
                                                      adjName={name} 
                                                      adjCost={cost}
                                                      itemName={props.itemName}
                                                      category={props.category}
                                                      menuName={props.menuName}
                                                      updateScreen={props.updateScreen}
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
                  // Add it to global
                  const menuItem = global.menuMap.get(props.menuName)[props.category][props.itemName];
                  menuItem['adjustment'][adjName.toLowerCase()] = {};
                  props.addToAdjView((prev) => [...prev, <AdjustmentDisplay 
                                                            key={adjName} 
                                                            adjustmentName={adjName} 
                                                            adjustmentField={adjName} 
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

