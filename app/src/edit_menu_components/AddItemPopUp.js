import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMenuCategoryId } from "../database/firebase-utility";
import DropDownPicker from "react-native-dropdown-picker";

const AddItemPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemObj, setItemObj] = useState({});

  // New menu information:
  const [itemName, setItemName] = useState('');

  const setCategories = async () => {
    let catArray = await getMenuCategoryId(props.menuName).then((data) => { return data; });
    for (let i = 0; i < catArray.length; i++) {
      const obj = {};
      obj['label'] = catArray[i];
      obj['value'] = (catArray[i] + "").toUpperCase();
      setItems(old => [...old, obj]);
    }
  }

  // For dropdown:
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
          <View style={styles.modalView}>
            <Text style={
              { color: '#8BC34A', 
              fontSize: 35, 
              fontWeight: 'bold' 
              }}
            > New Menu Item </Text>

            {/* View for taking input of item name: */}
            <View style={
              { marginTop: '4%', 
                marginLeft: '4%', 
                alignSelf: 'flex-start', 
                flexDirection: 'row',
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}> Item Name: </Text>
              <TextInput 
                style={styles.nameInput} 
                placeholder="Enter Item Name" 
                width={200} textAlign="center" 
                value={itemName}
                onChangeText={newText => setItemName(newText)}
              />
              <Button title="Get" onPress={() => getMenuCategoryId(props.menuName).then((data) => console.log(data))}/>
            </View>
            
            {/* This is for menu dropdown */}
            <View style={{
              marginTop: '4%',
              flexDirection: 'row',
              marginLeft: '4%', 
              alignSelf: 'flex-start', 
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Item Category:</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                fontSize={20}
                style={{
                  width: 250,
                  marginLeft: '3%',
                  height: 40
                }}
              />
            </View>
            <Ionicons style={styles.cancelButton} name='close' size={50} onPress={() => setModalVisible(!modalVisible)} /> 
          </View>
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
    margin: 20,
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
    height: 600,
    width: 900,
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
  }
});

export default AddItemPopUp;