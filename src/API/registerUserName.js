import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function registerUserName({userName,password, confirmPassword}) {
    const newData = {
        userName,
        password,
        confirmPassword,
    }

    let formData = new FormData();

    for(const item in newData){
            formData.append(item, newData[item])
    }

    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/registerusername`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
        data: formData
    });

    return (response);
}

export default registerUserName;