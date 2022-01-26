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
// Functions relation to menu:

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


export const getMenuList = async () => {
    const menuRef = doc(db, global.session_user, 'user_info');
    const docSnap = await getDoc(menuRef);
    return docSnap.data()['menu_list'];
}


export const getMenuData = async() => {
    const menuSnapshot = await getDocs(collection(db, global.session_user, 'menus', 'lunch'));
    const menuList = menuSnapshot.docs.map(doc => doc.data());
    console.log(menuList);
}


// ======================================================================================
