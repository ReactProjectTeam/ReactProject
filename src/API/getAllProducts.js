import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getAllProducts() {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/products`,
        headers: {
            'Content-Type': 'application/json'
        },
        // data: {
        //     status: 4
        // }
    });

    return (response);
}

export default getAllProducts;