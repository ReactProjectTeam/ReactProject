import {
  LOGIN_USER,
} from "./constants";

const initialUser = [
  {
    id: 1,
    name: "Anar",
    password: 1991,
  },
  {
    id: 2,
    name: "Tebriz",
    password: 1994,
  },
];

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    // case LOGIN_USER:
    //   return state.find(item=> )
    default:
      break;
  }
  return state;
};
