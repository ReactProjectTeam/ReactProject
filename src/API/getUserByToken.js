import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getUserByToken(token) {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/finduserbytoken`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return (response);
}

export default getUserByToken;