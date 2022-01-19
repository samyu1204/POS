import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../database/firebase-config';
import global from '../global_information/global';
import { getDoc } from 'firebase/firestore/lite';

// Data getter function:
export const getUserData = async () => {
    const citySnapshot = await getDocs(collection(db, global.session_user));
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);

}

export const getMenuData = async() => {
    const menuSnapshot = await getDocs(collection(db, global.session_user, 'menus', 'dinner'));
    const menuList = menuSnapshot.docs.map(doc => doc.data());
    console.log(menuList);

    //const docRef = doc(db, global.session_user, 'menus', 'dinner');
    //const docSnap = await getDoc(docRef);
    //console.log(docSnap.data());
    //console.log(docSnap.id);
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