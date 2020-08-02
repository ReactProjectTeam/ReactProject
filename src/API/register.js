import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function register({name,surname,phonenumber,password}) {

    const newData = {
        name,
        surname,
        phonenumber,
        password
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