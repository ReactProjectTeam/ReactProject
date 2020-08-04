import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function register({email,password,name,surname,phonenumber,address}) {

    const newData = {
        email,
        password,
        name,
        surname,
        phonenumber,
        address
    }

    console.log("newData",newData)

    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/register`,
        data: newData
    });
    console.log("response",response)

    return (response);
}

export default register;