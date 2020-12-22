import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getAllBlogs(sort) {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/blogs`,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            SortedType: sort
        },
    });

    return (response);
}

export default getAllBlogs;