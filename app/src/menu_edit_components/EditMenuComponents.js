import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
} from "react-native";
import { editMenuStyles } from "../styles/EditMenuStyleSheet";
import { Triangle } from "../styles/Shapes";

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

// =============================================================================================================================
//              =================================== Adjustment Element =======================================
// =============================================================================================================================
export function AdjustmentDisplayElement(props) {
  return(
    <View style={{
      justifyContent: 'center',
      marginLeft: Dimensions.get('screen').width/80,
      marginRight: Dimensions.get('screen').width/11
      }}>
      <TouchableOpacity style={editMenuStyles.adjustmentElement}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={editMenuStyles.adjustmentElementText}>
            {props.adjustmentName}
          </Text>
          <Text style={editMenuStyles.adjustmentElementCost}>
            + {Number(props.adjustmentCost).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

