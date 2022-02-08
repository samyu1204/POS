import { Dimensions, StyleSheet } from "react-native";

export const editMenuStyles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1, 
    alignItems: 'center'
  },
  categoryButton: {
    marginTop: '15%',
    backgroundColor: 'white',
    width: (3 * Dimensions.get('screen').width) / 25,
    height: (Dimensions.get('screen').height) / 5,
    borderRadius: 20,
  },
  selectedCategoryButton: {
    marginTop: '15%',
    backgroundColor: '#C4C4C4',
    width: (3 * Dimensions.get('screen').width) / 25,
    height: (Dimensions.get('screen').height) / 5,
    borderRadius: 20,
  },
  categoryButtonText: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    top: (Dimensions.get('screen').height) / 14,
  },
  item: {
    backgroundColor: 'white',
    marginTop: '2%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  itemNameText: {
    height: Dimensions.get('screen').height/20,
    alignSelf: 'flex-start',
    fontSize: 30,
    top: '0.5%',
    left: '80%',
    fontWeight: 'bold',
  },
  itemBasePriceText: {
    position: 'absolute',
    alignSelf: 'center',
    right: '5%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  addAdjustmentButton: {
    backgroundColor: '#C8E6C9',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: '0.5%',
    borderRadius: 10,
    marginTop: '2%'
  },
  adjustmentNameBox: {
    marginTop: '2%',
    backgroundColor: '#D6D6D7',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: '0.5%',
    borderRadius: 10,
  },
  adjustmentElement: {
    backgroundColor: 'white',
    borderRadius: 15,
    position: 'absolute',
    width: 110,
    height: 80,
    position: 'absolute',
    right: -75
  }, 
  adjustmentElementText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    top: Dimensions.get('screen').height/60
  },
  adjustmentElementCost: {
    alignSelf: 'center',
    fontSize: 18,
    top: Dimensions.get('screen').height/60
  },
  addAdjElementButton: {
    position: 'absolute',
    right: '11%',
    backgroundColor: '#47B7F4',
    width: '7%',
    height: '70%',
    borderRadius: 15,
  },
  addElementButton: {
    fontSize: 50,
    alignSelf: 'center',
    bottom: '14%',
    color: 'white'
  }
});

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 200,
    paddingVertical: 150,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: '#C8E6C9',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: '0.5%',
    borderRadius: 10,
    marginTop: '1%'
  },
  buttonOpen: {
    backgroundColor: "#C8E6C9",
  },
  buttonClose: {
    backgroundColor: "#EFDD49",
    position: 'absolute',
    width: '20%',
    bottom: Dimensions.get('screen').height/50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold'
  },
  modalHeading: {
    position: 'absolute',
    marginTop: '4%'
  },
  cancelButton: {
    color: 'red', 
    position: 'absolute',
    alignSelf: 'flex-end', 
    marginRight: '3%', 
    marginTop: '3%'
  },
  newVariantModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 100,
    paddingVertical: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})