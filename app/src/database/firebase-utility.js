import { collection, getDocs, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, deleteDoc, FieldValue, deleteField } from 'firebase/firestore/lite';
import { db } from '../database/firebase-config';
import global from '../global_information/global';

export const addData = async () => {
    const city = 'hello this is new';
    await setDoc(doc(db, 'cities', 'random'), {
        city_name: city,
    })
}
// ======================================================================================
// User creation functions:
export const addUser = async (email) => {
    await setDoc(doc(db, email, 'user_info'), {
        user_email: email,
        menu_list: [],
    })
}


// ======================================================================================
// Functions relation to getting information from the menu:
export const getMenuListFromFirebase = async () => {
    // const menuRef = doc(db, global.session_user, 'user_info');
    // const docSnap = await getDoc(menuRef);
    // console.log(docSnap.data())
    // global.menu_list = docSnap.data()['menu_list'];
    const menuRef = doc(db, global.menu_list, 'user_info');
    const docSnap = await getDoc(menuRef);
    return docSnap.data()['menu_list'];
}

// ======================================================================================
// Removing Menu:
export const removeMenu = async(menuName) => {
    // Delete global reference to the menu:
    await updateDoc(doc(db, global.session_user, 'user_info'), {
        menu_list: arrayRemove(menuName)
    });
    
    // Get all doc names:
    const docRef = await getDocs(collection(db, global.session_user, 'menus', menuName));
    // Array of id's:
    const doc_id = docRef.docs.map(doc => doc.id);

    // Delete the doc of the menu:
    for (let i = 0; i < doc_id.length; i++) {
        await deleteDoc(doc(db, global.session_user, "menus", menuName, doc_id[i]));
    }
}

// =============================================================================================================================
// =================================== Functions relation to adding elements to the menu =======================================
// =============================================================================================================================

// Adding a menu to the firebase as well as the global menu reference:
export const addMenu = async (menuName) => {
    // Create a menu_info doc along with the actual menu collection:
    await setDoc(doc(db, global.session_user, 'menus', menuName, 'menu_info'), {});
    // Add it to menu list:
    await updateDoc(doc(db, global.session_user, 'user_info'), {
        menu_list: arrayUnion(menuName)
    });
}

// Adding menu category to a menu:
export const addCategory = async(menuName, categoryName) => {
    await setDoc(doc(db, global.session_user, 'menus', menuName, categoryName), {});
}


/**
 * Function requires:
 *  - Item Name -> passed in as string
 *  - Base Price -> passed in as number 
 *  - Addons -> object
 */
export const addMenuItem = async(menu, category, itemName, basePrice, adjustment) => {
    // Create the menu item object
    let itemObj = {};
    itemObj[itemName] = {
        basePrice: basePrice,
        adjustment: adjustment
    }

    // Update so it wont remove existing data:
    await updateDoc(doc(db, global.session_user, 'menus', menu, category), itemObj);
}

// ======================================================================================


// =============================================================================================================================
//           =================================== Adjustment Field Utility =======================================
// =============================================================================================================================

/**
 * Add a new adjustment
 * @param {} info object:
 * @param {*} adjName 
 */
export const addNewAdjustmentField = async(menuName, itemName, category, adjName) => {
    // Address to update:
    const updateString = itemName + '.' + 'adjustment' + '.' + String(adjName).toLowerCase();
    const updateObj = {}
    updateObj[updateString] = {};

    // Update firebase data:
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), updateObj);

    // Add it to global menu data:
    // const menuItem = global.menuMap.get(menuName)[category][itemName];
    // menuItem['adjustment'][adjName.toLowerCase()] = {hello: 1};
}

/**
 * Adding new element adjustments to an adjustment field:
 * @param {*} menuName 
 * @param {*} itemName 
 * @param {*} category 
 * @param {*} adjName 
 * @param { name: name, cost: cost } newObj 
 */
export const addNewAdjustmentElement = async(menuName, itemName, category, adjName, newObj) => {
    const elementName = String(newObj['name']).toLowerCase();
    const elementCost = Number(newObj['cost']);
    // Address to update:
    const updateString = itemName + '.' + 'adjustment' + '.' + String(adjName).toLowerCase() + '.' + elementName;
    const updateObj = {}
    updateObj[updateString] = elementCost;

    // Update firebase data:
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), updateObj);

    // Add it to global menu data:
    const menuItem = global.menuMap.get(menuName)[category][itemName];
    menuItem['adjustment'][adjName][elementName] = elementCost;
}

// Edit the name and cost of elements of adjustments:
export const editAdjustmentElement = async(menuName, itemName, category, adjField, adjName, newObj) => {
    const elementName = String(newObj['name']).toLowerCase();
    const elementCost = Number(newObj['cost']);
    const currentAdj = global.menuMap.get(menuName)[category][itemName]['adjustment'];
    const tmp = currentAdj[adjField.toLowerCase()];
    delete tmp[adjName.toLowerCase()];
    currentAdj[adjField.toLowerCase()][elementName] = elementCost;

    // Address
    const toDelete = itemName + '.' + 'adjustment' + '.' + adjField.toLowerCase() + '.' + adjName.toLowerCase();
    // Address to update:
    const deleteObj = {};
    deleteObj[toDelete] = deleteField();
    //Delete the original field
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), deleteObj);

    // Add the updated adjustment in:
    const toAdd = itemName + '.' + 'adjustment' + '.' + adjField.toLowerCase() + '.' + elementName;
    // Address to update:
    const addObj = {};
    addObj[toAdd] = elementCost;
    //Delete the original field
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), addObj);
}

/**
 * Function deletes a an adjustment element in the firebase:
 * @param {*} menuName 
 * @param {*} itemName 
 * @param {*} category 
 * @param {*} adjField 
 * @param {*} adjName 
 */
export const deleteAdjustmentElement = async(menuName, itemName, category, adjField, adjName) => {
    const currentAdj = global.menuMap.get(menuName)[category][itemName]['adjustment'];
    const tmp = currentAdj[adjField.toLowerCase()];
    // Delete the field name in the global map:
    delete tmp[adjName.toLowerCase()];

    // Address
    const toDelete = itemName + '.' + 'adjustment' + '.' + adjField.toLowerCase() + '.' + adjName.toLowerCase();
    // Address to update:
    const deleteObj = {};
    deleteObj[toDelete] = deleteField();
    //Delete the original field
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), deleteObj);
}

// Edit a fieldname in an adjustment
export const editAdjustmentField = async(menuName, itemName, category, adjField, newFieldName) => {
    const newName = newFieldName.toLowerCase();
    // this will save the adjustment obj field
    const adjObject = global.menuMap.get(menuName)[category][itemName]['adjustment'][adjField];
    // Store the old information:
    const tmpStore = { adj: adjObject }
    // Update global base:
    delete global.menuMap.get(menuName)[category][itemName]['adjustment'][adjField];
    // Add the new field to global:
    global.menuMap.get(menuName)[category][itemName]['adjustment'][newName] = tmpStore['adj'];

    // Update firebase: Delete old and add new:

    // Address
    const toDelete = itemName + '.' + 'adjustment' + '.' + adjField;
    // Address to update:
    const deleteObj = {};
    deleteObj[toDelete] = deleteField();
    //Delete the original field
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), deleteObj);

    // Add the updated adjustment in:
    const toAdd = itemName + '.' + 'adjustment' + '.' + newName;
    // Address to update:
    const addObj = {};
    addObj[toAdd] = tmpStore['adj']
    //Delete the original field
    await updateDoc(doc(db, global.session_user, 'menus', menuName, category), addObj);
}


// ======================================================================================
// Menu Mapping

// Set global menu: - used for updating the global map
export const mapMenusToGlobal = async () => {
    const menuRef = doc(db, global.session_user, 'user_info');
    const docSnap = await getDoc(menuRef);
    const menuList = docSnap.data()['menu_list'];
    
    const menuMap = new Map();
    for (const menu of menuList) {
        const menuReference = await getDocs(collection(db, global.session_user, 'menus', menu));
        const menuCategory = menuReference.docs.map(doc => doc.id)
        const menuData = menuReference.docs.map(doc => doc.data());

        let categoriesObj = {}
        for (let i = 0; i < menuCategory.length; i++) {
            categoriesObj[menuCategory[i]] = menuData[i]
        }
        menuMap.set(menu, categoriesObj);
    }

    // Set it to global data:
    global.menuMap = menuMap;
}

// First mapping of menu
export const mapGlobalMenuOnSignIn = async (email) => {
    const menuRef = doc(db, email, 'user_info');
    const docSnap = await getDoc(menuRef);
    const menuList = docSnap.data()['menu_list'];

    const menuMap = new Map();
    for (const menu of menuList) {
        const menuReference = await getDocs(collection(db, email, 'menus', menu));
        const menuCategory = menuReference.docs.map(doc => doc.id)
        const menuData = menuReference.docs.map(doc => doc.data());

        let categoriesObj = {}
        for (let i = 0; i < menuCategory.length; i++) {
            categoriesObj[menuCategory[i]] = menuData[i]
        }
        menuMap.set(menu, categoriesObj);
    }

    // Set it to global data:
    global.menuMap = menuMap;
}


