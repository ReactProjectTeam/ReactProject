import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function putUpdateProduct(token,data) {
    let formData = new FormData();
    for(const item in data){
        if (item === "files" || item === "deletePhotoByIds"){
            data[item].map(itemImg=>{
                formData.append(item, itemImg)
            })
        }else {
            formData.append(item, data[item])
        }
    }
    const response =  axios({
        method: 'put',
        url: `${baseURL}/api/updateproduct`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
        },
        data: formData
    });

    return (response);
}

export default putUpdateProduct;