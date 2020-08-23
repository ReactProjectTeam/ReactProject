import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getCategories() {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/categories`,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (response);
}

export default getCategories;