import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, Dimensions, Button } from "react-native";
import { 
  CategoryDisplayUnselected, 
  CategoryDisplaySelected,
  } from "../menu_edit_components/EditMenuComponents";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemDisplay from '../menu_edit_components/ItemDisplay';

import { getCategoryData } from '../database/menu-data-utility';
import global from "../global_information/global";

// Global state for the category that is currently selected:
let currentCategory = null;

function EditMenuScreen({ route, navigation }) {
  // Copy the category data into a new variable:
  const localCatData = JSON.parse(JSON.stringify(global.categories));

  // State for category buttons
  const [categoryButtons, setCategoryButtons] = useState(null);

  // Set items:
  const [items, setItems] = useState();

  // Rendering category buttons on the screen
  const renderCategoryButtons = () => {
    setCategoryButtons(Object.keys(localCatData).map(name => {
      if (currentCategory === name) {
        return <CategoryDisplaySelected key={name} categoryName={name} selectCategory={selectNewCategory} />;
      } else {
        return <CategoryDisplayUnselected key={name} categoryName={name} selectCategory={selectNewCategory} />;
      }
    }))
  }

  // Rendering item displays:
  const renderItems = () => {
    if (currentCategory != null) {
      //console.log(global.items)
      const itemIdList = Object.keys(global.categories[currentCategory]['items']);
      // Using id of item to construct components:
      setItems(itemIdList.map(name => <ItemDisplay key={name} itemId={name} />))
    }
  }

  const selectNewCategory = (newCat) => {
    // Set new category:
    currentCategory = newCat;
    renderCategoryButtons();
    renderItems();
  }

  useEffect(() => {
    renderCategoryButtons();
  }, [])

  return (
    <View style={styles.background}>
      <Ionicons 
        name="arrow-back-circle-outline" 
        color={'#000000'}
        size={70} 
        onPress={() => navigation.goBack()}
        style={styles.backButton} 
      />
      
      <View style={styles.categoryScrollView}>
        <ScrollView 
          style={styles.categoryScroll} 
          contentContainerStyle={editMenuStyles.scrollContentContainer} 
        >
          {categoryButtons}
        </ScrollView>
      </View>
      <View style={styles.itemsScrollView}>
        <ScrollView style={styles.itemsScroll}>
          {items}
        </ScrollView>  
      </View>

      {/* Add item button: */}
      <View style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? '16%' : '10%',
        right: '8.5%',
      }}>
        <Ionicons name="add-circle-outline" size={70} onPress={() => console.log('HI')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#D1E3DA",
    flexDirection: 'row',
  },
  categoryScroll: {
    backgroundColor: '#E4F4E4',
    width: Dimensions.get('screen').width/6,
    left: Dimensions.get('screen').width/14,
    borderRadius: 30,
  },
  categoryScrollView: {
    flex: 1,
    height: (3 * Dimensions.get('screen').height)/4,
    marginTop: Dimensions.get('screen').height/9,
  },
  itemsScroll: {
    backgroundColor: '#E4F4E4',
    width: Dimensions.get('screen').width/1.54,
    right: Dimensions.get('screen').width/4.5,
    borderRadius: 30,

  },
  itemsScrollView: {
    flex: 1,
    height: (3 * Dimensions.get('screen').height)/4,
    marginTop: Dimensions.get('screen').height/9,
  },
  backButton: {
    position: 'absolute',
    marginTop: Dimensions.get('screen').height/20,
    left: Dimensions.get('screen').width/70,
  }
});

export default EditMenuScreen;