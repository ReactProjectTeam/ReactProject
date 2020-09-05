import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function putUpdateUser(token,data) {
    // console.log("token",token)
    // console.log("data",data)
    // let formData = new FormData();
    // for(const item in data){
    //     if (item === "files"){
    //         data[item].map(itemImg=>{
    //             formData.append(item, itemImg)
    //         })
    //     }else {
    //         formData.append(item, data[item])
    //     }
    // }
    //
    // const response =  axios({
    //     method: 'put',
    //     url: `${baseURL}/api/updateuser`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         'Accept': '*/*',
    //     },
    //     data: formData
    // });

    // return (response);
}

export default putUpdateUser;