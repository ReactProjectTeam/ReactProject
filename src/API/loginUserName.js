import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function loginUserName({userName,password}) {

    const newData = {
        userName,
        password,
    }


    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/loginusername`,
        data: newData
    });

    return (response);
}

export default loginUserName;