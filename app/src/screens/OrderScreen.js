import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ItemButton } from '../utility/ItemButton';
import { OrderPopUp } from '../ordering_components/OrderPopUp';
import CheckBox from '../ordering_components/CheckBox';

import global from '../global_information/global';

import { useNavigation } from "@react-navigation/native";


function OrderScreen() {
  const [ordered, setOrdered] = useState([]);
  const [editState, setEditState] = useState(false);
  const navigation = useNavigation();

  let menuMap = global.menuMap;
  // menu is a map for all the items

  const addItem = (item) => {
    setOrdered(prevItem => [...prevItem, item])
  };

  const removeItem = (targetIndex) => {
    setItems(prevItems => prevItems.filter( (ordered,index) => index !== targetIndex))
  };

  const showOrdered = () => {
    let orderedItems = [];
    let counter = 0;
    for (const item of ordered) {
      let allAdjustments = [];
      for (let adjustments in item["adjustment"]) {
        let counter2 = 0;
        for (let options in item["adjustment"][adjustments]) {
          if (item["adjustment"][adjustments][options]["picked"]) {
            allAdjustments.push(<Text key={counter2} style={{fontSize: 20,}}>   -  {adjustments}:   {options}</Text>)
          }
        }
        counter2++;
        if (item["notes"] === true) {
          allAdjustments.push(<Text key={counter2} style={{fontSize: 20,}}>   -  NOTE:   {item["notes"]}</Text>)
        }
      }
      if (editState) {
        orderedItems.push((
          <View key={counter}>
            <Text style={styles.orderedItems}>{item["name"]}        ${item["price"]}</Text>
            <View>
              <Ionicons style={{color: "red"}} name='trash' size={30}/>       
            </View>
            <View style={styles.adjustments}>{allAdjustments}</View>
          </View>
        ));
      } else {
        orderedItems.push((
          <View key={counter}>
            <Text style={styles.orderedItems}>{item["name"]}        ${item["price"]}</Text>
            <View style={styles.adjustments}>{allAdjustments}</View>
          </View>
        ));
      }

      counter++;
    }
    return orderedItems    
  }
  const calculateTotal = () => {
    let total = 0;
    for (const item of ordered) {
      total += item["price"];
    }
    return total;
  }

  // Needs to send data to firebase, set time
  const checkout = () => {
    navigation.navigate('Start');
  }

  let menuDisplay = [];
  let counter3 = 0;
  for (menuType of menuMap) {

    let data = [];
    let counter2 = 0;
    for (let menuCategory in menuType[1]) {
      
      if (menuCategory === "menu_info") {
        continue;
      }
      const category = menuType[1][menuCategory];
      let data2 = [];
      let counter = 0;
      for (let dish in category) {
        let foodItem = category[dish]
        let foodObj = {
          "name": dish,
          "basePrice": foodItem["basePrice"],
          "adjustment": {},
          "price": foodItem["basePrice"],
          "notes": "",
        };

        // Changing adjustments
        for (let adjustment in foodItem["adjustment"]) {
          foodObj["adjustment"][adjustment] = {};
          for (let adjustmentOption in foodItem["adjustment"][adjustment]) {
            foodObj["adjustment"][adjustment][adjustmentOption] = {
              "price": foodItem["adjustment"][adjustment][adjustmentOption],
              "picked": false,
            }
          }
        }

        data2.push(<OrderPopUp foodItem={foodObj} func={addItem} key={counter + dish}/>)
        counter++;
      }

      data.push(
        <View key={counter3 + " "+ counter2}>
          <Text style={{fontSize: 20,}}>{menuCategory}</Text>
          <Text>{data2}</Text>
        </View>
      )
      counter2++;
    }
    menuDisplay.push(
      <View key={menuType[0]}>
        <Text style={{fontSize:30, fontWeight: 'bold',}}>{menuType[0]}</Text>
        <View>{data}</View>
      </View>
    )
    counter3++;
  }

  return(
    <View style={styles.background}>
      <View style={styles.menuList}>
        <View>{menuDisplay}</View>
      </View>
      <View style={styles.RIGHT}> 
        <View style={styles.TITLE}>
          <Text style={styles.purchasedTitle}> Ordered </Text>
          <Ionicons name='pencil-outline' size={50} color={'black'}/>
        </View>
        <ItemButton text="edit item" onPress={()=>setEditState(true)}/>
        <View>
          <Text>{showOrdered()}</Text>
        </View>
        <View style={styles.totalBox}>
          <View style={styles.total}>
            <ItemButton text="Checkout" onPress={checkout}></ItemButton>
            <Text style={styles.totalText}>Total: {calculateTotal()}</Text>
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
  RIGHT: {
    flex: 4,
    backgroundColor: "#b0c4de",
  },
  appImage: {
    width: 150,
    height: 150,
  },
  TITLE: {
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
    marginBottom: 0,
  },
  total: {
    backgroundColor: 'pink',
  },
  orderedItems: {
    fontSize: 30,
  },
  adjustments: {
    fontSize: 24,
  },
  totalText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  trashCan: {
    color: "red",
  }
})

export default OrderScreen;