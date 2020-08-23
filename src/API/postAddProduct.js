import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function postAddProduct(token,data) {

    let formData = new FormData();
    console.log("data",data)
    for(const item in data){
        if (item === "files"){
            data[item].map(itemImg=>{
                formData.append(item, itemImg)
            })
        }else {
            formData.append(item, data[item])
        }
    }

    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/createproduct`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
        },
        data: formData
    });

    return (response);
}

export default postAddProduct;