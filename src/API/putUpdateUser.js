import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function putUpdateUser(token,newData) {

    let formData = new FormData();

    for(const item in newData){
        if (item === "photo"){
            formData.append(item,newData[item][0])
        }else {
            formData.append(item, newData[item])
        }
    }

    const response =  axios({
        method: 'put',
        url: `${baseURL}/api/updateuser`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
        },
        data: formData
    });

    return (response);
}

export default putUpdateUser;