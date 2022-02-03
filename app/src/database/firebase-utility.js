import { collection, getDocs, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, deleteDoc } from 'firebase/firestore/lite';
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
    const menuRef = doc(db, 'c@gmail.com', 'user_info');
    const docSnap = await getDoc(menuRef);
    return docSnap.data()['menu_list'];
}

// ======================================================================================
// Removing Menu:
export const removeMenu = async(menuName) => {
    // Delete recorded name in user info of the menu:
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

// ======================================================================================
// Functions relation to adding to menu:

// Adding a new menu name to the info list:
export const addMenuNameToList = async (menuName) => {
    await updateDoc(doc(db, global.session_user, 'user_info'), {
        menu_list: arrayUnion(menuName)
    });
}

export const addMenu = async (menuName) => {
    // Create a menu_info doc along with the actual menu collection:
    await setDoc(doc(db, global.session_user, 'menus', menuName, 'menu_info'), {});
    // Add it to menu list:
    await updateDoc(doc(db, global.session_user, 'user_info'), {
        menu_list: arrayUnion(menuName)
    });
}

/**
 * Function requires:
 *  - Item Name -> passed in as string
 *  - Base Price -> passed in as number 
 *  - Addons -> object
 */
export const addMenuItem = async(category, itemName, basePrice, adjustment) => {
    // Create the menu item object
    let itemObj = {};
    itemObj[itemName] = {
        basePrice: basePrice,
        adjustment: adjustment
    }

    // Update so it wont remove existing data:
    await updateDoc(doc(db, global.session_user, 'menus', 'lunch', category), itemObj);
}


// ======================================================================================
// Menu Mapping

/**
 * Very bad design:
 *  - Fetching menu list again
 *  - Using global variables
 */
export const getMenuMap = async(menuName) => {
    const menuSnap = await getDocs(collection(db, global.session_user, 'menus', menuName));
    const menu_id = menuSnap.docs.map(doc => doc.id)
    const menu = menuSnap.docs.map(doc => doc.data());

    const menuMap = new Map();

    for (let i = 0; i < menu.length; i++) {
        menuMap.set(menu_id[i], menu[i])
    }
    // Map the menu name to the menu map:
    return menuMap;
}

// ======================================================================================
// Getting Menu Information:
export const getMenuCategoryId = async(menuName) => {
    const menuRef = await getDocs(collection(db, global.session_user, 'menus', menuName));
    const menu_id = menuRef.docs.map(doc => doc.id);

    for( let i = 0; i < menu_id.length; i++){                            
        if ( menu_id[i] === 'menu_info') { 
            menu_id.splice(i, 1); 
        }
    }
    
    return menu_id;
}
