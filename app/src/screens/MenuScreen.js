import React from 'react';
import {Animated, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import global from '../global_information/global';
import { getMenuList } from '../database/menu-data-utility';
import { addMenu } from '../database/firebase-utility';

function MenuScreen() {
    const ball = new Animated.ValueXY({x: 30, y: 30});

    const moveBall = () => {
        Animated.timing(ball, {
            toValue: {x: 500, y: 30},
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    const moveBack = () => {
        Animated.timing(ball, {
            toValue: {x: 30, y: 30},
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    return (
        <View style={styles.container}>
            <Button title='HELLO' onPress={() => console.log(global.adjustments)} />
            <Animated.View style={[styles.ball, ball.getLayout()]}>
                <Text style={styles.text}>+</Text>
                <Text style={styles.text}>HELLO</Text>
                <Button title='Move' onPress={moveBall} />
                <Button title='Move Back' onPress={moveBack} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    ball: {
        width: 200,
        height: 500,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32
    }
});

export default MenuScreen;
