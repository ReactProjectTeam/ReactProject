import {
  LOGIN_USER,
} from "./constants";

export const loginUser = payload => {
  console.log("loginUser",payload);
  return{
    type: LOGIN_USER,
    payload
  }
}



