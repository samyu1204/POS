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
  editAdjustmentField,
  addNewAdjElement,
  deleteAdjstField
} from "../database/firebase-utility";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AdjustmentDisplay from "./AdjustmentDisplay";
import global from "../global_information/global";
import { getItemData } from "../database/menu-data-utility";

// =============================================================================================================================
//                =================================== Pop - Ups =======================================
// =============================================================================================================================

// EditElementPopout is the displayed addon elements!!!!
// props.adjName - name of the adjustment field 
// props.name - name of the adjustment element
export const EditElementPopUp = (props) => {
  const adjstData = global.adjustments[props.adjName];

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(adjstData['factors'][props.name]['name']);
  const [cost, setCost] = useState(adjstData['factors'][props.name]['price']);

  const renderUpdate = () => {
    const adjElementIdList = Object.keys(global.adjustments[props.adjName]['factors']);
    props.updateScreen(() => {
      return adjElementIdList.map(name =>
        <EditElementPopUp 
          key={name} 
          name={name}
          adjName={props.adjName}
          updateScreen={props.updateScreen}
        />)
    });
  }

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
            
            {/* Editing the element name and cost: */}
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => {
                if (props.adjName !== name || Number(props.adjCost) !== cost) {
                  const pos = 0; // also need to consider updating the position factor:
                  // Edit the adjustment fields:
                  editAdjustmentElement(props.adjName, props.name, name, cost, pos);
                  // Updating screen:
                  renderUpdate();
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
                  // Delete the corresponding element:
                  deleteAdjustmentElement(props.adjName, props.name);
                  // Updating screen:
                  renderUpdate();
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
              {adjstData['factors'][props.name]['name']}
            </Text>
            <Text style={editMenuStyles.adjustmentElementCost}>
              + {Number(adjstData['factors'][props.name]['price']).toFixed(2)}
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
  const [name, setName] = useState(global.adjustments[props.adjFieldId]['name'])

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

            {/* Edit adjustment field name */}
            <Pressable
              style={[modalStyles.editAdjustmentFieldApplyButton]}
              onPress={() => {
                if (props.adjField !== name) {
                  // Update name of adjustment
                  editAdjustmentField(name, props.adjFieldId);
                  // Re-render:
                  props.updateAdjustmentDisplay();
                } else {
                  alert('Something went wrong!')
                }
                setModalVisible(!modalVisible);
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
                onPress={() => {
                  deleteAdjstField(props.adjFieldId, props.itemId);
                  // Re-render:
                  props.updateAdjustmentDisplay();
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

      <Pressable
        style={editMenuStyles.editAdjustmentNameBox}
        onPress={() => setModalVisible(true)}
        
      >
        <Text style={{
          fontSize: 25,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
          {global.adjustments[props.adjFieldId]['name']}
        </Text>
      </Pressable>

    </View>
  );
}

// Pop up to add an adjustment element:
// Props passed in is the adjustment id
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
                  const newObj = {name: name, price: parseInt(cost), pos: 2};
                  // Add the new adjustment factor:
                  const newId = addNewAdjElement(props.name, newObj);

                  // Note name here is an id
                  props.updateScreen((prev) => [...prev, <EditElementPopUp 
                                                            key={newId} 
                                                            name={newId}
                                                            adjName={props.name} // adjustment name
                                                            updateScreen={props.updateScreen}
                                                          />])
                  setModalVisible(!modalVisible);
                } else {
                  alert('Something went wrong!')
                }
              }}>
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
                  // Add the new adjustment field:
                  addNewAdjustmentField(props.itemId, adjName);
                  props.updateAdjustmentDisplay();
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

