import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Button } from "react-native";
import { getMenuMap } from "../database/menu-data-utility";
import global from "../global_information/global";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { removeMenu, mapMenusToGlobal } from "../database/firebase-utility";
import { getCategoryData } from "../database/menu-data-utility";
import MenuCategoryDisplay from "../edit_menu_components/MenuCategoryDisplay";
import AddItemPopUp from "../edit_menu_components/AddItemPopUp";
import AddCategoryPopUp from "../edit_menu_components/AddCategoryPopUp";

// Stores temporarily the menu map:
function DisplayMenuScreen({ route, navigation }) {
  // Have a component that handles each category of menu
  // Read from the map of categories then add it to a useState
  
  const firstRender = () => {
    mapMenusToGlobal();
    const tmp = [];
    const menuMap = getMenuMap(route.params);
    Object.keys(menuMap).map(name => {
      if (name !== 'menu_info') {
        tmp.push(<MenuCategoryDisplay categoryName={name} key={name} categoryObject={menuMap[name]} />);
      }
    })
    return tmp;
  }

  const [categoryDisplays, setCategoryDisplays] = useState(firstRender());


  const renderCategoryDisplay = () => {
    const menuMap = getMenuMap(route.params);
    setCategoryDisplays(Object.keys(menuMap).map(name => {
      if (name !== 'menu_info') {
        return <MenuCategoryDisplay categoryName={name} key={name} categoryObject={menuMap[name]} />
      }
    }));
  }
  

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
      <View style={styles.backButton}>
        <Ionicons style={styles.returnButton} name='arrow-undo-circle-outline' size={75} onPress={() => navigation.goBack()} /> 
      </View>
      <View style={styles.editButton}>
        <Ionicons name="pencil" size={70} onPress={() => 
          navigation.navigate(
            'EditMenuScreen', 
            {
              menuCategories: Object.keys(getMenuMap(route.params)),
              menuName: route.params
            }
          )} 
        />
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
        
        {/* Button for adding new item */}
        <AddItemPopUp menuName={route.params} renderMenuItems={renderCategoryDisplay} />
        {/* Button for adding new category */}
        <AddCategoryPopUp menuName={route.params} />
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
    marginTop: -5,
  },
  operationButtonView: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  backButton: {
    position: 'absolute', 
    marginTop: Dimensions.get('screen').height/10,
    left: Dimensions.get('screen').width/10,
  },
  editButton: {
    position: 'absolute', 
    marginTop: Dimensions.get('screen').height/10,
    right: Dimensions.get('screen').width/10,
  }
});

export default DisplayMenuScreen;
