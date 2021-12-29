import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from "./app/src/screens/RegisterScreen";
import HomeScreen from "./app/src/screens/HomeScreen";
import LoginScreen from "./app/src/screens/LoginScreen";
import ForgotScreen from "./app/src/screens/ForgotScreen";
import AddItemScreen from "./app/src/screens/AddItem";
import WelcomeScreen from "./app/src/screens/WelcomeScreen";
import AddMenuItemScreen from './app/src/screens/AddMenuItemScreen';
import StartScreen from './app/src/screens/StartScreen';

/**
 * Create the stack for page navigation:
 */
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    /**
     * screen options set headerShown to false will not show anything
     * on the top of the page.
     */
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;
