import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, useIsFocused  } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { addMenu } from '../database/firebase-utility';
import { MenuBar } from '../edit_menu_components/MenuBar';
import { getMenuList } from '../database/menu-data-utility';
import global from "../global_information/global";

function EditMenu({ navigation }) {
    const menuList = getMenuList();

    // setter function rerenders the screen!
    const [menuBarComponents, setMenuBarComponents] = useState([]);
    const [newMenuName, setNewMenuName] = useState();

    const renderMenuBars = () => {
        setMenuBarComponents(menuList.map(name => <MenuBar menuName={name} key={name} />));
    }
    
    // Do after render:
    const createNewMenu = () => {
        if (!newMenuName) { 
            alert('Menu Name Required!');
            return;
        }
        addMenu(newMenuName);
        setNewMenuName('');
        menuList.push(newMenuName);
        renderMenuBars();
    }

    useEffect(() => {
        // Focus screen then do something:
        navigation.addListener('focus', () => {
            renderMenuBars()
        });
    }, [navigation])

    useLayoutEffect(() => {
        renderMenuBars();
    }, [])

    return(
        <View style={styles.background}>
            <View style={{top: "3%", left: "10%", position: 'absolute'}}>
                <Text style={styles.menuSubTitle} > Menus: </Text>
            </View>

            <View style={styles.scrollViewDesign}>
                <ScrollView style={{width: 1000}}>
                    {menuBarComponents}
                </ScrollView>
            </View>

            <View style={styles.newMenuButton}>
                <TextInput 
                    style={{ bottom: '5%' }} 
                    placeholder='Enter Menu Name' 
                    onChangeText={newText => setNewMenuName(newText)}
                    value={newMenuName}
                /> 
                <TouchableOpacity style={styles.addMenuButton} onPress={() => {createNewMenu()}} >
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