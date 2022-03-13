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
    tmp['' + adjId + '.factors.' + newId] = newObj;

    // Add to firebase:
    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), tmp);
    })();

    // Update global
    global.adjustments[adjId]['factors'][newId] = newObj;

    return newId;
}

/**
 * Edit the name and cost of elements of adjustments:
 * @param {*} adjId 
 * @param {*} adjElementId 
 * @param {*} name 
 * @param {*} cost 
 * @param {*} pos 
 */
export const editAdjustmentElement = (adjId, adjElementId, name, cost, pos) => {
    const newInfo = {
        name: name,
        price: Number(cost),
        pos: pos,
    };

    const updateObject = {};
    updateObject[adjId + '.factors.' + adjElementId] = newInfo;

    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), updateObject);
    })();

    // Update global:
    global.adjustments[adjId]['factors'][adjElementId] = newInfo;
}

/**
 * Function deletes a an adjustment element in the firebase:
 * @param {*} menuName 
 * @param {*} itemName 
 * @param {*} category 
 * @param {*} adjField 
 * @param {*} adjName 
 */
export const deleteAdjustmentElement = (adjId, adjElementId) => {
    //Delete the field in firebase:
    const deleteObj = {}
    deleteObj[adjId + '.factors.' + adjElementId] = deleteField();
    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), deleteObj);
    })();

    // Delete in global:
    delete global.adjustments[adjId]['factors'][adjElementId];
}

/**
 * Add a new adjustment field to an item:
 * @param {*} itemId 
 * @param {*} fieldName 
 */
export const addNewAdjustmentField = (itemId, fieldName) => {
    // Generate new field id:
    const newId = 'adjst_' + Date.now();

    // Add a new adjustment field to the item in firebase:
    const newItemField = {};
    newItemField[itemId + '.adjustments.' + newId] = true;

    // Update in firebase
    (async () => {
        await updateDoc(doc(db, global.session_user, 'items'), newItemField);
    })();

    // Add the new adjustment field to the firebase adjustments collection:
    const newAdjField = {};
    newAdjField[newId] = {
        factors: {},
        name: fieldName,
        pos: 0, // set to zero for now:
    };

    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), newAdjField);
    })();

    // Update item field in global:
    global.items[itemId]['adjustments'][newId] = true;

    // Update adjustment field in global:
    global.adjustments[newId] = newAdjField[newId];
}

// Edit a fieldname in an adjustment
export const editAdjustmentField = (newName, adjFieldId) => {
    // Update the new name in firebase:
    const updateObj = {};
    updateObj[adjFieldId + '.name'] = newName;
    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), updateObj);
    })();

    // Update in global:
    global.adjustments[adjFieldId]['name'] = newName;
}

export const deleteAdjstField = (adjFieldId, itemId) => {
    // Remove adjustment field from item in firebase:

    //Delete the field in firebase:
    const deleteObj = {};
    deleteObj[itemId + '.adjustments.' + adjFieldId] = deleteField();
    (async () => {
        await updateDoc(doc(db, global.session_user, 'items'), deleteObj);
    })();

    // Delete the adjustment in the adjustment collection:
    const deleteAdjField = {};
    deleteAdjField[adjFieldId] = deleteField();
    (async () => {
        await updateDoc(doc(db, global.session_user, 'adjustments'), deleteAdjField);
    })();

    // Delete item adjustment field in global:
    delete global.items[itemId]['adjustments'][adjFieldId];

    // Delete adjustment from adjustment global list;
    delete global.adjustments[adjFieldId];
}

