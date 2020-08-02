import {
  MENU_DELETE,
  MENU_ADD
} from "./constants";

const initialMenu = [
  {
    id: 1,
    name: "Salat",
    price: 5,
    totalSum: 0,
  },
  {
    id: 2,
    name: "Dolma",
    price: 7,
    totalSum: 0,
  },
  {
    id: 3,
    name: "Kabab",
    price: 8,
    totalSum: 0,
  }
];

export const menuReducer = (state = initialMenu, action) => {
  switch (action.type) {
    case MENU_DELETE:
      return state.filter(item => item.id !== action.payload);
    case MENU_ADD:
      return state.map(item=> item.id === action.payload.id ?  {...item, totalSum:action.payload.totalPrice} : item)
    default:
      break;
  }
  return state;
};
