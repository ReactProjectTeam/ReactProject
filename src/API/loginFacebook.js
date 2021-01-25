import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'

function loginFacebook(FacebookUserId,userName) {

    const newData = {
        FacebookUserId,
        userName,
    }
    const response =  axios({
        method: 'post',
        url: `${baseURL}/api/loginfacebook`,
        data: newData
    });

    return (response);
}

export default loginFacebook;