import global from "../global_information/global";

// =============================================================================================================================
//     =================================== Fetching Data From Local Menu Structure =======================================
// =============================================================================================================================

/**
 * Get the entire map of the menu:
 * @param {Name of menu} menuName 
 * @returns The entire menu map:
 */
 export const getMenuMap = (menuName) => {
  return global.menuMap.get(menuName);
}

/**
* Returns a category's data:
* @param {Name of menu} menuName
* @param {Name of category} categoryName 
* @returns Data for category
*/
export const getCategoryData = (menuName, categoryName) => {
  if (menuName === null || categoryName === null) return null;
  return global.menuMap.get(menuName)[categoryName];
}

/**
 * Fetching all category ID from menu map:
 * @param {Name of menu} menuName 
 * @returns A list of category ID's
 */
export const getMenuCategoryId = (menuName) => {
  return Object.keys(global.menuMap.get(menuName));
}

