import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../database/firebase-config';
import global from '../global_information/global';

// Data getter function:
export const getUserData = async () => {
    const citySnapshot = await getDocs(collection(db, global.session_user));
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);

}

export const getMenuData = async() => {
    const menuSnapshot = await getDocs(collection(db, global.session_user, 'menus', 'lunch'));
    const menuList = menuSnapshot.docs.map(doc => doc.data());
    console.log(menuList);
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
    })
}