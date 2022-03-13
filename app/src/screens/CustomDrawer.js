import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { signOut } from "firebase/auth";
import { authentication } from '../database/firebase-config';
import global from "../global_information/global";

function CustomDrawer(props) {
    const navigation = useNavigation();

    const signUserOut = () => {
        signOut(authentication)
        .then((re) => {
            global.session_user = null,
            global.menu_info = null,
            global.categories = null,
            global.items = null,
            global.adjustments = null,
            navigation.navigate('Home');
        })
        .catch((err) => {
          console.log(err);
        })
    }

    return(
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#B8F7F7', flex: 1 }}>
                <ImageBackground source={require('../../assets/pos.png')} style={{ padding: 100 }} ></ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: 'black'}}>
                <TouchableOpacity onPress={signUserOut} style={styles.signOut}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="log-out-outline" size={22} />
                        <Text style={styles.text}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        resizeMode: 'cover'
    },
    signOut: {
        paddingVertical: 5,
    },
    text: {
        fontSize: 20,
    },
});

export default CustomDrawer;
