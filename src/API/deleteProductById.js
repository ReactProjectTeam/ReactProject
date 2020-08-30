import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function deleteProductById(token,id) {
    const response =  axios({
        method: 'delete',
        url: `${baseURL}/api/deleteproduct/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return (response);
}

export default deleteProductById;