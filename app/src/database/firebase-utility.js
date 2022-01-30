import { collection, getDocs, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore/lite';
import { db } from '../database/firebase-config';
import global from '../global_information/global';
// Data getter function:
export const getUserData = async () => {
    const citySnapshot = await getDocs(collection(db, global.session_user));
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);

}

export const addData = async () => {
    const city = 'hello this is new';
    await setDoc(doc(db, 'cities', 'random'), {
        city_name: city,
    })
}

// Create new user collection:
export const addUser = async (email) => {
    await setDoc(doc(db, email, 'user_info'), {
        user_email: email,
        menu_list: [],
    })
}


// ======================================================================================
// Functions relation to getting menu:
export const setGlobalMenuList = async () => {
    const menuRef = doc(db, global.session_user, 'user_info');
    const docSnap = await getDoc(menuRef);
    global.menu_list = docSnap.data()['menu_list'];
}


export const getMenuData = async() => {
    const menuSnapshot = await getDocs(collection(db, global.session_user, 'menus', 'lunch'));
    const menuList = menuSnapshot.docs.map(doc => doc.data());
    console.log(menuList);
}

// ======================================================================================
// Functions relation to add to menu:

export const addMenuNameToList = async (menuName) => {
    await updateDoc(doc(db, global.session_user, 'user_info'), {
        menu_list: arrayUnion(menuName)
    });
}

export const addMenu = async (menuName) => {
    // Create a menu_info doc:
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
export const addMenuItem = async(itemName, basePrice, adjustment) => {
    // Create the menu item object
    let itemObj = {};
    itemObj[itemName] = {
        basePrice: basePrice,
        adjustment: adjustment
    }

    // Update so it wont remove existing data:
    await updateDoc(doc(db, global.session_user, 'menus', 'lunch', 'rice'), itemObj);
}


// ======================================================================================
// Menu Mapping

/**
 * Very bad design:
 *  - Fetching menu list again
 *  - Using global variables
 */
export const mapGlobalMenu = async() => {
    if (global.menuMap === null) {
        global.menuMap = new Map();
    }

    const docSnap = await getDoc(doc(db, global.session_user, 'user_info'));
    const menuList = docSnap.data()['menu_list'];

    for (let i = 0; i < menuList.length; i++) {
        const menuRef = await getDocs(collection(db, global.session_user, 'menus', menuList[i]));
        const menu = menuRef.docs.map(doc => doc.data());
        const menu_id = menuRef.docs.map(doc => doc.id);

        // console.log(menu)
        // console.log(menu_id)
        const menuMap = new Map();

        for (let i = 0; i < menu.length; i++) {
            menuMap.set(menu_id[i], menu[i])
        }
        // Map the menu name to the menu map:
        global.menuMap.set(global.menu_list[i], menuMap)
    }
}


