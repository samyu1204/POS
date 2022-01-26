import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import Ionicons from 'react-native-vector-icons/Ionicons';


export const EditMenuDropDown = () => {
    return (
        <MenuProvider style={{ flexDirection: "column" }}>
            <Menu onSelect={value => alert(`You Clicked : ${value}`)}>

            <MenuTrigger  >
            <Text style={styles.headerText}>DropDown Menu</Text>
            </MenuTrigger  >

            <MenuOptions>
                <MenuOption value={"Login"}>
                <Text style={styles.menuContent}>Login</Text>
                </MenuOption>
                <MenuOption value={"Register"}>
                <Text style={styles.menuContent}>Register</Text>
                </MenuOption>
                <MenuOption value={"Download"}>
                <Text style={styles.menuContent}>Download</Text>
                </MenuOption>
                <MenuOption value={"Logout"}>
                <Text style={styles.menuContent}>Logout</Text>
                </MenuOption>
                <MenuOption value={3} disabled={true}>
                <Text style={styles.menuContent}>Disabled Menu</Text>
                </MenuOption>
            </MenuOptions>

            </Menu>
        </MenuProvider>
    );

}



const styles = StyleSheet.create({

});