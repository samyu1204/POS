import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, Dimensions, Button, Text, TouchableOpacity } from "react-native";
import { 
  CategoryDisplayUnselected, 
  CategoryDisplaySelected,
  EditCategoryPopUp
  } from "../menu_edit_components/EditMenuComponents";
  
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemDisplay from '../menu_edit_components/ItemDisplay';

import { getCategoryData } from '../database/menu-data-utility';
import global from '../global_information/global';

import { AddItemPopUp, AddCategoryPopUp } from '../menu_edit_components/EditMenuPopUps'

// Global state for the category that is currently selected:
let currentCategory = null;

function EditMenuScreen({ route, navigation }) {
  // State for category buttons
  const [categoryButtons, setCategoryButtons] = useState(null);

  // Ref function to modal visibility for category: 
  // This is for passing a functon from a lower level higher
  const setModalVisibility = React.useRef(null);
  const setTmpId = React.useRef(null);

  // Set items:
  const [items, setItems] = useState();

  const selectNewCategory = (newCat) => {
    // Set new category:
    currentCategory = newCat;
    renderCategoryButtons();
    renderItems();
  }

  // Rendering category buttons on the screen
  const renderCategoryButtons = () => {
    // Retrieve the categories in the menu:
    const catIdList = Object.keys(global.menu_info[global.focusedMenu]['categories']);
    setCategoryButtons(catIdList.map(name => {
      if (currentCategory === name) {
        return <CategoryDisplaySelected 
                  key={name} 
                  categoryName={name} 
                  selectCategory={selectNewCategory} 
                  modalUpdate={setModalVisibility.current} 
                  catIdGetter={setTmpId.current}
                  />;
      } else {
        return <CategoryDisplayUnselected 
                  key={name} 
                  categoryName={name} 
                  selectCategory={selectNewCategory} 
                  modalUpdate={setModalVisibility.current} 
                  catIdGetter={setTmpId.current}
                  />;
      }
    }))
  }

  // Rendering item displays:
  const renderItems = () => {
    if (currentCategory != null) {
      //console.log(global.items)
      const itemIdList = Object.keys(global.categories[currentCategory]['items']);
      // Using id of item to construct components:
      setItems(itemIdList.map(name => 
        <ItemDisplay 
          key={name} 
          itemId={name} 
          catId={currentCategory} 
          updateScreen={renderItems}
          />
        )
      )
    }
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
        onPress={() => {
          currentCategory = null;
          navigation.goBack()
        }}
        style={styles.backButton} 
      />

      <View style={styles.categoryScrollView}>
        <ScrollView 
          style={styles.categoryScroll} 
          contentContainerStyle={editMenuStyles.scrollContentContainer} 
        >
          {categoryButtons}
        </ScrollView>

        <AddCategoryPopUp updateScreen={renderCategoryButtons} />
        <EditCategoryPopUp catRefFunc={setTmpId} refFunc ={setModalVisibility} />
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
        <AddItemPopUp 
          catId={currentCategory}
          updateScreen={renderItems}
        />
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
    height: (0.538 * Dimensions.get('screen').height),
    borderRadius: 30,
  },
  categoryScrollView: {
    flex: 1,
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