import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getAllBlogs() {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/blogs`,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return (response);
}

export default getAllBlogs;