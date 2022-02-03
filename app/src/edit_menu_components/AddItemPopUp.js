import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMenuCategoryId } from "../database/firebase-utility";
import DropDownPicker from "react-native-dropdown-picker";
import { CreateAdjPopUp } from "../edit_menu_pop_ups/CreateAdjPopUp";
import AdjustmentComponent from "./AdjustmentComponent";

const AddItemPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemObj, setItemObj] = useState({});

  // New menu information:
  const [itemName, setItemName] = useState('');
  const [basePrice, setBasePrice] = useState();
  
  // This stores array of objects that has key to value
  const [adjustments, setAdjustments] = useState([]);

  // Adjustment list view:
  const [adjView, setAdjView] = useState(null);

  // Sets the drop down list names from firebase:
  const setCategories = async () => {
    let catArray = await getMenuCategoryId(props.menuName).then((data) => { return data; });
    const tmpArray = []
    for (let i = 0; i < catArray.length; i++) {
      const obj = {};
      obj['label'] = catArray[i];
      obj['value'] = catArray[i];
      tmpArray.push(obj);
    }
    setItems(tmpArray);
  }

  const renderAdjustmentList = () => {
    const tmp = {};
    for (let i = 0; i < adjustments.length; i++) {
      for (const [key, value] of Object.entries(adjustments[i])) {
        tmp[key] = value;
      }
    }
    setAdjView(Object.keys(tmp).map(name => 
      <AdjustmentComponent key={name} name={name} adjustmentDetails={tmp[name]} 
    />));
  }

  // Animation
  const ball = new Animated.ValueXY({
    x: Dimensions.get('screen').width/6, 
    y: Dimensions.get('screen').height/8 
  });

  const moveView = () => {
    Animated.timing(ball, {
        toValue: {x: 0, y: Dimensions.get('screen').height/8 },
        duration: 500,
        useNativeDriver: false,
    }).start()
  }

  const returnView = () => {
      Animated.timing(ball, {
          toValue: {x: Dimensions.get('screen').width/6, y: Dimensions.get('screen').height/8},
          duration: 500,
          useNativeDriver: false,
      }).start()
  }

  /**
   * Drop down states:
   *  - open -> open and close dropdown
   *  - 
   */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setCategories()
  }, [])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
      }}>
        <View style={styles.centeredView}>
          {/* Modal view: */}
          <Animated.View  style={[styles.modalView, ball.getLayout()]}>
            <Text style={
              { color: '#8BC34A', 
              fontSize: 35, 
              fontWeight: 'bold' 
              }}
            > New Menu Item </Text>
            {/* View for taking input of item name: */}
            <View style={styles.formElement}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Item Name: </Text>
              <TextInput 
                style={styles.nameInput} 
                placeholder="Enter Item Name" 
                width={200}
                value={itemName}
                onChangeText={newText => setItemName(newText)}
              />
            </View>

            {/* This is for menu dropdown */}
            <View style={styles.formElement}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Item Category:</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                fontSize={20}
                dropDownContainerStyle={
                  { width: 215, 
                    marginLeft: '3%', 
                    backgroundColor: '#BBDEFB',
                     borderColor: 'white' 
                }}
                style={{
                  width: 250,
                  marginLeft: '3%',
                  height: 40,
                  backgroundColor: '#BBDEFB',
                  borderColor: 'white'
                }}
              />
            </View>
              
            {/* Base price */}
            <View style={styles.formElement}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Base Price:</Text>
              <TextInput 
                style={styles.nameInput} 
                placeholder="Enter Base Price" 
                width={200} 
                value={basePrice}
                onChangeText={newText => setBasePrice(newText)}
                keyboardType='number-pad'
              />
            </View>

            {/* Addons Scroll View? */}
            <View style={styles.formElement}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Adjustment:</Text>
            </View>
            
            <View style={{
              alignItems: 'center'
            }}>
              <ScrollView style={{
                height: 200,
                width: 700,
              }}>
                <View>
                  {/* All existing adj views: */}
                  {adjView}
                </View>
                <CreateAdjPopUp 
                  moveFunc={moveView} 
                  moveBack={returnView} 
                  addAdjustmentField={setAdjustments}
                  adjustmentFields={adjustments}
                  renderScreen={renderAdjustmentList}
                />
              </ScrollView>
            </View>

            <Ionicons style={styles.cancelButton} name='close' size={50} onPress={() => setModalVisible(!modalVisible)} /> 
          </Animated.View >
        </View>
      </Modal>

      <Pressable
        style={styles.addItemButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}> Add Item </Text>
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    height: Dimensions.get('screen').height/1.4,
    width: Dimensions.get('screen').width/1.5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  addItemButton: {
    backgroundColor: '#8BC34A',
    position: 'absolute',
    borderRadius: 10,
    paddingHorizontal: 26
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
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
    left: 5
  },
  formElement: {
    marginTop: '4%',
    marginLeft: '4%', 
    flexDirection: 'row',
    alignSelf: 'flex-start',
  }
});

export default AddItemPopUp;