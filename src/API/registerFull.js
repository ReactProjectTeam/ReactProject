import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function register({email,password, confirmPassword,name,surname,phoneNumber,address,photo}) {
    const newData = {
        email,
        password,
        confirmPassword,
        name,
        surname,
        phoneNumber,
        address,
        photo,
        roleId: "2"
    }

    let formData = new FormData();

    for(const item in newData){
        if (item === "photo"){
            formData.append(item,newData[item][0])
        }else {
            formData.append(item, newData[item])
        }
    }

    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/register`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
        data: formData
    });

    return (response);
}

export default register;