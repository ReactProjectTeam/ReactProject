import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function login({email,password}) {

    const newData = {
        email,
        password,
        roleId: "2"
    }


    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/login`,
        data: newData
    });

    return (response);
}

export default login;