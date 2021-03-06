import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function getAllProducts(category,subCategory,status,count,page,sort,gender) {

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/products`,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            CategoryId: category,
            SubCategoryId: subCategory,
            Status: status,
            Count: count,
            Page: page,
            SortedType: sort,
            Gender: gender
        },
    });

    return (response);
}

export default getAllProducts;