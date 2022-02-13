import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MyCheckbox({
  checked,
  onChange,
  pointer,
  setter,
}) {
  function onCheckmarkPress() {
    if (checked) {
      pointer["picked"] = false;
      setter(-pointer["price"]);
    } else {
      pointer["picked"] = true;
      setter(pointer["price"]);      
    }
    
    onChange(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onCheckmarkPress}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

function CheckBox(props) {
  const [checked, onChange] = useState(props.setter["picked"]);
  
  return (
    <View>
      <View style={styles.checkboxContainer}>
        <MyCheckbox
          checked={checked}
          onChange={onChange}
          pointer={props.pointer} 
          setter={props.setter}
          />
        <Text style={styles.checkboxLabel}>{props.name}     ${props.pointer["price"]}</Text>
      </View>
    </View>
  );
}

export default CheckBox;

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: 'black',
  },

  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },

  checkboxContainer: {
    flexDirection: 'row',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "400",
    fontSize: 18,
    color: "black",
  },
});