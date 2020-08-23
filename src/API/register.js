import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function register({email,password, confirmPassword,name,surname,phoneNumber,address}) {

    const newData = {
        email,
        password,
        confirmPassword,
        name,
        surname,
        phoneNumber,
        address,
        roleId: "2"
    }


    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/register`,
        data: newData
    });

    return (response);
}

export default register;