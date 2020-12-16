import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function register({email,password, confirmPassword}) {
    const newData = {
        email,
        password,
        confirmPassword,
        roleId: "2"
    }

    let formData = new FormData();

    for(const item in newData){
            formData.append(item, newData[item])
    }

    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/register`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
        data: formData
    });

    return (response);
}

export default register;