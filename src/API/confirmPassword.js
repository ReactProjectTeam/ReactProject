import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function comfirmPassword(email) {

    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/forgotpassword`,
        headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/json-patch+json',
            'Accept': '*/*',
        },
        data: email
    });

    return (response);
}

export default comfirmPassword;