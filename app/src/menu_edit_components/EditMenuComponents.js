import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Platform, 
  Pressable,
  Modal
} from "react-native";

import global from "../global_information/global";
import { editMenuStyles, modalStyles } from "../styles/EditMenuStyleSheet";
import { Triangle } from "../styles/Shapes";
import DoubleClick from "react-native-double-tap";
import { Kohana } from "react-native-textinput-effects";
import { Ionicons } from '@expo/vector-icons';
import { editCategory } from "../database/firebase-utility";


// =============================================================================================================================
//          =================================== Category Selection Buttons =======================================
// =============================================================================================================================
export function CategoryDisplayUnselected(props) {
  return (
    <View>
      <DoubleClick
        singleTap={() => {
          props.selectCategory(props.categoryName);
        }}
        doubleTap={() => {
          props.modalUpdate(true);
          props.catIdGetter(props.categoryName)
        }}
        delay={200}
      >
        <View style={editMenuStyles.categoryButton}>
          <Text style={editMenuStyles.categoryButtonText}>
              {global.categories[props.categoryName]['name']}
          </Text>
        </View>
      </DoubleClick>
    </View>
  );
}


export function CategoryDisplaySelected(props) {
  return (
    <View>
      <DoubleClick
        doubleTap={() => {
          props.modalUpdate(true);
          props.catIdGetter(props.categoryName)
        }}
        delay={200}
      >
        <View 
          style={editMenuStyles.selectedCategoryButton}
          onPress={() => {
            props.selectCategory(props.categoryName);
          }}
        >
          <View style={{
            position: 'absolute',
            left: Platform.OS === 'ios' ? '50%' : '59%',
            top: '45%'
          }}>
            {<Triangle />}
          </View>

          <Text style={editMenuStyles.categoryButtonText}>
            {global.categories[props.categoryName]['name']}
          </Text>
        </View>
      </DoubleClick>
    </View>
  );
}

/**
 * Edit Category pop-up button:
 * @param {*} props 
 * @returns 
 */
export const EditCategoryPopUp = ({ props, refFunc, catRefFunc, updateScreen }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [catId, setCatId] = useState(null)
  const [name, setName] = useState();

  const categoryName = () => {
    if (catId !== null) {
      setName(global.categories[catId]['name']);
    }
    return;
  }
  
  React.useEffect(() => {
    refFunc.current = setModalVisible;
    catRefFunc.current = setCatId;
  }, []);

  return (
    <View style={modalStyles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.editAdjustmentFieldModalView}>
            
            <View style={{
              bottom: '30%'
            }}>
              <Text style={modalStyles.modalText}>Edit Category</Text>
            </View>
          
            <Kohana
                style={{ 
                  backgroundColor: '#f9f5ed', 
                  bottom: '10%',
                  borderRadius: 15,
                  marginRight: '2%'
                }}
                iconClass={Ionicons}
                iconName={'pencil'}
                iconColor={'#f4d29a'}
                inputPadding={16}
                labelStyle={{ color: '#BEB38B' }}
                inputStyle={{ color: '#BEB38B' }}
                labelContainerStyle={{ padding: 2 }}
                iconContainerStyle={{ padding: 16 }}
                useNativeDriver
                onChangeText={(text) => setName(text)}
                value={name}
              />

            {/* Edit adjustment field name */}
            <Pressable
              style={[modalStyles.editCategoryApplyButton]}
              onPress={() => {
                if (name !== null && name !== '') {
                  editCategory(catId, name);
                  // Rerender screen:
                  updateScreen();
                } else {
                  alert('Something went wrong!');
                }
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={modalStyles.textStyle}>Apply</Text>
            </Pressable>
            
            <View 
            style={{
              position: 'absolute',
              backgroundColor: '#F8474A',
              borderRadius: 10,
              bottom: '25%',
              left: '15%',
              padding: 3
            }}>
              <Ionicons 
                name='trash'
                size={30}
                color='white'
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                />
            </View>

            <Ionicons 
              style={{
                color: 'red', 
                position: 'absolute',
                alignSelf: 'flex-end', 
                marginRight: '1%', 
                marginTop: '1%'
              }} 
              name='close' 
              size={40} 
              onPress={() => {
                setModalVisible(!modalVisible);
            }} /> 
          </View>
        </View>
      </Modal>

    </View>
  );
}
