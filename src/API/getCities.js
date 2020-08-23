import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getCities() {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/cities`,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (response);
}

export default getCities;