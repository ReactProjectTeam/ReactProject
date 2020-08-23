import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getProductById(id) {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/product/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (response);
}

export default getProductById;