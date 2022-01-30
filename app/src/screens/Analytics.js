import React from "react";
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, TextInput } from "react-native";
import { getUserData, addData } from "../database/firebase-utility";
import { addUser } from "../database/firebase-utility";
import { getMenuData } from "../database/firebase-utility";
import global from "../global_information/global";


/*
    TODO - display analytics in the form of a graph covering the user's past week of sales,
    TODO -      inventory and other necessities.
*/

function Analytics() {
  const getSomething = () => {
    alert(global.session_user);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'orange'}}
      behavior='position'
      enabled
    >
      <TextInput
        placeholder="Email"
        style={{top: 500}}
      />
      <TextInput
        placeholder="Username"
        style={{top: 500}}
      />
      <TextInput
        placeholder="Password"
        style={{top: 500}}
      />
      <TextInput
        placeholder="Confirm Password"
        style={{top: 500}}
      />
      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#D1E3DA",
  },
});

export default Analytics;
