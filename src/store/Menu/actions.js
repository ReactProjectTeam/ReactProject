import {
  MENU_ADD,
  MENU_DELETE,
} from "./constants";

export const deleteMenu = payload => {
  return{
    type: MENU_DELETE,
    payload
  }
}

export const addMenu = payload => {
  // console.log("addMenu",payload);
  return{
    type: MENU_ADD,
    payload
  }
}


