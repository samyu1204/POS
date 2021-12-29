import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
