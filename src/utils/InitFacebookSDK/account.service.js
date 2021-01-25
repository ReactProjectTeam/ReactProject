import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import loginFacebook from "../../API/loginFacebook";
import swal from "sweetalert";
import Cookies from 'universal-cookie';
// import {useHistory} from "react-router-dom";
import React from "react";



const cookies = new Cookies();


export const accountService = {
    login,
    apiAuthenticate,
};

async function login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;
    await apiAuthenticate(authResponse.accessToken)
    // window.location.href = "http://localhost:3000"
}


async function apiAuthenticate(accessToken) {
    const account = await axios.get(`https://graph.facebook.com/v8.0/me?access_token=${accessToken}`)
        .then(response=> (response.data));
    if (account != null){
        loginFacebook(account.id,account.name)
            .then(res=>{
                cookies.set('token', res.data.data.token);
            })
    }else {
        swal("Yenidən cəhd edin", "Faceook ilə daxil olmaq alınmadı", "warning",{
            button: "Təkrar",
        })
    }
}






