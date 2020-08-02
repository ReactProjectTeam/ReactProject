import {combineReducers} from 'redux';
import {menuReducer} from './Menu/reducers'
import {userReducer} from './Login/reducers'


export default combineReducers({
    menuList: menuReducer,
    users: userReducer
})