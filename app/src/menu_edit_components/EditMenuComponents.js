import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
  Button
} from "react-native";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import { Triangle } from "../styles/Shapes";
import { EditElementPopUp } from "./EditMenuPopUps";

// =============================================================================================================================
//          =================================== Category Selection Buttons =======================================
// =============================================================================================================================
export function CategoryDisplayUnselected(props) {
  return (
    <View>
      <TouchableOpacity 
        style={editMenuStyles.categoryButton}
        onPress={() => {
          props.selectCategory(props.categoryName);
        }}
        
      >
        <Text style={editMenuStyles.categoryButtonText}>
          {props.categoryName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function CategoryDisplaySelected(props) {
  return (
    <View>
      <TouchableOpacity 
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
          {props.categoryName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

