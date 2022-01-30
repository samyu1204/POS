import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getUserData, addData } from "../database/firebase-utility";
import { addUser } from "../database/firebase-utility";
import { getMenuData } from "../database/firebase-utility";
import global from "../global_information/global";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { addMenuItem } from "../database/firebase-utility";
import MenuCategoryDisplay from "../edit_menu_utility/MenuCategoryDisplay";
import global_menu from "../global_information/global_menu";

function CustomiseMenuPage({ route, navigation }) {
  // Have a component that handles each category of menu
  // Read from the map of categories then add it to a useState

  return (
    <View style={styles.background}>
      <View style={{marginTop: '7%', right: '60%'}}>
        <TouchableOpacity style={styles.returnButton}>
          <Ionicons name='arrow-undo-circle-outline' size={50}/> 
        </TouchableOpacity>
      </View>
      {/* <View style={{top: -200}}>
        <Button title='hello' onPress={() => console.log(route.params)} />
        <Button title='Add Menu Item' onPress={() => addMenuItem('Delux Fried Rice', 10, {size: {small: 0, medium: 0.5, large: 0.5}, spice: {'little spice' : 0.5, spicy: 0.8, hot: 1}})} />
      </View> */}
      
      <View style={styles.menuScrollView}>
        <ScrollView>
          <MenuCategoryDisplay key={route.params} />
          <Text>{route.params}</Text>
          <Button title="Get OBJ" onPress={() => console.log(global_menu.menuMap)} />
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
    backgroundColor: 'yellow',
    flex: 1,
    top: 300,
    height: '40%',
    position: 'absolute',
    width: 1000
  },
  returnButton: {
    alignSelf: 'flex-end',
    marginTop: -5,
  }
});

export default CustomiseMenuPage;
