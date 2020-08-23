import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getSubCategories() {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/subcategories`,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (response);
}

export default getSubCategories;