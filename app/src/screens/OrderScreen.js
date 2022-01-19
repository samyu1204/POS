import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ItemButton } from '../utility/ItemButton';
import { LButton } from '../utility/LButton';

function OrderScreen() {
  let items = [];
  let array = [];
  let total = 0;
  for(let i = 0; i< 10; i++) {
    array.push(<ItemButton text={"name\n" + i} key={i} />)
  }
  return(
    <View style={styles.background}>
      <View style={styles.menuList}>
        <Image style={styles.appImage} source={require("../../assets/register_page/posSUM.png")}/>
        <Text>{array}</Text>
      </View>
      <View style={styles.purchasedList}> 
        <View style={styles.purchasedBox}>
          <Text style={styles.purchasedTitle}> Ordered </Text>
          <Ionicons name='pencil-outline' size={50} color={'black'}/>
        </View>
        <ItemButton text="edit itemss"/>
        <Text>{items}</Text>

        <View style={styles.totalBox}>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total: {total}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#D1E3DA",
    flexDirection: "row",
  },
  menuList: {
    flex: 9,
  },
  purchasedList: {
    flex: 4,
    backgroundColor: "#b0c4de",
  },
  appImage: {
    width: 150,
    height: 150,
  },
  purchasedBox: {
    flexDirection: 'row',
  },
  purchasedTitle: {
    textAlign:'center',
    fontSize: 50,
    color: "black",
    borderColor: "black",
  },
  totalBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  total: {
    padding: 15,
    backgroundColor: 'pink',
  },
  totalText: {
    fontSize: 40,
    fontWeight: 'bold',
  }
})

export default OrderScreen;
