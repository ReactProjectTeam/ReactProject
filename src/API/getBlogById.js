import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getBlogById(id) {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/blog/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (response);
}

export default getBlogById;