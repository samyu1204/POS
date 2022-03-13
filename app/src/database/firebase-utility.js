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
    await setDoc(doc(db, email, 'menu_info'), {})
    await setDoc(doc(db, email, 'categories'), {})
    await setDoc(doc(db, email, 'adjustments'), {})
    await setDoc(doc(db, email, 'items'), {})
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

export const setGlobalUserData = async () => {
    const menuInfoRef = doc(db, global.session_user, 'menu_info');
    const menuSnap = await getDoc(menuInfoRef);
    global.menu_info = menuSnap.data();

    const categoriesInfoRef = doc(db, global.session_user, 'categories');
    const categoriesSnap = await getDoc(categoriesInfoRef);
    global.categories = categoriesSnap.data()

    const itemsInfoRef = doc(db, global.session_user, 'items');
    const itemsSnap = await getDoc(itemsInfoRef);
    global.items = itemsSnap.data();
    
    const adjustmentsInfoRef = doc(db, global.session_user, 'adjustments');
    const adjustmentsSnap = await getDoc(adjustmentsInfoRef);
    global.adjustments = adjustmentsSnap.data();
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

/**
 * Adds new menu - updates local and firebase
 * @param {*} menuName 
 * @returns Id of the new menu
 */
export const addMenu = (menuName) => {
    const newMenu = {};
    const menuId = 'menu_' + Date.now();
    // Create new menu object
    newMenu[menuId] = {
        name: menuName,
        pos: 0,
        categories: {},
    };

    // Add the data to firebase
    (async () => {
        await updateDoc(doc(db, global.session_user, 'menu_info'), newMenu);
    })();

    // Add to global:
    global.menu_info[menuId] = newMenu[menuId];

    return menuId;
}

// Adding menu category to a menu:
export const addCategory = async(menuName, categoryName) => {
    await setDoc(doc(db, global.session_user, 'menus', menuName, categoryName), {});
}


// ======================================================================================


// =============================================================================================================================
//           =================================== Adjustment Field Utility =======================================
// =============================================================================================================================

/**
 * Adding new adjustment element to an adjField (firebase and global)
 * @param {*} adjId 
 * @param {*} newObj 
 * @returns ID of new adjustment element
 */
export const addNewAdjElement = (adjId, newObj) => {
    // Update obj
    const newId = 'factor_' + Date.now();
    const tmp = {}
    tmp['' + adjId + '.' + 'factors' + '.' + newId] = newObj;

    // Add to firebase:
    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), tmp);
    })();

    // Update global
    global.adjustments[adjId]['factors'][newId] = newObj;

    return newId;
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


