import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, ScrollView, Dimensions, Pressable } from "react-native";
import { 
  CategoryDisplayUnselected, 
  CategoryDisplaySelected,
  } from "../menu_edit_components/EditMenuComponents";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemDisplay from '../menu_edit_components/ItemDisplay';
import { getCategoryData } from '../database/menu-data-utility';

// Global state for the category that is currently selected:
let currentCategory = null;

function EditMenuScreen({ route, navigation }) {
  // Rendering items:
  const renderItems = () => {
    const categoryData = getCategoryData(route.params.menuName, currentCategory);
      if (categoryData !== null) {
        return Object.keys(categoryData).map(name => 
          <ItemDisplay 
            key={name} 
            itemName={name} 
            price={categoryData[name]['basePrice']} 
            adjustmentObject={categoryData[name]['adjustment']}
            category={currentCategory}
            menuName={route.params.menuName}
          />
        )
      }
    }
  // Rendering category buttons on the screen
  const renderCategoryButtons = () => {
    //console.log('The current category is ' + category);
    //console.log('ALLLL')
    setCategoryButtons(route.params.menuCategories.map(name => {
      //console.log(name + ' I have: ' + category)
      if (currentCategory === name) {
        return <CategoryDisplaySelected key={name} categoryName={name} selectCategory={selectNewCategory} />;
      } else {
        return <CategoryDisplayUnselected key={name} categoryName={name} selectCategory={selectNewCategory} />;
      }
    }))
  }

  // State for category buttons
  const [categoryButtons, setCategoryButtons] = useState(null);

  // Set items:
  const [items, setItems] = useState(renderItems());

  const selectNewCategory = (newCat) => {
    // Set new category:
    currentCategory = newCat;
    renderCategoryButtons();
    setItems(renderItems());
  }

  useEffect(() => {
    renderCategoryButtons();
  }, [])

  return (
    <View style={styles.background}>
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
        <Ionicons name="add-circle-outline" size={60} onPress={() => console.log(currentCategory)} />
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
  }
});

export default EditMenuScreen;