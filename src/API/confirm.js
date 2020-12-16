import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function confirm(urlCode) {
    // console.log(typeof urlCode)
    let urlNewCode = {
        code: urlCode
    }
    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/confirmemailbycode`,
        headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/json-patch+json',
            'Accept': '*/*',
        },
        data: urlNewCode
    });

    return (response);
}

export default confirm;