import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import { Isao } from "react-native-textinput-effects";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addCategory } from "../database/firebase-utility";
import { getMenuCategoryId } from "../database/menu-data-utility";

const AddCategoryPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState(null);

  return (
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
            <Text style={
                  { color: '#8BC34A', 
                  fontSize: 30, 
                  fontWeight: 'bold' 
                  }}
                > New Menu Category
            </Text>

            <Isao
              label={'New Category Name'}
              // this is applied as active border and label color
              activeColor={'#C8E6C9'}
              // active border height
              borderHeight={8}
              inputPadding={30}
              labelHeight={25}
              onChangeText={newText => setCategoryName(newText)}
              style={{
                width: Dimensions.get('screen').width/6.7,
                alignItems: 'center',
                position: 'absolute',
                top: '35%',
              }}
              // this is applied as passive border and label color
              passiveColor={'#dadada'}
            />
            
            <View style={{ marginTop: '30%' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                // Need async to access firebase:
                onPress={() => {
                  const categoryArray = getMenuCategoryId(props.menuName);
                  if (categoryName == null) {
                    alert('Enter a valid name!')
                  } else if (categoryArray.includes(categoryName)) {
                    alert('Category already exists!')
                  } else {
                    setModalVisible(!modalVisible);
                    addCategory(props.menuName, categoryName);
                    setCategoryName(null);
                  }
                }}
              >
                <Text style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 25,
                }}>
                  Add
                </Text>
              </Pressable>
            </View>
            <Ionicons style={styles.cancelButton} name='close' size={50} onPress={() => setModalVisible(!modalVisible)} /> 
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.addItemButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add Category</Text>
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
    height: Dimensions.get('screen').height/3,
    width: Dimensions.get('screen').width/3,
  },
  button: {
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#7986CB",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  addItemButton: {
    backgroundColor: '#8BC34A',
    position: 'absolute',
    borderRadius: 10,
    paddingHorizontal: 26,
    left: 280
  },
  cancelButton: {
    color: 'red', 
    position: 'absolute',
    alignSelf: 'flex-end', 
    marginRight: '5%', 
    marginTop: '3%'
  },
});

export default AddCategoryPopUp;