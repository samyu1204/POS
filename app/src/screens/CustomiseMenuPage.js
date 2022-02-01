import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import { getUserData, addData, getMenuMap } from "../database/firebase-utility";
import { addUser } from "../database/firebase-utility";
import { getMenuData } from "../database/firebase-utility";
import global from "../global_information/global";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from "react-native-gesture-handler";
import { addMenuItem, removeMenu } from "../database/firebase-utility";
import MenuCategoryDisplay from "../edit_menu_components/MenuCategoryDisplay";
import AddItemPopUp from "../edit_menu_components/AddItemPopUp";

// Stores temporarily the menu map:
let menuMap = null;

function CustomiseMenuPage({ route, navigation }) {
  // Have a component that handles each category of menu
  // Read from the map of categories then add it to a useState
  const [categoryDisplays, setCategoryDisplays] = useState();

  const renderCategoryDisplay = async() => {
    await getMenuMap(route.params).then((data) => { menuMap = data }) // fetching data
    const categoryArray = Array.from(menuMap.keys());
    setCategoryDisplays(categoryArray.map(name => {
      if (name !== 'menu_info') {
        return <MenuCategoryDisplay categoryName={name} key={name} categoryObject={menuMap.get(name)} />
      }
    }));
  }

  useEffect(() => {
    renderCategoryDisplay()
  }, [])

  const deleteMenu = () => {
    const index = global.menu_list.indexOf(route.params);
    global.menu_list.splice(index, 1);
    // Remove menu from firebase:
    removeMenu(route.params);
    navigation.goBack();
  
  }

  // Pop-up confirmation:
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are you sure you want to delete this menu?",
      "NOTE: Deleted menus cannot be recovered!",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteMenu()
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ],
    );
  };

  return (
    <View style={styles.background}>
      <View style={{marginTop: '7%', right: '60%'}}>
        <Ionicons style={styles.returnButton} name='arrow-undo-circle-outline' size={50} onPress={() => navigation.goBack()} /> 
      </View>

      <View style={{ position: 'absolute', marginTop: '13%' }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Menu: {route.params}</Text>
      </View>
      
      <View style={styles.menuScrollView}>
        <ScrollView>
          {categoryDisplays}
        </ScrollView>
      </View>

      {/* This view is for  edit button*/}
      <View style={styles.operationButtonView}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => showConfirmDialog()}>
          <Text style={{ fontSize: 30, color: 'white' }}>Delete Menu</Text> 
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.addItemButton} onPress={() => console.log('Button')}>
          <Text style={{ fontSize: 30, color: 'white' }}>Add Item</Text> 
        </TouchableOpacity> */}
        <View style={{ position: 'absolute' }}>
          <AddItemPopUp menuName={route.params} />
        </View>

        <TouchableOpacity style={styles.addCategoryItem} onPress={() => console.log('Button')}>
          <Text style={{ fontSize: 30, color: 'white' }}>Add Category</Text> 
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#D1E3DA",
    justifyContent: 'center',
    flexDirection: 'row'
  },
  menuScrollView: {
    backgroundColor: '#D1E3DA',
    flex: 1,
    top: 300,
    height: '40%',
    position: 'absolute',
    width: 1000,
  },
  returnButton: {
    alignSelf: 'flex-end',
    marginTop: -5,
  },
  operationButtonView: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#F44336',
    borderRadius: 10,
    position: 'absolute',
    right: 300,
    paddingHorizontal: 26
  },
  addItemButton: {
    backgroundColor: '#8BC34A',
    position: 'absolute',
    borderRadius: 10,
    paddingHorizontal: 26
  },
  addCategoryItem: {
    backgroundColor: '#8BC34A',
    borderRadius: 10,
    left: 300,
    paddingHorizontal: 26
  }
});

export default CustomiseMenuPage;
