import { collection, getDocs, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, deleteDoc, FieldValue, deleteField } from 'firebase/firestore/lite';
import { db } from '../database/firebase-config';
import global from '../global_information/global';

// ======================================================================================
// User creation functions:
export const addUser = async (email) => {
    await setDoc(doc(db, email, 'menu_info'), {})
    await setDoc(doc(db, email, 'categories'), {})
    await setDoc(doc(db, email, 'adjustments'), {})
    await setDoc(doc(db, email, 'items'), {})
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

/**
 * Adds an item to the menu
 * @param {*} catId 
 * @param {*} newItemObj 
 */
export const addItem = (catId, newItemObj) => {
    // New id for item:
    const newId = 'item_' + Date.now();

    // Add the new item to firebase (items):
    const itemObj = {};
    itemObj[newId] = newItemObj;
    (async () => {
        await updateDoc(doc(db, global.session_user, 'items'), itemObj);
    })();

    // Add corresponding to global
    global.items[newId] = newItemObj;

    // Add the item to category:
    const catObj = {};
    catObj[catId + '.items.' + newId] = true;
    (async () => {
        await updateDoc(doc(db, global.session_user, 'categories'), catObj);
    })();

    // Add corresponding to global
    global.categories[catId]['items'][newId] = true;
}

export const editItem = (itemId, newName, newPrice) => {
    // Update the new price and name in firebase:
    (async () => {
        // Better way to update data:
        await updateDoc(doc(db, global.session_user, 'items'), {
            [itemId + '.name']: String(newName),
            [itemId + '.base_price']: Number(newPrice),
        });
    })();

    // Update global:
    global.items[itemId]['name'] = newName;
    global.items[itemId]['base_price'] = newPrice;
}

/**
 * Remove the item from the menu
 * @param {*} itemId 
 * @param {*} catId 
 */
export const removeItem = (itemId, catId) => {
    // Remove the item from the item list:
    (async () => {
        // Delete the item from the item list:
        await updateDoc(doc(db, global.session_user, 'items'), {
            [itemId]: deleteField()
        });
    })();

    // Remove from the category:
    (async () => {
        // Delete the item from the item list:
        await updateDoc(doc(db, global.session_user, 'categories'), {
            [catId + '.items.' + itemId]: deleteField()
        });
    })();

    // Update global:
    delete global.items[itemId];
    delete global.categories[catId]['items'][itemId];
}

/**
 * Add a new category in a menu:
 * @param {*} catName 
 */
export const addCategory = (catName) => {
    // New id for category:
    const newId = 'category_' + Date.now();
    // Add the new category into firebase in menu info:
    (async () => {
        await updateDoc(doc(db, global.session_user, 'menu_info'), {
            [global.focusedMenu + '.categories.' + newId]: true
        });
    })();

    // Add the new category to the category list:
    (async () => {
        await updateDoc(doc(db, global.session_user, 'categories'), {
            [newId]: {
                name: catName,
                pos: 0, // set zero for now
                items: {},
            }
        });
    })();

    // Update global:
    global.menu_info[global.focusedMenu]['categories'][newId] = true;
    global.categories[newId] = {
        name: catName,
        pos: 0, // set zero for now
        items: {},
    };
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

