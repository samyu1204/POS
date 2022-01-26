import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getMenuList, addMenuNameToList, addMenu } from '../database/firebase-utility';
import global from '../global_information/global';
import { MenuBar } from '../utility/MenuBar';
import { EditMenuDropDown } from '../utility/EditMenuDropDown';
function EditMenu() {
    const [menuList, setMenuList] = useState(global.menu_list['_W']);

    return(
        <View style={styles.background}>
            <View style={{top: "3%", left: "10%", position: 'absolute'}}>
                <Text style={styles.menuSubTitle} > Menus: </Text>
            </View>
            
            <View style={styles.scrollViewDesign}>
                <ScrollView style={{width: 1000}}>
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                    <MenuBar />
                </ScrollView>
            </View>


            <View style={styles.newMenuButton}>
                <TouchableOpacity style={styles.addMenuButton}>
                    <Text style={{fontSize: 15}}> Create New Menu </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "#D1E3DA",
      flexDirection: 'row',
      justifyContent: 'center', 
    },
    scrollViewDesign: {
        height: '40%',
        top: "10%",
        justifyContent: 'center', 
        alignItems: "center",
        position: 'absolute'
    }, 
    menuSubTitle: {
        right: "40%",
        fontWeight: "bold",
        fontSize: 22,
    },
    menuList: {
        right: "35%",
    },
    addNewMenu: {
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 150,
        backgroundColor: '#f01d71',
    },
    menuButtonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 20,
        textAlign: 'center',
    },
    newMenuButton: {
        justifyContent: 'center', 
        alignItems: "center",
        top: '70%',
        position: 'absolute',
    },
    addMenuButton: {
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 80,
    }
})

export default EditMenu;