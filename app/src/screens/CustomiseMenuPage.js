import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getUserData, addData, getMenuMap } from "../database/firebase-utility";
import { addUser } from "../database/firebase-utility";
import { getMenuData } from "../database/firebase-utility";
import global from "../global_information/global";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { addMenuItem } from "../database/firebase-utility";
import MenuCategoryDisplay from "../edit_menu_components/MenuCategoryDisplay";

// Stores temporarily the menu map:
let menuMap = null;

function CustomiseMenuPage({ route, navigation }) {
  // Have a component that handles each category of menu
  // Read from the map of categories then add it to a useState
  const [categoryDisplays, setCategoryDisplays] = useState();

  const renderCategoryDisplay = async() => {
    await getMenuMap(route.params).then((data) => { menuMap = data }) // fetching data
    const categoryArray = Array.from(menuMap.keys());
    setCategoryDisplays(categoryArray.map(name => <MenuCategoryDisplay categoryName={name} key={name} categoryObject={menuMap.get(name)} />));
  }

  useEffect(() => {
    renderCategoryDisplay()
  }, [])

  return (
    <View style={styles.background}>
      <View style={{marginTop: '7%', right: '60%'}}>
        <Ionicons style={styles.returnButton} name='arrow-undo-circle-outline' size={50} onPress={() => navigation.goBack()} /> 
      </View>

      <View style={{ position: 'absolute', marginTop: '13%' }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Menu: {route.params}</Text>
        {/* <Button title="Get OBJ" onPress={() => console.log(Array.from(menuMap.keys()))} />
        <Button title="Get Map Object" onPress={() => console.log(menuMap) } /> */}
      </View>
      
      <View style={styles.menuScrollView}>
        <ScrollView>
          {categoryDisplays}
        </ScrollView>
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
  }
});

export default CustomiseMenuPage;
