import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import 'react-native-gesture-handler';
import { LogBox } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      {LogBox.ignoreAllLogs()}
      <StackNavigator />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
