import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function forgotPassword(newData) {
    
    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/checkcodeandchangepassword`,
        headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/json-patch+json',
            'Accept': '*/*',
        },
        data: newData
    });

    return (response);
}

export default forgotPassword;