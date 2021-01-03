import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function loginEmail({email,password}) {

    const newData = {
        email,
        password,
    }


    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/login`,
        data: newData
    });

    return (response);
}

export default loginEmail;