import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity} from "react-native";
import { ItemButton } from '../utility/ItemButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import App from '../ordering_components/CheckBox';
import CheckBox from "../ordering_components/CheckBox";

export const OrderPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(props.foodItem["basePrice"]);
  const shown = [];
  const addItem = props.func;

  const setItemPrice  = (priceChange) => {
    setPrice(price + priceChange);
    props.foodItem["price"] = price + priceChange;
  }

  const resetPrice = (item) => {
    setPrice(item["basePrice"])
  }
  const resetItem = (item) => {
    setPrice(item["basePrice"]);
    let adjustments = item['adjustment'];
    item["price"] = item["basePrice"];

    let counter = 0;
    for (const adjustmentType in adjustments) {
      
      let buttons = []
      let counter2 = 0;
      for (const options in adjustments[adjustmentType]) {
        
      adjustments[adjustmentType][options]["picked"]=false;
      }
    }
  } 

  let adjustments = props.foodItem['adjustment'];

  let counter = 0;
  for (const adjustmentType in adjustments) {
    
    let buttons = []
    let counter2 = 0;
    for (const options in adjustments[adjustmentType]) {
      buttons.push(<CheckBox key={counter+" "+counter2} name={options} pointer={adjustments[adjustmentType][options]} setter={setItemPrice}></CheckBox>)
      counter2++;
    }
    shown.push(
      <View key={counter+ "  " +counter2}>
        <Text style={styles.optionName}>{adjustmentType}: </Text>
        <View>{buttons}</View>
      </View>)
    counter++;
  }

  return (
    <View>
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
            {/* APPEARS ON THE SCREEN */}
            <Text style={styles.titleText}>{props.foodItem["name"]}      ${price}</Text>
            <View>{shown}</View>
            <Ionicons style={styles.cancelButton} name='close' size={50} 
              onPress={() => {
                setModalVisible(!modalVisible)
                resetItem(props.foodItem)
              }}/> 
            <TouchableOpacity style={styles.addItemButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                addItem(props.foodItem);
                resetPrice(props.foodItem);
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>ADD Item</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>      
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)
        }
      >
        <Text style={styles.textStyle}>{props.foodItem["name"]}:    ${props.foodItem["basePrice"]}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 50,
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
    width: Dimensions.get('screen').width/1.7,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  titleText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
  cancelButton: {
    color: 'red', 
    position: 'absolute',
     alignSelf: 'flex-end', 
     marginRight: '5%', 
     marginTop: '3%'
  },
  addItemButton: {
    backgroundColor: '#FFB74D', 
    paddingHorizontal: 40, 
    paddingVertical: 10,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    marginBottom: '1%'
  },
  optionName: {
    fontSize: 22,
    fontWeight: "bold",
  }
  
});

